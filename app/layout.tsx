import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UniTutors - Expert University Tutoring",
  description: "Private tutoring for university students, taught by the best",
  generator: "v0.dev",
  viewport: "width=1200, initial-scale=0.3, minimum-scale=0.3, maximum-scale=1.0, user-scalable=yes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/unitutors-logo-new.png" as="image" type="image/png" />
        {/* Force desktop view on mobile */}
        <meta
          name="viewport"
          content="width=1200, initial-scale=0.3, minimum-scale=0.3, maximum-scale=1.0, user-scalable=yes"
        />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
