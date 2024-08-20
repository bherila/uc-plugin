import db from '@/lib/db'
import shopify from '@/lib/shopify'
import z from 'zod'

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query(
    'insert into v3_audit_log (event_name, event_ext) values (?, ?)',
    ['metaField', txt],
  )
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
async function shopifyWriteProductMetafield(
  productId: string,
  key: string,
  value: string,
) {
  try {
    const vars = {
      productId,
      key,
      value,
    }
    await log(vars)
    const response = await shopify.graphql(UPDATE_METAFIELD_MUTATION, vars)
    const edges = response.data.productUpdate.product.metafields.edges
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

export default shopifyWriteProductMetafield
