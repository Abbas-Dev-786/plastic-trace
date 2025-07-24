const {
  prepareContractCall,
  sendTransaction,
  readContract,
} = require("thirdweb");
const { keccak256, toHex } = require("thirdweb");
const {
  roleManager,
  qrManager,
  recyclingTracker,
  rewardToken,
  rewardDistributor,
  ecoNFT,
  account, // ✅ signer object
} = require("../config/thirdweb.config");



/* ---------- 1. ROLES ---------- */
module.exports.registerRole = (role) =>
  sendTransaction(
    prepareContractCall({
      contract: roleManager(),
      method: "function registerRole(bytes32 role)",
      params: [keccak256(toHex(role))], // convert string → bytes32
    }),
    { account } // signer
  );

/* ---------- 2. QR ---------- */
module.exports.generateQRCodes = (amount) =>
  sendTransaction(
    prepareContractCall({
      contract: qrManager(),
      method: "function generateQRCodes(uint256 amount)",
      params: [amount],
    }),
    { account }
  );

module.exports.assignQR = (qrId, manufacturer) =>
  sendTransaction(
    prepareContractCall({
      contract: qrManager(),
      method:
        "function assignQRToManufacturer(uint256 qrId, address manufacturer)",
      params: [qrId, manufacturer],
    }),
    { account }
  );

module.exports.setQRMetadata = (qrId, ipfsHash) =>
  sendTransaction(
    prepareContractCall({
      contract: qrManager(),
      method: "function setQRMetadata(uint256 qrId, string ipfsHash)",
      params: [qrId, ipfsHash],
    }),
    { account }
  );

/* ---------- 3. Recycling ---------- */
module.exports.scanQR = () =>
  sendTransaction(
    prepareContractCall({
      contract: recyclingTracker(),
      method: "function scanQR(uint256 qrId)",
      params: [qrId],
    }),
    { account }
  );

module.exports.verifyScan = () =>
  sendTransaction(
    prepareContractCall({
      contract: recyclingTracker(),
      method: "function verifyScan(uint256 qrId)",
      params: [qrId],
    }),
    { account }
  );

module.exports.markRecycled = () =>
  sendTransaction(
    prepareContractCall({
      contract: recyclingTracker(),
      method: "function markRecycled(uint256 qrId)",
      params: [qrId],
    }),
    { account }
  );

module.exports.distributeRewards = () =>
  sendTransaction(
    prepareContractCall({
      contract: rewardDistributor(),
      method: "function distributeRewards(uint256 qrId)",
      params: [qrId],
    }),
    { account }
  );

/* ---------- 4. Reads ---------- */
module.exports.getUserScans = (wallet) =>
  readContract({
    contract: recyclingTracker(),
    method: "function getUserScans(address user) view returns (uint256)",
    params: [wallet],
  });

/* ---------- 5. NFT ---------- */
module.exports.mintMilestoneNFT = (level = 1) =>
  sendTransaction(
    prepareContractCall({
      contract: ecoNFT(),
      method: "function mintMilestoneNFT(address to, uint256 milestoneLevel)",
      params: [account.address, level],
    }),
    { account }
  );

module.exports.getUserNFTCount = (wallet) =>
  readContract({
    contract: ecoNFT(),
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [wallet],
  });

/* ---------- 6. Reward Token ---------- */
module.exports.mintTokens = (to, weiAmount) =>
  sendTransaction(
    prepareContractCall({
      contract: rewardToken(),
      method: "function mint(address to, uint256 amount)",
      params: [to, weiAmount],
    }),
    { account }
  );

module.exports.getTokenBalance = (wallet) =>
  readContract({
    contract: rewardToken(),
    method: "function balanceOf(address account) view returns (uint256)",
    params: [wallet],
  });
