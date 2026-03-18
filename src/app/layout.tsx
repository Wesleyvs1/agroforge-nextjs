import { ReactNode } from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Epilogue, Outfit } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { AdminProvider } from '@/context/AdminContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const fontHeading = Epilogue({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '800'],
})

const fontBody = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'AgroForge | Excelência no Campo',
  description:
    'Sua parceira premium no agronegócio. Produtos de alta performance, tradição e inovação para o produtor moderno.',
  keywords:
    'agropecuária premium, café artesanal, sementes, ração high-performance, ferramentas agrícolas',
  openGraph: {
    title: 'AgroForge | Excelência no Campo',
    description: 'Tradição e inovação para o agronegócio brasileiro.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body text-stone-900 selection:bg-primary/30 antialiased">
        <AdminProvider>
          <CartProvider>
            <div className="relative min-h-screen">
              {/* Background Texture Overlay */}
              <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1] bg-[url('/bg-texture.png')]" />
              
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </div>

            {/* Google Analytics */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `}
            </Script>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
