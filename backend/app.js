const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;
const path = require('path');
const session = require('express-session');
const createSessionConfig = require('./config/sessionConfig');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { handleError } = require('./utils/functionHandlers');
const router = require('./routes/main');
const httpLogger = require('./middleware/logging/httpLogger');
const errorLogger = require('./middleware/logging/errorLogger');
const logger = require('./config/logger');
const app = express();

console.log('📱 app.js: Initializing Express app...');

// Apply helmet (sets secure HTTP headers)
app.use(helmet());

// Trust first proxy in production (required for Render)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}
// global middleware
// Configure CORS
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      credentials: true,
    })
  );
}

// HTTP request logging (Morgan -> Winston)
app.use(httpLogger);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://storage.ko-fi.com https://ko-fi.com; " +
    "frame-src https://ko-fi.com; " +
    "img-src 'self' data: https:; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://storage.ko-fi.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://accounts.google.com; " + // Add this
    "form-action 'self' https://accounts.google.com;"    // Add this
  );
  next();
});

console.log('📱 app.js: Setting up session middleware...');

// Initialize session store (requires MongoDB connection to exist)
app.use(session(createSessionConfig()));

console.log('📱 app.js: Session middleware configured');

const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

console.log('📱 app.js: Passport configured');

app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  next();
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Error logging (must be before routes to capture errors)
app.use(errorLogger);

app.use(router);
// Serve static frontend files (IN PRODUCTION ONLY)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the public folder
  app.use(express.static(path.join(__dirname, 'public')));
  // Catch-all route: serve index.html for any non-API routes
  // This allows React Router to handle client-side routing
  app.get('/*path', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Global error handler
app.use((error, req, res, _next) => {
  // Log the error with full context
  logger.error('Unhandled Application Error', {
    message: error.message,
    stack: error.stack,
    statusCode: error.status || 500,
    url: req.originalUrl || req.url,
    method: req.method,
    userId: req.user ? req.user._id : 'anonymous',
    userType: req.user ? req.user.profileType : 'not-authenticated',
    ip: req.ip || req.connection.remoteAddress,
    category: 'unhandled-error',
  });

  // Send error response
  handleError(res, error.status || 500, error.message);
});

module.exports = app;
