/**
 * Read-only catalog i18n checks.
 *
 * Usage:
 *   npm run verify:catalog -- tradespeople_registryQA
 */
import mongoose from 'mongoose';
import { LANGS, Lang } from '../config/languages';

type Kind = 'categories' | 'skills' | 'jobs';
type TargetLang = Exclude<Lang, 'en'>;
type MetaKind = 'native' | 'transliterated' | 'fallback-hi' | 'fallback-ur';

const COLLECTIONS: Kind[] = ['categories', 'skills', 'jobs'];
const TARGET_LANGS = LANGS.filter((l): l is TargetLang => l !== 'en');

function hasLatinLetter(text: string): boolean {
  return /[A-Za-z]/.test(text);
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}

async function main() {
  const args = process.argv.slice(2);
  const dbName = args.find((a) => !a.startsWith('--')) || process.env.MONGODB_DB_NAME;
  const uri = process.env.MONGODB_URI;
  if (!uri || !dbName) throw new Error('Need MONGODB_URI and db name');

  await mongoose.connect(uri, { dbName });
  const db = mongoose.connection.db!;
  console.log(`\n=== verify-catalog: ${dbName} ===\n`);

  const missingName: Record<TargetLang, number> = Object.fromEntries(
    TARGET_LANGS.map((l) => [l, 0]),
  ) as Record<TargetLang, number>;
  const missingDesc: Record<TargetLang, number> = Object.fromEntries(
    TARGET_LANGS.map((l) => [l, 0]),
  ) as Record<TargetLang, number>;
  const latinHits: Array<{ collection: Kind; id: string; en: string; lang: string; field: string; value: string }> =
    [];
  let missingNameMeta = 0;
  const metaCounts: Record<TargetLang, Record<MetaKind, number>> = Object.fromEntries(
    TARGET_LANGS.map((l) => [
      l,
      { native: 0, transliterated: 0, 'fallback-hi': 0, 'fallback-ur': 0 },
    ]),
  ) as Record<TargetLang, Record<MetaKind, number>>;

  const allJobs: Array<{
    id: string;
    names: Record<string, string>;
    descriptions: Record<string, string>;
    searchTerms?: string[];
  }> = [];

  let totalDocs = 0;

  for (const collection of COLLECTIONS) {
    const docs = await db.collection(collection).find({}).toArray();
    console.log(`${collection}: ${docs.length} docs`);
    totalDocs += docs.length;

    for (const doc of docs) {
      const names = (doc.names ?? {}) as Record<string, string>;
      const descriptions = (doc.descriptions ?? {}) as Record<string, string>;
      const nameMeta = (doc.nameMeta ?? {}) as Record<string, string>;
      const en = String(names.en ?? '').trim();
      const id = String(doc._id);

      if (!nameMeta || typeof nameMeta !== 'object' || Object.keys(nameMeta).length === 0) {
        missingNameMeta += 1;
      }

      for (const lang of TARGET_LANGS) {
        const n = String(names[lang] ?? '').trim();
        const d = String(descriptions[lang] ?? '').trim();
        if (!n) missingName[lang] += 1;
        if (!d) missingDesc[lang] += 1;

        if (n && hasLatinLetter(n)) {
          latinHits.push({
            collection,
            id,
            en,
            lang,
            field: 'names',
            value: n.slice(0, 80),
          });
        }
        if (d && hasLatinLetter(d)) {
          latinHits.push({
            collection,
            id,
            en,
            lang,
            field: 'descriptions',
            value: d.slice(0, 80),
          });
        }

        const meta = nameMeta[lang] as MetaKind | undefined;
        if (meta === 'native' || meta === 'transliterated' || meta === 'fallback-hi' || meta === 'fallback-ur') {
          metaCounts[lang][meta] += 1;
        }
      }

      if (collection === 'jobs') {
        allJobs.push({
          id,
          names,
          descriptions,
          searchTerms: Array.isArray(doc.searchTerms) ? (doc.searchTerms as string[]) : undefined,
        });
      }
    }
  }

  console.log(`\nTotal docs: ${totalDocs}`);

  console.log('\n--- missing / empty names[lang] ---');
  for (const lang of TARGET_LANGS) {
    if (missingName[lang] > 0) console.log(`  ${lang}: ${missingName[lang]}`);
  }
  if (TARGET_LANGS.every((l) => missingName[l] === 0)) console.log('  (none)');

  console.log('\n--- missing / empty descriptions[lang] ---');
  for (const lang of TARGET_LANGS) {
    if (missingDesc[lang] > 0) console.log(`  ${lang}: ${missingDesc[lang]}`);
  }
  if (TARGET_LANGS.every((l) => missingDesc[l] === 0)) console.log('  (none)');

  console.log(`\n--- Latin letters in non-en values: ${latinHits.length} ---`);
  for (const hit of latinHits.slice(0, 40)) {
    console.log(
      `  ${hit.collection}/${hit.id} en="${hit.en}" ${hit.field}.${hit.lang}="${hit.value}"`,
    );
  }
  if (latinHits.length > 40) console.log(`  … ${latinHits.length - 40} more`);

  console.log(`\n--- docs missing nameMeta object: ${missingNameMeta} ---`);

  console.log('\n--- nameMeta counts per language ---');
  for (const lang of TARGET_LANGS) {
    const s = metaCounts[lang];
    const total = s.native + s.transliterated + s['fallback-hi'] + s['fallback-ur'];
    if (total === 0) continue;
    console.log(
      `  ${lang}: native=${s.native} transliterated=${s.transliterated} fallback-hi=${s['fallback-hi']} fallback-ur=${s['fallback-ur']}`,
    );
  }

  console.log('\n--- 10 random jobs (en / gu / hi / ta / kn) ---');
  for (const job of pickRandom(allJobs, 10)) {
    console.log(`  [${job.id}]`);
    console.log(`    en: ${job.names.en ?? ''}`);
    console.log(`    gu: ${job.names.gu ?? ''}`);
    console.log(`    hi: ${job.names.hi ?? ''}`);
    console.log(`    ta: ${job.names.ta ?? ''}`);
    console.log(`    kn: ${job.names.kn ?? ''}`);
  }

  console.log('\n--- 3 random descriptions (gu) ---');
  for (const job of pickRandom(allJobs, 3)) {
    console.log(`  ${job.names.en ?? '?'}: ${job.descriptions.gu ?? '(missing)'}`);
  }
  console.log('\n--- 3 random descriptions (kn) ---');
  for (const job of pickRandom(allJobs, 3)) {
    console.log(`  ${job.names.en ?? '?'}: ${job.descriptions.kn ?? '(missing)'}`);
  }

  console.log('\n--- searchTerms contains gu name? (5 random jobs) ---');
  for (const job of pickRandom(allJobs, 5)) {
    const gu = String(job.names.gu ?? '').trim();
    const terms = job.searchTerms ?? [];
    const normalizedGu = gu.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
    const hit =
      Boolean(gu) &&
      terms.some((t) => String(t).normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ') === normalizedGu);
    console.log(`  ${job.names.en ?? '?'} gu="${gu}" → ${hit ? 'YES' : 'NO'} (terms=${terms.length})`);
  }

  await mongoose.disconnect();
  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
