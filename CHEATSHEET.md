# Deploy

```
npx hardhat deploy --network arbitrum-mainnet --tags <tag>
```

# Deploy for LayerZero

```
npx hardhat lz:deploy --tags SpellOFTAdapterUpgradeable --networks ethereum-mainnet

npx hardhat lz:deploy --tags SpellOFTUpgradeable --networks arbitrum-mainnet
```

# Verify

```
npx hardhat etherscan-verify --network ethereum-mainnet
```
