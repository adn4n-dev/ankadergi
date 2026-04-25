'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'

interface Magazine {
  id: string
  title: string
  description: string
  issue_number: string
  pdf_url: string
  cover_url: string
  created_at: string
}

export function LatestMagazines() {
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/magazines')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMagazines(data.slice(0, 4))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return null
  if (magazines.length === 0) return null

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <BookOpen className="w-6 h-6 text-primary" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Yeni Dergiler
          </h2>
          <p className="text-muted-foreground mt-2">En son yay&#305;nlanan dergilerimiz</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {magazines.map((mag) => (
            <Link
              key={mag.id}
              href={`/dergiler/${mag.id}`}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-border/50">
                {mag.cover_url ? (
                  <img
                    src={mag.cover_url}
                    alt={mag.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen size={48} className="text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-sm font-medium">Oku</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-serif font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {mag.title}
                </h3>
                {mag.issue_number && (
                  <p className="text-xs text-muted-foreground mt-1">Say&#305; {mag.issue_number}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/dergiler"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            T&#252;m Dergiler
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}