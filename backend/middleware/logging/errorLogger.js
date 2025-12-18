const logger = require('../../config/logger');

const errorLogger = (req, res, next) => {
  // Capture the original end function
  const originalEnd = res.end;

  // Store the start time for calculating response time
  const startTime = Date.now();

  // Override the end function to log after response is sent
  res.end = function (chunk, encoding) {
    // Restore original end function and call it
    res.end = originalEnd;
    res.end(chunk, encoding);

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Only log errors and warnings (4xx and 5xx status codes)
    if (res.statusCode >= 400) {
      const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl || req.url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        responseTime: `${responseTime}ms`,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent') || 'unknown',
        userId: req.user ? req.user._id : 'anonymous',
        userType: req.user ? req.user.profileType : 'not-authenticated',
        sessionId: req.sessionID || 'no-session',
        errorMessage: res.errorMessage || '', // Can be set in error handler
        requestBody:
          req.method !== 'GET' ? sanitizeRequestBody(req.body) : undefined,
      };

      // Log at appropriate level based on status code
      if (res.statusCode >= 500) {
        logger.error('Server Error', logData);
      } else if (res.statusCode >= 400) {
        logger.warn('Client Error', logData);
      }
    }
  };

  next();
};

// Helper function to sanitize sensitive data from request body
function sanitizeRequestBody(body) {
  if (!body || typeof body !== 'object') return body;

  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'apiKey',
    'authorization',
  ];
  const sanitized = { ...body };

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
}

module.exports = errorLogger;
