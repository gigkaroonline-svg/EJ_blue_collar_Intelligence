import mongoose from 'mongoose';
import { env } from './env';

export async function connectToMongoDB(): Promise<typeof mongoose> {
  try {
    const conn = await mongoose.connect(env.mongoUri, { dbName: env.mongoDbName });
    console.log('Connected to MongoDB');
    return conn;
  } catch (err) {
    console.error('MongoDB connection failed', err);
    throw err; // let the caller decide (server.ts exits)
  }
}

// Call only when the application terminates
export async function disconnectFromMongoDB(): Promise<void> {
  await mongoose.disconnect();
}
