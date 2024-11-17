'use client'

import { Button } from './ui/button'
import { 
  Play, 
  Save,
  Settings,
  FileText,
  Terminal as TerminalIcon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

interface EditorNavbarProps {
  onRun: () => void
  onSave: () => void
  onToggleTerminal: () => void
  fileName?: string
}

export function EditorNavbar({ 
  onRun, 
  onSave, 
  onToggleTerminal,
  fileName 
}: EditorNavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center space-x-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {fileName || 'Untitled'}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRun}
          title="Run Code (Ctrl+Enter)"
        >
          <Play className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onSave}
          title="Save (Ctrl+S)"
        >
          <Save className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTerminal}
          title="Toggle Terminal"
        >
          <TerminalIcon className="h-4 w-4" />
        </Button>

        <div className="h-4 w-px bg-border mx-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title="Toggle Theme"
        >
          {theme === 'light' ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
