import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'AgroForge - Loja Agropecuária',
  description:
    'Sua loja agropecuária de confiança com produtos de qualidade, café moído na hora e entrega rápida.',
  keywords:
    'agropecuária, café, sementes, ração, adubos, ferramentas agrícolas',
  openGraph: {
    title: 'AgroForge - Loja Agropecuária',
    description: 'Produtos agropecuários de qualidade com entrega rápida.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `,
            }}
          ></script>
        </CartProvider>
      </body>
    </html>
  )
}
