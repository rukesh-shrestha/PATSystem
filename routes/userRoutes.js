const express = require("express");
const router = express.Router();
const {
  userHome,
  userLogoutController,
  signUpUser,
  signInUser,
  updatepassword,
} = require("../controller/userController");

const verifyEmail = require("../utils/verifyEmail");

const passport = require("passport");
const authenticateUser = require("../middleware/checkAuthenticateMiddleware");
const jwt = require("jsonwebtoken");

const validateToken = require("../middleware/validateToken");
const validateUserStatus = require("../middleware/validateUserStatus");

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
    try {
      if (req.user.isVerified) {
        jwt.sign(
          {
            user: {
              id: req.user.id,
              username: req.user.username,
              email: req.user.email,
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              role: req.user.role,
              status: req.user.status,
              image: req.user.image,
              isVerified: req.user.isVerified,
            },
          },
          process.env.SESSION_SECRET_KEY,
          { expiresIn: "30m" },
          (err, token) => {
            if (err) {
              res.status(498);
              throw new Error("Cannot Create token");
            }
            res.json({ token: token });
          }
        );
      } else {
        res.json({ message: "Verification Email Send" });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
    // Successful authentication, redirect home.

    // res.status(200).redirect("/api/users");
  }
);

router.get("/logout", authenticateUser, userLogoutController);

// custom user signup for superadmin
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.get("/verify-email", verifyEmail);

//password update
router.post(
  "/password/update",
  validateToken,
  validateUserStatus,
  updatepassword
);

module.exports = router;
