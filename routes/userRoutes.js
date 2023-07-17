const express = require("express");
const router = express.Router();
const { userHome, userRegister } = require("../controller/userController");
const passport = require("passport");
const authenticateUser = require("../middleware/checkAuthenticateMiddleware");

router.get("/", authenticateUser, userHome);

router.get(
  "/registration/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/users",
    failureRedirect: "/api/users/auth/failure",
  })
);

router.get("/api/users/auth/failure", (req, res) => {
  res.status(400).json({
    message: "Authentication Failed",
  });
});

router.get("/logout", authenticateUser, (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.status(200).json({ message: "I feel bad you are going" });
  });
});
module.exports = router;
