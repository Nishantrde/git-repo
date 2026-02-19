import { NextResponse } from 'next/server';

export async function POST() {
  const username = 'Nishantrde';
  const token = process.env.GITHUB_TOKEN;

  // 1. Get all repos for the user
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!reposRes.ok) {
    const errorResponse = NextResponse.json({ error: 'Failed to fetch repositories' }, { status: reposRes.status });
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return errorResponse;
  }

  const repos = await reposRes.json();

  // 2. For each repo, get its tree structure
  const results: Record<string, any> = {};
  for (const repo of repos) {
    const branch = repo.default_branch || 'main';
    const treeUrl = `https://api.github.com/repos/${username}/${repo.name}/git/trees/${branch}?recursive=1`;

    const treeRes = await fetch(treeUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (treeRes.ok) {
      const treeData = await treeRes.json();
      results[repo.name] = treeData.tree;
    } else {
      results[repo.name] = { error: `Failed to fetch tree: ${treeRes.status}` };
    }
  }

  const response = NextResponse.json({ repos: results });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}