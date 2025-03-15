'use client'
import { ProductDataGrouping } from '@/app/api/manifest/models'
import Container from '@/components/container'
import CurrencyDisplay from '@/components/CurrencyDisplay'
import { useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Table from 'react-bootstrap/Table'

export default function ProfitabilityUI({
  manifestProductData,
}: {
  manifestProductData: { [key: string]: ProductDataGrouping }
}) {
  // Sell through percentage
  const [sellThru, setSellThru] = useState<number>(0)

  // Calculate profitability metrics
  let totalRevenue = 0
  let totalCost = 0
  const profitByProduct = Object.entries(manifestProductData).map(([variantId, product]) => {
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
    <Container fluid>
      <Row>
        <Col xs={4} className="mb-4">
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
        </Col>

        <Col xs={4} className="mb-4">
          <h3>Sell Through %</h3>

          <input type="number" value={sellThru} onChange={(e) => setSellThru(parseFloat(e.target.value))} />
          <ul>
            <li>Sell Through %: {sellThru}</li>
            <li>Max profit: </li>
            <li>Min profit: </li>
          </ul>
        </Col>
      </Row>

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
