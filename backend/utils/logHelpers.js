const logger = require('../config/logger');

/**
 * Log helpers provide structured logging for common scenarios
 * Use these throughout your application for consistent, searchable logs
 */

/**
 * Log database operations
 * @param {string} operation - The database operation (create, update, delete, find)
 * @param {string} collection - The collection/model name
 * @param {object} metadata - Additional context (userId, documentId, etc.)
 */
const logDatabase = (operation, collection, metadata = {}) => {
  logger.info(`Database ${operation}`, {
    operation,
    collection,
    ...metadata,
    category: 'database',
  });
};

/**
 * Log authentication events
 * @param {string} event - The auth event (login, logout, register, failed-login)
 * @param {string} userId - User ID if available
 * @param {object} metadata - Additional context
 */
const logAuth = (event, userId = null, metadata = {}) => {
  logger.info(`Auth: ${event}`, {
    event,
    userId,
    ...metadata,
    category: 'authentication',
  });
};

/**
 * Log business logic events
 * @param {string} action - The business action performed
 * @param {object} metadata - Relevant business context
 */
const logBusiness = (action, metadata = {}) => {
  logger.info(`Business: ${action}`, {
    action,
    ...metadata,
    category: 'business',
  });
};

/**
 * Log API/external service calls
 * @param {string} service - The external service name (OpenAI, Cloudinary, etc.)
 * @param {string} operation - What operation was performed
 * @param {object} metadata - Request/response info (without sensitive data)
 */
const logExternalAPI = (service, operation, metadata = {}) => {
  logger.info(`External API: ${service}`, {
    service,
    operation,
    ...metadata,
    category: 'external-api',
  });
};

/**
 * Log security events (rate limiting, suspicious activity, etc.)
 * @param {string} event - The security event
 * @param {object} metadata - Context about the event
 */
const logSecurity = (event, metadata = {}) => {
  logger.warn(`Security: ${event}`, {
    event,
    ...metadata,
    category: 'security',
  });
};

/**
 * Log application errors with full context
 * @param {Error} error - The error object
 * @param {object} context - Additional context (userId, route, etc.)
 */
const logError = (error, context = {}) => {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
    category: 'error',
  });
};

/**
 * Log performance metrics
 * @param {string} operation - The operation being measured
 * @param {number} duration - Duration in milliseconds
 * @param {object} metadata - Additional context
 */
const logPerformance = (operation, duration, metadata = {}) => {
  const level = duration > 1000 ? 'warn' : 'debug';
  logger[level](`Performance: ${operation}`, {
    operation,
    duration: `${duration}ms`,
    ...metadata,
    category: 'performance',
  });
};

/**
 * Log AI/ML operations (embeddings, recommendations, etc.)
 * @param {string} operation - The AI operation
 * @param {object} metadata - Relevant ML context (model, tokens, etc.)
 */
const logAI = (operation, metadata = {}) => {
  logger.info(`AI: ${operation}`, {
    operation,
    ...metadata,
    category: 'ai',
  });
};

/**
 * Helper to create a performance timer
 * @param {string} operation - Name of the operation to time
 * @returns {function} - Call this function to log the elapsed time
 */
const createTimer = (operation) => {
  const startTime = Date.now();
  return (metadata = {}) => {
    const duration = Date.now() - startTime;
    logPerformance(operation, duration, metadata);
  };
};

module.exports = {
  logDatabase,
  logAuth,
  logBusiness,
  logExternalAPI,
  logSecurity,
  logError,
  logPerformance,
  logAI,
  createTimer,
};
