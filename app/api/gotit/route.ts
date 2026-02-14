import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'got it!!' });
}
export async function POST() {
  const owner = 'Nishantrde'; // replace with the repo owner
  const repo = 'Nishantrde.github.io';   // replace with the repo name
  const branch = 'main';      // or your branch name
  const token = process.env.GITHUB_TOKEN; // store your token in .env.local

  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch repo structure' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ tree: data.tree });
}
