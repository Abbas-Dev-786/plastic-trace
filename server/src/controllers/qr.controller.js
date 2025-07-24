const contractService = require("../services/contract.service");
const ipfsService = require("../services/ipfs.service");
const QRData = require("../models/qr.model");

// Admin
exports.generateQRCodes = async (req, res) => {
  try {
    const { amount } = req.body;
    const tx = await contractService.generateQRCodes(amount);
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.assignQR = async (req, res) => {
  try {
    const { qrId, manufacturer } = req.body;
    const tx = await contractService.assignQR(qrId, manufacturer);
    await QRData.updateOne({ qrId }, { manufacturer }, { upsert: true });
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadMetadata = async (req, res) => {
  try {
    const { qrId, metadata } = req.body;
    const cid = await ipfsService.uploadJSON(metadata);
    const tx = await contractService.setQRMetadata(qrId, cid);
    await QRData.updateOne({ qrId }, { ipfsHash: cid });
    res.json({ success: true, cid, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Recycling
exports.scanQR = async (req, res) => {
  try {
    const { qrId, wallet } = req.body;
    const tx = await contractService.scanQR(qrId, wallet);
    await QRData.updateOne({ qrId }, { status: "Scanned", ragPicker: wallet });
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyScan = async (req, res) => {
  try {
    const { qrId, wallet } = req.body;
    const tx = await contractService.verifyScan(qrId, wallet);
    await QRData.updateOne({ qrId }, { status: "Verified", recycler: wallet });
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.markRecycled = async (req, res) => {
  try {
    const { qrId, wallet } = req.body;
    const tx = await contractService.markRecycled(qrId, wallet);
    await QRData.updateOne({ qrId }, { status: "Recycled" });
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.distributeRewards = async (req, res) => {
  try {
    const { qrId, wallet } = req.body;
    const tx = await contractService.distributeRewards(qrId, wallet);
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
