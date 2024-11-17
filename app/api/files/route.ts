import { NextRequest, NextResponse } from 'next/server'
import { readdirSync, statSync } from 'fs'
import { join, basename } from 'path'

const RESTRICTED_PATHS = [
  '/windows',
  '/program files',
  '/program files (x86)',
  '/users',
  '/system32',
  '/..',
  '../',
  '..',
  '/'
]

function isPathRestricted(path: string): boolean {
  const normalizedPath = path.toLowerCase()
  return RESTRICTED_PATHS.some(restricted => 
    normalizedPath.includes(restricted.toLowerCase())
  )
}

function readDirectoryRecursive(path: string, depth = 0): any[] {
  if (depth > 3) return [] // Limit recursion depth
  if (isPathRestricted(path)) return []

  try {
    const items = readdirSync(path)
    return items.map(item => {
      const fullPath = join(path, item)
      try {
        const stats = statSync(fullPath)
        const isDirectory = stats.isDirectory()

        return {
          name: basename(item),
          path: fullPath,
          isDirectory,
          ...(isDirectory && depth < 2 && {
            children: readDirectoryRecursive(fullPath, depth + 1)
          })
        }
      } catch (error) {
        console.error(`Error reading ${fullPath}:`, error)
        return null
      }
    }).filter(Boolean)
  } catch (error) {
    console.error(`Error reading directory ${path}:`, error)
    return []
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 })
  }

  if (isPathRestricted(path)) {
    return NextResponse.json({ error: 'Access to this path is restricted' }, { status: 403 })
  }

  try {
    const files = readDirectoryRecursive(path)
    return NextResponse.json(files)
  } catch (error) {
    console.error('Error reading files:', error)
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 })
  }
}
