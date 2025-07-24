const express = require("express");
const analytics = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/leaderboard", analytics.leaderboard);
router.get("/user/:wallet", analytics.userProfile);
router.get("/qr/:qrId", analytics.qrLifecycle);

module.exports = router;
