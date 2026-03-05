import { cookies } from 'next/headers'

const COOKIE_NAME = 'amcabi_admin_token'

export async function deriveToken(secret: string): Promise<string> {
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

export async function verifyAdminCookie(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false

  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false

  const expectedToken = await deriveToken(secret)
  return token === expectedToken
}
