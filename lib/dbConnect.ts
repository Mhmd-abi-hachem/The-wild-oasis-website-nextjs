import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env");
}

const cached = globalThis as typeof globalThis & {
  mongoose?: mongoose.Connection;
};

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached.mongoose) {
    return cached.mongoose;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);

    cached.mongoose = conn.connection;
    console.log("✅ MongoDB connected...");

    return conn.connection;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw new Error("MongoDB connection failed");
  }
}
