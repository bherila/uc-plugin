// Mock environment variables before imports
process.env.SHOPIFY_APP_NAME = 'test-app'
process.env.SHOPIFY_ADMIN_API_TOKEN = 'test-token'
process.env.SHOPIFY_API_KEY = 'test-key'
process.env.SHOPIFY_API_SECRET_KEY = 'test-secret'

import shopifyGetOrdersWithLineItems from '../shopifyGetOrdersWithLineItems'
import shopify from '../shopify'

jest.mock('../shopify')

describe('shopifyGetOrdersWithLineItems', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should handle null inventoryItem correctly', async () => {
    const mockResponse = {
      nodes: [
        {
          id: 'gid://shopify/Order/123',
          cancelledAt: null,
          createdAt: '2023-01-01T00:00:00Z',
          email: 'test@example.com',
          displayFinancialStatus: 'PAID',
          totalPriceSet: {
            shopMoney: {
              amount: '100.00',
            },
          },
          totalShippingPriceSet: {
            shopMoney: {
              amount: '10.00',
            },
          },
          lineItems: {
            nodes: [
              {
                line_item_id: 'gid://shopify/LineItem/1',
                currentQuantity: 1,
                title: 'Test Product',
                product: {
                  tags: ['test'],
                },
                variant: {
                  variant_graphql_id: 'gid://shopify/ProductVariant/1',
                  inventoryItem: null, // This should be handled correctly
                },
                originalUnitPriceSet: {
                  shopMoney: {
                    amount: '50.00',
                  },
                },
                discountedTotalSet: {
                  shopMoney: {
                    amount: '50.00',
                  },
                },
              },
            ],
          },
          transactions: [
            {
              id: 'gid://shopify/OrderTransaction/1',
              status: 'SUCCESS',
              kind: 'SALE',
            },
          ],
        },
      ],
    }

    ;(shopify.graphql as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await shopifyGetOrdersWithLineItems(['gid://shopify/Order/123'])

    expect(result).toHaveLength(1)
    expect(result[0].lineItems_nodes).toHaveLength(1)
    // These fields should be null, not undefined
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_id).toBe('null')
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_id).toBe(null)
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_unit).toBe(null)
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_value).toBe(null)
  })

  it('should handle null measurement correctly when inventoryItem exists', async () => {
    const mockResponse = {
      nodes: [
        {
          id: 'gid://shopify/Order/456',
          cancelledAt: null,
          createdAt: '2023-01-01T00:00:00Z',
          email: 'test2@example.com',
          displayFinancialStatus: 'PAID',
          totalPriceSet: {
            shopMoney: {
              amount: '100.00',
            },
          },
          totalShippingPriceSet: {
            shopMoney: {
              amount: '10.00',
            },
          },
          lineItems: {
            nodes: [
              {
                line_item_id: 'gid://shopify/LineItem/2',
                currentQuantity: 2,
                title: 'Test Product 2',
                product: {
                  tags: ['test2'],
                },
                variant: {
                  variant_graphql_id: 'gid://shopify/ProductVariant/2',
                  inventoryItem: {
                    id: 'gid://shopify/InventoryItem/2',
                    measurement: null, // inventoryItem exists but measurement is null
                  },
                },
                originalUnitPriceSet: {
                  shopMoney: {
                    amount: '75.00',
                  },
                },
                discountedTotalSet: {
                  shopMoney: {
                    amount: '75.00',
                  },
                },
              },
            ],
          },
          transactions: [
            {
              id: 'gid://shopify/OrderTransaction/2',
              status: 'SUCCESS',
              kind: 'SALE',
            },
          ],
        },
      ],
    }

    ;(shopify.graphql as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await shopifyGetOrdersWithLineItems(['gid://shopify/Order/456'])

    expect(result).toHaveLength(1)
    expect(result[0].lineItems_nodes).toHaveLength(1)
    // inventoryItem exists so id should be set
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_id).toBe('gid://shopify/InventoryItem/2')
    // measurement is null, so these should be null
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_id).toBe(null)
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_unit).toBe(null)
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_value).toBe(null)
  })

  it('should handle complete measurement data correctly', async () => {
    const mockResponse = {
      nodes: [
        {
          id: 'gid://shopify/Order/789',
          cancelledAt: null,
          createdAt: '2023-01-01T00:00:00Z',
          email: 'test3@example.com',
          displayFinancialStatus: 'PAID',
          totalPriceSet: {
            shopMoney: {
              amount: '100.00',
            },
          },
          totalShippingPriceSet: {
            shopMoney: {
              amount: '10.00',
            },
          },
          lineItems: {
            nodes: [
              {
                line_item_id: 'gid://shopify/LineItem/3',
                currentQuantity: 3,
                title: 'Test Product 3',
                product: {
                  tags: ['test3'],
                },
                variant: {
                  variant_graphql_id: 'gid://shopify/ProductVariant/3',
                  inventoryItem: {
                    id: 'gid://shopify/InventoryItem/3',
                    measurement: {
                      id: 'gid://shopify/Measurement/3',
                      weight: {
                        unit: 'POUNDS',
                        value: 2.5,
                      },
                    },
                  },
                },
                originalUnitPriceSet: {
                  shopMoney: {
                    amount: '90.00',
                  },
                },
                discountedTotalSet: {
                  shopMoney: {
                    amount: '90.00',
                  },
                },
              },
            ],
          },
          transactions: [
            {
              id: 'gid://shopify/OrderTransaction/3',
              status: 'SUCCESS',
              kind: 'SALE',
            },
          ],
        },
      ],
    }

    ;(shopify.graphql as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await shopifyGetOrdersWithLineItems(['gid://shopify/Order/789'])

    expect(result).toHaveLength(1)
    expect(result[0].lineItems_nodes).toHaveLength(1)
    // All fields should be populated
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_id).toBe('gid://shopify/InventoryItem/3')
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_id).toBe('gid://shopify/Measurement/3')
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_unit).toBe('POUNDS')
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_value).toBe(2.5)
  })

  it('should handle null variant correctly', async () => {
    const mockResponse = {
      nodes: [
        {
          id: 'gid://shopify/Order/999',
          cancelledAt: null,
          createdAt: '2023-01-01T00:00:00Z',
          email: 'test4@example.com',
          displayFinancialStatus: 'PAID',
          totalPriceSet: {
            shopMoney: {
              amount: '100.00',
            },
          },
          totalShippingPriceSet: {
            shopMoney: {
              amount: '10.00',
            },
          },
          lineItems: {
            nodes: [
              {
                line_item_id: 'gid://shopify/LineItem/4',
                currentQuantity: 1,
                title: 'Test Product 4',
                product: {
                  tags: ['test4'],
                },
                variant: null, // Entire variant is null
                originalUnitPriceSet: {
                  shopMoney: {
                    amount: '40.00',
                  },
                },
                discountedTotalSet: {
                  shopMoney: {
                    amount: '40.00',
                  },
                },
              },
            ],
          },
          transactions: [
            {
              id: 'gid://shopify/OrderTransaction/4',
              status: 'SUCCESS',
              kind: 'SALE',
            },
          ],
        },
      ],
    }

    ;(shopify.graphql as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await shopifyGetOrdersWithLineItems(['gid://shopify/Order/999'])

    expect(result).toHaveLength(1)
    expect(result[0].lineItems_nodes).toHaveLength(1)
    // All variant-related fields should be null/'null'
    expect(result[0].lineItems_nodes[0].variant_variant_graphql_id).toBe('null')
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_id).toBe('null')
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_id).toBe(null)
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_unit).toBe(null)
    expect(result[0].lineItems_nodes[0].variant_inventoryItem_measurement_weight_value).toBe(null)
  })

  it('should return empty array for empty input', async () => {
    const result = await shopifyGetOrdersWithLineItems([])
    expect(result).toEqual([])
    expect(shopify.graphql).not.toHaveBeenCalled()
  })
})
