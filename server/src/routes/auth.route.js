const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.registerRole);
router.get("/users/:wallet", authController.getUser);

module.exports = router;
