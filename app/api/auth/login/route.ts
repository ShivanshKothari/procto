import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // TODO: Implement actual authentication logic
  if (email === 'user@example.com' && password === 'password') {
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}