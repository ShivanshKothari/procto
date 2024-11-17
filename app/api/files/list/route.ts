import { NextRequest, NextResponse } from 'next/server'
import { readdirSync, statSync } from 'fs'
import { join, basename } from 'path'
import { isPathRestricted } from '../utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function readDirectoryRecursive(path: string, depth = 0): any[] {
  if (depth > 2) return [] // Limit recursion depth
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
  console.log("Reached get request")
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path')

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    if (isPathRestricted(path)) {
      return NextResponse.json({ error: 'Access to this path is restricted' }, { status: 403 })
    }

    const files = readDirectoryRecursive(path)
    console.log("The files are",files)
    return NextResponse.json(files)
  } catch (error) {
    console.error('Error reading files:', error)
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 })
  }
}
