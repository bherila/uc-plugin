// Mock environment variables before imports
process.env.SHOPIFY_APP_NAME = 'test-app'
process.env.SHOPIFY_ADMIN_API_TOKEN = 'test-token'
process.env.SHOPIFY_API_KEY = 'test-key'
process.env.SHOPIFY_API_SECRET_KEY = 'test-secret'

import { shopifySetVariantQuantity } from '../shopifySetVariantQuantity'
import shopify from '../shopify'
import db from '../db'

jest.mock('../shopify')
jest.mock('../db')

describe('shopifySetVariantQuantity', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    ;(db.query as jest.Mock).mockResolvedValue([])
  })

  it('should set variant quantity to zero', async () => {
    const mockInventoryResponse = {
      productVariant: {
        inventoryItem: {
          id: 'gid://shopify/InventoryItem/123',
        },
      },
      location: {
        id: 'gid://shopify/Location/456',
      },
    }

    const mockSetQuantityResponse = {
      inventorySetOnHandQuantity: {
        inventoryLevel: {
          id: 'gid://shopify/InventoryLevel/789',
          quantity: 0,
        },
        userErrors: [],
      },
    }

    ;(shopify.graphql as jest.Mock)
      .mockResolvedValueOnce(mockInventoryResponse)
      .mockResolvedValueOnce(mockSetQuantityResponse)

    const result = await shopifySetVariantQuantity('gid://shopify/ProductVariant/123', 0)

    expect(shopify.graphql).toHaveBeenCalledTimes(2)
    expect(result.inventorySetOnHandQuantity.inventoryLevel?.quantity).toBe(0)
  })

  it('should handle missing inventory data', async () => {
    const mockInventoryResponse = {
      productVariant: {
        inventoryItem: null,
      },
      location: null,
    }

    ;(shopify.graphql as jest.Mock).mockResolvedValueOnce(mockInventoryResponse)

    await expect(shopifySetVariantQuantity('invalid-id', 0)).rejects.toThrow(
      'Could not find inventory item or location',
    )
  })
})
