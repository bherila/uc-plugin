import 'server-only'
import { prisma } from '@/server_lib/prisma'
import shopify from '@/server_lib/shopify'
import z from 'zod'

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await prisma.v3_audit_log.create({
    data: {
      event_name: 'metaField',
      event_ext: txt,
    },
  })
}

// Define the GraphQL mutation to update the metafield
const UPDATE_METAFIELD_MUTATION = `#graphql
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
