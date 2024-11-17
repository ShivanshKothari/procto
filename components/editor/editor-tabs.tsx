import React from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Tab {
  id: string
  title: string
  content?: string
  language?: string
}

interface EditorTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  onTabClose: (tabId: string) => void
  onNewTab: () => void
  type: 'editor' | 'terminal'
}

export function EditorTabs({
  tabs,
  activeTab,
  onTabChange,
  onTabClose,
  onNewTab,
  type
}: EditorTabsProps) {
  return (
    <div className="flex items-center h-9 bg-muted border-b">
      <div className="flex-1 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "group flex items-center h-8 px-4 border-r border-b-2 hover:bg-background/50 cursor-pointer",
              activeTab === tab.id ? "bg-background border-b-primary" : "border-b-transparent"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-sm truncate max-w-[150px]">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                className="ml-2 p-0.5 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/20"
                onClick={(e) => {
                  e.stopPropagation()
                  onTabClose(tab.id)
                }}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>
      {type === 'editor' && (
        <button
          className="flex items-center justify-center h-8 w-8 hover:bg-background/50"
          onClick={onNewTab}
        >
          <Plus className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
