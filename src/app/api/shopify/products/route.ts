import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import shopify from '@/lib/shopify'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import z from 'zod'
import { getSession } from '@/lib/session'

// <generated>
interface ProductVariant {
  sku: string
  id: string
  price: string
  compareAtPrice: string
  name: string
}

interface ProductNode {
  id: string
  title: string
  variants: {
    nodes: ProductVariant[]
  }
}

interface ProductEdge {
  cursor: string
  node: ProductNode
}

interface PageInfo {
  hasNextPage: boolean
}

interface ProductsResponse {
  pageInfo: PageInfo
  edges: ProductEdge[]
}

interface QueryVariables {
  cursor: string | null
  filter: string
}

interface QueryResponse {
  products: ProductsResponse
}
// </generated>

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return NextResponse.json(null, { status: 403 })
  }

  const type = req.nextUrl.searchParams.get('type') ?? ''
  if (['manifest', 'deal'].indexOf(type) < 0) {
    return NextResponse.json({ error: "Unexpected 'type'" }, { status: 400 })
  }

  const query = `query($cursor: String, $filter: String!){
    products(first: 250, after: $cursor, query: $filter) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          variants(first: 250) {
            nodes {
              id
              displayName
              sku
              price
              compareAtPrice
            }
          }
        }
      }
    }
  }
  `

  let response: QueryResponse
  let lastedge: ProductEdge
  let variable: QueryVariables = {
    cursor: null,
    filter: `tag:${type} status:active`,
  }
  const result: ShopifyProductVariant[] = []
  do {
    response = await shopify.graphql(query, variable)
    const products = Object.values(response.products.edges)
    products.forEach((productEdge) => {
      const product = productEdge.node
      product.variants.nodes.forEach((variant) => {
        result.push({
          productId: product.id,
          productName: product.title,
          variantId: variant.id,
          variantName: variant.name,
          variantPrice: variant.price?.toString(),
          variantCompareAtPrice: variant.compareAtPrice?.toString(),
        })
      })
      lastedge = productEdge
      variable.cursor = lastedge.cursor
    })
  } while (response.products.pageInfo.hasNextPage)
  return NextResponse.json(result)
}
