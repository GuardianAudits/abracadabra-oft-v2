// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { AbraOFTAdapterUpgradeable } from "../AbraOFTAdapterUpgradeable.sol";

// @dev WARNING: This is for testing purposes only
contract AbraOFTAdapterUpgradeableMock is AbraOFTAdapterUpgradeable {
    constructor(address _token, address _lzEndpoint) AbraOFTAdapterUpgradeable(_token, _lzEndpoint) {}
}
