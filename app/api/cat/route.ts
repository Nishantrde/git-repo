import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cmd = request.headers.get('cmd');
  const msg = {"msg":"gotit"}
  return NextResponse.json({ cmd, msg });
}

