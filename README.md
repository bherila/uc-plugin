# Project Setup

## GraphQL Code Generation

To generate Shopify GraphQL types, you need to set the following environment variables:

- `SHOPIFY_ADMIN_API_TOKEN`: Your Shopify Admin API access token
- `SHOPIFY_APP_NAME`: Your Shopify app's name

Run the code generation with:

```bash
yarn codegen
```

This will generate TypeScript types for the Shopify Admin GraphQL API.