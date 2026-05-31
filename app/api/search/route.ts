import { NextResponse, type NextRequest } from 'next/server'
import { sanityClient } from '@/sanity/lib/client'
import { searchQuery } from '@/sanity/lib/queries'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') ?? '').trim()
  if (q.length < 2) {
    return NextResponse.json({ products: [], news: [], categories: [] })
  }
  const data = await sanityClient.fetch(searchQuery, { q })
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=120' },
  })
}
