const jwt = require('jsonwebtoken');
const { throwError } = require('../../utils/functionHandlers');

// Validate JWT_SECRET on module load
if (!process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is not set');
}

if (process.env.JWT_SECRET.length < 32) {
  console.warn('WARNING: JWT_SECRET should be at least 32 characters for security');
}

const generateAuthToken = (user) => {
  try {
    const { _id, isAdmin, profileType } = user;
    const token = jwt.sign(
      {
        _id,
        isAdmin,
        profileType,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return token;
  } catch (error) {
    throwError(401, error.message);
  }
};

const verifyAuthToken = (token) => {
  try {
    // Removed dangerous fallback - JWT_SECRET is now validated on load
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return userData;
  } catch (error) {
    throwError(401, error.message);
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
