const express = require('express');
const passport = require('passport');
const { handleSuccess, handleError } = require('../utils/functionHandlers');
const router = express.Router();

// Step 1: User clicks "Sign in with Google" - redirect them to Google
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false // We manage sessions ourselves
  })
);

// Step 2: Google redirects back here with authentication result
router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=no_account`
  }),
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
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=session_failed`);
      }
      
      // Redirect to appropriate dashboard
      const redirectPath = user.profileType === 'business' ? '/dashboard' : '/search';
      res.redirect(`${process.env.FRONTEND_URL}${redirectPath}`);
    });
  }
);

module.exports = router;