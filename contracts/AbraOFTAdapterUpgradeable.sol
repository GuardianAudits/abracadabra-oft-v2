// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OFTAdapterUpgradeable } from "@layerzerolabs/oft-evm-upgradeable/contracts/oft/OFTAdapterUpgradeable.sol";
import { OAppUpgradeable } from "@layerzerolabs/oapp-evm-upgradeable/contracts/oapp/OAppUpgradeable.sol";
import { OAppSenderUpgradeable } from "@layerzerolabs/oapp-evm-upgradeable/contracts/oapp/OAppSenderUpgradeable.sol";
import { MessagingFee, MessagingReceipt } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { SenderWithFees } from "./SenderWithFees.sol";

contract AbraOFTAdapterUpgradeable is OFTAdapterUpgradeable, SenderWithFees {
    constructor(address _token, address _lzEndpoint) OFTAdapterUpgradeable(_token, _lzEndpoint) {
        _disableInitializers();
    }

    function initialize(address _delegate) public virtual initializer {
        __OFTAdapter_init(_delegate);
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
