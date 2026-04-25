import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    // Mock data for development
    const mockData = [
      {
        id: '1',
        title: 'Anka Dergi Sayı 1',
        description: 'İlk sayımızda mitoloji ve kültüre dair özel yazılar',
        issue_number: '1',
        pdf_url: '/sample-magazine.pdf',
        cover_url: '/images/phoenix-logo.jpg',
        is_published: true,
        created_at: '2024-04-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Anka Dergi Sayı 2',
        description: 'Antik medeniyetler ve felsefe üzerine özel dosya',
        issue_number: '2',
        pdf_url: '/sample-magazine.pdf',
        cover_url: '/images/hero-bg.jpg',
        is_published: true,
        created_at: '2024-04-01T10:00:00Z'
      },
      {
        id: '3',
        title: 'Anka Dergi Sayı 3',
        description: 'Sanat ve edebiyat özel sayısı',
        issue_number: '3',
        pdf_url: '/sample-magazine.pdf',
        cover_url: '/images/column-left.jpg',
        is_published: true,
        created_at: '2024-03-15T10:00:00Z'
      },
      {
        id: '4',
        title: 'Anka Dergi Sayı 4',
        description: 'Türk mitolojisi ve kültürel miras',
        issue_number: '4',
        pdf_url: '/sample-magazine.pdf',
        cover_url: '/images/phoenix-logo.jpg',
        is_published: true,
        created_at: '2024-03-01T10:00:00Z'
      }
    ]

    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('magazines')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Database error, using mock data:', error.message)
        return NextResponse.json(mockData)
      }

      return NextResponse.json(data || mockData)
    } catch (dbError) {
      console.log('Database connection failed, using mock data:', dbError)
      return NextResponse.json(mockData)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Dergiler yüklenemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-admin-token')
    if (!token) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const issue_number = formData.get('issue_number') as string
    const cover_image = formData.get('cover_image') as File | null

    if (!file || !title) {
      return NextResponse.json({ error: 'PDF dosyası ve başlık gerekli' }, { status: 400 })
    }

    const supabase = await createClient()

    // Upload PDF to Supabase Storage
    const timestamp = Date.now()
    const pdfPath = `magazines/${timestamp}_${file.name}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('magazines')
      .upload(pdfPath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json({ error: 'PDF yüklenemedi: ' + uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from('magazines')
      .getPublicUrl(pdfPath)

    // Upload cover image if provided
    let coverUrl = ''
    if (cover_image && cover_image.size > 0) {
      const coverPath = `covers/${timestamp}_${cover_image.name}`
      const coverBuffer = Buffer.from(await cover_image.arrayBuffer())

      const { error: coverError } = await supabase.storage
        .from('magazines')
        .upload(coverPath, coverBuffer, {
          contentType: cover_image.type,
          upsert: false,
        })

      if (!coverError) {
        const { data: coverUrlData } = supabase.storage
          .from('magazines')
          .getPublicUrl(coverPath)
        coverUrl = coverUrlData.publicUrl
      }
    }

    // Save magazine record
    const { data, error } = await supabase
      .from('magazines')
      .insert([
        {
          title,
          description: description || '',
          issue_number: issue_number || '',
          pdf_url: urlData.publicUrl,
          cover_url: coverUrl,
          is_published: true,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data?.[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Dergi eklenemedi' }, { status: 500 })
  }
}
