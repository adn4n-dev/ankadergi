import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!pdf || !cover) {
      return NextResponse.json({ error: 'PDF ve kapak görseli gereklidir' }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: 'Dergi başlığı gereklidir' }, { status: 400 })
    }

    // Dosya boyutlarını kontrol et
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (pdf.size > maxSize || cover.size > maxSize) {
      return NextResponse.json({ error: 'Dosya boyutu çok büyük (max 50MB)' }, { status: 400 })
    }

    // Dosya tiplerini kontrol et
    if (!pdf.type.includes('pdf') || !cover.type.includes('image')) {
      return NextResponse.json({ error: 'Geçersiz dosya formatı' }, { status: 400 })
    }

    // Supabase client oluştur
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // PDF dosyasını yükle
    const pdfFileName = `${Date.now()}-${pdf.name}`
    const { data: pdfData, error: pdfError } = await supabase
      .storage
      .from('magazines')
      .upload(`pdfs/${pdfFileName}`, pdf, {
        contentType: pdf.type,
        upsert: false
      })

    if (pdfError) {
      console.error('PDF upload error:', pdfError)
      return NextResponse.json({ error: 'PDF yüklenemedi' }, { status: 500 })
    }

    // Kapak görselini yükle
    const coverFileName = `${Date.now()}-${cover.name}`
    const { data: coverData, error: coverError } = await supabase
      .storage
      .from('magazines')
      .upload(`covers/${coverFileName}`, cover, {
        contentType: cover.type,
        upsert: false
      })

    if (coverError) {
      console.error('Cover upload error:', coverError)
      // PDF'i sil
      await supabase.storage.from('magazines').remove([`pdfs/${pdfFileName}`])
      return NextResponse.json({ error: 'Kapak görseli yüklenemedi' }, { status: 500 })
    }

    // Public URL'leri al
    const { data: pdfUrlData } = supabase
      .storage
      .from('magazines')
      .getPublicUrl(`pdfs/${pdfFileName}`)

    const { data: coverUrlData } = supabase
      .storage
      .from('magazines')
      .getPublicUrl(`covers/${coverFileName}`)

    // Dergi kaydını veritabanına ekle
    const { data: magazineData, error: dbError } = await supabase
      .from('magazines')
      .insert({
        title,
        description: description || '',
        pdf_url: pdfUrlData.publicUrl,
        cover_url: coverUrlData.publicUrl,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Dosyaları sil
      await supabase.storage.from('magazines').remove([
        `pdfs/${pdfFileName}`,
        `covers/${coverFileName}`
      ])
      return NextResponse.json({ error: 'Dergi kaydedilemedi' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Dergi yükleme başarılı!',
      magazine: magazineData
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Yükleme sırasında hata oluştu' }, { status: 500 })
  }
}
