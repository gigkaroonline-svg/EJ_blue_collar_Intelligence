import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

async function main() {
  const uri = process.env.MONGODB_URI!;
  const dbName = process.argv[2] || 'tradespeople_registry';
  await mongoose.connect(uri, { dbName });
  const db = mongoose.connection.db!;
  const out: Record<string, { kind: string; externalId?: string; en: string }[]> = {
    categories: [],
    skills: [],
    jobs: [],
  };

  for (const kind of ['categories', 'skills', 'jobs'] as const) {
    const docs = await db.collection(kind).find({}).project({ names: 1, externalId: 1 }).toArray();
    out[kind] = docs.map((d) => ({
      kind,
      externalId: d.externalId as string | undefined,
      id: String(d._id),
      en: String(d.names?.en ?? ''),
    })) as any;
  }

  const dest = path.resolve(__dirname, '../../.cache/catalog-en.json');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log(
    'wrote',
    dest,
    Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length]))
  );
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
