'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { useTheme } from 'next-themes'
import { FileExplorer } from '@/components/file-explorer'
import { Plus, X } from 'lucide-react'
import { TitleBar } from '@/components/editor/title-bar'
import './editor.css'

// Dynamically import Terminal with no SSR
const Terminal = dynamic(() => import('@/components/terminal').then(mod => mod.Terminal), {
  ssr: false
})

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
})

interface Tab {
  id: string
  title: string
  content: string
  language: string
}

export default function CodeEditor() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [fileType, setFileType] = useState('javascript')
  const [activeEditorTab, setActiveEditorTab] = useState('default')
  const [editorTabs, setEditorTabs] = useState<Tab[]>([
    { 
      id: 'default', 
      title: 'untitled-1.js', 
      content: '// Start coding here', 
      language: 'javascript' 
    }
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEditorDidMount = (editor: any) => {
    editor.onDidChangeCursorPosition((e: any) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column,
      })
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return
    const updatedTabs = editorTabs.map(tab => {
      if (tab.id === activeEditorTab) {
        return { ...tab, content: value }
      }
      return tab
    })
    setEditorTabs(updatedTabs)
  }

  const handlePanelResize = () => {
    window.dispatchEvent(new Event('resize'))
  }

  const handleFileSelect = (path: string) => {
    // TODO: Implement file selection logic
    console.log('Selected file:', path)
  }

  const createNewTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      title: `untitled-${editorTabs.length + 1}.js`,
      content: '// Start coding here',
      language: 'javascript'
    }
    setEditorTabs([...editorTabs, newTab])
    setActiveEditorTab(newTab.id)
  }

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent tab selection when clicking close button
    const updatedTabs = editorTabs.filter(tab => tab.id !== tabId)
    if (updatedTabs.length === 0) {
      // If closing the last tab, create a new empty one
      createNewTab()
    } else if (activeEditorTab === tabId) {
      // If closing the active tab, activate the previous tab
      setActiveEditorTab(updatedTabs[updatedTabs.length - 1].id)
    }
    setEditorTabs(updatedTabs)
  }

  const handleCommand = (command: string) => {
    switch (command) {
      case 'new-file':
        createNewTab()
        break
      case 'toggle-terminal':
        // TODO: Implement terminal toggle
        break
      case 'save':
        // TODO: Implement save functionality
        break
      // Add more command handlers as needed
    }
  }

  if (!mounted) {
    return null
  }

  const activeTabData = editorTabs.find(tab => tab.id === activeEditorTab)

  return (
    <div className="h-[calc(100vh-4rem)] w-screen overflow-hidden bg-background flex flex-col">
      <TitleBar onCommand={handleCommand} />
      <div className="flex-1 min-h-0">
        <PanelGroup
          direction="horizontal"
          className="h-full"
          onLayout={handlePanelResize}
        >
          <Panel defaultSize={20} minSize={10} maxSize={30}>
            <div className="h-full overflow-y-auto border-r">
              <FileExplorer 
                onFileSelect={handleFileSelect}
                rootPath="/workspace" 
              />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-2 bg-border hover:bg-primary/10 transition-colors" />
          
          <Panel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="border-b p-2 flex items-center space-x-2">
                {editorTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center space-x-2 ${
                      activeEditorTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveEditorTab(tab.id)}
                  >
                    <span>{tab.title}</span>
                    <X 
                      className="w-4 h-4 hover:text-destructive" 
                      onClick={(e) => closeTab(tab.id, e)}
                    />
                  </button>
                ))}
                <button
                  className="p-1 rounded-md hover:bg-muted"
                  onClick={createNewTab}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <MonacoEditor
                  height="100%"
                  defaultLanguage={activeTabData?.language || 'javascript'}
                  value={activeTabData?.content}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    cursorStyle: 'line',
                  }}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-border hover:bg-primary/10 transition-colors" />

          <Panel defaultSize={20} minSize={10}>
            <Terminal className="h-full" />
          </Panel>
        </PanelGroup>
      </div>
      <div className="h-6 border-t px-4 py-1 text-sm text-muted-foreground bg-muted flex items-center shrink-0">
        Line {cursorPosition.line}, Column {cursorPosition.column} | {fileType}
      </div>
    </div>
  )
}
