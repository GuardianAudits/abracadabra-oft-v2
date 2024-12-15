// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OAppSenderUpgradeable } from "@layerzerolabs/oapp-evm-upgradeable/contracts/oapp/OAppSenderUpgradeable.sol";
import { OAppUpgradeable } from "@layerzerolabs/oapp-evm-upgradeable/contracts/oapp/OAppUpgradeable.sol";
import { OFTUpgradeable } from "@layerzerolabs/oft-evm-upgradeable/contracts/oft/OFTUpgradeable.sol";
import { MessagingFee, MessagingReceipt } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { SenderWithFees } from "./SenderWithFees.sol";

contract AbraOFTUpgradeable is OFTUpgradeable, SenderWithFees {
    constructor(address _lzEndpoint) OFTUpgradeable(_lzEndpoint) {}

    function initialize(string memory _name, string memory _symbol, address _delegate) public virtual initializer {
        __OFT_init(_name, _symbol, _delegate);
        __Ownable_init(_delegate);
    }

    function _lzSend(
        uint32 _dstEid,
        bytes memory _message,
        bytes memory _options,
        MessagingFee memory _fee,
        address _refundAddress
    ) internal virtual override(OAppSenderUpgradeable, SenderWithFees) returns (MessagingReceipt memory receipt) {
        return SenderWithFees._lzSend(_dstEid, _message, _options, _fee, _refundAddress);
    }

    function _quote(
        uint32 _dstEid,
        bytes memory _message,
        bytes memory _options,
        bool _payInLzToken
    ) internal view virtual override(OAppSenderUpgradeable, SenderWithFees) returns (MessagingFee memory fee) {
        return SenderWithFees._quote(_dstEid, _message, _options, _payInLzToken);
    }

    function oAppVersion()
        public
        pure
        virtual
        override(OAppUpgradeable, OAppSenderUpgradeable)
        returns (uint64 senderVersion, uint64 receiverVersion)
    {
        return (SENDER_VERSION, RECEIVER_VERSION);
    }
}
