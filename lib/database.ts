import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGO_DB_URI in .env file!");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
