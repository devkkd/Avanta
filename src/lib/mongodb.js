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
        // Log the host portion of the connection string (safe for debugging; avoid logging credentials in production)
        try {
          const host = new URL(MONGODB_URI).host;
          if (host) console.error('MongoDB host:', host);
        } catch (e) {
          // ignore URL parse errors
        }

        // Add a friendly hint for common issues. Provide extra guidance if SRV DNS lookup failed.
        let hint = `Check MONGODB_URI, database user credentials, and Atlas IP Access List (allow your IP or 0.0.0.0/0 for dev).`;
        if (err.code === 'ENOTFOUND' && err.syscall === 'querySrv') {
          hint = `SRV DNS lookup failed for your Atlas host. Try these steps:\n` +
                 `1) Ensure your MONGODB_URI uses the correct host (e.g., 'cluster0.yourcluster.mongodb.net').\n` +
                 `2) Test SRV resolution using: nslookup -type=SRV _mongodb._tcp.<your-host> (or add a DNS like 8.8.8.8).\n` +
                 `3) If SRV doesn't resolve, use the standard (non-SRV) MongoDB connection string from Atlas (mongodb://host:port or list of hosts).\n` +
                 `4) Confirm Atlas IP Access List allows your IP and outbound access to MongoDB ports.`;
        }

        const wrapped = new Error(`${err.message} — ${hint}`);
        wrapped.stack = err.stack;
        throw wrapped;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
