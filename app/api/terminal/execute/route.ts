import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

function formatCommand(command: string, description: string, cmdWidth: number = 10): string {
  return `${command.padEnd(cmdWidth)}${description}`
}

const HELP_TEXT = `Available Commands:
\r\nFile System:
\r${formatCommand('  pwd', 'Show current directory')}
\r${formatCommand('  dir', 'List directory contents')}
\r${formatCommand('  cd <directory>', 'Change directory')}
\r${formatCommand('  mkdir <name>', 'Create a directory')}
\r${formatCommand('  del <file>', 'Delete a file')}
\r${formatCommand('  copy <src> <dst>', 'Copy files')}
\r${formatCommand('  move <src> <dst>', 'Move files')}
\r${formatCommand('  type <file>', 'Display file contents')}

\rNode.js:
\r${formatCommand('  node -v', 'Check Node.js version')}
\r${formatCommand('  npm -v', 'Check npm version')}
\r${formatCommand('  npm install <pkg>', 'Install a package')}
\r${formatCommand('  npm start', 'Start the application')}
\r${formatCommand('  npm run <script>', 'Run npm scripts')}

\rGit:
\r${formatCommand('  git status', 'Check repository status')}
\r${formatCommand('  git add .', 'Stage all changes')}
\r${formatCommand('  git commit -m', 'Commit changes')}
\r${formatCommand('  git push', 'Push changes')}
\r${formatCommand('  git pull', 'Pull changes')}

\rSystem:
\r${formatCommand('  echo <text>', 'Print text')}
\r${formatCommand('  cls', 'Clear screen')}
\r${formatCommand('  ipconfig', 'Show network configuration')}
\r${formatCommand('  tasklist', 'List running processes')}
\r${formatCommand('  systeminfo', 'Display system information')}

\rSpecial:
\r${formatCommand('  help', 'Display this help message')}
\r${formatCommand('  clear', 'Clear the terminal screen')}\r`.trim()

export async function POST(req: Request) {
  try {
    let { command } = await req.json()
    
    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      )
    }

    // Handle special commands
    if (command.trim().toLowerCase() === 'help') {
      return NextResponse.json({ output: HELP_TEXT })
    }

    if (command.trim().toLowerCase() === 'clear') {
      // Send special clear command that will be handled by the frontend
      return NextResponse.json({ clear: true })
    }

    if (command.trim().toLowerCase() === 'pwd') {
      // set command to current directory
      command = 'cd'
    }

    const { stdout, stderr } = await execAsync(command)
    const output = stdout || stderr
    
    return NextResponse.json({ output })
  } catch (error: any) {
    console.error('Error executing command:', error)
    return NextResponse.json(
      { output: error.message || 'Failed to execute command' },
      { status: 500 }
    )
  }
}
