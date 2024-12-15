# Requirements
- Bun
- Foundry (for testing)

# Setup
```
bun install
```

# Compile
```
bunx hardhat compile
```

# Test
```
forge test
```

# Deploy
```
bunx hardhat deploy --network <network-name> --tags <tag>
```

# Deploy for LayerZero
```
bunx hardhat lz:deploy --tags <deployement-name> --networks <network-name>
```

# Verify
```
bunx hardhat etherscan-verify --network <network-name>
```

# LayerZero Wiring
```
bunx hardhat lz:oapp:wire --oapp-config layerzero.config.ts
```