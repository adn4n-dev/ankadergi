import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('magazines')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Dergi bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('x-admin-token')
    if (!token) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params
    const supabase = await createClient()

    // Get magazine to find file paths
    const { data: magazine } = await supabase
      .from('magazines')
      .select('pdf_url, cover_url')
      .eq('id', id)
      .single()

    if (magazine) {
      // Delete files from storage
      const pdfPath = magazine.pdf_url.split('/magazines/').pop()
      if (pdfPath) {
        await supabase.storage.from('magazines').remove([pdfPath])
      }
      if (magazine.cover_url) {
        const coverPath = magazine.cover_url.split('/magazines/').pop()
        if (coverPath) {
          await supabase.storage.from('magazines').remove([coverPath])
        }
      }
    }

    const { error } = await supabase
      .from('magazines')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
  }
}
