# Logging System Documentation

## Overview

JobRocket uses a professional logging system combining **Winston** and **Morgan** to provide comprehensive, structured logging that meets industry standards.

## Architecture

### Two Complementary Tools

1. **Morgan** - HTTP request logging
   - Captures all incoming HTTP requests
   - Logs method, URL, status code, response time, user info
   - Streams output to Winston for centralized storage

2. **Winston** - Application logging
   - General-purpose logger for application events
   - Multiple log levels (error, warn, info, http, debug)
   - Rotating log files with automatic cleanup
   - Structured JSON format for easy parsing

## Log Files

All logs are stored in `backend/logs/` directory:

- `application-YYYY-MM-DD.log` - All application logs (kept for 14 days)
- `error-YYYY-MM-DD.log` - Error logs only (kept for 30 days)
- `http-YYYY-MM-DD.log` - HTTP request logs (kept for 7 days)
- `exceptions-YYYY-MM-DD.log` - Uncaught exceptions (production only)
- `rejections-YYYY-MM-DD.log` - Unhandled promise rejections (production only)

### Log Rotation

- Files rotate daily at midnight
- Maximum file size: 20MB (creates new file if exceeded)
- Old logs automatically deleted based on retention period
- Log files are compressed after rotation

## How to Use

### 1. Direct Winston Logger

For basic logging anywhere in your application:

```javascript
const logger = require('./config/logger');

// Error logging
logger.error('Something went wrong', { userId: user._id, operation: 'create' });

// Warning
logger.warn('Rate limit approaching', { ip: req.ip, count: 45 });

// Info
logger.info('User registered successfully', { userId: user._id });

// Debug (only in development)
logger.debug('Cache hit', { key: 'user_123', ttl: 3600 });
```

### 2. Structured Logging Helpers (Recommended)

Use the helper functions in `utils/logHelpers.js` for consistent, searchable logs:

#### Database Operations

```javascript
const { logDatabase } = require('./utils/logHelpers');

// Log database operations
logDatabase('create', 'Users', {
  userId: newUser._id,
  email: newUser.email
});

logDatabase('update', 'Listings', {
  listingId: listing._id,
  changes: ['title', 'salary']
});

logDatabase('delete', 'Applications', {
  applicationId: app._id,
  userId: req.user._id
});
```

#### Authentication Events

```javascript
const { logAuth } = require('./utils/logHelpers');

// Login success
logAuth('login', user._id, {
  profileType: user.profileType,
  ip: req.ip
});

// Login failure
logAuth('failed-login', null, {
  email: req.body.email,
  ip: req.ip,
  reason: 'invalid_password'
});

// Registration
logAuth('register', newUser._id, {
  profileType: newUser.profileType
});

// Logout
logAuth('logout', req.user._id);
```

#### Business Logic Events

```javascript
const { logBusiness } = require('./utils/logHelpers');

// Job application submitted
logBusiness('application-submitted', {
  applicantId: applicant._id,
  listingId: listing._id,
  businessId: listing.user_id
});

// Listing published
logBusiness('listing-published', {
  listingId: listing._id,
  businessId: req.user._id,
  jobTitle: listing.jobTitle
});

// Match score calculated
logBusiness('match-calculated', {
  jobseekerId: jobseeker._id,
  listingId: listing._id,
  score: matchScore
});
```

#### External API Calls

```javascript
const { logExternalAPI } = require('./utils/logHelpers');

// OpenAI API call
logExternalAPI('OpenAI', 'generate-embedding', {
  model: 'text-embedding-3-small',
  inputLength: text.length,
  tokensUsed: 150
});

// Cloudinary upload
logExternalAPI('Cloudinary', 'upload-image', {
  userId: req.user._id,
  fileSize: file.size,
  success: true
});
```

#### Security Events

```javascript
const { logSecurity } = require('./utils/logHelpers');

// Rate limit hit
logSecurity('rate-limit-exceeded', {
  ip: req.ip,
  endpoint: req.path,
  userId: req.user?._id
});

// Suspicious activity
logSecurity('invalid-token', {
  ip: req.ip,
  token: token.substring(0, 10) + '...'
});

// Account locked
logSecurity('account-locked', {
  userId: user._id,
  reason: 'too_many_failed_logins',
  failedAttempts: 5
});
```

#### Error Logging

```javascript
const { logError } = require('./utils/logHelpers');

try {
  // Your code
} catch (error) {
  logError(error, {
    userId: req.user?._id,
    route: req.path,
    operation: 'create-listing'
  });
  throw error; // Re-throw if needed
}
```

#### Performance Monitoring

```javascript
const { logPerformance, createTimer } = require('./utils/logHelpers');

// Manual timing
const start = Date.now();
// ... operation ...
const duration = Date.now() - start;
logPerformance('database-query', duration, {
  query: 'findUserById',
  userId: userId
});

// Using timer helper
const endTimer = createTimer('embedding-generation');
// ... expensive operation ...
endTimer({ userId: user._id, textLength: 500 });
```

#### AI/ML Operations

```javascript
const { logAI } = require('./utils/logHelpers');

// Embedding generation
logAI('generate-embedding', {
  entityType: 'jobseeker',
  entityId: user._id,
  vectorDimensions: 1536
});

// Match calculation
logAI('calculate-match', {
  jobseekerId: jobseeker._id,
  listingId: listing._id,
  matchScore: 0.87,
  algorithm: 'cosine-similarity'
});

// Recommendation generated
logAI('generate-recommendations', {
  userId: user._id,
  recommendationCount: 10,
  minScore: 0.6
});
```

## Log Levels

Logs are categorized by severity:

1. **error** (0) - Application errors, exceptions
2. **warn** (1) - Warning conditions, potential issues
3. **info** (2) - General informational messages
4. **http** (3) - HTTP requests (from Morgan)
5. **debug** (4) - Detailed debugging information

### When to Use Each Level

- **error**: Database connection failures, unhandled exceptions, critical errors
- **warn**: Validation failures, rate limits, deprecated API usage, 4xx HTTP errors
- **info**: Successful operations, business events, user actions
- **http**: All HTTP requests (automatic via Morgan)
- **debug**: Cache operations, detailed flow information (development only)

## Environment-Specific Behavior

### Development

- Logs to console with colors
- Shows all log levels (including debug)
- Human-readable format with timestamps
- File logging to all three files

### Production

- Logs only to files (not console)
- Structured JSON format
- Captures uncaught exceptions and promise rejections
- No debug-level logs

### Test

- Minimal console output (errors only)
- No file logging
- Prevents log spam during test runs

## Log Format

### Development Console Output

```
[2025-12-18 01:42:26] info: User registered successfully
[2025-12-18 01:42:27] http: GET /api/users/123 200 45ms
[2025-12-18 01:42:28] error: Database connection failed
```

### Production JSON Format

```json
{
  "level": "info",
  "message": "User registered successfully",
  "timestamp": "2025-12-18 01:42:26",
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "category": "authentication"
}
```

## Searching and Analyzing Logs

### Using grep/jq (Command Line)

```bash
# Find all errors for a specific user
grep "507f1f77bcf86cd799439011" backend/logs/error-*.log

# Find all database operations
grep '"category":"database"' backend/logs/application-*.log

# Count HTTP requests by status code
grep -o '"statusCode":[0-9]*' backend/logs/http-*.log | sort | uniq -c

# Parse JSON logs with jq
cat backend/logs/application-2025-12-18.log | jq 'select(.category == "ai")'
```

### Common Search Patterns

```bash
# All 500 errors today
grep '"statusCode":5' backend/logs/error-$(date +%Y-%m-%d).log

# All AI operations for a user
grep '"userId":"USER_ID"' backend/logs/application-*.log | grep '"category":"ai"'

# Authentication failures
grep 'failed-login' backend/logs/application-*.log

# Slow requests (over 1000ms)
grep 'Performance' backend/logs/application-*.log | grep 'warn'
```

## Best Practices

### DO:
- Use structured logging helpers for consistency
- Include relevant context (userId, operation, etc.)
- Log at appropriate levels
- Sanitize sensitive data (passwords, tokens)
- Use timers for performance-critical operations
- Log external API calls with outcomes

### DON'T:
- Log sensitive user data (passwords, API keys, SSNs)
- Use console.log() (use logger instead)
- Log in tight loops (creates noise and performance issues)
- Include full request/response bodies (too verbose)
- Log at debug level in production

## Example: Complete Controller with Logging

```javascript
const { logDatabase, logError, createTimer } = require('../utils/logHelpers');

const createListing = async (req, res) => {
  const endTimer = createTimer('create-listing');

  try {
    // Business logic
    const listing = await Listing.create({
      ...req.body,
      user_id: req.user._id
    });

    // Log successful operation
    logDatabase('create', 'Listings', {
      listingId: listing._id,
      userId: req.user._id,
      jobTitle: listing.jobTitle
    });

    // Log timing
    endTimer({ success: true, listingId: listing._id });

    res.status(201).json(listing);
  } catch (error) {
    // Log error with context
    logError(error, {
      userId: req.user._id,
      operation: 'create-listing',
      jobTitle: req.body.jobTitle
    });

    // Log timing even on failure
    endTimer({ success: false });

    res.status(500).json({ message: error.message });
  }
};
```

## Monitoring and Alerts

For production systems, consider integrating with:

- **Log aggregation**: Loggly, Papertrail, DataDog
- **Error tracking**: Sentry, Rollbar
- **APM tools**: New Relic, AppDynamics

Winston supports many transports for these services.

## Troubleshooting

### Logs not appearing?

1. Check `NODE_ENV` environment variable
2. Ensure `logs/` directory is writable
3. Check file permissions
4. Verify Winston configuration in `config/logger.js`

### Too many logs?

1. Increase `maxFiles` retention in `config/logger.js`
2. Reduce logging verbosity in production
3. Use appropriate log levels
4. Implement log sampling for high-frequency events

### Performance impact?

Winston uses asynchronous file writes, so performance impact is minimal. If concerned:

1. Use `debug` level sparingly
2. Avoid logging in tight loops
3. Use log sampling for very high-frequency events
4. Monitor disk I/O
