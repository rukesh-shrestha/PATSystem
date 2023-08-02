const express = require("express");
const router = express.Router();
const {
  userHome,
  userLogoutController,
  signUpUser,
  signInUser,
} = require("../controller/userController");
const passport = require("passport");
const authenticateUser = require("../middleware/checkAuthenticateMiddleware");

router.get("/", authenticateUser, userHome);

router.get(
  "/registration/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// router.get("/registration/auth/google", userRegister);
// @desc google auth callback
// @route GET /api/users/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  async function (req, res) {
    // Successful authentication, redirect home.

    res.status(200).redirect("/api/users");
  }
);

router.get("/logout", authenticateUser, userLogoutController);

// custom user signup for superadmin
router.post("/signup", signUpUser);
router.post("/signin", signInUser);

module.exports = router;
