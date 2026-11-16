function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name];
  if (!value || !value.trim()) return undefined;
  return value;
}

/** Service-account private keys in env often use literal \n sequences. */
function normalizePrivateKey(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.replace(/\\n/g, '\n');
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required('MONGODB_URI'),
  mongoDbName: required('MONGODB_DB_NAME'),
  jwtSecret: required('JWT_SECRET'),
  otpSecret: required('OTP_SECRET'),
  identityHashSecret: required('IDENTITY_HASH_SECRET'),
  gcsBucket: optional('GCS_BUCKET'),
  gcsProjectId: optional('GCS_PROJECT_ID'),
  gcsClientEmail: optional('GCS_CLIENT_EMAIL'),
  gcsPrivateKey: normalizePrivateKey(optional('GCS_PRIVATE_KEY')),
  /** Object-key folder in the shared bucket: qa | prod */
  gcsPathPrefix: optional('GCS_PATH_PREFIX') ?? 'qa',
};
