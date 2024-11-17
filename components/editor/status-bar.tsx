import React from 'react'

interface StatusBarProps {
  currentFile?: string
  cursorPosition?: { line: number; column: number }
  fileType?: string
  encoding?: string
}

export function StatusBar({
  currentFile = 'No file open',
  cursorPosition = { line: 1, column: 1 },
  fileType = 'plaintext',
  encoding = 'UTF-8'
}: StatusBarProps) {
  return (
    <div className="h-6 bg-muted flex items-center justify-between px-2 text-xs text-muted-foreground border-t">
      <div className="flex items-center space-x-4">
        <span>{currentFile}</span>
        <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span>{fileType}</span>
        <span>{encoding}</span>
      </div>
    </div>
  )
}
