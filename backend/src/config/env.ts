import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required('MONGODB_URI'),
  mongoDbName: process.env.MONGODB_DB_NAME ?? 'tradespeople_registry',
  jwtSecret: required('JWT_SECRET'),
  otpSecret: required('OTP_SECRET'),
  identityHashSecret: required('IDENTITY_HASH_SECRET'),
};
