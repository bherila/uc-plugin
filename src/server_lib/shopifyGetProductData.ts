import 'server-only'
import shopify from '@/server_lib/shopify'
import { ProductData, ProductDataGrouping, V3Manifest } from '@/app/api/manifest/models'
import groupBySku from '@/lib/groupBySku'
import { cache } from 'react'
import { prisma } from '@/server_lib/prisma'
import { chunk } from 'lodash'

const PRODUCT_QUERY = `#graphql
  query GetProductData($IDs: [ID!]!) {
    nodes(ids: $IDs) {
      ... on ProductVariant {
        id
        inventoryQuantity
        inventoryItem {
          id
          tracked
          measurement {
            id
            weight {
              unit
              value
            }
          }
          unitCost {
            amount
            currencyCode
          }
        }
        product {
          id
          title
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url(transform: { maxWidth: 500, preferredContentType: WEBP })
          }
          metafields(keys: ["custom.end_date", "custom.start_date"], first: 10) {
            nodes {
              key
              jsonValue
            }
          }
          status
          tags
        }
      }
    }
  }
`

async function logError(err: any) {
  const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
  await prisma.v3_audit_log.create({
    data: {
      event_name: 'shopifyGetProductData',
      event_ext: errorMessage,
    },
  })
}

export const shopifyGetProductDataByVariantIds = cache(
  async (variantIds: string[]): Promise<{ [variantId: string]: ProductData }> => {
    try {
      const chunks = chunk(variantIds, 250)
      const promises = chunks.map(async (chunkIds) => {
        const result = await shopify.graphql(PRODUCT_QUERY, { IDs: chunkIds })
        return result.nodes || []
      })

      const results = await Promise.all(promises)
      const allNodes = results.flat()

      const productData: { [id: string]: ProductData } = {}
      allNodes.forEach((node: any) => {
        if (!node) {
          return
        }
        const product = node.product
        const inventoryItem = node.inventoryItem
        const variantId = node.id
        if (!product || !variantId) {
          return
        }
        const productId = product.id
        productData[variantId] = {
          variantId,
          productId,
          title: product.title,
          maxVariantPriceAmount: product.priceRangeV2?.maxVariantPrice?.amount ?? '0.00',
          featuredImageUrl: product.featuredImage?.url ?? null,
          startDate: product.metafields.nodes.find((field: any) => field.key.indexOf('start_date') !== -1)
            ?.jsonValue,
          endDate: product.metafields.nodes.find((field: any) => field.key.indexOf('end_date') !== -1)?.jsonValue,
          status: product.status,
          tags: product.tags,
          weight: inventoryItem?.measurement?.weight?.value ?? null,
          unitCost: inventoryItem?.unitCost,
          variantInventoryQuantity: node.inventoryItem?.tracked ? node.inventoryQuantity : 0,
        }
      })

      return productData
    } catch (err) {
      await logError(err)
      console.error(err)
      return {}
    }
  },
)

export const shopifyGetProductDataByVariantId = cache(async (variantId: string) => {
  const result = await shopifyGetProductDataByVariantIds([variantId])
  return result[variantId]
})

export async function shopifyGetProductDataFromManifests(manifests: V3Manifest[]) {
  const groupedManifests = groupBySku(manifests)
  const allVariantIds = Object.keys(groupedManifests)
  const shopifyProducts = await shopifyGetProductDataByVariantIds(allVariantIds)
  const res: { [key: string]: ProductDataGrouping } = {}
  const totalQty = manifests.length
  for (const key of Object.keys(shopifyProducts)) {
    let product = shopifyProducts[key]
    let qty = groupedManifests[key]?.length ?? 0
    res[key] = {
      featuredImageUrl: product.featuredImageUrl,
      maxVariantPriceAmount: product.maxVariantPriceAmount,
      productId: product.productId,
      qty,
      variantInventoryQuantity: product.variantInventoryQuantity,
      percentChance: (qty / totalQty) * 100,
      title: product.title,
      weight: product.weight ?? null,
      unitCost: product.unitCost,
    }
  }
  return res
}
