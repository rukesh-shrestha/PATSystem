const express = require("express");
const dashRouter = express.Router();
const {
  superAdminBoard,
  adminBoard,
  staffBoard,
} = require("../controller/boardController");
const {
  adminPermission,
  superAdminPermission,
  staffPermission,
} = require("../middleware/roleValidation");
const validateToken = require("../middleware/validateToken");

dashRouter.get(
  "/sa/dashboard",
  validateToken,
  superAdminPermission,
  superAdminBoard
);
dashRouter.get("/a/dashboard", validateToken, adminPermission, adminBoard);
dashRouter.get("/s/dashboard", validateToken, staffPermission, staffBoard);
module.exports = dashRouter;
