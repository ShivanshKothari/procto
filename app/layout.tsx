import './globals.css';
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
          <nav className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">Procto</Link>
              <div className="space-x-4">
                <Button asChild variant="ghost">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/exam">Exams</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/editor">Editor</Link>
                </Button>
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}