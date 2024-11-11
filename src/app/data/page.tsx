import Link from 'next/link'
import { Container } from 'react-bootstrap'

const HomePage = () => {
  return (
    <Container className="mt-5">
      <h1>Customer DB</h1>
      <p>
        Welcome to the Customer Database. Here, you can find detailed information about our customers, including
        their purchase history and preferences.
      </p>
      <Link href="./purchasers_by_varietal">View Purchasers by Varietal</Link>
    </Container>
  )
}

export default HomePage
