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
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <SidebarProvider>
            <ToasterProvider />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
