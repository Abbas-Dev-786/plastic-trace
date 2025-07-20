// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";

contract QRCodeManager {
    RoleManager public roleManager;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");

    uint256 public nextQrId;
    mapping(uint256 => address) public qrToManufacturer;
    mapping(uint256 => string) public qrMetadata;

    event QRCodesGenerated(uint256[] qrIds);
    event QRAssigned(uint256 qrId, address manufacturer);
    event QRMetadataSet(uint256 qrId, string ipfsHash);

    constructor(address _roleManager) {
        roleManager = RoleManager(_roleManager);
        nextQrId = 1;
    }

    function generateQRCodes(uint256 amount) external {
        require(
            roleManager.hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not an admin"
        );
        require(
            amount > 0 && amount <= 1000,
            "Amount must be between 1 and 1000"
        );

        uint256[] memory qrIds = new uint256[](amount);
        for (uint256 i = 0; i < amount; i++) {
            qrIds[i] = nextQrId++;
        }
        emit QRCodesGenerated(qrIds);
    }

    function assignQRToManufacturer(
        uint256 qrId,
        address manufacturer
    ) external {
        require(
            roleManager.hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not an admin"
        );
        require(qrId < nextQrId, "Invalid QR ID");
        require(qrToManufacturer[qrId] == address(0), "QR already assigned");
        require(
            roleManager.hasRole(MANUFACTURER_ROLE, manufacturer),
            "Recipient is not a manufacturer"
        );

        qrToManufacturer[qrId] = manufacturer;
        emit QRAssigned(qrId, manufacturer);
    }

    function setQRMetadata(uint256 qrId, string calldata ipfsHash) external {
        require(
            roleManager.hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not an admin"
        );
        require(qrId < nextQrId, "Invalid QR ID");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        qrMetadata[qrId] = ipfsHash;
        emit QRMetadataSet(qrId, ipfsHash);
    }
}
