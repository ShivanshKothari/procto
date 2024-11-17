import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { isPathRestricted } from '../utils'

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
    const content = readFileSync(path, 'utf-8')
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}
