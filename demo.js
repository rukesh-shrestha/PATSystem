const express = require("express");
const passport = require("passport");
require("dotenv");
const GoogleTokenStrategy = require("passport-google-token").Strategy;

const app = express();

// Replace with your actual client ID and client secret from the Google Developer Console
// const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
// const GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET";

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      // You can implement additional logic here, e.g., saving the user profile to your database.
      // For now, we'll just pass the user data to the done callback.
      return done(null, { profile, accessToken }); // Include the access token in the user object
    }
  )
);

app.use(passport.initialize());

// Route to authenticate with Google
app.post(
  "/auth/google",
  passport.authenticate("google-token", { session: false }),
  (req, res) => {
    // The user object, including the access token, is available in req.user
    res.json({ user: req.user });
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
