// v5 SDK: single SDK instance for **all** contracts
const { createThirdwebClient, getContract } = require("thirdweb");
const { privateKeyToAccount } = require("thirdweb/wallets");
const { defineChain } = require("thirdweb/chains");

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY, // or secretKey
  config: {},
});

const CHAIN_ID = 128123;

const account = privateKeyToAccount({
  privateKey: process.env.PRIVATE_KEY,
  // Etherlink test-net
  chain: defineChain(CHAIN_ID),
});

// ---------- Contract getters ----------
const roleManager = () =>
  getContract({
    client,
    address: process.env.CONTRACT_ROLE_MANAGER,
    chain: defineChain(CHAIN_ID),
  });
const qrManager = () =>
  getContract({
    client,
    address: process.env.CONTRACT_QR_MANAGER,
    chain: defineChain(CHAIN_ID),
  });
const recyclingTracker = () =>
  getContract({
    client,
    address: process.env.CONTRACT_RECYCLING_TRACKER,
    chain: defineChain(CHAIN_ID),
  });
const rewardToken = () =>
  getContract({
    client,
    address: process.env.CONTRACT_REWARD_TOKEN,
    chain: defineChain(CHAIN_ID),
  });
const rewardDistributor = () =>
  getContract({
    client,
    address: process.env.CONTRACT_REWARD_DISTRIBUTOR,
    chain: defineChain(CHAIN_ID),
  });
const ecoNFT = () =>
  getContract({
    client,
    address: process.env.CONTRACT_ECONFT,
    chain: defineChain(CHAIN_ID),
  });

module.exports = {
  client,
  roleManager,
  qrManager,
  recyclingTracker,
  rewardToken,
  rewardDistributor,
  ecoNFT,
  account,
};
