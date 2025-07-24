const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://node.testnet.etherlink.com"
);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const sdk = new ThirdwebSDK(signer, {
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

module.exports = sdk;
