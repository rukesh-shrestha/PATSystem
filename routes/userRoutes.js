const express = require("express");
const router = express.Router();
const userHome = require("../controller/userController");

router.get("/", userHome);

module.exports = router;
