const config = require("config");
const { throwError, nextError } = require("../utils/functionHandlers");
const { verifyAuthToken } = require("../auth/providers/jwt");
const Listing = require("../validation/mongoSchemas/listingSchema");
const Users = require("../validation/mongoSchemas/usersSchema");
const { verifyPassword } = require("../utils/bcrypt");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

const lockoutCheck = async (req, _res, next) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return next();
    }
    const isPrevTimeout = user.loginTimeout > 0;
    const isLockedOut = Date.now() - user.loginTimeout < 60 * 1000;
    const lockoutTime = 60 - (Date.now() - user.loginTimeout) / 1000;

    if (!isLockedOut && user.loginAttempts === 3) {
      user.loginAttempts = 0;
      user.loginTimeout = 0;
      await user.save();
    }

    if (isPrevTimeout && isLockedOut) {
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
    const user = await Users.findOne({ email });
    if (!user) {
      throwError(401, "Invalid email or password.");
    }

    const enteredPassword = password;
    const savedPassword = user.password;
    const isPasswordValid = await verifyPassword(
      enteredPassword,
      savedPassword,
    );
    const loginAttempts = user.loginAttempts;

    if (user && !isPasswordValid) {
      user.loginAttempts = loginAttempts + 1;

      if (user.loginAttempts === 3) {
        user.loginTimeout = Date.now();
      }

      await user.save();
      throwError(401, "Invalid email or password.");
    }

    user.loginAttempts = 0;
    user.loginTimeout = 0;
    await user.save();
    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};

const authenticateUser = (req, _res, next) => {
  if (tokenGenerator === "jwt") {
    const token = req.header("x-auth-token");
    if (!token) {
      return throwError(401, "Access denied. No token provided.");
    }

    try {
      const userData = verifyAuthToken(token);
      if (!userData) {
        throwError(401, "Access denied. Invalid token.");
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
    return nextError(next, 403, "Access denied. Admin access only.");
  }

  next();
};

const businessAuth = (req, _res, next) => {
  if (!req.user.isBusiness) {
    nextError(next, 403, "Access denied. Business access only.");
  } else {
    next();
  }
};

const userAdminAuth = async (req, _res, next) => {
  const requestedUserId = req.params.id;
  if (req.user._id === requestedUserId || req.user.isAdmin) {
    next();
  } else {
    nextError(next, 403, "Access denied. Unauthorized user.");
  }
};

const listingCreatorAuth = async (req, _res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId, "businessId");

    if (!listing) {
      throwError(404, "Listing not found");
    }

    if (listing.businessId.toString() !== req.user._id) {
      throwError(403, "Access denied. Unauthorized user.");
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
      throwError(404, "Listing not found");
    }

    const listingBusinessId = listing.businessId.toString();
    if (listingBusinessId !== req.user._id && !req.user.isAdmin) {
      throwError(403, "Access denied. Unauthorized user.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyCredentials,
  authenticateUser,
  adminAuth,
  businessAuth,
  userAdminAuth,
  listingCreatorAuth,
  listingCreatorAdminAuth,
  lockoutCheck,
};
