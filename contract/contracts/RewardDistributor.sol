// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";
import "./RecyclingTracker.sol";
import "./RewardToken.sol";

contract RewardDistributor {
    RoleManager public roleManager;
    RecyclingTracker public recyclingTracker;
    RewardToken public rewardToken;

    bytes32 public constant RECYCLER_ROLE = keccak256("RECYCLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 public rewardPerScan = 10 ether; // 10 ERT
    uint256 public rewardPerVerification = 5 ether; // 5 ERT

    event RewardsDistributed(
        uint256 qrId,
        address ragPicker,
        uint256 scanReward,
        address recycler,
        uint256 verifyReward
    );

    constructor(
        address _roleManager,
        address _recyclingTracker,
        address _rewardToken
    ) {
        roleManager = RoleManager(_roleManager);
        recyclingTracker = RecyclingTracker(_recyclingTracker);
        rewardToken = RewardToken(_rewardToken);
    }

    function distributeRewards(uint256 qrId) external {
        require(
            roleManager.hasRole(RECYCLER_ROLE, msg.sender),
            "Caller is not a recycler"
        );
        RecyclingTracker.TrackRecord memory record = recyclingTracker
            .trackRecords(qrId);
        require(
            record.status == RecyclingTracker.Status.Verified,
            "QR not in Verified state"
        );

        address ragPicker = record.ragPicker;
        require(ragPicker != address(0), "No rag picker for QR");

        rewardToken.transfer(ragPicker, rewardPerScan);
        rewardToken.transfer(msg.sender, rewardPerVerification);

        emit RewardsDistributed(
            qrId,
            ragPicker,
            rewardPerScan,
            msg.sender,
            rewardPerVerification
        );
    }

    function setRewardAmounts(
        uint256 scanAmount,
        uint256 verifyAmount
    ) external {
        require(
            roleManager.hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not an admin"
        );
        rewardPerScan = scanAmount;
        rewardPerVerification = verifyAmount;
    }
}
