// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";
import "./RecyclingTracker.sol";

contract EcoNFT is ERC721, AccessControl {
    RoleManager public roleManager;
    RecyclingTracker public recyclingTracker;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 public nextTokenId;
    mapping(uint256 => uint256) public milestoneLevel;
    mapping(uint256 => uint256) public milestoneThresholds;

    event MilestoneNFTMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        uint256 milestoneLevel
    );

    constructor(
        address _roleManager,
        address _recyclingTracker
    ) ERC721("EcoNFT", "ENFT") {
        roleManager = RoleManager(_roleManager);
        recyclingTracker = RecyclingTracker(_recyclingTracker);
        _grantRole(ADMIN_ROLE, msg.sender);
        nextTokenId = 1;

        milestoneThresholds[1] = 100;
        milestoneThresholds[2] = 500;
        milestoneThresholds[3] = 1000;
    }

    function setRecyclingTracker(
        address _recyclingTracker
    ) external onlyRole(ADMIN_ROLE) {
        recyclingTracker = RecyclingTracker(_recyclingTracker);
    }

    function mintMilestoneNFT(address to, uint256 _milestoneLevel) external {
        require(
            msg.sender == address(recyclingTracker) ||
                roleManager.hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not authorized"
        );
        require(
            milestoneThresholds[_milestoneLevel] > 0,
            "Invalid milestone level"
        );
        require(
            recyclingTracker.getUserScans(to) >=
                milestoneThresholds[_milestoneLevel],
            "Insufficient scans"
        );

        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        milestoneLevel[tokenId] = _milestoneLevel;
        emit MilestoneNFTMinted(to, tokenId, _milestoneLevel);
    }

    function setMilestoneThreshold(
        uint256 level,
        uint256 scanCount
    ) external onlyRole(ADMIN_ROLE) {
        require(level > 0, "Invalid level");
        require(scanCount > 0, "Invalid scan count");
        milestoneThresholds[level] = scanCount;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return
            string(
                abi.encodePacked(
                    "ipfs://Qm.../metadata/",
                    uint2str(tokenId),
                    ".json"
                )
            );
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        return string(bstr);
    }
}
