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

export function isPathRestricted(path: string): boolean {
  const normalizedPath = path.toLowerCase()
  return RESTRICTED_PATHS.some(restricted => 
    normalizedPath.includes(restricted.toLowerCase())
  )
}
