'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { useTheme } from 'next-themes'
import '@xterm/xterm/css/xterm.css'

interface TerminalProps {
  className?: string
}

export function Terminal({ className }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const { theme } = useTheme()
  const [isTerminalReady, setIsTerminalReady] = useState(false)

  // Initialize terminal
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!terminalRef.current || xtermRef.current) return

      try {
        // Initialize FitAddon
        fitAddonRef.current = new FitAddon()
        
        // Create new terminal instance
        const xterm = new XTerm({
          cursorBlink: true,
          theme: {
            background: theme === 'dark' ? '#1a1b26' : '#ffffff',
            foreground: theme === 'dark' ? '#a9b1d6' : '#000000',
            cursor: theme === 'dark' ? '#a9b1d6' : '#000000',
            black: theme === 'dark' ? '#1a1b26' : '#000000',
            white: theme === 'dark' ? '#a9b1d6' : '#ffffff',
          },
          fontSize: 14,
          fontFamily: 'Consolas, monospace',
        })

        // Load fit addon
        xterm.loadAddon(fitAddonRef.current)

        // Open terminal in container
        xterm.open(terminalRef.current)

        // Store reference and set ready state
        xtermRef.current = xterm
        setIsTerminalReady(true)

        // Write welcome message
        xterm.write('Welcome to Procto Terminal\r\n$ ')
        
        // Handle input
        xterm.onData(data => {
          xterm.write(data)
        })

      } catch (error) {
        console.error('Failed to initialize terminal:', error)
      }
    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer)
      if (xtermRef.current) {
        xtermRef.current.dispose()
        xtermRef.current = null
      }
    }
  }, [theme])

  // Handle fit addon after terminal is ready
  useEffect(() => {
    if (!isTerminalReady || !fitAddonRef.current) return

    const handleResize = () => {
      try {
        fitAddonRef.current?.fit()
      } catch (error) {
        console.warn('Failed to fit terminal:', error)
      }
    }

    // Initial fit
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isTerminalReady])

  return (
    <div 
      className={className}
      style={{ 
        height: '100%',
        minHeight: '200px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
    >
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  )
}
