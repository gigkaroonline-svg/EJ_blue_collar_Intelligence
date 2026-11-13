/**
 * Dump categories / skills / jobs from a Mongo DB to .cache/backup/.
 *
 * Usage:
 *   npx tsx --env-file=.env --env-file=.env.dev src/scripts/backup-catalog.ts tradespeople_registryQA
 *   npm run backup:catalog -- tradespeople_registryQA
 */
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

const COLLECTIONS = ['categories', 'skills', 'jobs'] as const;

async function backupDb(uri: string, dbName: string) {
  await mongoose.connect(uri, { dbName });
  const db = mongoose.connection.db!;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.resolve(__dirname, '../../.cache/backup');
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\nBacking up ${dbName}`);
  for (const collection of COLLECTIONS) {
    const docs = await db.collection(collection).find({}).toArray();
    const file = path.join(outDir, `${dbName}-${collection}-${stamp}.json`);
    fs.writeFileSync(file, JSON.stringify(docs, null, 2));
    console.log(`  ${collection}: ${docs.length} docs → ${file}`);
  }
  await mongoose.disconnect();
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Need MONGODB_URI');

  const dbNames = args.length > 0 ? args : [process.env.MONGODB_DB_NAME].filter(Boolean);
  if (dbNames.length === 0) throw new Error('Need db name argument(s) or MONGODB_DB_NAME');

  for (const dbName of dbNames) {
    await backupDb(uri, dbName!);
  }
  console.log('\nBackup done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
