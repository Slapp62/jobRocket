const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

// Define custom log levels with colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(logColors);

// Determine the current environment
const env = process.env.NODE_ENV || 'development';

// Define log format for different environments
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create logs directory path
const logsDir = path.join(__dirname, '..', 'logs');

// Define transports based on environment
const transports = [];

// Console transport for development
if (env === 'development' || env === 'test') {
  transports.push(
    new winston.transports.Console({
      format: devFormat,
      level: env === 'test' ? 'error' : 'debug', // Only errors in test mode
    })
  );
}

// File transports for production and development
if (env !== 'test') {
  // All logs (rotating daily)
  transports.push(
    new DailyRotateFile({
      filename: path.join(logsDir, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d', // Keep logs for 14 days
      format: prodFormat,
      level: 'debug',
    })
  );

  // Error logs (separate file, rotating daily)
  transports.push(
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d', // Keep error logs for 30 days
      format: prodFormat,
      level: 'error',
    })
  );

  // HTTP request logs (separate file, rotating daily)
  transports.push(
    new DailyRotateFile({
      filename: path.join(logsDir, 'http-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '7d', // Keep HTTP logs for 7 days
      format: prodFormat,
      level: 'http',
    })
  );
}

// Create the Winston logger
const logger = winston.createLogger({
  levels: logLevels,
  transports,
  exitOnError: false, // Don't exit on handled exceptions
});

// Handle uncaught exceptions and unhandled rejections
if (env === 'production') {
  logger.exceptions.handle(
    new DailyRotateFile({
      filename: path.join(logsDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      format: prodFormat,
    })
  );

  logger.rejections.handle(
    new DailyRotateFile({
      filename: path.join(logsDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      format: prodFormat,
    })
  );
}

module.exports = logger;
