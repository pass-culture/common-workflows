# Setup safe-chain

This action installs and sets up [`safe-chain`](https://github.com/AikidoSec/safe-chain).
Checksum for version 1.3.2 : `c0bb727d49c2c699a4a0b651fd45804219f3fb3a5d22e835e9c433b86650c753`.

## Example

```
steps:
    - name: setup
    uses: actions/checkout@v4

    - name: Setup Node.js
    uses: actions/setup-node@v4
    with:
        node-version: "22"

    - uses: pass-culture/common-workflows/actions/setup-safe-chain@safe-chain-setup/v1.2.0

    - name: Install dependencies
    run: npm install safe-chain-test
```

## Inputs

### `version` - string, optional
### `checksum` - string, optional
