// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { AbraOFTUpgradeable } from "../AbraOFTUpgradeable.sol";

// @dev WARNING: This is for testing purposes only
contract AbraOFTUpgradeableMock is AbraOFTUpgradeable {
    constructor(address _lzEndpoint) AbraOFTUpgradeable(_lzEndpoint) {}

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
