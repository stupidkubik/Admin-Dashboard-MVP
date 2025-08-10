import './globals.css'
import type { ReactNode } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { SidebarProvider } from '@/contexts/SidebarProvider'
import ToasterProvider from '@/components/feedback/ToasterProvider'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard template',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <SidebarProvider>
            <ToasterProvider />
            <div className="relative flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
