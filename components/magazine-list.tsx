'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

interface Magazine {
  id: string
  title: string
  description: string
  issue_number: string
  pdf_url: string
  cover_url: string
  created_at: string
}

export function MagazineList() {
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/magazines')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMagazines(data)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">Yükleniyor...</div>
    )
  }

  if (magazines.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Henüz yayınlanmış dergi bulunmuyor.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {magazines.map((mag) => (
        <Link
          key={mag.id}
          href={`/dergiler/${mag.id}`}
          className="group border border-border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {mag.cover_url ? (
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={mag.cover_url}
                alt={mag.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted flex items-center justify-center">
              <BookOpen size={64} className="text-muted-foreground" />
            </div>
          )}
          <div className="p-5">
            <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
              {mag.title}
            </h3>
            {mag.issue_number && (
              <p className="text-sm text-primary font-medium mt-1">Sayı {mag.issue_number}</p>
            )}
            {mag.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{mag.description}</p>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              {new Date(mag.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
