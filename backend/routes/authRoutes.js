const express = require('express');
const passport = require('passport');
const { handleSuccess, handleError } = require('../utils/functionHandlers');
const router = express.Router();
const { logAuth, logError } = require('../utils/logHelpers');
const userService = require('../services/userService');
const { profileValidation } = require('../middleware/userValidation');

// Frontend URL for OAuth redirects
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
// Step 1: User clicks "Sign in with Google" - redirect them to Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false, // We manage sessions ourselves
  }),
);

// Step 2: Google redirects back here with authentication result
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', {
      session: false,
      failureRedirect: `${frontendUrl}/login?error=oauth_failed`,
    }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        // Authentication failed - use specific error type from info
        const errorType = info?.errorType || 'oauth_failed';
        return res.redirect(`${frontendUrl}/login?error=${errorType}&message=${encodeURIComponent(info?.message || 'Authentication failed')}`);
      }

      // Success - attach user to request and continue
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const user = req.user;

    // Create session (same as your regular login)
    req.session.userId = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.profileType = user.profileType;
    req.session.lastActivity = Date.now();

    // Save session before redirecting
    req.session.save((err) => {
      if (err) {
        logError(new Error('Google OAuth session creation failed'), {
          operation: 'google-oauth-login',
          userId: user._id,
          email: user.email,
        });
        return res.redirect(`${frontendUrl}/login?error=session_failed`);
      }

      // Log successful Google login
      logAuth('google-login', user._id, {
        profileType: user.profileType,
        email: user.email,
        ip: req.ip,
        method: 'google-oauth',
      });

      // Redirect to appropriate dashboard
      const redirectPath =
        user.profileType === 'business' ? '/dashboard' : '/search';
      res.redirect(`${frontendUrl}${redirectPath}`);
    });
  },
);

// Sign up with Google - Step 1: Initiate OAuth
router.get(
  '/google/register',
  passport.authenticate('google-register', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

// Sign up with Google - Step 2: Handle callback
router.get(
  '/google/register/callback',
  (req, res, next) => {
    passport.authenticate('google-register', {
      session: false,
      failureRedirect: `${frontendUrl}/register?error=oauth_failed`,
    }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        // Registration failed - use specific error type from info
        const errorType = info?.errorType || 'oauth_failed';
        return res.redirect(`${frontendUrl}/register?error=${errorType}&message=${encodeURIComponent(info?.message || 'Registration failed')}`);
      }

      // Success - attach user to request and continue
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    // Store Google profile data temporarily in session
    req.session.tempGoogleProfile = {
      googleId: req.user.googleId,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profilePicture: req.user.profilePicture,
    };

    req.session.save((err) => {
      if (err) {
        return res.redirect(`${frontendUrl}/register?error=session_failed`);
      }

      // Redirect to account type selection page
      res.redirect(`${frontendUrl}/register/account-type?method=google`);
    });
  },
);

// Sign up with Google - Step 3: Complete registration
router.post(
  '/google/register/complete',
  express.json(),
  profileValidation,
  async (req, res) => {
  try {
    // Get Google profile from session
    const googleProfile = req.session.tempGoogleProfile;

    if (!googleProfile) {
      return res.status(400).json({
        error: 'No Google profile found. Please start registration again.',
      });
    }

    // Merge Google data with user-provided data
    const userData = {
      email: googleProfile.email,
      googleId: googleProfile.googleId,
      password: null, // No password for OAuth users
      ...req.body, // User-provided fields from form
    };

    // If jobseeker, merge Google names into profile
    if (req.body.profileType === 'jobseeker') {
      userData.jobseekerProfile = {
        firstName:
          req.body.jobseekerProfile?.firstName || googleProfile.firstName,
        lastName: req.body.jobseekerProfile?.lastName || googleProfile.lastName,
        ...req.body.jobseekerProfile,
      };
    }

    // Delegate to existing user service
    const newUser = await userService.registerGoogleUser(userData);

    // Clear temp data
    delete req.session.tempGoogleProfile;

    // Create session for the new user
    req.session.userId = newUser._id.toString();
    req.session.isAdmin = newUser.isAdmin;
    req.session.profileType = newUser.profileType;
    req.session.lastActivity = Date.now();

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session creation failed' });
      }

      res.status(201).json({
        success: true,
        user: newUser,
        redirectPath:
          newUser.profileType === 'business' ? '/dashboard' : '/search',
      });
    });
  } catch (error) {
    logError(error, {
      operation: 'google-register-complete',
      tempProfileExists: !!req.session.tempGoogleProfile,
      profileType: req.body.profileType,
    });
    res.status(400).json({ error: error.message });
  }
  },
);

// Get temporary Google profile data (for registration completion page)
router.get('/google/profile-temp', (req, res) => {
  if (!req.session.tempGoogleProfile) {
    return res.status(404).json({ error: 'No profile data found' });
  }

  res.json(req.session.tempGoogleProfile);
});

module.exports = router;
