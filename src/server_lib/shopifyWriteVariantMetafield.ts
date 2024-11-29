import 'server-only'
import db from '@/server_lib/db'
import shopify from '@/server_lib/shopify'
import z from 'zod'

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query('insert into v3_audit_log (event_name, event_ext) values (?, ?)', ['metaField', txt])
}

// Define the GraphQL mutation to update the metafield
const UPDATE_METAFIELD_MUTATION = `
  mutation UpdateMetafield($variantId: ID!, $key: String!, $value: String!) {
    productVariantUpdate(input: {
      id: $variantId,
      metafields: [
        {
          key: $key,
          value: $value,
          type: "json",
        },
      ],
    }) {
      productVariant {
        id
        metafields(first: 10) {
          edges {
            node {
              key
              value
            }
          }
        }
      }
    }
  }
`

// Function to update the metafield
async function shopifyWriteVariantMetafield(variantId: string, key: string, value: string) {
  try {
    const vars = {
      variantId,
      key,
      value,
    }
    await log(vars)
    const response = await shopify.graphql(UPDATE_METAFIELD_MUTATION, vars)
    const edges = response.data.productVariantUpdate.productVariant.metafields.edges
    await log(edges)
    return z
      .array(
        z.object({
          node: z.object({
            key: z.string(),
            value: z.string(),
          }),
        }),
      )
      .parse(edges)
  } catch (error) {
    await log(error)
  }
}

export default shopifyWriteVariantMetafield
