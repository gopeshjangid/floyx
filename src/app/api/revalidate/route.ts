import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  revalidateTag('articleDetail');
  return Response.json({ revalidated: true, now: Date.now() });
}
