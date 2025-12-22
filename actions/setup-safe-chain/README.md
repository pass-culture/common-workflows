# Setup safe-chain

This action installs and sets up [`safe-chain`](https://github.com/AikidoSec/safe-chain).
Checksum for version 1.3.3 version linux-x64 : `ba57cba81e13a920a877bc5767c38494578d1e75cf565f87138c81916a67cc31`.
Checksum for version 1.3.3 version macos-arm64 : `e6ab4f595164f3423aae537bebd4b838d4db761b5f668997d32bd7319194724c`.

## Example

```
steps:
    - name: setup
    uses: actions/checkout@v4

    - name: Setup Node.js
    uses: actions/setup-node@v4

    - uses: pass-culture/common-workflows/actions/setup-safe-chain@safe-chain-setup/v1.3.0

    - name: Install dependencies
    run: npm install safe-chain-test
```

## Inputs

### `version` - string, optional
### `checksum-linux-x64` - string, optional
### `checksum-macos-arm64` - string, optional