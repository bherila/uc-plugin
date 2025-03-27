import { getSession } from '@/server_lib/session'
import { redirect, RedirectType } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'

export default async function DataPage() {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }
}
