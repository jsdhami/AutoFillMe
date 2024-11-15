import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jsdhami:qtBaXtjZQrWvRTst@cluster0.qxa8tph.mongodb.net/aakash_db?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

/** Cache the connection in development to avoid multiple instances */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as typeof globalThis & { mongoose: MongooseCache }).mongoose || { conn: null, promise: null };

if (!cached) {
    cached = (global as typeof globalThis & { mongoose: MongooseCache }).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
