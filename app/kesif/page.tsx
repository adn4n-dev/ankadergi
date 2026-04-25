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
    category: "Kültür",
    type: "article",
    readTime: "9 dk",
    difficulty: "Orta",
    tags: ["Tiyatro", "Antik Yunan", "Dionizos"],
    image: "/images/hero-bg.jpg",
    author: "Dr. Elif Aksoy",
    date: "10 Nisan 2024"
  },
  {
    id: "6",
    title: "Osmanlı Sarayı Sanat ve Estetiği",
    description: "Osmanlı döneminde sanat anlayışı ve saray sanatçıları",
    category: "Sanat",
    type: "article",
    readTime: "7 dk",
    difficulty: "Orta",
    tags: ["Osmanlı", "Saray Sanatı", "Estetik"],
    image: "/images/column-left.jpg",
    author: "Prof. Dr. Caner Şahin",
    date: "8 Nisan 2024"
  }
]

const learningPaths = [
  {
    id: "1",
    title: "Mitolojiye Giriş",
    description: "Mitoloji temellerini öğrenmek için başlangıç yolculuğu",
    level: "Başlangıç",
    duration: "4 hafta",
    modules: 8,
    enrolled: 1234,
    image: "/images/phoenix-logo.jpg"
  },
  {
    id: "2",
    title: "Dünya Mitolojileri",
    description: "Farklı kültürlerin mitolojik geleneklerini keşfedin",
    level: "Orta",
    duration: "6 hafta", 
    modules: 12,
    enrolled: 856,
    image: "/images/hero-bg.jpg"
  },
  {
    id: "3",
    title: "Felsefe ve Mitoloji",
    description: "Felsefi düşüncenin mitolojik kökenleri ve ilişkisi",
    level: "İleri",
    duration: "8 hafta",
    modules: 16,
    enrolled: 432,
    image: "/images/column-left.jpg"
  }
]

export default function KesifPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredContent = allContent.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
              <Compass className="w-8 h-8 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Keşif Merkezi
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bilgiye giden yolculuğunuz burada başlıyor. Keşfet, öğren ve ilham al.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Makaleler, konular veya yazarlar arayın..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium"
              >
                <Filter size={16} />
                Gelişmiş Filtreler
              </button>
            </div>
          </div>

          {/* Featured Content */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Öne Çıkan İçerikler
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredContent.map((content) => (
                <div
                  key={content.id}
                  className="group bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
                >
                  <div className="flex gap-6 p-6">
                    {/* Image */}
                    <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {content.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {content.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {content.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {content.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {content.author} • {content.date}
                        </div>
                        <Link
                          href={`/articles/${content.id}`}
                          className="text-primary font-medium text-sm hover:underline"
                        >
                          Devamını Oku
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Content Grid */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              Tüm İçerikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <div
                  key={content.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {content.category}
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
