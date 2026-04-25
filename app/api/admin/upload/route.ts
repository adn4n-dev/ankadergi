import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ 
    error: 'Bu endpoint sadece POST isteklerini kabul eder',
    message: 'Admin panelinden form kullanarak dosya yükleyin'
  }, { status: 405 })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const pdf = formData.get('pdf') as File
    const cover = formData.get('cover') as File

    if (!pdf || !cover) {
      return NextResponse.json({ error: 'PDF ve kapak görseli gereklidir' }, { status: 400 })
    }

    // Dosya boyutlarını kontrol et
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (pdf.size > maxSize || cover.size > maxSize) {
      return NextResponse.json({ error: 'Dosya boyutu çok büyük (max 10MB)' }, { status: 400 })
    }

    // Dosya tiplerini kontrol et
    if (!pdf.type.includes('pdf') || !cover.type.includes('image')) {
      return NextResponse.json({ error: 'Geçersiz dosya formatı' }, { status: 400 })
    }

    // Burada dosyaları kaydetme işlemi yapılacak
    // Şimdilik başarılı mesajı dön
    return NextResponse.json({ 
      success: true,
      message: 'Dergi yükleme başarılı! (Demo mod)',
      fileName: pdf.name,
      fileSize: pdf.size
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Yükleme sırasında hata oluştu' }, { status: 500 })
  }
}
