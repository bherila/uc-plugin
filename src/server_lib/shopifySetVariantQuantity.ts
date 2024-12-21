import 'server-only'
import shopify from '@/server_lib/shopify'
import z from 'zod'
import db from '@/server_lib/db'

const SET_INVENTORY_QUANTITY_MUTATION = `
  mutation inventorySetQuantity($inventoryItemId: ID!, $locationId: ID!, $quantity: Int!) {
    inventorySetOnHandQuantity: inventoryAdjustQuantity(input: {
      inventoryItemId: $inventoryItemId,
      locationId: $locationId,
      quantity: $quantity,
      reason: "OTHER"
    }) {
      inventoryLevel {
        id
        quantity
      }
      userErrors {
        field
        message
      }
    }
  }
`

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query('insert into v3_audit_log (event_name, event_ext) values (?, ?)', ['setVariantQty', txt])
}

const responseSchema = z.object({
  inventorySetOnHandQuantity: z.object({
    inventoryLevel: z
      .object({
        id: z.string(),
        quantity: z.number(),
      })
      .nullable(),
    userErrors: z.array(
      z.object({
        field: z.array(z.string()),
        message: z.string(),
      }),
    ),
  }),
})

export async function shopifySetVariantQuantity(variantId: string, quantity: number) {
  try {
    // First get the inventory item ID and location ID
    const GET_INVENTORY_ITEM = `
      query getInventoryItem($id: ID!) {
        productVariant(id: $id) {
          inventoryItem {
            id
          }
        }
        location(first: true) {
          id
        }
      }
    `

    const inventoryData = await shopify.graphql(GET_INVENTORY_ITEM, { id: variantId })
    const inventoryItemId = inventoryData.productVariant?.inventoryItem?.id
    const locationId = inventoryData.location?.id

    if (!inventoryItemId || !locationId) {
      throw new Error('Could not find inventory item or location')
    }

    await log({ variantId, inventoryItemId, locationId })

    const response = await shopify.graphql(SET_INVENTORY_QUANTITY_MUTATION, {
      inventoryItemId,
      locationId,
      quantity,
    })

    const result = responseSchema.parse(response)
    await log(result)

    return result
  } catch (error) {
    await log(error)
    throw error
  }
}
