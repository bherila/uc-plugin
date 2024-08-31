import 'server-only'
import db from '@/lib/db'

export default async function svrCreateOffer(parsed: {
  offer_name: string
  offer_variant_id: string
}) {
  await db.query(
    'insert into v3_offer (offer_name, offer_variant_id) values (?, ?)',
    [parsed.offer_name, parsed.offer_variant_id],
  )
}
