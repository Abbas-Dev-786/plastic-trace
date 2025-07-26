const contractService = require("../services/contract.service");
const QRData = require("../models/qr.model");

// Admin
exports.generateQRCodes = async (req, res) => {
  try {
    const { amount } = req.body;
    const tx = await contractService.generateQRCodes(amount);
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.assignQR = async (req, res) => {
  try {
    const { qrId, manufacturer } = req.body;
    const tx = await contractService.assignQR(qrId, manufacturer);
    await QRData.updateOne({ qrId }, { manufacturer }, { upsert: true });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadMetadata = async (req, res) => {
  try {
    const { qrId, ipfsHash } = req.body;
    const tx = await contractService.setQRMetadata(qrId, ipfsHash);
    await QRData.updateOne({ qrId }, { ipfsHash });
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Recycling
exports.scanQR = async (req, res) => {
  try {
    const { qrId } = req.body;
    const tx = await contractService.scanQR(qrId);
    await QRData.updateOne({ qrId }, { status: "Scanned", ragPicker: "auto" });
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyScan = async (req, res) => {
  try {
    const { qrId } = req.body;
    const tx = await contractService.verifyScan(qrId);
    await QRData.updateOne({ qrId }, { status: "Verified", recycler: "auto" });
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.markRecycled = async (req, res) => {
  try {
    const { qrId } = req.body;
    const tx = await contractService.markRecycled(qrId);
    await QRData.updateOne({ qrId }, { status: "Recycled" });
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.distributeRewards = async (req, res) => {
  try {
    const { qrId } = req.body;
    const tx = await contractService.distributeRewards(qrId);
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
