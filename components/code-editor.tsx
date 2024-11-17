'use client'

import { Editor } from '@monaco-editor/react'
import { useState } from 'react'

interface CodeEditorProps {
  initialValue?: string
  language?: string
  height?: string
  onChange?: (value: string | undefined) => void
  readOnly?: boolean
}

export function CodeEditor({
  initialValue = '// Type your code here...',
  language = 'javascript',
  height = '500px',
  onChange,
  readOnly = false
}: CodeEditorProps) {
  const [value, setValue] = useState(initialValue)

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || '')
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className="relative w-full rounded-md border">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={value}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          folding: true,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: readOnly,
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
          }
        }}
        loading={<div className="p-4">Loading editor...</div>}
      />
    </div>
  )
}
