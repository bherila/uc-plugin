'use client'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { sessionType } from '@/lib/sessionSchema'
import useSWR from 'swr'

export default function Header() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: session, error, isLoading } = useSWR<sessionType>('/api/session/', fetcher)
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" as={Nav} aria-label="primary navigation">
      <Container>
        <Navbar.Brand href="/" aria-label="Ben Herila">
          UC Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="toggle navigation" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/offers">Offers 🔑</Nav.Link>
            <Nav.Link href="/data">Data</Nav.Link>
          </Nav>
          {!isLoading && (
            <Nav>
              {!session?.uid ? (
                <>
                  <Nav.Link href="/auth/sign-in" aria-label="Sign in">
                    Sign in
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link href="/api/sign-out" aria-label="Sign out">
                  Sign out
                </Nav.Link>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
