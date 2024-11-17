"use client"

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Card } from "@/components/ui/card"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { useTheme } from 'next-themes'
import './editor.css'
import { StatusBar } from '@/components/editor/status-bar'
import { EditorTabs, type Tab } from '@/components/editor/editor-tabs'
import { nanoid } from 'nanoid'

// Dynamically import browser-only components
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false
})

const DynamicTerminal = dynamic(() => import('@/components/terminal'), {
  ssr: false
})

const NAVBAR_HEIGHT = 64 // Height of navbar in pixels

export default function CodeEditor() {
  const [code, setCode] = useState('// Start coding here')
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [fileType, setFileType] = useState('javascript')
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [containerHeight, setContainerHeight] = useState('calc(100vh - 64px)')

  // Editor tabs state
  const [editorTabs, setEditorTabs] = useState<Tab[]>([
    { id: 'default', title: 'untitled-1', content: '// Start coding here', language: 'javascript' }
  ])
  const [activeEditorTab, setActiveEditorTab] = useState('default')

  // Terminal tabs state
  const [terminalTabs, setTerminalTabs] = useState<Tab[]>([
    { id: 'terminal-1', title: 'Terminal 1' }
  ])
  const [activeTerminalTab, setActiveTerminalTab] = useState('terminal-1')

  const handleNewEditorTab = () => {
    const newTab: Tab = {
      id: nanoid(),
      title: `untitled-${editorTabs.length + 1}`,
      content: '',
      language: 'javascript'
    }
    setEditorTabs([...editorTabs, newTab])
    setActiveEditorTab(newTab.id)
  }

  const handleNewTerminalTab = () => {
    const newTab: Tab = {
      id: nanoid(),
      title: `Terminal ${terminalTabs.length + 1}`
    }
    setTerminalTabs([...terminalTabs, newTab])
    setActiveTerminalTab(newTab.id)
  }

  const handleEditorTabClose = (tabId: string) => {
    if (editorTabs.length === 1) return
    const newTabs = editorTabs.filter(tab => tab.id !== tabId)
    setEditorTabs(newTabs)
    if (activeEditorTab === tabId) {
      setActiveEditorTab(newTabs[newTabs.length - 1].id)
    }
  }

  const handleTerminalTabClose = (tabId: string) => {
    if (terminalTabs.length === 1) return
    const newTabs = terminalTabs.filter(tab => tab.id !== tabId)
    setTerminalTabs(newTabs)
    if (activeTerminalTab === tabId) {
      setActiveTerminalTab(newTabs[newTabs.length - 1].id)
    }
  }

  useEffect(() => {
    setMounted(true)
    
    // Function to update container height
    const updateHeight = () => {
      const navbar = document.querySelector('nav')
      if (navbar) {
        const navHeight = navbar.getBoundingClientRect().height
        setContainerHeight(`calc(100vh - ${navHeight}px)`)
      }
    }

    // Initial height update
    updateHeight()

    // Update height on window resize
    window.addEventListener('resize', updateHeight)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const handleEditorDidMount = (editor: any) => {
    editor.onDidChangeCursorPosition((e: any) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column
      })
    })
  }

  const handlePanelResize = () => {
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="w-screen bg-background flex flex-col" style={{ height: containerHeight }}>
      <div className="flex-1">
        <PanelGroup
          direction="horizontal"
          className="h-full"
          onLayout={handlePanelResize}
        >
          <Panel defaultSize={60} minSize={30}>
            <Card className="h-full border-0 rounded-none flex flex-col">
              <EditorTabs
                tabs={editorTabs}
                activeTab={activeEditorTab}
                onTabChange={setActiveEditorTab}
                onTabClose={handleEditorTabClose}
                onNewTab={handleNewEditorTab}
                type="editor"
              />
              <div className="flex-1">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="javascript"
                  value={editorTabs.find(tab => tab.id === activeEditorTab)?.content || ''}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  onChange={(value) => {
                    const updatedTabs = editorTabs.map(tab => {
                      if (tab.id === activeEditorTab) {
                        return { ...tab, content: value || '' }
                      }
                      return tab
                    })
                    setEditorTabs(updatedTabs)
                  }}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                  }}
                />
              </div>
            </Card>
          </Panel>
          
          <PanelResizeHandle className="w-2 bg-gray-800 hover:bg-gray-700 transition-colors" />
          
          <Panel defaultSize={40} minSize={20}>
            <Card className="h-full border-0 rounded-none flex flex-col bg-[#1e1e1e]">
              <EditorTabs
                tabs={terminalTabs}
                activeTab={activeTerminalTab}
                onTabChange={setActiveTerminalTab}
                onTabClose={handleTerminalTabClose}
                onNewTab={handleNewTerminalTab}
                type="terminal"
              />
              <div className="flex-1 p-2">
                <DynamicTerminal />
              </div>
            </Card>
          </Panel>
        </PanelGroup>
      </div>
      <StatusBar
        currentFile="No file open"
        cursorPosition={cursorPosition}
        fileType={fileType}
        encoding="UTF-8"
      />
    </div>
  )
}
