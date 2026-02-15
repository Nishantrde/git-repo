import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cmd = request.headers.get('cmd');
  const msg = { msg: "gotit" };
  const response = NextResponse.json({ cmd, msg });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, cmd');
  return response;
}

export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, cmd');
  return response;
}



