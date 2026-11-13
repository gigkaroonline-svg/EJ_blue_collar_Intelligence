/**
 * Apply generated translation JSON chunks into MongoDB.
 *
 * Expects files in backend/.cache/translations/*.json shaped as:
 * {
 *   "<mongoId>": {
 *     "names": { "hi": "...", "gu": "...", ... },  // non-en keys
 *     "descriptions": { "en": "...", "hi": "...", ... }
 *   }
 * }
 *
 * Usage:
 *   npx tsx --env-file=.env --env-file=.env.dev \
 *     src/scripts/apply-catalog-translations.ts tradespeople_registry
 */
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { LANGS } from '../config/languages';
import { buildSearchTerms, LangMap } from '../models/i18n';

type Chunk = Record<
  string,
  {
    names?: Record<string, string>;
    descriptions?: Record<string, string>;
  }
>;

const DIR = path.resolve(__dirname, '../../.cache/translations');

async function main() {
  const dbName = process.argv[2] || process.env.MONGODB_DB_NAME;
  const uri = process.env.MONGODB_URI;
  if (!uri || !dbName) throw new Error('Need MONGODB_URI and db name');

  // Only final chunk files: categories.json, skills-0-99.json, jobs-0-80.json, ...
  // Ignore helper/cache files (mymemory-*, translate-cache, _partial, etc.).
  const files = fs.existsSync(DIR)
    ? fs
        .readdirSync(DIR)
        .filter((f) => /^(categories|skills-\d+-\d+|jobs-\d+-\d+)\.json$/.test(f))
    : [];
  if (files.length === 0) throw new Error(`No deliverable JSON files in ${DIR}`);

  const merged: Chunk = {};
  for (const f of files) {
    const part = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as Chunk;
    Object.assign(merged, part);
  }
  console.log(`Loaded ${files.length} files, ${Object.keys(merged).length} docs`);

  await mongoose.connect(uri, { dbName });
  const db = mongoose.connection.db!;

  let updated = 0;
  let missing = 0;
  for (const kind of ['categories', 'skills', 'jobs'] as const) {
    const col = db.collection(kind);
    const docs = await col.find({}).toArray();
    for (const doc of docs) {
      const id = String(doc._id);
      const patch = merged[id];
      if (!patch) {
        missing++;
        continue;
      }

      const enName = String((doc.names as LangMap | undefined)?.en ?? '').trim();
      const names: LangMap = { ...(doc.names as LangMap | undefined), ...(patch.names ?? {}), en: enName };
      const descriptions: LangMap = {
        ...(doc.descriptions as LangMap | undefined),
        ...(patch.descriptions ?? {}),
      };

      // Ensure every LANG key that was provided is a non-empty string when present
      for (const lang of LANGS) {
        if (lang === 'en') continue;
        if (patch.names?.[lang]) names[lang] = patch.names[lang];
        if (patch.descriptions?.[lang]) descriptions[lang] = patch.descriptions[lang];
      }

      const aliases = Array.isArray(doc.aliases) ? (doc.aliases as string[]) : [];
      const $set: Record<string, unknown> = { names, descriptions };
      if (kind !== 'categories') $set.searchTerms = buildSearchTerms(names, aliases);

      await col.updateOne({ _id: doc._id }, { $set });
      updated++;
      if (updated % 100 === 0) console.log(`  wrote ${updated}`);
    }
  }

  console.log({ updated, missingInChunks: missing });
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
