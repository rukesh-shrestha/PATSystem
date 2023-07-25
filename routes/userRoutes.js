const express = require("express");
const router = express.Router();
const {
  userHome,
  userRegister,
  userLogoutController,
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
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect("/api/users");
    res.status(200).json({
      message: "Welcome ${req.user.username}",
    });
  }
);

router.get("/logout", authenticateUser, userLogoutController);
module.exports = router;
