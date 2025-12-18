const rateLimit = require('express-rate-limit');
const { logSecurity } = require('../utils/logHelpers');

// Login limiter - strict because failed logins are suspicious
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 5, // 5 attempts per window
  message: 'Too many login attempts. Please try again in 15 minutes.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    // Log rate limit violation
    logSecurity('rate-limit-exceeded', {
      ip: req.ip,
      endpoint: 'login',
      userAgent: req.get('user-agent'),
      email: req.body?.email,
    });
    res.status(429).json({
      message: 'Too many login attempts. Please try again in 15 minutes.',
    });
  },
});

// listings limiter
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 5, // 5 attempts per window
  message: 'Too many registration attempts. Please try again in 1 hour.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    logSecurity('rate-limit-exceeded', {
      ip: req.ip,
      endpoint: 'registration',
      userAgent: req.get('user-agent'),
      email: req.body?.email,
    });
    res.status(429).json({
      message: 'Too many registration attempts. Please try again in 1 hour.',
    });
  },
});

// listings limiter
const listingsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24, // 24 hours in milliseconds
  max: 10, // 10 attempts per window
  message: 'Too many listings attempts. Please try again in 24 hours.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    logSecurity('rate-limit-exceeded', {
      ip: req.ip,
      endpoint: 'listings',
      userAgent: req.get('user-agent'),
      userId: req.user?._id,
    });
    res.status(429).json({
      message: 'Too many listings attempts. Please try again in 24 hours.',
    });
  },
});

// applications limiter
const applicationsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 1, // 1 hour in milliseconds
  max: 50, // 50 attempts per window
  message: 'Too many applications attempts. Please try again in 1 hour.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    logSecurity('rate-limit-exceeded', {
      ip: req.ip,
      endpoint: 'applications',
      userAgent: req.get('user-agent'),
      userId: req.user?._id,
    });
    res.status(429).json({
      message: 'Too many applications attempts. Please try again in 1 hour.',
    });
  },
});

module.exports = {
  loginLimiter,
  registrationLimiter,
  listingsLimiter,
  applicationsLimiter,
};
