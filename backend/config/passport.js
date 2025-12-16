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
};