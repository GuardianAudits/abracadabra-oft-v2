// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

interface IFeeHandler {
    function feeTo() external view returns (address);

    function quoteNativeFee(
        uint32 _dstEid,
        bytes memory _message,
        bytes memory _options,
        uint256 _endpointNativeFee,
        uint256 _endpointNativelzTokenFee
    ) external view returns (uint256 feeAmount);
}
