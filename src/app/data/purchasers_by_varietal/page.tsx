import { getSession } from '@/server_lib/session'
import { redirect, RedirectType } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Filter from './filter'
import currency from 'currency.js'
import z from 'zod'
import { by_varietal_buyer_info, by_varietal_counts } from '@prisma/client/sql'
import { prisma } from '@/server_lib/prisma'

export default async function DataPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const params = z
    .object({
      min_amount: z.coerce.number().default(0),
      max_amount: z.coerce.number().default(999999999),
      varietal: z.string().default(''),
    })
    .parse(await searchParams)

  const varietal = params.varietal + '%'

  // const allVarietals: string[] = (
  //   (await db.query(
  //     `select distinct cola_varietal c from computed_buyer_varietals order by cola_varietal`,
  //   )) as any[]
  // ).map((row) => row.c)

  const countQuery = await prisma.$queryRawTyped(by_varietal_counts(varietal))
  const query = await prisma.$queryRawTyped(by_varietal_buyer_info(varietal))

  return (
    <div>
      <Container>
        <h1>{varietal}</h1>
        <Filter />
        <div>
          Total paid:
          <div>{countQuery[0].total?.toString()}</div>
        </div>
        <div>Num rows = {countQuery[0].num}</div>
      </Container>
      <Table size="sm" bordered striped>
        <thead>
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Varietal</th>
            <th>Total paid</th>
          </tr>
        </thead>
        <tbody>
          {query.map((row, i) => (
            <tr key={i}>
              <td>{row.user_email}</td>
              <td>{row.user_fname}</td>
              <td>{row.user_lname}</td>
              <td>{row.cola_varietal}</td>
              <td>{currency(row.total_paid_for_varietal.toString()).toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
