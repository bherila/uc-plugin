import { NextRequest } from 'next/server'
import { POST } from '../route'
import { getSession } from '@/server_lib/session'
import shopifyGetOrdersWithLineItems from '@/server_lib/shopifyGetOrdersWithLineItems'

// Mock the dependencies
jest.mock('@/server_lib/session')
jest.mock('@/server_lib/shopifyGetOrdersWithLineItems')

// Mock implementations
const mockGetSession = getSession as jest.MockedFunction<typeof getSession>
const mockShopifyGetOrdersWithLineItems = shopifyGetOrdersWithLineItems as jest.MockedFunction<
  typeof shopifyGetOrdersWithLineItems
>

describe('Shopify Orders Webhook API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('should return 403 if user is not authenticated', async () => {
    // Mock session to return unauthenticated user
    mockGetSession.mockResolvedValue({ uid: null!, ax_uc: false })

    const req = new NextRequest('http://localhost/api/shopify/orders', {
      method: 'POST',
      body: JSON.stringify({ orderGraphqlIDs: ['gid://shopify/Order/1234567890'] }),
    })

    const response = await POST(req)
    expect(response.status).toBe(403)
  })

  it('should return 403 if user does not have ax_uc permission', async () => {
    // Mock session to return user without ax_uc permission
    mockGetSession.mockResolvedValue({ uid: 123, ax_uc: false })

    const req = new NextRequest('http://localhost/api/shopify/orders', {
      method: 'POST',
      body: JSON.stringify({ orderGraphqlIDs: ['gid://shopify/Order/1234567890'] }),
    })

    const response = await POST(req)
    expect(response.status).toBe(403)
  })

  it('should return 400 if request body is invalid', async () => {
    // Mock authenticated session
    mockGetSession.mockResolvedValue({ uid: 123, ax_uc: true })

    const req = new NextRequest('http://localhost/api/shopify/orders', {
      method: 'POST',
      body: JSON.stringify({ invalidField: 'invalid' }),
    })

    const response = await POST(req)
    expect(response.status).toBe(400)
  })

  it('should process orders and return summaries for valid request', async () => {
    // Mock authenticated session
    mockGetSession.mockResolvedValue({ uid: 123, ax_uc: true })

    // Mock Shopify order data
    const mockOrders = [
      {
        id: 'gid://shopify/Order/1234567890',
        cancelledAt: null,
        createdAt: '2023-01-01T00:00:00Z',
        email: 'customer1@example.com',
        totalPriceSet: {
          shopMoney: {
            amount: 100.0,
          },
        },
        totalShippingPriceSet: {
          shopMoney: {
            amount: 10.0,
          },
        },
        lineItems: {
          nodes: [
            {
              line_item_id: 'line1',
              quantity: 1,
              title: 'Product 1',
              product: {
                tags: ['tag1', 'tag2'],
              },
              variant: {
                variant_graphql_id: 'gid://shopify/ProductVariant/1',
                inventoryItem: {
                  id: 'inv1',
                  measurement: {
                    id: 'meas1',
                    weight: {
                      value: 1.0,
                      unit: 'KILOGRAMS',
                    },
                  },
                },
              },
              originalUnitPriceSet: {
                shopMoney: {
                  amount: 50.0,
                },
              },
              discountedTotalSet: {
                shopMoney: {
                  amount: 45.0,
                },
              },
            },
            {
              line_item_id: 'line2',
              quantity: 2,
              title: 'Product 2',
              product: {
                tags: ['tag3'],
              },
              variant: {
                variant_graphql_id: 'gid://shopify/ProductVariant/2',
                inventoryItem: {
                  id: 'inv2',
                  measurement: {
                    id: 'meas2',
                    weight: {
                      value: 2.0,
                      unit: 'KILOGRAMS',
                    },
                  },
                },
              },
              originalUnitPriceSet: {
                shopMoney: {
                  amount: 25.0,
                },
              },
              discountedTotalSet: {
                shopMoney: {
                  amount: 20.0,
                },
              },
            },
          ],
        },
      },
      {
        id: 'gid://shopify/Order/0987654321',
        cancelledAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        email: 'customer2@example.com',
        totalPriceSet: {
          shopMoney: {
            amount: 50.0,
          },
        },
        totalShippingPriceSet: {
          shopMoney: {
            amount: 5.0,
          },
        },
        lineItems: {
          nodes: [
            {
              line_item_id: 'line3',
              quantity: 1,
              title: 'Product 3',
              product: {
                tags: ['tag4'],
              },
              variant: {
                variant_graphql_id: 'gid://shopify/ProductVariant/3',
                inventoryItem: {
                  id: 'inv3',
                  measurement: {
                    id: 'meas3',
                    weight: {
                      value: 1.5,
                      unit: 'KILOGRAMS',
                    },
                  },
                },
              },
              originalUnitPriceSet: {
                shopMoney: {
                  amount: 50.0,
                },
              },
              discountedTotalSet: {
                shopMoney: {
                  amount: 45.0,
                },
              },
            },
          ],
        },
      },
    ]

    mockShopifyGetOrdersWithLineItems.mockResolvedValue(mockOrders)

    const orderIds = ['gid://shopify/Order/1234567890', 'gid://shopify/Order/0987654321']

    const req = new NextRequest('http://localhost/api/shopify/orders', {
      method: 'POST',
      body: JSON.stringify({ orderGraphqlIDs: orderIds }),
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual([
      {
        id: 'gid://shopify/Order/1234567890',
        canceledAt: null,
        lineItemCount: 2,
      },
      {
        id: 'gid://shopify/Order/0987654321',
        canceledAt: '2023-01-01T00:00:00Z',
        lineItemCount: 1,
      },
    ])

    // Verify the mock was called with correct parameters
    expect(mockShopifyGetOrdersWithLineItems).toHaveBeenCalledWith(orderIds)
  })

  it('should handle empty order list', async () => {
    // Mock authenticated session
    mockGetSession.mockResolvedValue({ uid: 123, ax_uc: true })

    // Mock empty order response
    mockShopifyGetOrdersWithLineItems.mockResolvedValue([])

    const req = new NextRequest('http://localhost/api/shopify/orders', {
      method: 'POST',
      body: JSON.stringify({ orderGraphqlIDs: [] }),
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual([])
  })
})
