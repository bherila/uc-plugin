import Table from 'react-bootstrap/Table'
import React from 'react'
import ShopifyOrdersTableRow from './ShopifyOrdersTableRow'

export function ShopifyOrdersTable({ shopifyOrderIds }: { shopifyOrderIds: (string | null)[] }) {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {shopifyOrderIds.map(
          (shopifyOrderId) =>
            shopifyOrderId && <ShopifyOrdersTableRow key={shopifyOrderId} shopifyOrderId={shopifyOrderId} />,
        )}
      </tbody>
    </Table>
  )
}
