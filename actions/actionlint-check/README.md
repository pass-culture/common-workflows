# Setup actionlint

This action installs and runs [`actionlint`](https://github.com/pass-culture/actionlint).

## Example

```
steps:
    - name: setup
    uses: actions/checkout@v6

    - uses: pass-culture/common-workflows/actions/actionlint-check@<commit hash>
```