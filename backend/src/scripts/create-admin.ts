/**
 * Create an admin user.
 *
 * Usage:
 *   npx tsx --env-file=.env --env-file=.env.dev \
 *     src/scripts/create-admin.ts "Name" "email@domain" "Password"
 *   npx tsx --env-file=.env --env-file=.env.prod \
 *     src/scripts/create-admin.ts "Name" "email@domain" "Password"
 */
import bcrypt from 'bcryptjs';
import { connectToMongoDB, disconnectFromMongoDB } from '../config/db';
import { Admin } from '../models';

async function main() {
  const [, , name, email, password] = process.argv;
  if (!name?.trim() || !email?.trim() || !password) {
    console.error(
      'Usage: npx tsx --env-file=.env --env-file=.env.dev src/scripts/create-admin.ts "Name" "email" "Password"',
    );
    process.exit(1);
  }

  await connectToMongoDB();
  const normalized = email.trim().toLowerCase();
  const existing = await Admin.findOne({ email: normalized });
  if (existing) {
    console.error(`Admin already exists: ${normalized}`);
    await disconnectFromMongoDB();
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({
    name: name.trim(),
    email: normalized,
    passwordHash,
  });
  console.log(`Created admin ${normalized}`);
  await disconnectFromMongoDB();
}

main().catch(async (err) => {
  console.error(err);
  try {
    await disconnectFromMongoDB();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
