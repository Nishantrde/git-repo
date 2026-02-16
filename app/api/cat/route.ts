import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const owner = 'Nishantrde';
  const repo = 'Nishantrde.github.io';
  const token = process.env.GITHUB_TOKEN;
  const filePath = request.headers.get('cmd'); // file path from header

  if (!filePath) {
    const errorResponse = NextResponse.json({ error: 'Missing file path in cmd header' }, { status: 400 });
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, cmd');
    return errorResponse;
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    const errorResponse = NextResponse.json({ error: 'cat: yes.html: No such file or directory' }, { status: res.status });
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, cmd');
    return errorResponse;
  }

  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  const response = NextResponse.json({ content });
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
