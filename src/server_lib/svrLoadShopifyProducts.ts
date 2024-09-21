import 'server-only'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import shopify from '@/lib/shopify'
import { unstable_cache } from 'next/cache'

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
  tags: string[]
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

export type MID = 'manifest-item' | 'deal'

const svrLoadShopifyProducts = async (type: MID) => {
  if (['manifest-item', 'deal'].indexOf(type) < 0) {
    throw new Error('unexpected type')
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
          tags
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
      if (product.tags.length !== 1 || product.tags[0] !== type) {
        return
      }
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
  return result
}

const cachedFn = unstable_cache(
  async (type: MID) => await svrLoadShopifyProducts(type),
  [],
  { revalidate: 30 },
)

export default cachedFn
