# setup-passctl

Action do install the passctl binary in the CI.

## Example 

```yaml
- name: Authenticate through github app ghactionci
  uses: actions/create-github-app-token@df432ceedc7162793a195dd1713ff69aefc7379e # v2.0.6
  id: github-token
  with:
    app-id: ${{ secrets.PASSCULTURE_GITHUB_ACTION_APP_ID }}
    private-key: ${{ secrets.PASSCULTURE_GITHUB_ACTION_APP_PRIVATE_KEY }}
    owner: ${{ github.repository_owner }}
    # Liste des repositories à cloner
    repositories: |
      passctl
    permission-contents: read

- name: "Setup passctl"
  uses: pass-culture/common-workflows/actions/setup-passctl@v0.1.0
  with:
    token: ${{ steps.github-token.outputs.token }}

- name: "Run passctl"
  run: |
    passctl --help
