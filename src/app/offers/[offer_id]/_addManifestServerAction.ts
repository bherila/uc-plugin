import 'server-only'
import svrPutSkuQty from '@/server_lib/svrPutSkuQty'
import { revalidatePath } from 'next/cache'

export async function addManifestAction(
  offerID: number,
  variantID: string,
  qty: number,
) {
  'use server'
  await svrPutSkuQty(offerID, [{ qty, variant_id: variantID }])
  revalidatePath('/offers/' + offerID)
}

export type AddManifestActionType = typeof addManifestAction
