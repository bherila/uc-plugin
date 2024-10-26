import 'server-only'
import db from '@/lib/db'

export default async function svrDeleteOffer(offer_id: number) {
  await db.query('delete from v3_offer_manifest where assignee_id is null and offer_id = ?', [offer_id])
  const remaining: any[] = await db.query('select count(*) c from v3_offer_manifest where offer_id = ?', [
    offer_id,
  ])
  if (remaining[0].c != 0) {
    throw new Error('Failed to delete offer due to allocated manifests')
  }
  await db.query('delete from v3_offer where offer_id = ?', [offer_id])
}
