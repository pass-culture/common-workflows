# Setup safe-chain

This action installs and sets up [`safe-chain`](https://github.com/AikidoSec/safe-chain).
Checksum for version 1.4.4 version linux-x64 : `8826980b5d6ce7bb17cce3f9803654eaa848c43d0063b90a53448be57a9543b1`.
Checksum for version 1.3.3 version macos-arm64 : `e8b8be838b1a76f3f80e32b4cf088299ca02759bf167433ce20f8fd7524380c5`.

## Example

```
steps:
    - name: setup
    uses: actions/checkout@v4

    - name: Setup Node.js
    uses: actions/setup-node@v4

    - uses: pass-culture/common-workflows/actions/setup-safe-chain@main

    - name: Install dependencies
    run: npm install safe-chain-test
```

## Inputs

### `version` - string, optional
### `checksum-linux-x64` - string, optional
### `checksum-macos-arm64` - string, optional