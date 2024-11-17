'use client'

import { useEffect, useRef } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { useTheme } from 'next-themes'
import '@xterm/xterm/css/xterm.css'

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon>(new FitAddon())
  const { theme } = useTheme()

  useEffect(() => {
    if (!terminalRef.current) return

    // Initialize xterm.js
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
      allowTransparency: true
    })

    xtermRef.current = xterm
    xterm.loadAddon(fitAddonRef.current)
    xterm.open(terminalRef.current)
    fitAddonRef.current.fit()

    xterm.write('Welcome to Procto Terminal\r\nFor help, type "help"\r\n$ ')
    
    let commandBuffer = ''
    
    xterm.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

      if (domEvent.keyCode === 13) { // Enter key
        xterm.write('\r\n')
        handleCommand(commandBuffer)
        commandBuffer = ''
        xterm.write('$ ')
      } else if (domEvent.keyCode === 8) { // Backspace
        if (commandBuffer.length > 0) {
          commandBuffer = commandBuffer.slice(0, -1)
          xterm.write('\b \b')
        }
      } else if (printable) {
        commandBuffer += key
        xterm.write(key)
      }
    })

    const handleCommand = async (command: string) => {
      const trimmedCommand = command.trim()
      if (!trimmedCommand) return

      try {
        const response = await fetch('/api/terminal/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command: trimmedCommand }),
        })

        const result = await response.json()
        if (result.clear) {
          xterm.clear()
        } else if (result.output) {
          xterm.write(`${result.output}\r\n`)
        }
      } catch (error) {
        xterm.write(`Error executing command: ${error}\r\n`)
      }
    }

    // Handle terminal resize
    const handleResize = () => {
      fitAddonRef.current.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      xterm.dispose()
    }
  }, [theme])

  return (
    <div ref={terminalRef} className="h-full w-full terminal-container" />
  )
}
