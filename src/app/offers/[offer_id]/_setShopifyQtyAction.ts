'use server'

import { shopifySetVariantQuantity } from '@/server_lib/shopifySetVariantQuantity'
import { revalidatePath } from 'next/cache'

export async function setShopifyQtyAction(variantId: string, offerId: number, quantity: number) {
  try {
    await shopifySetVariantQuantity(variantId, quantity)
    revalidatePath('/offers/' + offerId)
    return { success: true }
  } catch (error) {
    console.error('Error setting Shopify quantity:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}
