import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TimeBridge - Bridge the World\'s Time Gaps',
  description: 'A powerful time zone coordination tool designed to help users across multiple time zones schedule meetings quickly and accurately.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </body>
    </html>
  )
} 