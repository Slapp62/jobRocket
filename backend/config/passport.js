const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/Users');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Look for user with this Google ID
          const user = await Users.findOne({ googleId: profile.id });

          if (!user) {
            // Check if email exists with password (wrong auth method)
            const emailUser = await Users.findOne({
              email: profile.emails[0].value,
            });

            if (emailUser && emailUser.password) {
              // Email registered with password, not Google
              return done(null, false, {
                message:
                  'This email is registered with password. Please use email/password login.',
                errorType: 'wrong_auth_method',
              });
            }

            // No user found at all - need to register
            return done(null, false, {
              message: 'No account found. Please register first.',
              errorType: 'no_account',
            });
          }

          // User found - proceed with login
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Google Registration Strategy (separate from login)
  passport.use(
    'google-register',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/register/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          const existingUser = await Users.findOne({
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
          });

          if (existingUser) {
            // Provide specific error message based on auth method
            let message = 'Account already exists. Please use login instead.';
            let errorType = 'oauth_account_exists';

            if (existingUser.googleId) {
              message =
                'An account with this email already exists. Please login with Google.';
              errorType = 'oauth_account_exists_google';
            } else if (existingUser.password) {
              message =
                'An account with this email already exists. Please login with your email and password.';
              errorType = 'oauth_account_exists_password';
            }

            return done(null, false, {
              message,
              errorType,
            });
          }

          // Extract profile data from Google
          const googleData = {
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicture: profile.photos[0]?.value,
          };

          // Pass Google data to callback handler
          return done(null, googleData);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
