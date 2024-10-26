import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import Header from '@/components/header'
import 'animate.css'
import Footer from '@/components/footer'

export const metadata = {
  title: 'UC Admin',
  description: 'UC Admin Portal',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/api/session/" as="fetch" crossOrigin="anonymous" />
      </head>
      <body data-bs-theme="dark">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
