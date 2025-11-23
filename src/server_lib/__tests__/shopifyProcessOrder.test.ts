import shopifyProcessOrder from '../shopifyProcessOrder'
import shopifyGetOrdersWithLineItems from '../shopifyGetOrdersWithLineItems'
import { prisma } from '@/server_lib/prisma'
import db from '@/server_lib/db'
import { shopifyBeginOrderEdit } from '../shopifyBeginOrderEdit'
import { shopifyCancelOrder } from '../shopifyCancelOrder'
import { shopifySetVariantQuantity } from '../shopifySetVariantQuantity'

// Mock environment variables are now in jest.setup.ts

jest.mock('../shopifyGetOrdersWithLineItems')
jest.mock('@/server_lib/prisma', () => ({
  prisma: {
    order_lock: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      deleteMany: jest.fn(),
    },
    v3_audit_log: {
      create: jest.fn(),
    },
  },
}))
jest.mock('@/server_lib/db', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
    end: jest.fn(),
  },
}))
jest.mock('../shopifyBeginOrderEdit')
jest.mock('../shopifyCancelOrder')
jest.mock('../shopifySetVariantQuantity')

const mockShopifyGetOrdersWithLineItems = jest.mocked(shopifyGetOrdersWithLineItems)
const mockPrisma = jest.mocked(prisma)
const mockDb = jest.mocked(db)
const mockShopifyBeginOrderEdit = jest.mocked(shopifyBeginOrderEdit)
const mockShopifyCancelOrder = jest.mocked(shopifyCancelOrder)
const mockShopifySetVariantQuantity = jest.mocked(shopifySetVariantQuantity)


describe('shopifyProcessOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default mocks to prevent unexpected errors for non-cancelled order flow
    mockPrisma.order_lock.findUnique.mockResolvedValue(null)
    mockPrisma.order_lock.upsert.mockResolvedValue({} as any)
    mockPrisma.order_lock.deleteMany.mockResolvedValue({ count: 1 } as any)
    mockPrisma.v3_audit_log.create.mockResolvedValue({} as any)
    mockDb.query.mockResolvedValue([])
    mockShopifyBeginOrderEdit.mockResolvedValue({ calculatedOrderId: 'gid://shopify/CalculatedOrder/1', editableLineItems: [] } as any)

    mockShopifyGetOrdersWithLineItems.mockResolvedValue([
      {
        id: 'gid://shopify/Order/123',
        cancelledAt: null, // Default to not cancelled
        createdAt: '2023-01-01T00:00:00Z',
        email: 'test@example.com',
        displayFinancialStatus: 'PAID',
        totalPriceSet_shopMoney_amount: 100,
        totalShippingPriceSet_shopMoney_amount: 10,
        totalShippingPriceSet_shopMoney_currencyCode: 'USD',
        shippingLine: null,
        lineItems_nodes: [],
        transactions_nodes: [],
      },
    ] as any)
  })

  it('should skip processing if the order is cancelled', async () => {
    mockShopifyGetOrdersWithLineItems.mockResolvedValue([
      {
        id: 'gid://shopify/Order/123',
        cancelledAt: '2023-01-02T00:00:00Z', // Mark as cancelled
        createdAt: '2023-01-01T00:00:00Z',
        email: 'test@example.com',
        displayFinancialStatus: 'VOIDED',
        totalPriceSet_shopMoney_amount: 0,
        totalShippingPriceSet_shopMoney_amount: 0,
        totalShippingPriceSet_shopMoney_currencyCode: 'USD',
        shippingLine: null,
        lineItems_nodes: [],
        transactions_nodes: [],
      },
    ] as any)

    await shopifyProcessOrder('gid://shopify/Order/123')

    // Expect shopifyGetOrdersWithLineItems to be called once to get the order status
    expect(mockShopifyGetOrdersWithLineItems).toHaveBeenCalledTimes(1)
    expect(mockShopifyGetOrdersWithLineItems).toHaveBeenCalledWith(['gid://shopify/Order/123'])

    // Expect the audit log to be called for the cancellation message
    expect(mockPrisma.v3_audit_log.create).toHaveBeenCalledWith(
        expect.objectContaining({
            data: expect.objectContaining({
                event_name: 'shopifyProcessOrder',
                event_ext: expect.stringContaining('is cancelled, skipping processing.'),
            }),
        }),
    )

    // Expect other processing functions NOT to be called
    expect(mockDb.query).not.toHaveBeenCalled()
    expect(mockShopifyBeginOrderEdit).not.toHaveBeenCalled()
    expect(mockShopifyCancelOrder).not.toHaveBeenCalled()
    expect(mockShopifySetVariantQuantity).not.toHaveBeenCalled()
    expect(mockPrisma.order_lock.deleteMany).toHaveBeenCalledTimes(1) // Lock should still be released
  })

  it('should proceed with processing if the order is not cancelled', async () => {
    await shopifyProcessOrder('gid://shopify/Order/123')

    expect(mockShopifyGetOrdersWithLineItems).toHaveBeenCalledTimes(1)
    expect(mockShopifyGetOrdersWithLineItems).toHaveBeenCalledWith(['gid://shopify/Order/123'])

    // Expect some processing functions to be called (at least db.query for manifests)
    expect(mockDb.query).toHaveBeenCalled()

    // Ensure the cancellation log is NOT called
    expect(mockPrisma.v3_audit_log.create).not.toHaveBeenCalledWith(
        expect.objectContaining({
            data: expect.objectContaining({
                event_ext: expect.stringContaining('is cancelled, skipping processing.'),
            }),
        }),
    )
    expect(mockPrisma.order_lock.deleteMany).toHaveBeenCalledTimes(1)
  })
})
