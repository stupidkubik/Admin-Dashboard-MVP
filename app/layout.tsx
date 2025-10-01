import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { SidebarProvider } from "@/contexts/SidebarProvider";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import ToasterProvider from "@/components/feedback/ToasterProvider";
import MockServiceWorker from "@/components/common/MockServiceWorker";
import SpeedInsights from "@/components/analytics/SpeedInsights";
import {
  DEFAULT_LOCALE,
  getDictionary,
  translate,
  type Locale,
} from "@/lib/i18n";

const resolveRequestLocale = async (): Promise<Locale> => DEFAULT_LOCALE;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dictionary = getDictionary(locale);

  return {
    title: translate(dictionary, "app.metadata.title", "Admin Dashboard"),
    description: translate(
      dictionary,
      "app.metadata.description",
      "Admin dashboard template",
    ),
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await resolveRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <MockServiceWorker />
        <SpeedInsights />
        <ThemeProvider>
          <LocaleProvider initialLocale={locale}>
            <SidebarProvider>
              <ToasterProvider />
              <div className="relative flex min-h-screen w-full">
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Header />
                  <main
                    id="main-content"
                    className="flex-1 w-full min-w-0 py-6"
                  >
                    {children}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
