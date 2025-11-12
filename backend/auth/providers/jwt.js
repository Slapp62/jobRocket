const jwt = require('jsonwebtoken');
const { throwError } = require('../../utils/functionHandlers');

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
      { expiresIn: '1h' }
    );

    return token;
  } catch (error) {
    throwError(401, error.message);
  }
};

const verifyAuthToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET || '');
    return userData;
  } catch (error) {
    throwError(401, error.message);
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
