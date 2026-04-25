import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Palette, Music, Theater, Brush, Camera, Book } from "lucide-react"

const cultureCategories = [
  {
    title: "Sanat ve Estetik",
    description: "Görsel sanatlar, resim, heykel ve modern sanat akımları",
    icon: <Palette className="w-8 h-8" />,
    color: "from-pink-500 to-rose-600",
    articleCount: 18,
    featuredTopics: ["Rönesans Sanatı", "Modern Sanat", "Dijital Sanat", "Sokak Sanatı"]
  },
  {
    title: "Müzik ve Dans",
    description: "Klasik müzikten halk müziğine, dansın evrensel dili",
    icon: <Music className="w-8 h-8" />,
    color: "from-purple-500 to-indigo-600",
    articleCount: 22,
    featuredTopics: ["Klasik Müzik", "Dünya Müzikleri", "Halk Dansları", "Modern Dans"]
  },
  {
    title: "Tiyatro ve Sinema",
    description: "Dramatik sanatlar, tiyatro tarihi ve sinema kültürü",
    icon: <Theater className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-600",
    articleCount: 25,
    featuredTopics: ["Antik Tiyatro", "Modern Tiyatro", "Dünya Sineması", "Film Analizleri"]
  },
  {
    title: "Edebiyat ve Şiir",
    description: "Dünya edebiyatı, şiir ve yazar portreleri",
    icon: <Book className="w-8 h-8" />,
    color: "from-green-500 to-emerald-600",
    articleCount: 30,
    featuredTopics: ["Klasik Edebiyat", "Modern Şiir", "Roman Analizleri", "Yazar Röportajları"]
  },
  {
    title: "Fotoğrafçılık",
    description: "Fotoğraf sanatı, teknikler ve ünlü fotoğrafçılar",
    icon: <Camera className="w-8 h-8" />,
    color: "from-yellow-500 to-amber-600",
    articleCount: 15,
    featuredTopics: ["Siyah Beyaz Fotoğraf", "Doğa Fotoğrafçılığı", "Portre", "Sokak Fotoğrafçılığı"]
  },
  {
    title: "Geleneksel Sanatlar",
    description: "El sanatları, geleneksel zanaatlar ve kültürel miras",
    icon: <Brush className="w-8 h-8" />,
    color: "from-red-500 to-pink-600",
    articleCount: 20,
    featuredTopics: ["Çini Sanatı", "Hat Sanatı", "Tezhip", "Minyatür"]
  }
]

const featuredExhibitions = [
  {
    id: "1",
    title: "Rönesans'tan Modern Sanata: Sanat Tarihi Serüveni",
    category: "Sanat Tarihi",
    date: "15 Nisan - 15 Mayıs 2024",
    image: "/images/hero-bg.jpg"
  },
  {
    id: "2",
    title: "Dünya Müzikleri Festivali: Kültürler Arası Diyalog",
    category: "Müzik",
    date: "1-30 Haziran 2024",
    image: "/images/phoenix-logo.jpg"
  },
  {
    id: "3",
    title: "Antik Tiyatro Günleri: Dionizos'un Mirası",
    category: "Tiyatro",
    date: "20-25 Temmuz 2024",
    image: "/images/column-left.jpg"
  }
]

const culturalEvents = [
  {
    date: "25 Nisan 2024",
    title: "İstanbul Film Festivali",
    type: "Sinema",
    location: "İstanbul"
  },
  {
    date: "5 Mayıs 2024", 
    title: "Uluslararası Müzik Festivali",
    type: "Müzik",
    location: "Ankara"
  },
  {
    date: "15 Mayıs 2024",
    title: "Geleneksel Sanatlar Sergisi",
    type: "Geleneksel Sanat",
    location: "İzmir"
  },
  {
    date: "1 Haziran 2024",
    title: "Modern Sanat Bienali",
    type: "Modern Sanat",
    location: "Antalya"
  }
]

export default function KulturPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
              <Palette className="w-8 h-8 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Kültür ve Sanat
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sanatın tüm renkleri, kültürel miras ve yaratıcı ifadeler
            </p>
          </div>

          {/* Culture Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {cultureCategories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      <span className="text-xs text-primary font-medium">
                        {category.articleCount} yazı
                      </span>
                    </div>
                  </div>

                  {/* Featured Topics */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Öne Çıkan Konular
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.featuredTopics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore Link */}
                  <Link
                    href={`/yazilar?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm hover:gap-3 transition-all"
                  >
                    Keşfet
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Exhibitions */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
              Öne Çıkan Sergiler ve Etkinlikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredExhibitions.map((exhibition) => (
                <div
                  key={exhibition.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
                >
                  {/* Exhibition Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={exhibition.image}
                      alt={exhibition.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {exhibition.category}
                      </span>
                    </div>
                  </div>

                  {/* Exhibition Content */}
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {exhibition.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {exhibition.date}
                    </p>
                    <Link
                      href={`/events/${exhibition.id}`}
                      className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                    >
                      Detaylar
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Events Timeline */}
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-3xl p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Yaklaşan Kültürel Etkinlikler
            </h2>
            <div className="space-y-4">
              {culturalEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50"
                >
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {event.date.split(' ')[1]}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {event.date.split(' ')[0]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.date.split(' ')[2]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{event.type}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
