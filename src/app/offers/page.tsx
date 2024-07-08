import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'
import React from 'react'
import OfferPageClient from '@/app/offers/OfferPageClient'

export default async function OffersPage() {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }
  return <OfferPageClient />
}
