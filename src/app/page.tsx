import { Metadata } from 'next'
import Typography from '@/components/typography'
import Link from '@/components/link'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export const metadata: Metadata = {
  title: 'Ben Herila',
}

export default async function HomePage() {
  const Im = <>I&rsquo;m</>
  const Line = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="body1" py={0.5}>
      {children}
    </Typography>
  )
  return (
    <Container>
      <Row className="animate__animated">
        <Col xs={12}>
          <MainTitle>You are probably in the wrong place!</MainTitle>
          <Line>
            This is the UC Admin Portal. It's a mirage. If you want to buy wine, go to{' '}
            <a href="https://www.undergroundcellar.com">undergroundcellar.com</a>.
          </Line>
        </Col>
      </Row>
    </Container>
  )
}
