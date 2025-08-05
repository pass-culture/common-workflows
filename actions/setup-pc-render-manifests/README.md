# setup-pc-render-manifests

Action do install the pc-render-manifests binary in the CI.

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
      rendered-manifests
      pc-render-manifests
    permission-contents: write

# Executes helmfile templating and push results to render-manifests repository
- name: "Setup pc-render-manifests"
  uses: pass-culture/common-workflows/actions/setup-pc-render-manifests@IC-284-use-pc-render-manifest-binary
  with:
    token: ${{ steps.github-token.outputs.token }}
    version: "v0.7.0"

- name: "Generate and push rendered manifests"
  env:
    GITHUB_USERNAME: x-access-token
    GITHUB_TOKEN: ${{ steps.github-token.outputs.token }}
  run: |
    pc-render-manifests render \
      -a pcapi \
      -e ${{ inputs.environment }} \
      --sourceRepoURL https://github.com/pass-culture/pass-culture-deployment.git \
      --sourcePath helm/pcapi \
      --sourceRepoRef master \
      --additionalArg "--set ${{ steps.generate-pcapi-secrets-list.outputs.PCAPI_SECRETS }}" \
      --commitMsg "${{ inputs.app_name }}(${{ inputs.environment }}) : manifests for app_version=${{ inputs.app_version }}" \
      --push \
      --silent
```
```
