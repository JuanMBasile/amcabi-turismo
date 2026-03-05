import { NextResponse } from 'next/server'
import { deriveToken } from '../_auth'

const COOKIE_NAME = 'amcabi_admin_token'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body as { password?: string }

    if (!password) {
      return NextResponse.json(
        { error: 'Contraseña requerida' },
        { status: 400 }
      )
    }

    const secret = process.env.ADMIN_SECRET
    if (!secret) {
      return NextResponse.json(
        { error: 'Acceso de administrador no configurado' },
        { status: 500 }
      )
    }

    // Comparación segura
    const encoder = new TextEncoder()
    const a = encoder.encode(password)
    const b = encoder.encode(secret)

    if (a.byteLength !== b.byteLength) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    // Comparación en tiempo constante usando Web Crypto
    const keyA = await crypto.subtle.importKey('raw', a, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const sigA = await crypto.subtle.sign('HMAC', keyA, encoder.encode('verify'))
    const keyB = await crypto.subtle.importKey('raw', b, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const sigB = await crypto.subtle.sign('HMAC', keyB, encoder.encode('verify'))

    const sigABytes = new Uint8Array(sigA)
    const sigBBytes = new Uint8Array(sigB)
    let match = true
    for (let i = 0; i < sigABytes.length; i++) {
      if (sigABytes[i] !== sigBBytes[i]) match = false
    }

    if (!match) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    // Generar token para la cookie
    const token = await deriveToken(secret)

    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 horas
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
