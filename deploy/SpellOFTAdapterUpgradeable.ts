import { Contract } from 'ethers'
import { type DeployFunction } from 'hardhat-deploy/types'

import { getDeploymentAddressAndAbi } from '@layerzerolabs/lz-evm-sdk-v2'

const deploymentName = 'SpellOFTAdapterUpgradeable';
const contractName = 'AbraOFTAdapterUpgradeable'
const salt = "spell-oft-upgradeable-1734060795"

const deploy: DeployFunction = async (hre) => {
    const { deploy } = hre.deployments
    const signer = (await hre.ethers.getSigners())[0]
    console.log(`deploying ${deploymentName} on network: ${hre.network.name} with ${signer.address}`)

    const { address, abi } = getDeploymentAddressAndAbi(hre.network.name, 'EndpointV2')
    const endpointV2Deployment = new Contract(address, abi, signer)

    await deploy(deploymentName, {
        deterministicDeployment: "0x" + Buffer.from(salt).toString('hex'),
        from: signer.address,
        args: ['0x090185f2135308BaD17527004364eBcC2D37e5F6', endpointV2Deployment.address], // SPELL address
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: false,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
            owner: signer.address,
            execute: {
                init: {
                    methodName: 'initialize',
                    args: [signer.address],
                },
            },
        },
        contract: contractName
    })
}

deploy.tags = [deploymentName]

export default deploy
