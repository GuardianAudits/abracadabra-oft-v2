import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const mainnetContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'SpellOFTAdapterUpgradeable',
}

const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'SpellOFTUpgradeable',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: mainnetContract,
        },
        {
            contract: arbitrumContract,
        }
    ],
    connections: [
        {
            from: mainnetContract,
            to: arbitrumContract,
        },
        {
            from: arbitrumContract,
            to: mainnetContract,
        }
    ],
}

export default config
