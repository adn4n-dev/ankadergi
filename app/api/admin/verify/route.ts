import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ADMIN_PASSWORD = 'anka123' // İstediğiniz şifre

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Şifre gerekli' },
        { status: 400 }
      )
    }

    // Admin şifresi kontrolü
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        message: 'Giriş başarılı',
        token: 'verified'
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Hatalı şifre' 
      }, { status: 401 })
    }

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Bir hata oluştu' 
    }, { status: 500 })
  }
}
