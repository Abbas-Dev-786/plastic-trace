const { ethers } = require("ethers");
const contractService = require("../services/contract.service");
const { getContractInstance } = require("../config/thirdweb.config");
const QRData = require("../models/qr.model");

exports.generateQRCodes = async (req, res) => {
  try {
    const { amount, wallet, signature } = req.body;
    if (!amount || !wallet || !signature)
      throw new Error("Amount, wallet, and signature are required");
    const message = `Generate QR codes: ${amount}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const roleManager = getContractInstance(
      process.env.CONTRACT_ROLE_MANAGER,
      "RoleManager"
    );
    const isAdmin = await roleManager.call("hasRole", [
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE")),
      wallet,
    ]);
    if (!isAdmin) throw new Error("Not an admin");
    const { tx, qrIds } = await contractService.generateQRCodes(amount);
    for (const qrId of qrIds) {
      await QRData.updateOne(
        { qrId },
        { status: "Assigned" },
        { upsert: true }
      );
    }
    res.json({ success: true, txHash: tx.transactionHash, qrIds });
  } catch (error) {
    console.error("Error in generateQRCodes:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.assignQR = async (req, res) => {
  try {
    const { qrId, manufacturer, wallet, signature } = req.body;
    if (!qrId || !manufacturer || !wallet || !signature)
      throw new Error(
        "QR ID, manufacturer, wallet, and signature are required"
      );
    const message = `Assign QR: ${qrId} to ${manufacturer}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const roleManager = getContractInstance(
      process.env.CONTRACT_ROLE_MANAGER,
      "RoleManager"
    );
    const isAdmin = await roleManager.call("hasRole", [
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE")),
      wallet,
    ]);
    if (!isAdmin) throw new Error("Not an admin");
    const tx = await contractService.assignQR(qrId, manufacturer);
    await QRData.updateOne(
      { qrId },
      { manufacturer, status: "Assigned" },
      { upsert: true }
    );
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (error) {
    console.error("Error in assignQR:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.uploadMetadata = async (req, res) => {
  try {
    const { qrId, ipfsHash, wallet, signature } = req.body;
    if (!qrId || !ipfsHash || !wallet || !signature)
      throw new Error("QR ID, IPFS hash, wallet, and signature are required");
    const message = `Upload metadata for QR: ${qrId}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const roleManager = getContractInstance(
      process.env.CONTRACT_ROLE_MANAGER,
      "RoleManager"
    );
    const isAdmin = await roleManager.call("hasRole", [
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE")),
      wallet,
    ]);
    if (!isAdmin) throw new Error("Not an admin");
    const tx = await contractService.setQRMetadata(qrId, ipfsHash);
    await QRData.updateOne({ qrId }, { ipfsHash }, { upsert: true });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (error) {
    console.error("Error in uploadMetadata:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.scanQR = async (req, res) => {
  try {
    const { qrId, wallet, signature } = req.body;
    if (!qrId || !wallet || !signature)
      throw new Error("QR ID, wallet, and signature are required");
    const message = `Scan QR: ${qrId}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const transaction = await contractService.scanQR(qrId);
    await QRData.updateOne(
      { qrId },
      { status: "Scanned", ragPicker: wallet },
      { upsert: true }
    );
    res.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in scanQR:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.verifyScan = async (req, res) => {
  try {
    const { qrId, wallet, signature } = req.body;
    if (!qrId || !wallet || !signature)
      throw new Error("QR ID, wallet, and signature are required");
    const message = `Verify QR: ${qrId}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const transaction = await contractService.verifyScan(qrId);
    await QRData.updateOne(
      { qrId },
      { status: "Verified", recycler: wallet },
      { upsert: true }
    );
    res.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in verifyScan:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.markRecycled = async (req, res) => {
  try {
    const { qrId, wallet, signature } = req.body;
    if (!qrId || !wallet || !signature)
      throw new Error("QR ID, wallet, and signature are required");
    const message = `Recycle QR: ${qrId}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const transaction = await contractService.markRecycled(qrId);
    await QRData.updateOne({ qrId }, { status: "Recycled" }, { upsert: true });
    res.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in markRecycled:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.distributeRewards = async (req, res) => {
  try {
    const { qrId, wallet, signature } = req.body;
    if (!qrId || !wallet || !signature)
      throw new Error("QR ID, wallet, and signature are required");
    const message = `Distribute rewards for QR: ${qrId}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");
    const transaction = await contractService.distributeRewards(qrId);
    res.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in distributeRewards:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};
