import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// List of allowed commands and their safe versions
const ALLOWED_COMMANDS: { [key: string]: string } = {
  'ls': 'dir',
  'dir': 'dir',
  'pwd': 'cd',
  'cd': 'cd',
  'echo': 'echo',
  'type': 'type',
  'node': 'node',
  'npm': 'npm',
  'git': 'git',
}

// List of dangerous flags and patterns to block
const DANGEROUS_PATTERNS = [
  /rm\s+-rf/i,
  /format/i,
  /mkfs/i,
  /dd/i,
  />(>?)/,
  /</,
  /\|/,
  /&/,
  /;/,
  /`/,
  /\$\(/,
  /\\\\/,
  /\.\./,
  /~\/\./,
  /sudo/i,
  /chmod/i,
  /chown/i,
]

function sanitizeCommand(command: string): string | null {
  // Remove any leading/trailing whitespace
  command = command.trim()

  // Check for dangerous patterns
  if (DANGEROUS_PATTERNS.some(pattern => pattern.test(command))) {
    return null
  }

  // Split the command and its arguments
  const [baseCommand, ...args] = command.split(' ')
  const safeCommand = ALLOWED_COMMANDS[baseCommand.toLowerCase()]

  if (!safeCommand) {
    return null
  }

  // Sanitize arguments (basic sanitization, you might want to add more)
  const safeArgs = args
    .filter(arg => !DANGEROUS_PATTERNS.some(pattern => pattern.test(arg)))
    .map(arg => arg.replace(/['"]/g, '')) // Remove quotes
    .join(' ')

  return `${safeCommand} ${safeArgs}`.trim()
}

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json()

    if (!command) {
      return NextResponse.json({ error: 'Command is required' }, { status: 400 })
    }

    const safeCommand = sanitizeCommand(command)
    
    if (!safeCommand) {
      return NextResponse.json(
        { error: 'Command not allowed for security reasons' },
        { status: 403 }
      )
    }

    try {
      const { stdout, stderr } = await execAsync(safeCommand)
      return NextResponse.json({ output: stdout || stderr })
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || 'Command execution failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
