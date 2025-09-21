import './globals.css'
import type { ReactNode } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { SidebarProvider } from '@/contexts/SidebarProvider'
import { LocaleProvider } from '@/contexts/LocaleProvider'
import ToasterProvider from '@/components/feedback/ToasterProvider'
import MockServiceWorker from '@/components/common/MockServiceWorker'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard template',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <MockServiceWorker />
        <ThemeProvider>
          <LocaleProvider>
            <SidebarProvider>
              <ToasterProvider />
              <div className="relative flex min-h-screen">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                  <Header />
                  <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
                </div>
              </div>
            </SidebarProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
