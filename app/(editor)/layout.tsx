import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Procto - Secure Proctored Exam Platform',
  description: 'Customized, secure, and engaging proctored exam and quiz solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}