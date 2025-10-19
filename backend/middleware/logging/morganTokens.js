const morgan = require("morgan");

morgan.token("localtime", (_req, _res) => {
  const time = new Date().toLocaleString();
  return time;
});

module.exports = {};
