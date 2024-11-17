'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TitleBarProps {
  onCommand?: (command: string) => void
}

type MenuItem = {
  label: string
  command: string
} | {
  type: 'separator'
}

type MenuItems = {
  [key: string]: MenuItem[]
}

export function TitleBar({ onCommand }: TitleBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const menuItems: MenuItems = {
    File: [
      { label: 'New File', command: 'new-file' },
      { label: 'Open File...', command: 'open-file' },
      { label: 'Save', command: 'save' },
      { label: 'Save As...', command: 'save-as' },
      { type: 'separator' },
      { label: 'Exit', command: 'exit' },
    ],
    Edit: [
      { label: 'Undo', command: 'undo' },
      { label: 'Redo', command: 'redo' },
      { type: 'separator' },
      { label: 'Cut', command: 'cut' },
      { label: 'Copy', command: 'copy' },
      { label: 'Paste', command: 'paste' },
    ],
    View: [
      { label: 'Command Palette...', command: 'command-palette' },
      { type: 'separator' },
      { label: 'Terminal', command: 'toggle-terminal' },
      { label: 'Problems', command: 'toggle-problems' },
      { label: 'Output', command: 'toggle-output' },
    ],
    Help: [
      { label: 'Documentation', command: 'show-docs' },
      { label: 'About', command: 'show-about' },
    ],
  }

  const handleCommand = (command: string) => {
    onCommand?.(command)
    setActiveDropdown(null)
  }

  return (
    <div className="h-7 bg-background border-b flex items-center px-2 select-none">
      {Object.entries(menuItems).map(([menu, items]) => (
        <DropdownMenu
          key={menu}
          open={activeDropdown === menu}
          onOpenChange={(open) => setActiveDropdown(open ? menu : null)}
        >
          <DropdownMenuTrigger
            className={`px-3 py-0.5 text-sm hover:bg-accent rounded-sm ${
              activeDropdown === menu ? 'bg-accent' : ''
            }`}
          >
            {menu}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[180px]">
            {items.map((item, index) => 
              'type' in item && item.type === 'separator' ? (
                <DropdownMenuSeparator key={index} />
              ) : (
                <DropdownMenuItem
                  key={index}
                  onClick={() => 'command' in item && handleCommand(item.command)}
                >
                  {('label' in item) && item.label}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  )
}
