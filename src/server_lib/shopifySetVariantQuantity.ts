import 'server-only'
import shopify from '@/server_lib/shopify'
import z from 'zod'
import db from '@/server_lib/db'

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  console.log(txt)
  await db.query('insert into v3_audit_log (event_name, event_ext) values (?, ?)', ['setVariantQty', txt])
}

const SET_INVENTORY_LEVEL_MUTATION = `
  mutation SetInventoryLevel($input: InventorySetQuantitiesInput!) {
    inventorySetQuantities(input: $input) {
      inventoryAdjustmentGroup {
        createdAt
        reason
        referenceDocumentUri
        changes {
          name
          delta
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function shopifySetVariantQuantity(variantId: string, availableQuantity: number) {
  try {
    // Get the first location ID
    const data = await shopify.graphql(`
      query GetFirstLocation {
        locations(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    `)
    const locationId = data.locations.edges[0].node.id
    if (!locationId) {
      throw new Error('No locations found')
    }

    // Get the inventory item ID
    const inventoryItemResponse = await shopify.graphql(
      `
      query GetInventoryItem($variantId: ID!) {
        productVariant(id: $variantId) {
          inventoryItem {
            id
          }
        }
      }
    `,
      {
        variantId,
      },
    )
    const inventoryItem = inventoryItemResponse.productVariant.inventoryItem
    if (!inventoryItem) {
      throw new Error('No inventory item found')
    }
    const inventoryItemId = inventoryItem.id
    const input = {
      name: 'available',
      reason: 'correction',
      ignoreCompareQuantity: true,
      quantities: [
        {
          inventoryItemId,
          locationId,
          quantity: availableQuantity,
        },
      ],
    }
    console.log(input)

    // Set the available quantity
    const result = await shopify.graphql(SET_INVENTORY_LEVEL_MUTATION, { input })
    await log(result)
    return result
  } catch (error) {
    await log(error)
    throw error
  }
}
