import { ExecutorOptionType } from "@layerzerolabs/lz-v2-utilities";
import { OAppEdgeConfig, OAppEnforcedOption, OmniEdgeHardhat, OmniPointHardhat } from "@layerzerolabs/toolbox-hardhat";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import { generateConnectionsConfig } from "@layerzerolabs/metadata-tools";

///////////////////////////////////////////////////////
/// SPELL
///////////////////////////////////////////////////////
const spellEthereumContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'SpellOFT',
}

const spellArbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'SpellOFT',
}

///////////////////////////////////////////////////////
/// BOUNDSPELL
///////////////////////////////////////////////////////

const bSpellArbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'BoundSpellOFT',
}

const bSpellEthereumContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'BoundSpellOFT',
}

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80000,
        value: 0,
    },
    {
        msgType: 2,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80000,
        value: 0,
    },
    {
        msgType: 2,
        optionType: ExecutorOptionType.COMPOSE,
        index: 0,
        gas: 80000,
        value: 0,
    },
];

const setConfirmations = (config: OmniEdgeHardhat<OAppEdgeConfig>[], fromEid: number, toEid: number, sendConfirmations: number, receiveConfirmations: number) => {
    config.forEach(edge => {
        if (edge.from.eid === fromEid && edge.to.eid === toEid) {
            // Update send config confirmations
            if (edge.config?.sendConfig?.ulnConfig) {
                edge.config.sendConfig.ulnConfig.confirmations = BigInt(sendConfirmations.toString());
            }

            // Update receive config confirmations on the destination
            if (edge.config?.receiveConfig?.ulnConfig) {
                edge.config.receiveConfig.ulnConfig.confirmations = BigInt(receiveConfirmations.toString());
            }
        }
    });
}

export default async function () {
    // [srcContract, dstContract, [requiredDVNs, [optionalDVNs, threshold]], [srcToDstConfirmations, dstToSrcConfirmations]], [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
    const connections = await generateConnectionsConfig([
        [spellEthereumContract, spellArbitrumContract, [['LayerZero Labs', 'MIM'], []], [1, 1], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
        [bSpellEthereumContract, bSpellArbitrumContract, [['LayerZero Labs', 'MIM'], []], [1, 1], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
    ]) as OmniEdgeHardhat<OAppEdgeConfig>[];

    setConfirmations(connections, EndpointId.ETHEREUM_V2_MAINNET, EndpointId.ARBITRUM_V2_MAINNET, 15, 20);
    setConfirmations(connections, EndpointId.ARBITRUM_V2_MAINNET, EndpointId.ETHEREUM_V2_MAINNET, 20, 15);

    // Prints generated connections
    //console.log(JSON.stringify(connections, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2));

    return {
        contracts: [
            { contract: spellEthereumContract },
            { contract: spellArbitrumContract },
            { contract: bSpellEthereumContract },
            { contract: bSpellArbitrumContract },
        ],
        connections
    }
}