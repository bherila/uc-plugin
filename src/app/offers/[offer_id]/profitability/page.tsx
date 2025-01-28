import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'
import queryOffer from '@/app/api/manifest/queryOffer'
import z from 'zod'
import CurrencyDisplay from '@/components/CurrencyDisplay'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export default async function ProfitabilityPage({ params }: { params: Promise<{ offer_id: string }> }) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offerId = z.coerce.number().parse((await params).offer_id)
  const offer = await queryOffer({ offer_id: offerId })

  if (!offer) {
    return <div>Offer not found</div>
  }

  // Calculate profitability metrics
  let totalRevenue = 0
  let totalCost = 0
  const profitByProduct = Object.entries(offer.manifestProductData).map(([variantId, product]) => {
    const retailPrice = parseFloat(product.maxVariantPriceAmount)
    const unitCost = product.unitCost ? parseFloat(product.unitCost.amount) : 0
    const qty = product.qty
    const revenue = retailPrice * qty
    const cost = unitCost * qty
    const profit = revenue - cost
    const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0

    totalRevenue += revenue
    totalCost += cost

    return {
      variantId,
      title: product.title,
      qty,
      retailPrice,
      unitCost,
      revenue,
      cost,
      profit,
      marginPercent,
    }
  })

  const totalProfit = totalRevenue - totalCost
  const totalMarginPercent = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  return (
    <Container>
      <Row className="mt-4 mb-4">
        <Col>
          <Link href={`/offers/${offerId}/`} className="btn btn-secondary">
            Back
          </Link>
        </Col>
      </Row>

      <MainTitle>Profitability Analysis for {offer.offer_name}</MainTitle>

      <div className="mb-4">
        <h3>Summary</h3>
        <p>
          Total Revenue: <CurrencyDisplay value={totalRevenue} digits={2} />
          <br />
          Total Cost: <CurrencyDisplay value={totalCost} digits={2} />
          <br />
          Total Profit: <CurrencyDisplay value={totalProfit} digits={2} />
          <br />
          Overall Margin: {totalMarginPercent.toFixed(2)}%
        </p>
      </div>

      <h3>Product Breakdown</h3>
      <Table size="sm" striped hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Retail Price</th>
            <th>Unit Cost</th>
            <th>Total Revenue</th>
            <th>Total Cost</th>
            <th>Total Profit</th>
            <th>Margin %</th>
          </tr>
        </thead>
        <tbody>
          {profitByProduct.map((item) => (
            <tr key={item.variantId}>
              <td>{item.title}</td>
              <td>{item.qty}</td>
              <td>
                <CurrencyDisplay value={item.retailPrice} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={item.unitCost} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={item.revenue} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={item.cost} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={item.profit} digits={2} />
              </td>
              <td>{item.marginPercent.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
