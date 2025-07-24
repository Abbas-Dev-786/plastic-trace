const { registerRole } = require("../services/contract.service");
const { keccak256, toHex } = require("thirdweb");

exports.registerRole = async (req, res) => {
  try {
    const { role } = req.body; // e.g. "RAGPICKER_ROLE"
    const tx = await registerRole(role);
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
