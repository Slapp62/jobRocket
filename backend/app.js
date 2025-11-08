const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { handleError } = require("./utils/functionHandlers");
const router = require("./controllers/main");
const morgan = require("morgan");
const errorLogger = require("./middleware/logging/errorLogger");
require("./middleware/logging/morganTokens");
const app = express();

// global middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://mernstackproject-client.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(
  morgan("Server Log: [:localtime] :method :url :status :response-time ms"),
);

app.use(express.json());

app.use(express.static("public"));
app.use(errorLogger);

app.use(router);

// error handler
app.use((error, _req, res, _next) => {
  handleError(res, error.status || 500, error.message);
});

module.exports = app;
