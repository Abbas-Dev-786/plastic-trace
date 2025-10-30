require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    flow: {
      url: "https://testnet.evm.nodes.onflow.org", // Flow RPC URL
      chainId: 545, // Flow chain ID
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
};
