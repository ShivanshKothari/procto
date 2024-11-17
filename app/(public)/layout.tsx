import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Procto - Next Generation Code Examination Platform",
  description: "Advanced proctoring solution designed specifically for coding assessments and technical interviews.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}