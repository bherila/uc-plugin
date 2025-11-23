// Mock environment variables before imports
process.env.SHOPIFY_APP_NAME = 'test-app'
process.env.SHOPIFY_ADMIN_API_TOKEN = 'test-token'
process.env.SHOPIFY_API_KEY = 'test-key'
process.env.SHOPIFY_API_SECRET_KEY = 'test-secret'

import '@testing-library/jest-dom'

// Mock Next.js components and functions
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      json: async () => data,
      headers: new Map(),
    })),
  },
  NextRequest: jest.fn().mockImplementation((url, init) => ({
    url,
    ...init,
    json: async () => init?.body ? JSON.parse(init.body) : {},
    headers: new Map(),
  })),
}))

// Mock server-only
jest.mock('server-only', () => ({}))

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
  headers: jest.fn(() => new Map()),
}))

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})
