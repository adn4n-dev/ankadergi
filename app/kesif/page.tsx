"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search, Compass, BookOpen, Star, TrendingUp, Clock, Filter } from "lucide-react"
import { useState } from "react"

const categories = [
  { id: "all", name: "Tümü", icon: <Compass className="w-4 h-4" /> },
  { id: "mitoloji", name: "Mitoloji", icon: <Star className="w-4 h-4" /> },
  { id: "kultur", name: "Kültür", icon: <BookOpen className="w-4 h-4" /> },
  { id: "tarih", name: "Tarih", icon: <Clock className="w-4 h-4" /> },
  { id: "sanat", name: "Sanat", icon: <Star className="w-4 h-4" /> },
  { id: "felsefe", name: "Felsefe", icon: <TrendingUp className="w-4 h-4" /> }
]

const featuredContent = [
  {
    id: "1",
    title: "Anka Kuşu Mitolojisi: Tüm Kültürlerde Yeniden Doğuş Sembolü",
    description: "Antik Mısır'dan Çin'e, Yunan'dan Latin Amerika'ya Anka Kuşu efsanesinin kökenleri ve evrimi",
    category: "Mitoloji",
    type: "article",
    readTime: "12 dk",
    difficulty: "Orta",
    tags: ["Anka Kuşu", "Yeniden Doğuş", "Karşılaştırmalı Mitoloji"],
    image: "/images/phoenix-logo.jpg",
    author: "Dr. Ayşe Yılmaz",
    date: "20 Nisan 2024",
    featured: true
  },
  {
    id: "2",
    title: "Rönesans Sanatı ve Mitolojik Temalar",
    description: "Rönesans dönemi sanatçılarının antik mitolojiyi nasıl yeniden yorumladığı",
    category: "Sanat",
    type: "article", 
    readTime: "8 dk",
    difficulty: "Başlangıç",
    tags: ["Rönesans", "Sanat Tarihi", "Mitoloji"],
    image: "/images/hero-bg.jpg",
    author: "Prof. Mehmet Kaya",
    date: "18 Nisan 2024",
    featured: true
  },
  {
    id: "3",
    title: "Stoa Felsefesi ve Modern Yaşam",
    description: "Antik Stoacılığın günümüz yaşamına uyarlanması ve pratik felsefe",
    category: "Felsefe",
    type: "article",
    readTime: "10 dk", 
    difficulty: "İleri",
    tags: ["Stoacılık", "Pratik Felsefe", "Modern Yaşam"],
    image: "/images/column-left.jpg",
    author: "Doç. Dr. Zeynep Demir",
    date: "15 Nisan 2024",
    featured: true
  }
]

const allContent = [
  ...featuredContent,
  {
    id: "4",
    title: "Türk Mitolojisinde Kurt Sembolizmi",
    description: "Bozkurt efsanesinin Türk kültüründeki önemi ve sembolik anlamları",
    category: "Mitoloji",
    type: "article",
    readTime: "6 dk",
    difficulty: "Başlangıç",
    tags: ["Türk Mitolojisi", "Bozkurt", "Sembolizm"],
    image: "/images/phoenix-logo.jpg",
    author: "Arda Öztürk",
    date: "12 Nisan 2024"
  },
  {
    id: "5",
    title: "Antik Yunan Tiyatrosunun Kökenleri",
    description: "Dionizos ritüellerinden tragediyanın doğuşuna tiyatro tarihi",

export default function KesifPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Keşfet
            </h1>
            <p className="text-xl text-muted-foreground">
              Keşfetmek için hazır
            </p>
          </header>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="bg-card rounded-2xl p-12 shadow-lg border border-border/50 max-w-md mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <div className="text-4xl text-secondary-foreground">🔍</div>
                </div>
              </div>
              
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Keşfet
              </h2>
              <p className="text-muted-foreground mb-8">
                Bu sayfa geliştirme aşamasındadır.
              </p>
              <p className="text-sm text-muted-foreground">
                Yakında yeni içerikler eklenecek.
              </p>
              
              <div className="mt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  ← Ana Sayfaya Dön
                </Link>
              </div>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {content.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {content.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{content.readTime} okuma</span>
                      <span>{content.difficulty}</span>
                    </div>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {content.author}
                      </div>
                      <Link
                        href={`/articles/${content.id}`}
                        className="text-primary font-medium text-sm hover:underline"
                      >
                        Oku
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Paths */}
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-3xl p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
              Öğrenme Yolları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <div
                  key={path.id}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50"
                >
                  <div className="h-32 relative">
                    <img
                      src={path.image}
                      alt={path.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {path.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {path.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between">
                        <span>Seviye:</span>
                        <span className="text-primary font-medium">{path.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Süre:</span>
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modül:</span>
                        <span>{path.modules} adet</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Katılımcı:</span>
                        <span>{path.enrolled} kişi</span>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Başla
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
