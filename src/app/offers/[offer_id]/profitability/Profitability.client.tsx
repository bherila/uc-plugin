'use client'
import { ProductDataGrouping } from '@/app/api/manifest/models'
import Container from '@/components/container'
import CurrencyDisplay from '@/components/CurrencyDisplay'
import currency from 'currency.js'
import { useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Table from 'react-bootstrap/Table'

export default function ProfitabilityUI({
  offerPrice,
  manifestProductData,
}: {
  offerPrice: number
  manifestProductData: { [key: string]: ProductDataGrouping }
}) {
  // Calculate profitability metrics
  let totalRevenue = 0
  let totalCost = 0
  const profitByProduct = Object.entries(manifestProductData).map(([variantId, product]) => {
    const qty = product.qty
    const revenue = currency(offerPrice).multiply(qty).value
    const retailPrice = parseFloat(product.maxVariantPriceAmount)
    const unitCost = product.unitCost ? parseFloat(product.unitCost.amount) : 0
    const profitPerUnit = currency(offerPrice).subtract(unitCost).value

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
      profitPerUnit,
    }
  })

  const totalProfit = totalRevenue - totalCost
  const totalMarginPercent = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  // Sort products by profit margin for best/worst case calculations
  const sortedByProfitPerUnit = [...profitByProduct].sort((a, b) => b.profitPerUnit - a.profitPerUnit)
  const totalQuantity = profitByProduct.reduce((sum, product) => sum + product.qty, 0)

  // Calculate sell-through scenarios
  const sellThroughScenarios = []
  for (let sellQty = 0; sellQty <= totalQuantity; sellQty++) {
    let bestCaseProfit = 0
    let worstCaseProfit = 0
    let bestCaseRevenue = 0
    let worstCaseRevenue = 0
    let bestCaseCost = 0
    let worstCaseCost = 0
    let remainingQty = sellQty

    // Best case: sell highest margin products first
    for (const product of sortedByProfitPerUnit) {
      const qtyToSell = Math.min(remainingQty, product.qty)
      if (qtyToSell > 0) {
        bestCaseProfit += qtyToSell * product.profitPerUnit
        bestCaseRevenue += qtyToSell * offerPrice
        bestCaseCost += qtyToSell * product.unitCost
        remainingQty -= qtyToSell
      }
    }

    // Worst case: sell lowest margin products first
    remainingQty = sellQty
    for (const product of [...sortedByProfitPerUnit].reverse()) {
      const qtyToSell = Math.min(remainingQty, product.qty)
      if (qtyToSell > 0) {
        worstCaseProfit += qtyToSell * product.profitPerUnit
        worstCaseRevenue += qtyToSell * offerPrice
        worstCaseCost += qtyToSell * product.unitCost
        remainingQty -= qtyToSell
      }
    }

    sellThroughScenarios.push({
      quantity: sellQty,
      bestCaseProfit,
      worstCaseProfit,
      bestCaseRevenue,
      worstCaseRevenue,
      bestCaseCost,
      worstCaseCost,
      sellThroughPercent: (sellQty / totalQuantity) * 100,
    })
  }

  // Find minimum quantity for guaranteed profit
  const minQuantityForProfit =
    sellThroughScenarios.find((scenario) => scenario.worstCaseProfit > 0)?.quantity ?? totalQuantity
  const minQuantityPercent = (minQuantityForProfit / totalQuantity) * 100

  // Find absolute best and worst case profits across all scenarios
  const bestCaseScenario = sellThroughScenarios.reduce((best, current) =>
    current.bestCaseProfit > best.bestCaseProfit ? current : best,
  )
  const worstCaseScenario = sellThroughScenarios.reduce((worst, current) =>
    current.worstCaseProfit < worst.worstCaseProfit ? current : worst,
  )

  // Add state for filtering sell-through scenarios
  const [showEvery3Qty, setShowEvery3Qty] = useState(true)

  // Filter sell-through scenarios based on checkbox
  const filteredSellThroughScenarios = showEvery3Qty
    ? sellThroughScenarios.filter((scenario) => scenario.quantity % 3 === 0)
    : sellThroughScenarios

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
            <br />
            <br />
            Min Quantity for Profit: {minQuantityForProfit} ({minQuantityPercent.toFixed(1)}% sell-through)
            <br />
            <br />
            Best Case Profit: <CurrencyDisplay value={bestCaseScenario.bestCaseProfit} digits={2} /> at Qty{' '}
            {bestCaseScenario.quantity}
            <br />
            Worst Case Profit: <CurrencyDisplay value={worstCaseScenario.worstCaseProfit} digits={2} /> at Qty{' '}
            {worstCaseScenario.quantity}
          </p>
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
            <th>
              Total Revenue
              <br />
              <small>(offer price {currency(offerPrice).format()})</small>
            </th>
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

      <h3>Sell-Through Scenarios</h3>
      <div className="mb-2">
        <input
          type="checkbox"
          id="showEvery3Qty"
          checked={showEvery3Qty}
          onChange={(e) => setShowEvery3Qty(e.target.checked)}
          className="me-2"
        />
        <label htmlFor="showEvery3Qty">Show only every 3 quantity</label>
      </div>
      <Table size="sm" striped hover>
        <thead>
          <tr>
            <th>Quantity Sold</th>
            <th>Sell-Through %</th>
            <th>Best Case Revenue</th>
            <th>Best Case Cost</th>
            <th>Best Case Profit</th>
            <th>Worst Case Revenue</th>
            <th>Worst Case Cost</th>
            <th>Worst Case Profit</th>
          </tr>
        </thead>
        <tbody>
          {filteredSellThroughScenarios.map((scenario) => (
            <tr key={scenario.quantity}>
              <td>{scenario.quantity}</td>
              <td>{scenario.sellThroughPercent.toFixed(1)}%</td>
              <td>
                <CurrencyDisplay value={scenario.bestCaseRevenue} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={scenario.bestCaseCost} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={scenario.bestCaseProfit} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={scenario.worstCaseRevenue} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={scenario.worstCaseCost} digits={2} />
              </td>
              <td>
                <CurrencyDisplay value={scenario.worstCaseProfit} digits={2} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
