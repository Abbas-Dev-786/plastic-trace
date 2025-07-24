const contractService = require("../services/contract.service");

exports.registerRole = async (req, res) => {
  try {
    const { wallet, role } = req.body;
    const tx = await contractService.registerRole(wallet, role);
    res.json({ success: true, txHash: tx.receipt.transactionHash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
