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
            // No user found - we'll handle registration later
            return done(null, false, { message: 'No account found. Please register first.' });
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
  passport.use('google-register',
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
            $or: [
              { googleId: profile.id },
              { email: profile.emails[0].value }
            ]
          });

          if (existingUser) {
            // User already has an account - reject registration
            return done(null, false, {
              message: 'Account already exists. Please use login instead.'
            });
          }

          // Extract profile data from Google
          const googleData = {
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicture: profile.photos[0]?.value
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

