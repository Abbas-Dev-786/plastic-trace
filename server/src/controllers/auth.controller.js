const { registerRole } = require("../services/contract.service");

exports.registerRole = async (req, res) => {
  try {
    const { role } = req.body;
    const tx = await registerRole(role);
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
