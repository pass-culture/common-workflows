# Setup safe-chain

This action installs and sets up [`safe-chain`](https://github.com/AikidoSec/safe-chain).
Checksum for version 1.2.2 : `db58cbdebb132f3172cd872ef1a3de407cd59d9fe16ce058f87ab43a4b49f799`.

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
        version: "1.2.2"
        checksum: "db58cbdebb132f3172cd872ef1a3de407cd59d9fe16ce058f87ab43a4b49f799"

    - name: Install dependencies
    run: npm install safe-chain-test
```

## Inputs

### `version` - string
### `checksum` - string
