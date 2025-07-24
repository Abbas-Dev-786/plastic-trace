const {
  prepareContractCall,
  sendTransaction,
  readContract,
} = require("thirdweb");
const {
  roleManager,
  qrManager,
  recyclingTracker,
  rewardToken,
  rewardDistributor,
  ecoNFT,
} = require("../config/thirdweb.config");
const { min } = require("thirdweb/utils");

// ---------- 1. Roles ----------
const registerRole = (wallet, role) =>
  sendTransaction(
    prepareContractCall({
      contract: roleManager(),
      method: "function registerRole(bytes32 role)",
      params: [role],
    }),
    { account: wallet }
  );

// ---------- 2. QR ----------
const generateQRCodes = (amount) =>
  sendTransaction(
    prepareContractCall({
      contract: qrManager(),
      method: "function generateQRCodes(uint256 amount)",
      params: [amount],
    })
  );

const assignQR = (qrId, manufacturer) =>
  sendTransaction(
    prepareContractCall({
      contract: qrManager(),
      method:
        "function assignQRToManufacturer(uint256 qrId, address manufacturer)",
      params: [qrId, manufacturer],
    })
  );

const setQRMetadata = (qrId, ipfsHash) =>
  sendTransaction(
    prepareContractCall({
      contract: qrManager(),
      method: "function setQRMetadata(uint256 qrId, string ipfsHash)",
      params: [qrId, ipfsHash],
    })
  );

// ---------- 3. Recycling ----------
const scanQR = (wallet, qrId) =>
  sendTransaction(
    prepareContractCall({
      contract: recyclingTracker(),
      method: "function scanQR(uint256 qrId)",
      params: [qrId],
    }),
    { account: wallet }
  );

const verifyScan = (wallet, qrId) =>
  sendTransaction(
    prepareContractCall({
      contract: recyclingTracker(),
      method: "function verifyScan(uint256 qrId)",
      params: [qrId],
    }),
    { account: wallet }
  );

const markRecycled = (wallet, qrId) =>
  sendTransaction(
    prepareContractCall({
      contract: recyclingTracker(),
      method: "function markRecycled(uint256 qrId)",
      params: [qrId],
    }),
    { account: wallet }
  );

const distributeRewards = (wallet, qrId) =>
  sendTransaction(
    prepareContractCall({
      contract: rewardDistributor(),
      method: "function distributeRewards(uint256 qrId)",
      params: [qrId],
    }),
    { account: wallet }
  );

// ---------- 4. Reads ----------
const getUserScans = (wallet) =>
  readContract({
    contract: recyclingTracker(),
    method: "function getUserScans(address user) view returns (uint256)",
    params: [wallet],
  });

// ---------- 5. NFT ----------
const mintMilestoneNFT = (wallet, level = 1) =>
  sendTransaction(
    prepareContractCall({
      contract: ecoNFT(),
      method: "function mintMilestoneNFT(address to, uint256 milestoneLevel)",
      params: [wallet, level],
    }),
    { account: wallet }
  );

const getUserNFTCount = (wallet) =>
  readContract({
    contract: ecoNFT(),
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [wallet],
  });

// ---------- 6. Reward Token ----------
const mintTokens = (to, weiAmount) =>
  sendTransaction(
    prepareContractCall({
      contract: rewardToken(),
      method: "function mint(address to, uint256 amount)",
      params: [to, weiAmount],
    })
  );

const getTokenBalance = (wallet) =>
  readContract({
    contract: rewardToken(),
    method: "function balanceOf(address account) view returns (uint256)",
    params: [wallet],
  });

module.exports = {
  registerRole,
  generateQRCodes,
  assignQR,
  setQRMetadata,
  scanQR,
  verifyScan,
  markRecycled,
  distributeRewards,
  getUserScans,
  mintMilestoneNFT,
  getUserNFTCount,
  mintTokens,
  getTokenBalance,
};
