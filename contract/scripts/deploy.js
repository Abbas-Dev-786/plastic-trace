const { ethers } = require("hardhat");

async function main() {
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy RoleManager
  const RoleManager = await ethers.getContractFactory("RoleManager");
  const roleManager = await RoleManager.deploy();
  await roleManager.deployed();
  console.log("RoleManager deployed to:", roleManager.address);

  // Deploy RewardToken
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy(roleManager.address);
  await rewardToken.deployed();
  console.log("RewardToken deployed to:", rewardToken.address);

  // Deploy EcoNFT
  const EcoNFT = await ethers.getContractFactory("EcoNFT");
  const ecoNFT = await EcoNFT.deploy(roleManager.address, "0x0"); // Temporary address for RecyclingTracker
  await ecoNFT.deployed();
  console.log("EcoNFT deployed to:", ecoNFT.address);

  // Deploy RecyclingTracker
  const RecyclingTracker = await ethers.getContractFactory("RecyclingTracker");
  const recyclingTracker = await RecyclingTracker.deploy(
    roleManager.address,
    ecoNFT.address
  );
  await recyclingTracker.deployed();
  console.log("RecyclingTracker deployed to:", recyclingTracker.address);

  // Deploy QRCodeManager
  const QRCodeManager = await ethers.getContractFactory("QRCodeManager");
  const qrCodeManager = await QRCodeManager.deploy(roleManager.address);
  await qrCodeManager.deployed();
  console.log("QRCodeManager deployed to:", qrCodeManager.address);

  // Deploy RewardDistributor
  const RewardDistributor = await ethers.getContractFactory(
    "RewardDistributor"
  );
  const rewardDistributor = await RewardDistributor.deploy(
    roleManager.address,
    recyclingTracker.address,
    rewardToken.address
  );
  await rewardDistributor.deployed();
  console.log("RewardDistributor deployed to:", rewardDistributor.address);

  // Update EcoNFT with RecyclingTracker address
  await ecoNFT.setRecyclingTracker(recyclingTracker.address);
  console.log("EcoNFT updated with RecyclingTracker address");

  // Grant roles for contract interactions
  await roleManager.grantRole(
    ethers.utils.keccak256("ADMIN_ROLE"),
    rewardDistributor.address
  );
  await roleManager.grantRole(
    ethers.utils.keccak256("ADMIN_ROLE"),
    recyclingTracker.address
  );
  console.log("Roles granted for contract interactions");

  // Save contract addresses
  console.log("\nDeployed Contract Addresses:");
  console.log("RoleManager:", roleManager.address);
  console.log("RewardToken:", rewardToken.address);
  console.log("EcoNFT:", ecoNFT.address);
  console.log("RecyclingTracker:", recyclingTracker.address);
  console.log("QRCodeManager:", qrCodeManager.address);
  console.log("RewardDistributor:", rewardDistributor.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
