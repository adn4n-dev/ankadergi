import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email ve şifre gerekli' },
        { status: 400 }
      )
    }

    // Supabase client oluştur
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Admin tablosundan kullanıcıyı al
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !admin) {
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      )
    }

    // Şifreyi kontrol et (demo için basit comparison)
    // Not: Gerçek uygulamada bcrypt kullanın
    if (password !== admin.password_hash) {
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      adminId: admin.id,
      email: admin.email
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Giriş sırasında hata oluştu' },
      { status: 500 }
    )
  }
}
