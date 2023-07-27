const User = require("../models/User");
const dotenv = require("dotenv");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const googeleAuth = async (passport) => {
  await passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/users/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const newUser = {
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            firstName: profile.name["givenName"],
            lastName: profile.name["familyName"],
            image: profile.photos[0].value,
          };
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            users = await User.create(newUser);
            done(null, users);
          }
        } catch (error) {
          console.error(error);
          process.exit(1);
        }
      }
    )
  );

  passport.serializeUser(async function (user, done) {
    try {
      done(null, user.id);
    } catch (error) {
      console.error(error);
      done(error, null);
      process.exit(1);
    }
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
      process.exit(1);
    }
  });
};

module.exports = googeleAuth;
