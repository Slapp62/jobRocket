const fs = require("fs");
const path = require("path");

const errorLogger = (_req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      const logFolder = path.join(__dirname, "../..", "logs");
      fs.mkdirSync(logFolder, { recursive: true });

      const date = new Date().toISOString();
      const fileName = `${date.split("T")[0]}.log`;
      const fullPath = path.join(logFolder, fileName);

      const data = `${date} ${res.statusCode} ${res.statusMessage}\n`;

      fs.appendFileSync(fullPath, data);
    }
  });

  next();
};

module.exports = errorLogger;
