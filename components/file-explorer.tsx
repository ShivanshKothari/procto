'use client'

import { useState, useEffect } from 'react'
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@/lib/utils'

interface FileSystemItem {
  name: string
  path: string
  isDirectory: boolean
  children?: FileSystemItem[]
}

interface FileExplorerProps {
  onFileSelect: (path: string) => void
  rootPath: string
}

export function FileExplorer({ onFileSelect, rootPath }: FileExplorerProps) {
  const [files, setFiles] = useState<FileSystemItem[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log("Reached useEffect")
    fetchFiles()
  }, [rootPath])

  const fetchFiles = async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await fetch(`/api/files/list?path=${encodeURIComponent(rootPath)}`)
      // console.log("Hello\n\n\n\n\n\n")
      // console.log(response)
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch files')
      }
      const data = await response.json()
      setFiles(data)
    } catch (error) {
      console.error('Error fetching files:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch files')
    } finally {
      setLoading(false)
    }
  }

  const toggleFolder = async (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const renderItem = (item: FileSystemItem, depth: number = 0) => {
    const isExpanded = expandedFolders.has(item.path)
    const paddingLeft = depth * 12 + 8

    return (
      <div key={item.path}>
        <div
          className={cn(
            "flex items-center py-1 px-2 hover:bg-accent cursor-pointer text-sm",
            "hover:text-accent-foreground"
          )}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (item.isDirectory) {
              toggleFolder(item.path)
            } else {
              onFileSelect(item.path)
            }
          }}
        >
          {item.isDirectory && (
            <span className="mr-1">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
          {item.isDirectory ? (
            <Folder className="h-4 w-4 mr-2 text-blue-500" />
          ) : (
            <File className="h-4 w-4 mr-2 text-gray-500" />
          )}
          <span className="truncate">{item.name}</span>
        </div>
        {item.isDirectory && isExpanded && item.children?.map(child => renderItem(child, depth + 1))}
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2">
        {loading ? (
          <div className="text-sm text-muted-foreground p-2">Loading...</div>
        ) : error ? (
          <div className="text-sm text-red-500 p-2">{error}</div>
        ) : files.length === 0 ? (
          <div className="text-sm text-muted-foreground p-2">No files found</div>
        ) : (
          files.map(file => renderItem(file))
        )}
      </div>
    </ScrollArea>
  )
}
