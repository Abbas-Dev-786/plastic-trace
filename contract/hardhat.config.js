require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    etherlink: {
      url: "https://node.ghostnet.etherlink.com", // Etherlink RPC URL
      chainId: 128123, // Etherlink chain ID
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
};
