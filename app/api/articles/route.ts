import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Mock data for development
    const mockData = [
      {
        id: '1',
        title: 'Anka Kuşu Mitolojisi: Yeniden Doğuşun Sembolü',
        description: 'Antik mitolojide Anka Kuşu\'nun kökenleri ve farklı kültürlerdeki yeri',
        content: 'Anka Kuşu, yeniden doğuşun ve ölümsüzlüğün en güçlü sembollerinden biridir...',
        slug: 'anka-kusu-mitolojisi',
        category: 'Mitoloji',
        is_featured: true,
        is_published: true,
        created_at: '2024-04-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Antik Yunan\'da Felsefe ve Mitolojinin Kesişimi',
        description: 'Platon ve Aristoteles\'in mitoloji anlayışı ve felsefi düşünceleri nasıl etkilediği',
        content: 'Antik Yunan\'da felsefe ve mitoloji birbirinden ayrı düşünülemez...',
        slug: 'antik-yunan-felsefe-mitoloji',
        category: 'Felsefe',
        is_featured: true,
        is_published: true,
        created_at: '2024-04-10T10:00:00Z'
      },
      {
        id: '3',
        title: 'Türk Mitolojisinde Kurt ve Bozkurt Efsanesi',
        description: 'Oğuz Kağan Destanı\'nda bozkurtun sembolik anlamı ve Türk kültüründeki yeri',
        content: 'Türk mitolojisinde kurt, özellikle bozkurt, önemli bir semboldür...',
        slug: 'turk-mitolojisi-kurt-bozkurt',
        category: 'Türk Mitolojisi',
        is_featured: false,
        is_published: true,
        created_at: '2024-04-05T10:00:00Z'
      },
      {
        id: '4',
        title: 'İskandinav Mitolojisi: Ragnarök ve Son Savaş',
        description: 'Kuzey mitolojisindeki kıyamet senaryosu ve tanrıların sonu',
        content: 'İskandinav mitolojisinde Ragnarök, dünyanın sonu olarak bilinir...',
        slug: 'iskandinav-mitolojisi-ragnarok',
        category: 'İskandinav Mitolojisi',
        is_featured: true,
        is_published: true,
        created_at: '2024-04-01T10:00:00Z'
      },
      {
        id: '5',
        title: 'Mısır Mitolojisi: Ölüler Kitabı ve Ahiret İnancı',
        description: 'Antik Mısır\'da ölümden sonraki yaşam ve ruhun yolculuğu',
        content: 'Antik Mısır medeniyeti, ahiret inancı açısından en zengin kültürlerden biridir...',
        slug: 'misir-mitolojisi-oluler-kitabi',
        category: 'Mısır Mitolojisi',
        is_featured: false,
        is_published: true,
        created_at: '2024-03-25T10:00:00Z'
      },
      {
        id: '6',
        title: 'Mitolojik Yaratılış Hikayeleri: Karşılaştırmalı Bir Analiz',
        description: 'Farklı kültürlerdeki yaratılış mitlerinin benzerlikleri ve farklılıkları',
        content: 'Her medeniyetin kendine özgü bir yaratılış hikayesi vardır...',
        slug: 'mitolojik-yaratilis-hikayeleri',
        category: 'Karşılaştırmalı Mitoloji',
        is_featured: false,
        is_published: true,
        created_at: '2024-03-20T10:00:00Z'
      }
    ]

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    try {
      const supabase = await createClient()

      let query = supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (featured === 'true') {
        query = query.eq('is_featured', true)
      }

      const { data, error } = await query

      if (error) {
        console.log('Database error, using mock data:', error.message)
        const filteredData = featured === 'true' ? mockData.filter(article => article.is_featured) : mockData
        return NextResponse.json(filteredData)
      }

      return NextResponse.json(data || mockData)
    } catch (dbError) {
      console.log('Database connection failed, using mock data:', dbError)
      const filteredData = featured === 'true' ? mockData.filter(article => article.is_featured) : mockData
      return NextResponse.json(filteredData)
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Makale yüklenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-admin-token')
    if (!token) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, content, slug, category, is_featured, is_published } = body

    if (!title || !description || !slug) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          description,
          content: content || '',
          slug,
          category: category || 'Genel',
          is_featured: is_featured || false,
          is_published: is_published !== false,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data?.[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Makale eklenemedi' },
      { status: 500 }
    )
  }
}
