import { NextResponse, type NextRequest } from 'next/server'

const locales = ['tr', 'en'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'tr'

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

function pickLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  const wanted = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase().slice(0, 2))
  for (const l of wanted) {
    if (isLocale(l)) return l
  }
  return defaultLocale
}

const PUBLIC_FILE = /\.(.*)$/
const COOKIE = 'dd-locale'

function withPath(req: NextRequest, pathname: string) {
  const reqHeaders = new Headers(req.headers)
  reqHeaders.set('x-pathname', pathname)
  return reqHeaders
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)

  if (segments[0] && isLocale(segments[0])) {
    const stripped = '/' + segments.slice(1).join('/')
    const url = req.nextUrl.clone()
    url.pathname = stripped === '/' ? '/' : stripped
    const res = NextResponse.rewrite(url, {
      request: { headers: withPath(req, pathname) },
    })
    res.cookies.set(COOKIE, segments[0], { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }

  const cookieLoc = req.cookies.get(COOKIE)?.value
  const locale =
    cookieLoc && isLocale(cookieLoc)
      ? cookieLoc
      : pickLocale(req.headers.get('accept-language'))

  if (locale === defaultLocale) {
    return NextResponse.next({ request: { headers: withPath(req, pathname) } })
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|studio|.*\\..*).*)'],
}
