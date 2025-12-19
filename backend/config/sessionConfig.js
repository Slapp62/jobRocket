const {MongoStore} = require('connect-mongo');
const mongoose = require('mongoose');

// Factory function to create session config (reuses existing Mongoose connection)
const createSessionConfig = () => {
  console.log('Creating MongoStore session config...');

  return {
    secret: process.env.SESSION_SECRET || 'your-fallback-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(), // Reuse existing Mongoose connection
      collectionName: 'sessions',
      ttl: 24 * 60 * 60, // 24 hours in seconds
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
    name: 'sessionId', // Cookie name (defaults to 'connect.sid')
  };
};

module.exports = createSessionConfig;


// **Breaking down each option:**

// **`secret`**: A string used to sign the session ID cookie. Think of it like a wax seal on an envelope - it proves the cookie hasn't been tampered with. In production, use a strong random string stored in environment variables.

// **`resave: false`**: Don't save the session on every request if nothing changed. Reduces database writes.

// **`saveUninitialized: false`**: Don't create a session until something is stored in it. Reduces empty sessions cluttering your database.

// **`store`**: Where to save session data.
//   - `mongoUrl`: Your MongoDB connection string
//   - `collectionName`: MongoDB collection name (you'll see a "sessions" collection appear)
//   - `ttl`: Time-to-live - MongoDB will auto-delete sessions older than 24 hours

// **`cookie`** options:
//   - `maxAge`: How long before browser deletes the cookie (24 hours)
//   - `httpOnly: true`: **Critical** - JavaScript cannot access this cookie, preventing XSS attacks
//   - `secure: true`: Only send cookie over HTTPS (important for production)
//   - `sameSite: 'lax'`: Protects against CSRF attacks while allowing normal navigation

// **`name`**: What the cookie is called. Default is `connect.sid` but you can customize it.