# Setup safe-chain

This action installs and sets up [`safe-chain`](https://github.com/AikidoSec/safe-chain).
Checksum for version 1.2.1 : `9b2ad869fd5132f7ba9eb1e92d89588516a052da97daf02efa17e53264e8fb5a`.

## Example

```
steps:
    - name: setup
    uses: actions/checkout@v4

    - name: Setup Node.js
    uses: actions/setup-node@v4
    with:
        node-version: "22"

    - name: setup safe-chain
    uses: pass-culture/common-workflows/actions/setup-safe-chain@safe-chain-action
    with:
        version: "1.2.1"
        checksum: "9b2ad869fd5132f7ba9eb1e92d89588516a052da97daf02efa17e53264e8fb5a"

    - name: Install dependencies
    run: npm install safe-chain-test
```

## Inputs

### `version` - string
### `checksum` - string
