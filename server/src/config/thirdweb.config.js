const { createThirdwebClient, defineChain, getContract } = require("thirdweb");
const { privateKeyToAccount } = require("thirdweb/wallets");

const account = privateKeyToAccount({
  privateKey: process.env.PRIVATE_KEY,
  chain: defineChain(128123), // Etherlink test-net
});

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

const getContractInstance = (address, abi) =>
  getContract({ client, address, chain: defineChain(128123), abi });

module.exports = {
  account,
  client,
  getContractInstance,
};
