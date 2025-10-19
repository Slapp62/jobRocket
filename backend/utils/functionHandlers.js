const chalk = require("chalk");

const handleSuccess = (res, status, data = {}, message = "") => {
  console.log(chalk.blueBright.bold(message, status));
  return res.status(status).json(data);
};

const throwError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

const nextError = (next, status, message) => {
  const error = new Error(message);
  error.status = status;
  return next(error);
};

const handleError = (res, status = 500, message = "") => {
  // Convert any object to string safely
  const errorMessage = typeof message === 'string' ? message : message?.message || 'An error occurred';
  
  console.log(chalk.redBright.bold(errorMessage, status));
  return res.status(status).json({ message: errorMessage });
};

module.exports = { handleSuccess, throwError, nextError, handleError };
