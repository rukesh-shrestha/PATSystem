const { use } = require("passport");
const User = require("../models/User");
const dotenv = require("dotenv");
const crypto = require("crypto");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const sendVerificationEmail = require("../utils/sendVerificationMail");

dotenv.config();

const googeleAuth = async (passport) => {
  await passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/users/google/callback",
      },
      async function (res, accessToken, refreshToken, profile, done) {
        try {
          let role;
          userEmail = profile.emails[0].value;
          const reg = /[a-zA-Z\.]+[0-9a-zA-Z\.]*@heraldcollege.edu.np$/g;
          const regPAT = /^(pat|PAT)[a-zA-Z0-9\.]+@heraldcollege.edu.np$/g;
          if (!reg.test(userEmail)) {
            done(
              "Email Validation Failed. Try to login from the organization email.",
              userEmail
            );
          } else if (regPAT.test(userEmail)) {
            const newUser = {
              googleId: profile.id,
              username: profile.displayName,
              email: userEmail,
              firstName: profile.name["givenName"],
              lastName: profile.name["familyName"],
              image: profile.photos[0].value,
              role: "admin",
              emailToken: crypto.randomBytes(64).toString("hex"),
            };
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
              done(null, user);
            } else {
              users = await User.create(newUser);
              done(null, users);
              sendVerificationEmail(users);
            }
          } else {
            const newUser = {
              googleId: profile.id,
              username: profile.displayName,
              email: userEmail,
              firstName: profile.name["givenName"],
              lastName: profile.name["familyName"],
              image: profile.photos[0].value,
              emailToken: crypto.randomBytes(64).toString("hex"),
              role: "staff",
            };
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
              done(null, user);
            } else {
              users = await User.create(newUser);
              done(null, users);
              sendVerificationEmail(users);
            }
          }
        } catch (error) {
          console.error(error);
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
