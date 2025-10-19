const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

const verifyPassword = async (enteredPassword, storedPassword) => {
  const isPasswordValid = await bcrypt.compare(enteredPassword, storedPassword);
  return isPasswordValid;
};

module.exports = { encryptPassword, verifyPassword };
