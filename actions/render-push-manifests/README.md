# Render and push manifests

This action renders and push manifests to rendered-manifests repository.
The manifests are pushed to a branch matching ``${{ inputs.environment }}``.

## Inputs

### `environment` - string
### `app_name` - string
### `app_version` - string, optional
### `additional_args` - string, optional
### `api_token_github_secret_name` - string
### `registry_workload_identity_secret_name` - string
### `registry_service_account_secret_name` - string
### `chart_values_repository` - string
### `chart_values_destination` - string
