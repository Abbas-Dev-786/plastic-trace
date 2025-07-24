// v5 SDK: single SDK instance for **all** contracts
const { createThirdwebClient, getContract } = require("thirdweb");
const { privateKeyToAccount } = require("thirdweb/wallets");
const { defineChain } = require("thirdweb/chains");

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY, // or secretKey
  config: {},
});

const account = privateKeyToAccount({
  privateKey: process.env.PRIVATE_KEY,
  // Etherlink test-net
  chain: defineChain(128123),
});

// ---------- Contract getters ----------
const roleManager = () =>
  getContract({ client, address: process.env.CONTRACT_ROLE_MANAGER });
const qrManager = () =>
  getContract({ client, address: process.env.CONTRACT_QR_MANAGER });
const recyclingTracker = () =>
  getContract({ client, address: process.env.CONTRACT_RECYCLING_TRACKER });
const rewardToken = () =>
  getContract({ client, address: process.env.CONTRACT_REWARD_TOKEN });
const rewardDistributor = () =>
  getContract({ client, address: process.env.CONTRACT_REWARD_DISTRIBUTOR });
const ecoNFT = () =>
  getContract({ client, address: process.env.CONTRACT_ECONFT });

module.exports = {
  client,
  roleManager,
  qrManager,
  recyclingTracker,
  rewardToken,
  rewardDistributor,
  ecoNFT,
};
