import db from '@/lib/db'
import shopify from '@/lib/shopify'
import z from 'zod'

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query('insert into v3_audit_log (event_name, event_ext) values (?, ?)', ['metaField', txt])
  console.info('[metaField] ' + txt)
}

// Define the GraphQL mutation to update the metafield
const UPDATE_METAFIELD_MUTATION = `
  mutation UpdateProductMetafield($productId: ID!, $key: String!, $value: String!) {
    productUpdate(input: {
      id: $productId,
      metafields: [
        {
          namespace: "custom",
          key: $key,
          value: $value,
          type: "json",
        },
      ],
    }) {
      product {
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
async function shopifyWriteProductMetafield(productId: string, key: string, value: string) {
  let result: { [key: string]: any } = {}
  try {
    result.vars = {
      productId,
      key,
      value,
    }
    const response = await shopify.graphql(UPDATE_METAFIELD_MUTATION, result.vars)
    result.edges = response.productUpdate.product.metafields.edges
    return z
      .array(
        z.object({
          node: z.object({
            key: z.string(),
            value: z.string(),
          }),
        }),
      )
      .parse(result.edges)
  } catch (error: any) {
    result['error'] = error?.toString()
  } finally {
    await log(result)
  }
}

export default shopifyWriteProductMetafield
