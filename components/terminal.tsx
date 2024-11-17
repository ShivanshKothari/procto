'use client'

import { useEffect, useRef } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon>(new FitAddon())

  useEffect(() => {
    if (!terminalRef.current) return

    // Initialize xterm.js
    const xterm = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1a1b26',
        foreground: '#a9b1d6'
      }
    })

    xtermRef.current = xterm
    xterm.loadAddon(fitAddonRef.current)
    xterm.open(terminalRef.current)
    fitAddonRef.current.fit()

    // Optional: Add a welcome message
    xterm.writeln('Welcome to the terminal!')
    xterm.writeln('Type your commands here...')

    // Handle terminal resize
    const handleResize = () => {
      fitAddonRef.current.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      xterm.dispose()
    }
  }, [])

  return (
    <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />
  )
}
