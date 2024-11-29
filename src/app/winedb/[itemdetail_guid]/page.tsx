import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'
import React from 'react'
import OfferListServerComponent from '@/app/offers/OfferListServerComponent'

export default async function DataPage() {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  ;<h2>Item details</h2>
}
