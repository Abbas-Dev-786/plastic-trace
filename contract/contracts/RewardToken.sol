// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@thirdweb-dev/contracts/eip/interface/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";

contract RewardToken is TokenERC20, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor(
        address _roleManager
    ) TokenERC20("EcoRewardToken", "ERT", msg.sender) {
        RoleManager roleManager = RoleManager(_roleManager);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _mint(to, amount);
    }
}
