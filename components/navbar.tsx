'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react'
import { AuthDialog } from '@/components/auth-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-6 md:px-8">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-tight">Procto</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4">
          <nav className="flex items-center space-x-8">
            <Link
              href="/editor"
              className="text-sm font-medium hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              Editor
            </Link>
            <Link
              href="/exam"
              className="text-sm font-medium hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              Exams
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <AuthDialog />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <SunIcon className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <MoonIcon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <MonitorIcon className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
