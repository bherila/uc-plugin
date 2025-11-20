import { POST } from '../route'
import { NextRequest } from 'next/server'

// Mock the dependencies
jest.mock('@/server_lib/db', () => ({
  query: jest.fn(),
  end: jest.fn(),
}))
jest.mock('@/server_lib/shopifyProcessOrder', () => jest.fn())

const mockDb = require('@/server_lib/db')
const mockShopifyProcessOrder = require('@/server_lib/shopifyProcessOrder')

describe('/api/shopify/webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process a valid order webhook with admin_graphql_api_id', async () => {
    const webhookData = {
      admin_graphql_api_id: 'gid://shopify/Order/6049888534571',
      id: 6049888534571,
      // other fields...
    }

    const req = {
      json: jest.fn().mockResolvedValue(webhookData),
    } as unknown as NextRequest

    mockDb.query.mockResolvedValue({})
    mockShopifyProcessOrder.mockResolvedValue({})

    const response = await POST(req)

    expect(response.status).toBe(200)
    expect(mockDb.query).toHaveBeenCalledTimes(1) // log about to process
    expect(mockShopifyProcessOrder).toHaveBeenCalledWith('gid://shopify/Order/6049888534571')
  })

  it('should process a valid order webhook with id only', async () => {
    const webhookData = {
      id: 6049888534571,
      // no admin_graphql_api_id
    }

    const req = {
      json: jest.fn().mockResolvedValue(webhookData),
    } as unknown as NextRequest

    mockDb.query.mockResolvedValue({})
    mockShopifyProcessOrder.mockResolvedValue({})

    const response = await POST(req)

    expect(response.status).toBe(200)
    expect(mockShopifyProcessOrder).toHaveBeenCalledWith('gid://shopify/Order/6049888534571')
  })

  it('should handle order_edit webhook', async () => {
    const webhookData = {
      order_edit: {
        order_id: 6049888534571,
      },
    }

    const req = {
      json: jest.fn().mockResolvedValue(webhookData),
    } as unknown as NextRequest

    mockDb.query.mockResolvedValue({})
    mockShopifyProcessOrder.mockResolvedValue({})

    const response = await POST(req)

    expect(response.status).toBe(200)
    expect(mockShopifyProcessOrder).toHaveBeenCalledWith('gid://shopify/Order/6049888534571')
  })

  it('should return 400 for invalid webhook data', async () => {
    const webhookData = {
      // no id or admin_graphql_api_id
    }

    const req = {
      json: jest.fn().mockResolvedValue(webhookData),
    } as unknown as NextRequest

    mockDb.query.mockResolvedValue({})

    const response = await POST(req)

    expect(response.status).toBe(400)
  })

  it('should return 400 when shopifyProcessOrder throws', async () => {
    const webhookData = {
      admin_graphql_api_id: 'gid://shopify/Order/6049888534571',
    }

    const req = {
      json: jest.fn().mockResolvedValue(webhookData),
    } as unknown as NextRequest

    mockDb.query.mockResolvedValue({})
    mockShopifyProcessOrder.mockRejectedValue(new Error('Processing error'))

    const response = await POST(req)

    expect(response.status).toBe(400)
    expect(mockDb.query).toHaveBeenCalledTimes(3) // log about to process, error parsing, error message
  })
})