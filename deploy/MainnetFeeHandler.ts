import { type DeployFunction } from 'hardhat-deploy/types'

const deploymentName = 'MainnetFeeHandler'
const contractName = 'FeeHandler'

const deploy: DeployFunction = async (hre) => {
    const { deploy } = hre.deployments
    const signer = (await hre.ethers.getSigners())[0]
    console.log(`deploying ${deploymentName} on network: ${hre.network.name} with ${signer.address}`)

    await deploy(deploymentName, {
        from: signer.address,
        args: [
            0, // no fixed native fee, using an oracle
            "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH/USD feed
            "0xcA481312a0f73cCC90558a3d120C23c2640Ca495", // Treasury Yields
            0, // QuoteType.Oracle
            "0xDF2C270f610Dc35d8fFDA5B453E74db5471E126B" // Ops 
        ],
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: false,
        contract: contractName
    })
}

deploy.tags = [deploymentName]

export default deploy
