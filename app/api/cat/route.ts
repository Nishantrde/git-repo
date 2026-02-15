import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cmd = request.headers.get('cmd');
  return NextResponse.json({ cmd });
}
