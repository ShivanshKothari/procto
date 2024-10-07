import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { documentId, sharedWith } = await request.json();
  
  // TODO: Implement document sharing logic
  return NextResponse.json({ success: true, message: 'Document shared', sharedUrl: 'https://example.com/doc/123' });
}