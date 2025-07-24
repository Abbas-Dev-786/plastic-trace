const express = require("express");
const qr = require("../controllers/qr.controller");

const router = express.Router();

// Admin flows
router.post("/generate", qr.generateQRCodes);
router.post("/assign", qr.assignQR);
router.post("/metadata", qr.uploadMetadata);

// Recycling flows
router.post("/scan", qr.scanQR);
router.post("/verify", qr.verifyScan);
router.post("/recycle", qr.markRecycled);
router.post("/distribute", qr.distributeRewards);

module.exports = router;
