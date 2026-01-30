import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Helpful defaults
mongoose.set('strictQuery', false);

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Wrap connect with explicit error handling so we can show helpful messages
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
      .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        // Add a friendly hint for common issues
        const hint = `Check MONGODB_URI, database user credentials, and Atlas IP Access List (allow your IP or 0.0.0.0/0 for dev).`;
        const wrapped = new Error(`${err.message} — ${hint}`);
        wrapped.stack = err.stack;
        throw wrapped;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
