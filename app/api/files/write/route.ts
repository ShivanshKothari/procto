import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { filePath, content } = await req.json()
    
    if (!filePath || content === undefined) {
      return NextResponse.json(
        { error: 'File path and content are required' },
        { status: 400 }
      )
    }

    await fs.writeFile(filePath, content, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error writing file:', error)
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 }
    )
  }
}
