'use client'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import * as React from 'react'

export default function Footer() {
  return (
    <Navbar
      as="footer"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{ marginTop: '10em' }}
      aria-label="Footer Navigation"
    >
      <Container>
        <Navbar.Text>&copy; 2024</Navbar.Text>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="responsive-navbar-nav" aria-labelledby="responsive-navbar-nav-label">
          <Nav className="me-auto" aria-label="Left navigation"></Nav>
          <Nav>
            <Nav.Link href="https://www.undergroundcellar.com" aria-label="Main website">
              Underground Cellar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
