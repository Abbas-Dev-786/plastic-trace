const { ethers } = require("ethers");
const contractService = require("../services/contract.service");
const User = require("../models/user.model");

exports.registerRole = async (req, res) => {
  try {
    const { role, wallet, signature } = req.body;
    if (!role || !wallet || !signature)
      throw new Error("Role, wallet, and signature are required");

    const message = `Register role: ${role}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");

    const transaction = await contractService.registerRole(role);
    await User.updateOne({ walletAddress: wallet }, { role }, { upsert: true });

    res.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in registerRole:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};
