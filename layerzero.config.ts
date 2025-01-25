import { ExecutorOptionType } from "@layerzerolabs/lz-v2-utilities";
import { OAppEdgeConfig, OAppEnforcedOption, OmniEdgeHardhat, OmniPointHardhat } from "@layerzerolabs/toolbox-hardhat";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import { generateConnectionsConfig } from "@layerzerolabs/metadata-tools";
import { ETH_SAFE_ADDRESS, ARB_SAFE_ADDRESS, BERA_SAFE_ADDRESS } from "./hardhat.config";

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

const spellBeraContract: OmniPointHardhat = {
    eid: EndpointId.BERA_V2_MAINNET,
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

const bSpellBeraContract: OmniPointHardhat = {
    eid: EndpointId.BERA_V2_MAINNET,
    contractName: 'BoundSpellOFT',
}

///////////////////////////////////////////////////////
/// MIM
///////////////////////////////////////////////////////
const mimEthereumContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'MIMOFT',
}

const mimBeraContract: OmniPointHardhat = {
    eid: EndpointId.BERA_V2_MAINNET,
    contractName: 'MIMOFT',
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

// https://layerzeroscan.com/tools/defaults
export default async function () {
    // [srcContract, dstContract, [requiredDVNs, [optionalDVNs, threshold]], [srcToDstConfirmations, dstToSrcConfirmations]], [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
    const connections = await generateConnectionsConfig([
        ////////////////////////////////////////////////////////
        // SPELL
        ////////////////////////////////////////////////////////

        // Mainnet <> Arbitrum
        [spellEthereumContract, spellArbitrumContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
        // Mainnet <> Bera
        [spellEthereumContract, spellBeraContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
        // Arbitrum <> Bera
        [spellArbitrumContract, spellBeraContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],

        ////////////////////////////////////////////////////////
        // BOUNDSPELL
        ////////////////////////////////////////////////////////
        // Mainnet <> Arbitrum
        [bSpellEthereumContract, bSpellArbitrumContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
        // Mainnet <> Bera
        [bSpellEthereumContract, bSpellBeraContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
        // Arbitrum <> Bera
        [bSpellArbitrumContract, bSpellBeraContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],

        ////////////////////////////////////////////////////////
        // MIM
        ////////////////////////////////////////////////////////
        [mimEthereumContract, mimBeraContract, [['LayerZero Labs', 'MIM'], []], [15, 20], [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
    ]) as OmniEdgeHardhat<OAppEdgeConfig>[];

    // Prints generated connections
    //console.log(JSON.stringify(connections, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2));

    return {
        contracts: [
            // SPELL Mainnet
            {
                contract: spellEthereumContract,
                config: {
                    owner: ETH_SAFE_ADDRESS,
                    delegate: ETH_SAFE_ADDRESS,
                },
            },
            // SPELL Arbitrum
            {
                contract: spellArbitrumContract,
                config: {
                    owner: ARB_SAFE_ADDRESS,
                    delegate: ARB_SAFE_ADDRESS,
                },
            },
            // SPELL Bera
            {
                contract: spellBeraContract,
                config: {
                    owner: BERA_SAFE_ADDRESS,
                    delegate: BERA_SAFE_ADDRESS,
                },
            },
            // BOUNDSPELL Mainnet
            {
                contract: bSpellEthereumContract,
                config: {
                    owner: ETH_SAFE_ADDRESS,
                    delegate: ETH_SAFE_ADDRESS,
                },
            },
            // BOUNDSPELL Arbitrum
            {
                contract: bSpellArbitrumContract,
                config: {
                    owner: ARB_SAFE_ADDRESS,
                    delegate: ARB_SAFE_ADDRESS,
                },
            },
            // BOUNDSPELL Bera
            {
                contract: bSpellBeraContract,
                config: {
                    owner: BERA_SAFE_ADDRESS,
                    delegate: BERA_SAFE_ADDRESS,
                },
            },
            // MIM Mainnet
            {
                contract: mimEthereumContract,
                config: {
                    owner: ETH_SAFE_ADDRESS,
                    delegate: ETH_SAFE_ADDRESS,
                },
            },
            // MIM Bera
            {
                contract: mimBeraContract,
                config: {
                    owner: BERA_SAFE_ADDRESS,
                    delegate: BERA_SAFE_ADDRESS,
                },
            },
        ],
        connections
    }
}