import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Anka Dergi - Fikirler Sınırların Ötesine Kanat Açar',
  description: 'Mitoloji, kültür ve tarih hakkında derinlemesine yazılar. Anka Kuşu gibi yeniden doğuşun gücünü keşfedin.',
  icons: {
    icon: '/images/phoenix-logo.jpg',
    apple: '/images/phoenix-logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
