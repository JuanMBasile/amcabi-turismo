import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'amcabi_admin_token'
const LOGIN_PATH = '/admin/login'

async function deriveToken(secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, keyData)
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir la página de login
  if (pathname === LOGIN_PATH || pathname.startsWith(LOGIN_PATH + '/')) {
    return NextResponse.next()
  }

  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    // Sin ADMIN_SECRET configurado, bloquear acceso al admin
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    const loginUrl = new URL(LOGIN_PATH, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const expectedToken = await deriveToken(secret)
  if (token !== expectedToken) {
    const loginUrl = new URL(LOGIN_PATH, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
