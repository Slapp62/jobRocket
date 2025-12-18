const morgan = require('morgan');
const logger = require('../../config/logger');

// Create a stream object that Winston will write to
const stream = {
  write: (message) => {
    // Use the http log level in Winston
    logger.http(message.trim());
  },
};

// Define custom Morgan tokens for additional context
morgan.token('user-id', (req) => {
  return req.user ? req.user._id : 'anonymous';
});

morgan.token('session-id', (req) => {
  return req.sessionID || 'no-session';
});

morgan.token('user-type', (req) => {
  return req.user ? req.user.profileType : 'not-authenticated';
});

// Different Morgan formats for different environments
const devFormat =
  ':method :url :status :response-time ms - :res[content-length] - user: :user-type';

const prodFormat =
  ':remote-addr - :user-id [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Determine format based on environment
const morganFormat =
  process.env.NODE_ENV === 'production' ? prodFormat : devFormat;

// Configure Morgan middleware
const httpLogger = morgan(morganFormat, {
  stream,
  // Skip logging for successful health checks to reduce noise
  skip: (req, res) => {
    return (
      req.url === '/health' ||
      (req.url === '/api/health' && res.statusCode < 400)
    );
  },
});

module.exports = httpLogger;
