const config = require('config');
const { throwError, nextError } = require('../utils/functionHandlers');
const { verifyAuthToken } = require('../auth/providers/jwt');
const Listing = require('../models/Listings');
const authService = require('../services/authService');
const chalk = require('chalk');

const tokenGenerator = config.get('TOKEN_GENERATOR') || 'jwt';

const lockoutCheck = async (req, _res, next) => {
  const { email } = req.body;

  try {
    const { isLockedOut, lockoutTime } =
      await authService.checkLockoutStatus(email);

    if (isLockedOut) {
      throwError(
        403,
        `Access denied. You have been locked out. Time remaining: ${lockoutTime}s`
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const verifyCredentials = async (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.verifyUserCredentials(email, password);
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

const authenticateUser = (req, _res, next) => {
  if (tokenGenerator === 'jwt') {
    const token = req.header('x-auth-token');
    if (!token) {
      return throwError(401, 'Access denied. No token provided.');
    }

    try {
      const userData = verifyAuthToken(token);
      if (!userData) {
        throwError(401, 'Access denied. Invalid token.');
      }

      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  }
};

const optionalAuthenticateUser = (req, _res, next) => {
  if (tokenGenerator === 'jwt') {
    const token = req.header('x-auth-token');
    if (!token) {
      req.user = { _id: null };  // Create the object first
      console.log(chalk.yellow('No token provided.'));
      return next();
    }

    try {
      const userData = verifyAuthToken(token);
      if (!userData) {
        throwError(401, 'Access denied. Invalid token.');
      }

      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  }
};

const adminAuth = (req, _res, next) => {
  if (!req.user.isAdmin) {
    return nextError(next, 403, 'Access denied. Admin access only.');
  }

  next();
};

const businessAuth = (req, _res, next) => {
  if (req.user.profileType !== 'business') {
    return nextError(next, 403, 'Access denied. Business access only.');
  }
  next();
};

const userAdminAuth = async (req, _res, next) => {
  const requestedUserId = req.params.id;
  if (req.user._id === requestedUserId || req.user.isAdmin) {
    next();
  } else {
    nextError(next, 403, 'Access denied. Unauthorized user.');
  }
};

const listingCreatorAuth = async (req, _res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId, 'businessId');

    if (!listing) {
      throwError(404, 'Listing not found');
    }

    if (listing.businessId.toString() !== req.user._id) {
      throwError(403, 'Access denied. Unauthorized user.');
    }

    next();
  } catch (error) {
    next(error);
  }
};

const listingCreatorAdminAuth = async (req, _res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      throwError(404, 'Listing not found');
    }

    const listingBusinessId = listing.businessId.toString();
    if (listingBusinessId !== req.user._id && !req.user.isAdmin) {
      throwError(403, 'Access denied. Unauthorized user.');
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyCredentials,
  authenticateUser,
  optionalAuthenticateUser,
  adminAuth,
  businessAuth,
  userAdminAuth,
  listingCreatorAuth,
  listingCreatorAdminAuth,
  lockoutCheck,
};
