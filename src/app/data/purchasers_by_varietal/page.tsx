import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'
import db from '@/server_lib/db'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Filter from './filter'
import currency from 'currency.js'
import z from 'zod'

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

  const allVarietals: string[] = (
    (await db.query(
      `select distinct cola_varietal c from computed_buyer_varietals order by cola_varietal`,
    )) as any[]
  ).map((row) => row.c)

  const countQuery = (await db.query(
    `
      select count(*) num, sum(total_paid) total
      from computed_buyer_varietals cv join user_list ul on ul.user_guid = cv.winner_guid
      where cola_varietal like ?`,
    [varietal],
  )) as { num: number; total: number }[]
  const query = (await db.query(
    `
      select user_email,
             user_fname,
             user_lname,
             cola_varietal,
             cv.total_paid AS total_paid_for_varietal
      from computed_buyer_varietals cv
             join user_list ul on ul.user_guid = cv.winner_guid
      where cola_varietal like ?
      order by total_paid_for_varietal desc 
      limit 100`,
    [varietal],
  )) as {
    user_email: string
    user_fname: string
    user_lname: string
    cola_varietal: string
    total_paid_for_varietal: number
  }[]

  return (
    <div>
      <Container>
        <h1>{varietal}</h1>
        <Filter />
        <div>
          Total paid:
          <div>{countQuery[0].total}</div>
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
              <td>{currency(row.total_paid_for_varietal).toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
