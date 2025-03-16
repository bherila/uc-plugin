import CurrencyDisplay from '@/components/CurrencyDisplay'
import currency from 'currency.js'
import Table from 'react-bootstrap/esm/Table'

export interface SoldManifestsDetailsProps {
  soldManifestItems: SoldManifestItem[]
}

export interface SoldManifestItem {
  wineName: string
  winnerEmail: string
  amountPaid: number
  wineValue: number
  wineCost: number
}

export default function SoldManifestsDetails({ soldManifestItems }: SoldManifestsDetailsProps) {
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Wine Name</th>
          <th>Winner Email</th>
          <th>Wine Value</th>
          <th>Amount Paid</th>
          <th>Wine Cost</th>
          <th>Net Profit</th>
        </tr>
      </thead>
      <tbody>
        {soldManifestItems?.map((item, index) => (
          <tr key={index}>
            <td>{item.wineName}</td>
            <td>{item.winnerEmail}</td>
            <td>{item.wineValue}</td>
            <td>{item.amountPaid}</td>
            <td>{item.wineCost}</td>
            <td>
              <CurrencyDisplay value={currency(item.amountPaid).subtract(item.wineCost).value} digits={2} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
