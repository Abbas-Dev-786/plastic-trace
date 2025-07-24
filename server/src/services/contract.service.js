const { ethers } = require("ethers");
const sdk = require("../config/thirdweb.config");

// ---------- Contract addresses ----------
const ROLE_MANAGER = process.env.CONTRACT_ROLE_MANAGER;
const QR_MANAGER = process.env.CONTRACT_QR_MANAGER;
const RECYCLING_TRACKER = process.env.CONTRACT_RECYCLING_TRACKER;
const REWARD_TOKEN = process.env.CONTRACT_REWARD_TOKEN;
const REWARD_DISTRIBUTOR = process.env.CONTRACT_REWARD_DISTRIBUTOR;
const ECONFT = process.env.CONTRACT_ECONFT;

// ---------- Helper ----------
const getContract = (address, abiName) => sdk.getContract(address, abiName);

// ---------- Exports ----------
module.exports = {
  // 1. registerRole
  async registerRole(wallet, role) {
    const contract = await getContract(ROLE_MANAGER, "RoleManager");
    return contract.call("registerRole", [role], { from: wallet });
  },

  // 2. QR codes
  async generateQRCodes(amount) {
    const contract = await getContract(QR_MANAGER, "QRCodeManager");
    return contract.call("generateQRCodes", [amount]);
  },
  async assignQR(qrId, manufacturer) {
    const contract = await getContract(QR_MANAGER, "QRCodeManager");
    return contract.call("assignQRToManufacturer", [qrId, manufacturer]);
  },

  // 3. Recycling lifecycle
  async scanQR(qrId, wallet) {
    const contract = await getContract(RECYCLING_TRACKER, "RecyclingTracker");
    return contract.call("scanQR", [qrId], { from: wallet });
  },
  async verifyScan(qrId, wallet) {
    const contract = await getContract(RECYCLING_TRACKER, "RecyclingTracker");
    return contract.call("verifyScan", [qrId], { from: wallet });
  },
  async markRecycled(qrId, wallet) {
    const contract = await getContract(RECYCLING_TRACKER, "RecyclingTracker");
    return contract.call("markRecycled", [qrId], { from: wallet });
  },
  async distributeRewards(qrId, wallet) {
    const contract = await getContract(REWARD_DISTRIBUTOR, "RewardDistributor");
    return contract.call("distributeRewards", [qrId], { from: wallet });
  },

  // 4. Reads
  async getUserScans(wallet) {
    const contract = await getContract(RECYCLING_TRACKER, "RecyclingTracker");
    return contract.call("getUserScans", [wallet]);
  },

  // ---------- NFT ----------
  async mintMilestoneNFT(wallet, level = 1) {
    const contract = await getContract(ECONFT, "EcoNFT");
    return contract.call("mintMilestoneNFT", [wallet, level], { from: wallet });
  },

  async getUserNFTCount(wallet) {
    const contract = await getContract(ECONFT, "EcoNFT");
    return contract.call("balanceOf", [wallet]);
  },

  async getTokenURI(tokenId) {
    const contract = await getContract(ECONFT, "EcoNFT");
    return contract.call("tokenURI", [tokenId]);
  },

  // ---------- Reward Token ----------
  async mintTokens(to, amountWei) {
    const contract = await getContract(REWARD_TOKEN, "RewardToken");
    return contract.call("mint", [to, amountWei]);
  },

  async getTokenBalance(wallet) {
    const contract = await getContract(REWARD_TOKEN, "RewardToken");
    return contract.call("balanceOf", [wallet]);
  },

  async transferTokens(fromWallet, toAddress, amountWei) {
    const contract = await getContract(REWARD_TOKEN, "RewardToken");
    return contract.call("transfer", [toAddress, amountWei], {
      from: fromWallet,
    });
  },
};
