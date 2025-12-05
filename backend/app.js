const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const sessionConfig = require('./config/sessionConfig');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { handleError } = require('./utils/functionHandlers');
const router = require('./routes/main');
const morgan = require('morgan');
const errorLogger = require('./middleware/logging/errorLogger');
require('./middleware/logging/morganTokens');
const app = express();

// Apply helmet (sets secure HTTP headers)
app.use(helmet());

// Trust first proxy in production (required for Render)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}
// global middleware
// Configure CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://jobrocket-site.onrender.com'
        : ['http://localhost:5173', 'http://localhost:5174'], // Vite's default port
    credentials: true,
  })
);

app.use(
  morgan('Server Log: [:localtime] :method :url :status :response-time ms')
);

app.use(express.json());
app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  next();
});
app.use(express.static('public'));
app.use(errorLogger);
app.use(session(sessionConfig));

app.use(router);

// error handler
app.use((error, _req, res, _next) => {
  handleError(res, error.status || 500, error.message);
});

module.exports = app;
