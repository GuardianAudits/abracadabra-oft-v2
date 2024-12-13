import { Contract } from 'ethers'
import { type DeployFunction } from 'hardhat-deploy/types'

import { getDeploymentAddressAndAbi } from '@layerzerolabs/lz-evm-sdk-v2'

const deploymentName = 'SpellOFTAdapterUpgradeable';
const contractName = 'AbraOFTAdapterUpgradeable'

const deploy: DeployFunction = async (hre) => {
    const { deploy } = hre.deployments
    const signer = (await hre.ethers.getSigners())[0]
    console.log(`deploying ${deploymentName} on network: ${hre.network.name} with ${signer.address}`)

    const { address, abi } = getDeploymentAddressAndAbi(hre.network.name, 'EndpointV2')
    const endpointV2Deployment = new Contract(address, abi, signer)
    try {
        const { address } = getDeploymentAddressAndAbi(hre.network.name, 'SpellOFTUpgradeable')
        console.log(`Proxy: ${address}`)
    } catch (e) {
        console.log(`Proxy not found`)
    }

    await deploy(deploymentName, {
        from: signer.address,
        args: ['0x', endpointV2Deployment.address], // replace '0x' with the address of the ERC-20 token
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
