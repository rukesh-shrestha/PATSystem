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

dashRouter.use(validateToken);

dashRouter.get(
  "/sa/dashboard",

  superAdminPermission,
  superAdminBoard
);
dashRouter.get("/a/dashboard", adminPermission, adminBoard);
dashRouter.get("/s/dashboard", staffPermission, staffBoard);
module.exports = dashRouter;
