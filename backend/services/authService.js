const Users = require("../models/Users");
const { verifyPassword } = require("../utils/bcrypt");
const { throwError } = require("../utils/functionHandlers");

/**
 * Check if a user is locked out due to failed login attempts
 * @param {string} email - User's email
 * @returns {Object} { isLockedOut: boolean, lockoutTime: number, user: Object }
 */
async function checkLockoutStatus(email) {
  const user = await Users.findOne({ email });

  if (!user) {
    return { isLockedOut: false, lockoutTime: 0, user: null };
  }

  const isPrevTimeout = user.loginTimeout > 0;
  const isLockedOut = Date.now() - user.loginTimeout < 60 * 1000;
  const lockoutTime = 60 - (Date.now() - user.loginTimeout) / 1000;

  // Reset attempts if lockout period is over
  if (!isLockedOut && user.loginAttempts === 3) {
    user.loginAttempts = 0;
    user.loginTimeout = 0;
    await user.save();
  }

  return {
    isLockedOut: isPrevTimeout && isLockedOut,
    lockoutTime,
    user
  };
}

/**
 * Verify user credentials and handle login attempts
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} Authenticated user object
 */
async function verifyUserCredentials(email, password) {
  const user = await Users.findOne({ email });

  if (!user) {
    throwError(401, "Invalid email or password.");
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  const loginAttempts = user.loginAttempts;

  if (!isPasswordValid) {
    user.loginAttempts = loginAttempts + 1;

    if (user.loginAttempts === 3) {
      user.loginTimeout = Date.now();
    }

    await user.save();
    throwError(401, "Invalid email or password.");
  }

  // Reset login attempts on successful login
  user.loginAttempts = 0;
  user.loginTimeout = 0;
  await user.save();

  return user;
}

module.exports = {
  checkLockoutStatus,
  verifyUserCredentials,
};
