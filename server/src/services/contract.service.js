const { keccak256, toHex } = require("thirdweb");
const {
  prepareContractCall,
  sendTransaction,
  readContract,
} = require("thirdweb");
const { client, getContractInstance } = require("../config/thirdweb.config");
const { account } = require("../config/thirdweb.config");

const contracts = {
  roleManager: getContractInstance(
    process.env.CONTRACT_ROLE_MANAGER,
    "RoleManager"
  ),
  qrManager: getContractInstance(
    process.env.CONTRACT_QR_MANAGER,
    "QRCodeManager"
  ),
  recyclingTracker: getContractInstance(
    process.env.CONTRACT_RECYCLING_TRACKER,
    "RecyclingTracker"
  ),
  rewardToken: getContractInstance(
    process.env.CONTRACT_REWARD_TOKEN,
    "RewardToken"
  ),
  rewardDistributor: getContractInstance(
    process.env.CONTRACT_REWARD_DISTRIBUTOR,
    "RewardDistributor"
  ),
  ecoNFT: getContractInstance(process.env.CONTRACT_ECONFT, "EcoNFT"),
};

/* ---------- 1. Roles ---------- */
const registerRole = (role) =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.roleManager,
      method: "function registerRole(bytes32 role)",
      params: [keccak256(toHex(role))],
    }),
    account,
  });

/* ---------- 2. QR ---------- */
const generateQRCodes = (amount) =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.qrManager,
      method: "function generateQRCodes(uint256 amount)",
      params: [amount],
    }),
    account,
  });

const assignQR = (qrId, manufacturer) =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.qrManager,
      method:
        "function assignQRToManufacturer(uint256 qrId, address manufacturer)",
      params: [qrId, manufacturer],
    }),
    account,
  });

const setQRMetadata = (qrId, ipfsHash) =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.qrManager,
      method: "function setQRMetadata(uint256 qrId, string ipfsHash)",
      params: [qrId, ipfsHash],
    }),
    account,
  });

/* ---------- 3. Recycling ---------- */
const scanQR = () =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.recyclingTracker,
      method: "function scanQR(uint256 qrId)",
      params: [qrId],
    }),
    account,
  });

const verifyScan = () =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.recyclingTracker,
      method: "function verifyScan(uint256 qrId)",
      params: [qrId],
    }),
    account,
  });

const markRecycled = () =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.recyclingTracker,
      method: "function markRecycled(uint256 qrId)",
      params: [qrId],
    }),
    account,
  });

const distributeRewards = () =>
  sendTransaction({
    transaction: prepareContractCall({
      contract: contracts.rewardDistributor,
      method: "function distributeRewards(uint256 qrId)",
      params: [qrId],
    }),
    account,
  });

/* ---------- 4. Reads ---------- */
const getUserScans = (wallet) =>
  readContract({
    contract: contracts.recyclingTracker,
    method: "function getUserScans(address user) view returns (uint256)",
    params: [wallet],
  });

const getUserNFTCount = (wallet) =>
  readContract({
    contract: contracts.ecoNFT,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [wallet],
  });

const getTokenBalance = (wallet) =>
  readContract({
    contract: contracts.rewardToken,
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
  getUserNFTCount,
  getTokenBalance,
};
