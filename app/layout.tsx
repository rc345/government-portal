import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Samuel Okudzeto Ablakwa - Minister for Foreign Affairs Ghana",
  description:
    "Official personal website of Samuel Okudzeto Ablakwa, Minister for Foreign Affairs and Regional Integration, Republic of Ghana. Dedicated public servant advancing Ghana's interests through diplomatic excellence.",
  keywords:
    "Samuel Okudzeto Ablakwa, Ghana, Foreign Affairs, Diplomacy, International Relations, Minister, Public Servant",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
