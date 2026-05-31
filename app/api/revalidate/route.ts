import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = { _type?: string; slug?: { current?: string } }

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    }

    revalidateTag(body._type)
    if (body.slug?.current) revalidateTag(`${body._type}:${body.slug.current}`)

    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
