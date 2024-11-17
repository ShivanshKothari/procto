"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProps {
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<ThemeProps>) {
  return (
    <NextThemesProvider 
      {...props}
      disableTransitionOnChange={props.disableTransitionOnChange === true}
    >
      {children}
    </NextThemesProvider>
  )
}