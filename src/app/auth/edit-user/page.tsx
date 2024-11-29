import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import React from 'react'
import Container from '@/components/container'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { z } from 'zod'
import db from '@/server_lib/db'

export default async function EditUserPage() {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  async function ChangePasswordAction(formData: FormData) {
    'use server'
    const sanitized = z.object({ password: z.string().min(8), uid: z.number().gt(0) }).parse({
      password: formData.get('password'),
      uid: (await getSession())?.uid,
    })
    const newSalt = Math.random() * Number.MAX_SAFE_INTEGER
    await db.query('update users set pw = SHA2(CONCAT(?,CAST(? AS char)), 0), salt = ? where uid = ?', [
      sanitized.password,
      newSalt,
      newSalt,
      sanitized.uid,
    ])
    return { message: 'ok' }
  }

  return (
    <Container>
      <form action={ChangePasswordAction}>
        <h2>Change password</h2>
        New password: <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </Container>
  )
}
