# Project Setup

## GraphQL Code Generation and Validation

This project uses Shopify's Admin GraphQL API with automatic type generation and build-time validation.

### Schema and Types

- **Schema Version**: Uses Shopify Admin GraphQL API 2025-10
- **Local Schema**: `./types/admin.schema.json` (downloaded from Shopify)
- **Generated Types**: `./types/admin.generated.d.ts` and `./types/admin.types.d.ts`

### Validation

GraphQL queries and mutations are validated against the Shopify schema at build time:

```bash
# Validate all GraphQL operations without regenerating types
yarn graphql:validate

# Generate types from schema
yarn graphql:codegen

# Run full validation and type checking
yarn type-check
```

### Build Integration

The build process includes GraphQL validation:

```bash
yarn build  # Runs graphql:validate before building
```

### Recent Changes

- **2025-01-01**: Added build-time GraphQL schema validation
- **2025-01-01**: Removed invalid `code` field from `orderEditAddShippingLine` mutation
- **2025-01-01**: Fixed `shopifyOrderCapture` mutation to query `transaction.order` instead of direct `order` field
- **2025-01-01**: Updated to Shopify Admin GraphQL API 2025-10

### Environment Variables (for schema downloads)

If you need to download a fresh schema, set:

- `SHOPIFY_ADMIN_API_TOKEN`: Your Shopify Admin API access token
- `SHOPIFY_APP_NAME`: Your Shopify app's name

Then run:

```bash
yarn codegen
```

This will download the latest schema and regenerate types.