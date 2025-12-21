const { throwError, nextError } = require('../utils/functionHandlers');
const Listing = require('../models/Listings');
const authService = require('../services/authService');
const { logAuth, logSecurity } = require('../utils/logHelpers');

const lockoutCheck = async (req, _res, next) => {
  const { email } = req.body;

  try {
    const { isLockedOut, lockoutTime } =
      await authService.checkLockoutStatus(email);

    if (isLockedOut) {
      // Log lockout attempt
      logSecurity('account-locked-attempt', {
        email,
        ip: req.ip,
        lockoutTimeRemaining: lockoutTime,
      });

      throwError(
        403,
        `Access denied. You have been locked out. Time remaining: ${lockoutTime}s`,
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

const authenticateUser = (req, res, next) => {
  // Check if user has a session
  if (!req.session.userId) {
    // Log unauthorized access attempt
    logSecurity('unauthorized-access', {
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
      userAgent: req.get('user-agent'),
    });
    return nextError(next, 401, 'Access denied. Please log in.');
  }

  // Check inactivity timeout (1 hour)
  const ONE_HOUR = 60 * 60 * 1000;
  const timeSinceActivity = Date.now() - (req.session.lastActivity || 0);

  if (timeSinceActivity > ONE_HOUR) {
    const userId = req.session.userId;
    // Log session expiry
    logAuth('session-expired', userId, {
      inactivityDuration: timeSinceActivity,
      ip: req.ip,
    });

    return req.session.destroy((err) => {
      return nextError(next, 410, 'Session expired due to inactivity.');
    });
  }

  // Update last activity time (sliding window)
  req.session.lastActivity = Date.now();

  // Attach user data to request (so your existing routes don't break)
  req.user = {
    _id: req.session.userId,
    isAdmin: req.session.isAdmin,
    profileType: req.session.profileType,
  };

  next();
};

const optionalAuthenticateUser = (req, res, next) => {
  // If no session, set null user and continue
  if (!req.session.userId) {
    req.user = { _id: null };
    return next();
  }

  // Check inactivity timeout
  const ONE_HOUR = 60 * 60 * 1000;
  const timeSinceActivity = Date.now() - (req.session.lastActivity || 0);

  if (timeSinceActivity > ONE_HOUR) {
    return req.session.destroy((err) => {
      return nextError(next, 410, 'Session expired due to inactivity.');
    });
  }

  // Update last activity time
  req.session.lastActivity = Date.now();

  // Attach user data
  req.user = {
    _id: req.session.userId,
    isAdmin: req.session.isAdmin,
    profileType: req.session.profileType,
  };

  next();
};

const adminAuth = (req, _res, next) => {
  if (!req.user.isAdmin) {
    // Log unauthorized admin access attempt
    logSecurity('unauthorized-admin-access', {
      userId: req.user._id,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
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
