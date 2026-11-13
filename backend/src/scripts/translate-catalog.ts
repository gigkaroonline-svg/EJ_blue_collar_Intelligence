/**
 * Backfill catalog names + descriptions with everyday regional names via Gemini.
 *
 * Usage:
 *   npm run translate:catalog -- tradespeople_registry
 *   npm run translate:catalog -- tradespeople_registry --dry-run
 *   npm run translate:catalog -- tradespeople_registry --force
 */
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import { LANGS, LANG_LABELS, Lang } from '../config/languages';
import { buildSearchTerms, LangMap } from '../models/i18n';

type Kind = 'categories' | 'skills' | 'jobs';
type TargetLang = Exclude<Lang, 'en'>;
type NameKind = 'native' | 'transliterated';
type MetaKind = NameKind | 'fallback-hi' | 'fallback-ur';

type CatalogItem = {
  id: string;
  collection: Kind;
  english: string;
  enDescription: string;
  existingNames: LangMap;
  existingDescriptions: LangMap;
  existingNameMeta: Partial<Record<TargetLang, MetaKind>>;
  aliases: string[];
};

type ItemResult = {
  name: string;
  description: string;
  kind: MetaKind;
};

type CacheEntry = {
  name: string;
  description: string;
  kind: NameKind;
};

const TARGET_LANGS = LANGS.filter((l): l is TargetLang => l !== 'en');

/**
 * Languages that never call Gemini — copy from Hindi / Urdu after those exist.
 * Keys may include langs not yet in LANGS; ignored until LANGS grows.
 */
const FALLBACK_OF: Partial<Record<string, 'hi' | 'ur'>> = {
  brx: 'hi',
  bgc: 'hi',
  raj: 'hi',
  ks: 'ur',
};

const GEMINI_LANGS = TARGET_LANGS.filter((l) => !FALLBACK_OF[l]);

const MODEL = 'gemini-2.5-flash';
const BATCH_SIZE = 30;
const CALL_GAP_MS = 4000;
const CACHE_PATH = path.resolve(__dirname, '../../.cache/catalog-translations.json');
const REVIEW_PATH = path.resolve(__dirname, '../../.cache/translation-review.json');
const CACHE_VERSION = 'v2';

/** Must be a subset of current TargetLang (LANGS minus en). */
const DRY_RUN_LANGS: TargetLang[] = ['gu', 'kn', 'bn'];
const DRY_RUN_JOB_LIMIT = 10;
/** Prefer these in the dry-run set so we can verify the "native" branch. */
const DRY_RUN_MUST_INCLUDE = ['Mason', 'Carpenter', 'Tailor', 'Electrician'] as const;
const DRY_RUN_NAME_ALIASES: Record<string, string[]> = {
  Tailor: ['Garment Tailor'],
};

/** Everyday native examples to bias Gemini toward kind="native" when workers use them. */
const NATIVE_EXAMPLES: Partial<Record<string, string>> = {
  gu: 'Mason→કડિયા, Carpenter→સુથાર, Tailor→દરજી, Blacksmith→લુહાર, Potter→કુંભાર',
  hi: 'Mason→राजमिस्त्री / मिस्त्री, Carpenter→बढ़ई, Tailor→दर्जी, Blacksmith→लोहार, Potter→कुम्हार',
  mr: 'Mason→गवंडी / राजमिस्त्री, Carpenter→सुतार, Tailor→शिंपी / दर्जी',
  bn: 'Mason→রাজমিস্ত্রি, Carpenter→ছুতোর, Tailor→দর্জি',
  pa: 'Mason→ਰਾਜ ਮਿਸਤਰੀ, Carpenter→ਤਰਖਾਣ, Tailor→ਦਰਜ਼ੀ',
  ta: 'Mason→கொத்தனார், Carpenter→தச்சர், Tailor→தையல்காரர் / தறிஞர்',
  te: 'Mason→రాజమిస్త్రీ / మేస్త్రీ, Carpenter→వడ్రంగి, Tailor→దర్జీ',
  kn: 'Mason→ಮೇಸ್ತ್ರಿ / ಕಲಸಗಾರ, Carpenter→ಬಡಗಿ, Tailor→ದರ್ಜಿ',
  ml: 'Mason→മേസ്തിരി, Carpenter→ആശാരി, Tailor→തയ്യൽക്കാരൻ',
  or: 'Mason→ରାଜମିସ୍ତ୍ରୀ, Carpenter→ବଢ଼େଇ, Tailor→ଦରଜି',
  as: 'Mason→ৰাজমিস্ত্ৰী, Carpenter→কাঠমিস্ত্ৰী, Tailor→দৰজি',
  ur: 'Mason→مستری / راج مستری, Carpenter→بڑھئی, Tailor→درزی',
  bho: 'Mason→राजमिस्त्री, Carpenter→बढ़ई, Tailor→दर्जी',
};

/** Unicode script blocks per language (plus shared punctuation / digits). */
const SCRIPT_RANGES: Record<string, Array<[number, number]>> = {
  hi: [[0x0900, 0x097f]],
  mr: [[0x0900, 0x097f]],
  ne: [[0x0900, 0x097f]],
  sa: [[0x0900, 0x097f]],
  kok: [[0x0900, 0x097f]],
  mai: [[0x0900, 0x097f]],
  doi: [[0x0900, 0x097f]],
  brx: [[0x0900, 0x097f]],
  bho: [[0x0900, 0x097f]],
  bgc: [[0x0900, 0x097f]],
  raj: [[0x0900, 0x097f]],
  bn: [[0x0980, 0x09ff]],
  as: [[0x0980, 0x09ff]],
  pa: [[0x0a00, 0x0a7f]],
  gu: [[0x0a80, 0x0aff]],
  or: [[0x0b00, 0x0b7f]],
  ta: [[0x0b80, 0x0bff]],
  te: [[0x0c00, 0x0c7f]],
  kn: [[0x0c80, 0x0cff]],
  tcy: [[0x0c80, 0x0cff]],
  ml: [[0x0d00, 0x0d7f]],
  ur: [[0x0600, 0x06ff]],
  sd: [[0x0600, 0x06ff]],
  ks: [[0x0600, 0x06ff]],
  sat: [[0x1c50, 0x1c7f]],
  mni: [[0xabc0, 0xabff]],
};

const EXTRA_ALLOWED = new Set([
  0x20, // space
  0x26, // &
  0x28, // (
  0x29, // )
  0x2c, // ,
  0x2d, // -
  0x2e, // .
  0x2f, // /
  0x200c, // ZWNJ
  0x200d, // ZWJ
]);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function enDescription(kind: Kind, name: string): string {
  if (kind === 'categories') return `Work category covering ${name}.`;
  if (kind === 'skills') return `Skill domain for ${name}.`;
  return `Job role: ${name}.`;
}

function cacheKey(lang: TargetLang, english: string): string {
  return `${lang}::${english}::${CACHE_VERSION}`;
}

function loadCache(): Record<string, CacheEntry> {
  try {
    const raw = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) as Record<string, unknown>;
    const out: Record<string, CacheEntry> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (!k.endsWith(`::${CACHE_VERSION}`)) continue;
      if (v && typeof v === 'object' && typeof (v as CacheEntry).name === 'string') {
        out[k] = v as CacheEntry;
      }
    }
    return out;
  } catch {
    return {};
  }
}

function saveCache(cache: Record<string, CacheEntry>) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 0));
}

function isAllowedChar(cp: number, lang: TargetLang): boolean {
  if (cp >= 0x30 && cp <= 0x39) return true; // digits
  if (EXTRA_ALLOWED.has(cp)) return true;
  for (const [lo, hi] of SCRIPT_RANGES[lang]) {
    if (cp >= lo && cp <= hi) return true;
  }
  return false;
}

function validateScript(text: string, lang: TargetLang): { ok: true } | { ok: false; reason: string } {
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, reason: 'empty' };

  for (const ch of trimmed) {
    const cp = ch.codePointAt(0)!;
    if (!isAllowedChar(cp, lang)) {
      const hex = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
      if ((cp >= 0x41 && cp <= 0x5a) || (cp >= 0x61 && cp <= 0x7a)) {
        return { ok: false, reason: `Latin letter '${ch}' (${hex}) not allowed` };
      }
      return { ok: false, reason: `disallowed character '${ch}' (${hex})` };
    }
  }
  return { ok: true };
}

function fallbackSourceLang(lang: string): 'hi' | 'ur' {
  if (lang === 'ks' || lang === 'sd' || FALLBACK_OF[lang] === 'ur') return 'ur';
  return 'hi';
}

function updateSpellingMap(map: Map<string, string>, english: string, regional: string) {
  const enParts = english.trim().split(/\s+/).filter(Boolean);
  const reParts = regional.trim().split(/\s+/).filter(Boolean);
  if (enParts.length === 0 || enParts.length !== reParts.length) return;
  for (let i = 0; i < enParts.length; i++) {
    const enWord = enParts[i].replace(/[()]/g, '');
    if (!/^[A-Za-z][A-Za-z./&-]*$/.test(enWord)) continue;
    if (!map.has(enWord)) map.set(enWord, reParts[i]);
  }
}

let lastGeminiCallAt = 0;
/** Consecutive 429/quota failures across the whole run — stop before looping forever. */
let consecutiveQuotaFailures = 0;
const MAX_QUOTA_RETRIES_PER_CALL = 3;
const MAX_CONSECUTIVE_QUOTA_FAILURES = 5;

function httpStatusOf(err: unknown): number | undefined {
  const status = (err as { status?: number })?.status;
  if (typeof status === 'number') return status;
  const msg = String((err as { message?: string })?.message ?? err);
  const m = msg.match(/"code"\s*:\s*(\d{3})/) || msg.match(/\b([45]\d{2})\b/);
  return m ? Number(m[1]) : undefined;
}

function isQuotaError(err: unknown): boolean {
  const status = httpStatusOf(err);
  const msg = String((err as { message?: string })?.message ?? err);
  if (status === 429) return true;
  return /resource.?exhausted|rate.?limit|too many requests|quota|daily.?limit/i.test(msg);
}

function shouldRetryGemini(err: unknown): boolean {
  const status = httpStatusOf(err);
  if (isQuotaError(err)) return true;
  if (status != null && status >= 500 && status <= 599) return true;
  const msg = String((err as { message?: string })?.message ?? err);
  return /econnreset|etimedout|socket hang up/i.test(msg);
}

function formatGeminiError(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

async function geminiJson(
  ai: GoogleGenAI,
  prompt: string,
  attempt = 1,
): Promise<Record<string, unknown>> {
  const waitGap = CALL_GAP_MS - (Date.now() - lastGeminiCallAt);
  if (waitGap > 0) await sleep(waitGap);

  try {
    lastGeminiCallAt = Date.now();
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        temperature: 0,
        responseMimeType: 'application/json',
      },
    });
    consecutiveQuotaFailures = 0;
    const text = response.text?.trim();
    if (!text) throw new Error('Empty Gemini response');
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Gemini response is not a JSON object');
    }
    return parsed as Record<string, unknown>;
  } catch (err) {
    const status = httpStatusOf(err);
    // Fail immediately on client / auth errors — surface the full message.
    if (status === 400 || status === 401 || status === 403 || status === 404) {
      throw new Error(`Gemini ${status}: ${formatGeminiError(err)}`);
    }

    if (isQuotaError(err)) {
      consecutiveQuotaFailures += 1;
      if (
        attempt >= MAX_QUOTA_RETRIES_PER_CALL ||
        consecutiveQuotaFailures >= MAX_CONSECUTIVE_QUOTA_FAILURES
      ) {
        throw new Error(
          `Gemini daily/quota limit hit (429 repeating). Cache kept so a later rerun skips finished work. Last error: ${formatGeminiError(err)}`,
        );
      }
      const wait = Math.min(60_000, 5000 * 2 ** (attempt - 1));
      console.warn(
        `  Gemini quota backoff ${wait}ms (attempt ${attempt}/${MAX_QUOTA_RETRIES_PER_CALL}, consecutive=${consecutiveQuotaFailures})`,
      );
      await sleep(wait);
      return geminiJson(ai, prompt, attempt + 1);
    }

    if (!shouldRetryGemini(err) || attempt >= 8) {
      throw new Error(`Gemini failed: ${formatGeminiError(err)}`);
    }
    const wait = Math.min(60_000, 2000 * 2 ** (attempt - 1));
    console.warn(`  Gemini backoff ${wait}ms (attempt ${attempt}, status=${status ?? 'n/a'})`);
    await sleep(wait);
    return geminiJson(ai, prompt, attempt + 1);
  }
}

function buildPrompt(input: {
  lang: TargetLang;
  items: Array<{ id: string; english: string }>;
  spellings: Map<string, string>;
  mode: 'normal' | 'fix' | 'transliterate-only';
  failures?: Array<{ id: string; reason: string }>;
}): string {
  const langName = LANG_LABELS[input.lang];
  const spellingObj = Object.fromEntries(input.spellings.entries());
  const payload = Object.fromEntries(input.items.map((it) => [it.id, { english: it.english }]));

  const failureBlock =
    input.failures && input.failures.length
      ? `\nPrevious attempt failed validation for:\n${JSON.stringify(input.failures, null, 2)}\nFix ONLY those problems.\n`
      : '';

  const modeBlock =
    input.mode === 'transliterate-only'
      ? `\nMODE: transliteration-only. For EVERY item set kind="transliterated". Write each English word in ${langName} script the way workers say it. Do NOT invent native synonyms.\n`
      : '';

  const nativeExamples =
    NATIVE_EXAMPLES[input.lang] ??
    'Prefer everyday trade words workers actually say (mason/carpenter/tailor equivalents), not bookish dictionary forms.';

  return `You name blue-collar / industrial job and skill titles for ordinary workers who speak ${langName} (ISO code: ${input.lang}).

RULES for every "name":
1. Prefer the NATIVE word whenever workers use it daily. Set kind="native".
   Examples for ${langName}: ${nativeExamples}
2. Only if there is no common native word, write the ENGLISH word(s) in ${langName} script — reverse Hinglish / phonetic spelling people actually say.
   Examples: "Gas Cutter" → Gujarati "ગેસ કટર", "Lathe Operator" → "લેથ ઓપરેટર". Set kind="transliterated".
3. Never write a descriptive explanation, a literal word-by-word translation, or a formal/Sanskritised word people don't use.
4. When unsure between 1 and 2, choose 2 (transliterated) — BUT for classic trades like mason, carpenter, tailor, blacksmith, potter: if a daily native word exists, you MUST use it (kind="native").
5. EVERY character of name and description must be in the ${langName} script (or digits/spaces/&/() , . -). No Latin letters at all. Mixed output like "plasma cutting ઓપરેટર" is a bug.
6. Spell each English loanword the SAME way across items. Reuse the spellings below exactly.

Already chosen English → ${langName} spellings (MUST reuse):
${JSON.stringify(spellingObj, null, 2)}
${modeBlock}${failureBlock}
Also write "description": one short, simple, everyday sentence in ${langName} that uses the regional name you chose. No Latin letters.

Return JSON ONLY, keyed by the given ids:
{
  "<id>": { "name": "...", "description": "...", "kind": "native" | "transliterated" },
  ...
}

Input items:
${JSON.stringify(payload, null, 2)}
`;
}

function parseItemResult(
  raw: unknown,
  lang: TargetLang,
): { ok: true; value: { name: string; description: string; kind: NameKind } } | { ok: false; reason: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, reason: 'missing object' };
  }
  const obj = raw as Record<string, unknown>;
  const name = typeof obj.name === 'string' ? obj.name.trim() : '';
  const description = typeof obj.description === 'string' ? obj.description.trim() : '';
  const kind = obj.kind === 'native' || obj.kind === 'transliterated' ? obj.kind : null;
  if (!name) return { ok: false, reason: 'missing name' };
  if (!description) return { ok: false, reason: 'missing description' };
  if (!kind) return { ok: false, reason: 'kind must be native|transliterated' };

  const nameCheck = validateScript(name, lang);
  if (!nameCheck.ok) return { ok: false, reason: `name: ${nameCheck.reason}` };
  const descCheck = validateScript(description, lang);
  if (!descCheck.ok) return { ok: false, reason: `description: ${descCheck.reason}` };

  return { ok: true, value: { name, description, kind } };
}

async function translateBatch(
  ai: GoogleGenAI,
  lang: TargetLang,
  items: Array<{ id: string; english: string }>,
  spellings: Map<string, string>,
  cache: Record<string, CacheEntry>,
  hiUrResults: Partial<Record<'hi' | 'ur', Map<string, ItemResult>>>,
  opts: { useCache: boolean },
): Promise<Map<string, ItemResult>> {
  const results = new Map<string, ItemResult>();
  const pending = [...items];

  // Seed from cache where the cached regional text still passes the script check.
  // Dry-run skips cache so we always exercise Gemini (esp. the native branch).
  const stillPending: Array<{ id: string; english: string }> = [];
  for (const item of pending) {
    if (opts.useCache) {
      const cached = cache[cacheKey(lang, item.english)];
      if (cached) {
        const checkName = validateScript(cached.name, lang);
        const checkDesc = validateScript(cached.description, lang);
        if (checkName.ok && checkDesc.ok) {
          results.set(item.id, { ...cached });
          if (cached.kind === 'transliterated') {
            updateSpellingMap(spellings, item.english, cached.name);
          }
          continue;
        }
      }
    }
    stillPending.push(item);
  }
  pending.length = 0;
  pending.push(...stillPending);

  const runPass = async (
    batch: Array<{ id: string; english: string }>,
    mode: 'normal' | 'fix' | 'transliterate-only',
    failures?: Array<{ id: string; reason: string }>,
  ) => {
    if (batch.length === 0) return new Map<string, { ok: false; reason: string }>();

    const parsed = await geminiJson(
      ai,
      buildPrompt({ lang, items: batch, spellings, mode, failures }),
    );

    const failed = new Map<string, { ok: false; reason: string }>();
    for (const item of batch) {
      const check = parseItemResult(parsed[item.id], lang);
      if (!check.ok) {
        failed.set(item.id, check);
        continue;
      }
      results.set(item.id, check.value);
      cache[cacheKey(lang, item.english)] = check.value;
      if (check.value.kind === 'transliterated') {
        updateSpellingMap(spellings, item.english, check.value.name);
      }
    }
    saveCache(cache);
    return failed;
  };

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const chunk = pending.slice(i, i + BATCH_SIZE);
    console.log(`  ${lang}: batch ${Math.floor(i / BATCH_SIZE) + 1} (${chunk.length} items)`);

    let failed = await runPass(chunk, 'normal');
    if (failed.size > 0) {
      const retryItems = chunk.filter((c) => failed.has(c.id));
      const failureList = retryItems.map((c) => ({
        id: c.id,
        reason: failed.get(c.id)!.reason,
      }));
      console.warn(`  ${lang}: retry ${retryItems.length} after validation errors`);
      failed = await runPass(retryItems, 'fix', failureList);
    }

    if (failed.size > 0) {
      const translitItems = chunk.filter((c) => failed.has(c.id));
      const failureList = translitItems.map((c) => ({
        id: c.id,
        reason: failed.get(c.id)!.reason,
      }));
      console.warn(`  ${lang}: transliteration-only retry ${translitItems.length}`);
      failed = await runPass(translitItems, 'transliterate-only', failureList);
    }

    if (failed.size > 0) {
      const srcLang = fallbackSourceLang(lang);
      const srcMap = hiUrResults[srcLang];
      const sameScript =
        JSON.stringify(SCRIPT_RANGES[lang]) === JSON.stringify(SCRIPT_RANGES[srcLang]);
      for (const item of chunk) {
        if (!failed.has(item.id) || results.has(item.id)) continue;
        const src = srcMap?.get(item.id);
        if (
          src &&
          sameScript &&
          validateScript(src.name, lang).ok &&
          validateScript(src.description, lang).ok
        ) {
          const meta: MetaKind = srcLang === 'ur' ? 'fallback-ur' : 'fallback-hi';
          results.set(item.id, {
            name: src.name,
            description: src.description,
            kind: meta,
          });
          console.warn(`  ${lang}: fallback-${srcLang} for ${item.english}`);
        } else {
          console.error(
            `  ${lang}: FAILED ${item.english} — refusing to save English/mixed text`,
          );
        }
      }
    }
  }

  return results;
}

type Stats = Record<TargetLang, Record<MetaKind, number>>;

function emptyStats(): Stats {
  return Object.fromEntries(
    TARGET_LANGS.map((l) => [
      l,
      { native: 0, transliterated: 0, 'fallback-hi': 0, 'fallback-ur': 0 },
    ]),
  ) as Stats;
}

function toCatalogItem(doc: Record<string, unknown>, collection: Kind): CatalogItem | null {
  const enName = String((doc.names as LangMap | undefined)?.en ?? '').trim();
  if (!enName) {
    console.warn(`  skip ${collection}/${doc._id}: missing names.en`);
    return null;
  }
  const existingDesc = (doc.descriptions as LangMap | undefined) ?? {};
  return {
    id: String(doc._id),
    collection,
    english: enName,
    enDescription:
      (existingDesc.en && String(existingDesc.en).trim()) || enDescription(collection, enName),
    existingNames: (doc.names as LangMap) ?? {},
    existingDescriptions: existingDesc,
    existingNameMeta: (doc.nameMeta as CatalogItem['existingNameMeta']) ?? {},
    aliases: Array.isArray(doc.aliases) ? (doc.aliases as string[]) : [],
  };
}

async function loadDryRunItems(db: mongoose.mongo.Db): Promise<CatalogItem[]> {
  const projection = { names: 1, descriptions: 1, aliases: 1, nameMeta: 1 };
  const picked = new Map<string, CatalogItem>();

  for (const wanted of DRY_RUN_MUST_INCLUDE) {
    const candidates = [wanted, ...(DRY_RUN_NAME_ALIASES[wanted] ?? [])];
    let found: CatalogItem | null = null;
    for (const name of candidates) {
      const doc = await db.collection('jobs').findOne({ 'names.en': name }, { projection });
      if (!doc) continue;
      found = toCatalogItem(doc as Record<string, unknown>, 'jobs');
      if (found) {
        if (name !== wanted) {
          console.warn(`  dry-run: "${wanted}" not found; using "${found.english}"`);
        }
        break;
      }
    }
    if (!found) {
      console.warn(`  dry-run: could not find job for "${wanted}"`);
      continue;
    }
    picked.set(found.id, found);
  }

  const remaining = DRY_RUN_JOB_LIMIT - picked.size;
  if (remaining > 0) {
    const fillers = await db
      .collection('jobs')
      .find({ _id: { $nin: [...picked.keys()].map((id) => new mongoose.Types.ObjectId(id)) } })
      .project(projection)
      .limit(remaining + 5)
      .toArray();
    for (const doc of fillers) {
      if (picked.size >= DRY_RUN_JOB_LIMIT) break;
      const item = toCatalogItem(doc as Record<string, unknown>, 'jobs');
      if (!item) continue;
      picked.set(item.id, item);
    }
  }

  return [...picked.values()].slice(0, DRY_RUN_JOB_LIMIT);
}

async function loadItems(
  db: mongoose.mongo.Db,
  opts: { dryRun: boolean },
): Promise<CatalogItem[]> {
  if (opts.dryRun) return loadDryRunItems(db);

  const items: CatalogItem[] = [];
  for (const collection of ['categories', 'skills', 'jobs'] as Kind[]) {
    const docs = await db
      .collection(collection)
      .find({})
      .project({ names: 1, descriptions: 1, aliases: 1, nameMeta: 1 })
      .toArray();
    for (const doc of docs) {
      const item = toCatalogItem(doc as Record<string, unknown>, collection);
      if (item) items.push(item);
    }
  }
  return items;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  const dbName = args.find((a) => !a.startsWith('--')) || process.env.MONGODB_DB_NAME;
  const uri = process.env.MONGODB_URI;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!uri || !dbName) throw new Error('Need MONGODB_URI and db name');
  if (!apiKey) throw new Error('Need GEMINI_API_KEY');

  const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1beta' });
  const cache = loadCache();
  const stats = emptyStats();
  let fallbackCount = 0;

  console.log({
    dbName,
    dryRun,
    force,
    model: MODEL,
    langs: dryRun ? DRY_RUN_LANGS : TARGET_LANGS.length,
  });

  await mongoose.connect(uri, { dbName });
  const db = mongoose.connection.db!;
  const items = await loadItems(db, { dryRun });
  console.log(`Items to process: ${items.length}`);

  const langsToRun: TargetLang[] = dryRun ? DRY_RUN_LANGS : [...GEMINI_LANGS];
  // hi / ur first so fallbacks can copy them.
  langsToRun.sort((a, b) => {
    const rank = (l: string) => (l === 'hi' ? 0 : l === 'ur' ? 1 : 2);
    return rank(a) - rank(b);
  });

  /** id → result per language */
  const byLang = new Map<TargetLang, Map<string, ItemResult>>();
  const hiUrResults: Partial<Record<'hi' | 'ur', Map<string, ItemResult>>> = {};

  type ReviewRow = { id: string; en: string; lang: TargetLang; kind: MetaKind };
  const reviewRows: ReviewRow[] = [];

  for (const lang of langsToRun) {
    const spellings = new Map<string, string>();
    const need: Array<{ id: string; english: string }> = [];

    for (const item of items) {
      const existingName = item.existingNames[lang]?.trim() ?? '';
      const existingDesc = item.existingDescriptions[lang]?.trim() ?? '';
      // Without --force, keep any existing non-empty name (incl. old Google values).
      // Dry-run / --force always regenerate.
      const canReuse = !dryRun && !force && Boolean(existingName);

      if (canReuse) {
        const existing: ItemResult = {
          name: existingName,
          description: existingDesc || existingName,
          kind: item.existingNameMeta[lang] ?? 'native',
        };
        if (!byLang.has(lang)) byLang.set(lang, new Map());
        byLang.get(lang)!.set(item.id, existing);
        continue;
      }
      need.push({ id: item.id, english: item.english });
    }

    console.log(`\nTranslating → ${lang} (${LANG_LABELS[lang]}): ${need.length} missing`);
    const results = await translateBatch(ai, lang, need, spellings, cache, hiUrResults, {
      useCache: !dryRun,
    });
    if (!byLang.has(lang)) byLang.set(lang, new Map());
    const map = byLang.get(lang)!;
    for (const [id, value] of results) {
      map.set(id, value);
      stats[lang][value.kind] += 1;
      if (value.kind === 'fallback-hi' || value.kind === 'fallback-ur') {
        fallbackCount += 1;
        const en = items.find((it) => it.id === id)?.english ?? '';
        reviewRows.push({ id, en, lang, kind: value.kind });
      }
    }

    if (lang === 'hi' || (lang as string) === 'ur') {
      hiUrResults[lang as 'hi' | 'ur'] = map;
    }
  }

  if (!dryRun) {
    for (const [lang, from] of Object.entries(FALLBACK_OF) as Array<[string, 'hi' | 'ur']>) {
      if (!(TARGET_LANGS as readonly string[]).includes(lang)) continue;
      const targetLang = lang as TargetLang;
      const src = byLang.get(from as TargetLang);
      if (!src) {
        console.warn(`Skip fallback ${lang} ← ${from}: source not ready`);
        continue;
      }
      const map = new Map<string, ItemResult>();
      for (const item of items) {
        const existingName = item.existingNames[targetLang]?.trim() ?? '';
        if (!force && existingName) {
          map.set(item.id, {
            name: existingName,
            description: item.existingDescriptions[targetLang]?.trim() || existingName,
            kind:
              item.existingNameMeta[targetLang] ??
              (from === 'ur' ? 'fallback-ur' : 'fallback-hi'),
          });
          continue;
        }
        const srcVal = src.get(item.id);
        if (!srcVal) continue;
        const meta: MetaKind = from === 'ur' ? 'fallback-ur' : 'fallback-hi';
        map.set(item.id, {
          name: srcVal.name,
          description: srcVal.description,
          kind: meta,
        });
        stats[targetLang][meta] += 1;
        fallbackCount += 1;
        reviewRows.push({ id: item.id, en: item.english, lang: targetLang, kind: meta });
      }
      byLang.set(targetLang, map);
      console.log(`Fallback ${targetLang} ← ${from}: ${map.size} items`);
    }
  }

  if (dryRun) {
    console.log('\n--- dry-run preview (en → regional + kind) ---');
    for (const lang of DRY_RUN_LANGS) {
      console.log(`\n[${lang}] ${LANG_LABELS[lang]}`);
      const map = byLang.get(lang) ?? new Map();
      for (const item of items) {
        const r = map.get(item.id);
        console.log(`  ${item.english}`);
        console.log(`    → ${r?.name ?? '(FAILED)'}  [${r?.kind ?? 'missing'}]`);
      }
    }
  } else {
    const byCollection = new Map<Kind, CatalogItem[]>();
    for (const item of items) {
      if (!byCollection.has(item.collection)) byCollection.set(item.collection, []);
      byCollection.get(item.collection)!.push(item);
    }

    for (const [collection, colItems] of byCollection) {
      console.log(`\nUpdating ${collection}: ${colItems.length} docs`);
      let updated = 0;
      for (const item of colItems) {
        // --force: start fresh from English only; otherwise keep prior non-empty values.
        const names: LangMap = force
          ? { en: item.english }
          : { ...item.existingNames, en: item.english };
        const descriptions: LangMap = force
          ? { en: item.enDescription }
          : { ...item.existingDescriptions, en: item.enDescription };
        const nameMeta: Partial<Record<TargetLang, MetaKind>> = force
          ? {}
          : { ...item.existingNameMeta };

        for (const lang of TARGET_LANGS) {
          const r = byLang.get(lang)?.get(item.id);
          if (!r) {
            console.warn(`  missing ${lang} result for ${item.english} (${item.id})`);
            continue;
          }
          if (force || !item.existingNames[lang]?.trim()) {
            // New / forced values must pass the script check — never save English/mixed.
            if (!validateScript(r.name, lang).ok || !validateScript(r.description, lang).ok) {
              console.error(`  refuse to save invalid ${lang} for ${item.english}`);
              continue;
            }
            names[lang] = r.name;
            descriptions[lang] = r.description;
          }
          // Always record meta for every language we have a result for.
          nameMeta[lang] = r.kind;
        }

        // Ensure nameMeta covers every target language on the doc when possible.
        for (const lang of TARGET_LANGS) {
          if (!nameMeta[lang] && names[lang]?.trim()) {
            nameMeta[lang] = 'native';
          }
        }

        const $set: Record<string, unknown> = { names, descriptions, nameMeta };
        if (collection !== 'categories') {
          $set.searchTerms = buildSearchTerms(names, item.aliases);
        }

        await db.collection(collection).updateOne(
          { _id: new mongoose.Types.ObjectId(item.id) },
          { $set },
        );
        updated++;
        if (updated % 50 === 0) console.log(`  wrote ${updated}/${colItems.length}`);
      }
      console.log(`  ${collection}: ${updated} updated`);
    }
  }

  saveCache(cache);

  fs.mkdirSync(path.dirname(REVIEW_PATH), { recursive: true });
  fs.writeFileSync(
    REVIEW_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        dryRun,
        force,
        fallbacks: reviewRows,
      },
      null,
      2,
    ),
  );

  await mongoose.disconnect();

  console.log('\n--- per-language summary ---');
  for (const lang of dryRun ? DRY_RUN_LANGS : TARGET_LANGS) {
    const s = stats[lang];
    const total = s.native + s.transliterated + s['fallback-hi'] + s['fallback-ur'];
    console.log(
      `  ${lang}: native=${s.native} transliterated=${s.transliterated} fallback-hi=${s['fallback-hi']} fallback-ur=${s['fallback-ur']} (total=${total})`,
    );
  }
  console.log(`Fallbacks used: ${fallbackCount}`);
  console.log(`Review file: ${REVIEW_PATH} (${reviewRows.length} fallback rows)`);
  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
