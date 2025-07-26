const cs = require("../services/contract.service");
const User = require("../models/user.model");
const QRData = require("../models/qr.model");

// Leaderboard
exports.leaderboard = async (req, res) => {
  try {
    const topScanners = await User.find({ role: "RAGPICKER" })
      .sort({ scans: -1 })
      .limit(10);
    res.json(topScanners);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Profile
exports.userProfile = async (req, res) => {
  try {
    const wallet = req.params.wallet.toLowerCase();
    const user = await User.findOne({ walletAddress: wallet });
    const scans = await cs.getUserScans(wallet);
    const nfts = await cs.getUserNFTCount(wallet);
    res.json({
      user,
      onChainScans: scans.toString(),
      nftBalance: nfts.toString(),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// QR lifecycle
exports.qrLifecycle = async (req, res) => {
  try {
    const data = await QRData.findOne({ qrId: Number(req.params.qrId) });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
