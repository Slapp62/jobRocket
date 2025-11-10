const rateLimit = require('express-rate-limit');

// Login limiter - strict because failed logins are suspicious
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 5, // 5 attempts per window
  message: 'Too many login attempts. Please try again in 15 minutes.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

// listings limiter
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 5, // 5 attempts per window
  message: 'Too many registration attempts. Please try again in 1 hour.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

// listings limiter 
const listingsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24, // 24 hours in milliseconds
  max: 10, // 10 attempts per window
  message: 'Too many listings attempts. Please try again in 24 hours.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  registrationLimiter,
  listingsLimiter,
};
