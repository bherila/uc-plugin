import {ApiType, pluckConfig, preset} from '@shopify/api-codegen-preset';

export default {
  // For syntax highlighting / auto-complete when writing operations
  // Use local schema for validation (downloaded from Shopify Admin GraphQL 2024-04)
  schema: './types/admin.schema.json',
  documents: ['./**/*.{js,ts,jsx,tsx}'],
  projects: {
    default: {
      // For type extraction - use local schema
      schema: './types/admin.schema.json',
      documents: ['./src/**/*.{js,ts,jsx,tsx}'],
      extensions: {
        codegen: {
          // Enables support for `#graphql` tags, as well as `/* GraphQL */`
          pluckConfig,
          generates: {
            './types/admin.types.d.ts': {
              plugins: ['typescript'],
            },
            './types/admin.generated.d.ts': {
              preset,
              presetConfig: {
                apiType: ApiType.Admin,
              },
            },
          },
        },
      },
    },
  },
};