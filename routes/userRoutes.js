const express = require("express");
const router = express.Router();
const {
  userHome,
  userLogoutController,
} = require("../controller/userController");
const passport = require("passport");
const authenticateUser = require("../middleware/checkAuthenticateMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

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
module.exports = router;
