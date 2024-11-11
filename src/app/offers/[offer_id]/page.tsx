import React from 'react'
import OfferDetailsServerComponent from '@/app/offers/[offer_id]/OfferDetailsServerComponent'
import z from 'zod'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'

export default async function Page({ params }: { params: Promise<{ offer_id: string }> }) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offerId = z.coerce.number().parse((await params).offer_id)

  return <OfferDetailsServerComponent offer_id={offerId} />
}
