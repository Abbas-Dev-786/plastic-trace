const { ThirdwebStorage } = require("@thirdweb-dev/storage");

const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

// upload JSON or file, return IPFS CID
module.exports = {
  async uploadMetadata(json) {
    const uri = await storage.upload(json);
    return uri.replace("ipfs://", ""); // return pure CID
  },
};
