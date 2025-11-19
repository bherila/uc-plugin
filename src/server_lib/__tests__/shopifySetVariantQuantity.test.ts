// Mock environment variables before imports
process.env.SHOPIFY_APP_NAME = 'test-app'
process.env.SHOPIFY_ADMIN_API_TOKEN = 'test-token'
process.env.SHOPIFY_API_KEY = 'test-key'
process.env.SHOPIFY_API_SECRET_KEY = 'test-secret'

import { shopifySetVariantQuantity } from '../shopifySetVariantQuantity'
import shopify from '../shopify'
import { prisma } from '../prisma'

jest.mock('../shopify')
jest.mock('../prisma', () => ({
  prisma: {
    v3_audit_log: {
      create: jest.fn(),
    },
  },
}))

describe('shopifySetVariantQuantity', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should set variant quantity to zero', async () => {
    const mockLocationResponse = {
      locations: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Location/456',
            },
          },
        ],
      },
    }

    const mockInventoryResponse = {
      productVariant: {
        inventoryItem: {
          id: 'gid://shopify/InventoryItem/789',
        },
      },
    }

    const mockSetQuantityResponse = {
      inventorySetQuantities: {
        inventoryAdjustmentGroup: {
          createdAt: '2023-01-01T00:00:00Z',
        },
        userErrors: [],
      },
    }
    ;(shopify.graphql as jest.Mock)
      .mockResolvedValueOnce(mockLocationResponse)
      .mockResolvedValueOnce(mockInventoryResponse)
      .mockResolvedValueOnce(mockSetQuantityResponse)

    await shopifySetVariantQuantity('gid://shopify/ProductVariant/123', 0)

    expect(shopify.graphql).toHaveBeenCalledTimes(3)
    expect(prisma.v3_audit_log.create).toHaveBeenCalledTimes(1)
  })

  it('should handle missing inventory data', async () => {
    const mockLocationResponse = {
      locations: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Location/456',
            },
          },
        ],
      },
    }
    const mockInventoryResponse = {
      productVariant: null,
    }
    ;(shopify.graphql as jest.Mock)
      .mockResolvedValueOnce(mockLocationResponse)
      .mockResolvedValueOnce(mockInventoryResponse)

    await expect(
      shopifySetVariantQuantity('gid://shopify/ProductVariant/non-existent', 0),
    ).rejects.toThrow('No inventory item found')
  })
})
