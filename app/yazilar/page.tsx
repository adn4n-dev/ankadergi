import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, BookOpen, Calendar, User } from "lucide-react"

const articles = [
  {
    id: "1",
    title: "Anka Kuşu Mitolojisi: Yeniden Doğuşun Sembolü",
    description: "Antik mitolojide Anka Kuşu'nun kökenleri ve farklı kültürlerdeki yeri",
    category: "Mitoloji",
    author: "Dr. Ayşe Yılmaz",
    date: "15 Mart 2024",
    readTime: "5 dk",
    image: "/images/phoenix-logo.jpg"
  },
  {
    id: "2", 
    title: "Antik Yunan'da Felsefe ve Mitolojinin Kesişimi",
    description: "Platon ve Aristoteles'in mitoloji anlayışı ve felsefi düşünceleri nasıl etkilediği",
    category: "Felsefe",
    author: "Prof. Mehmet Kaya",
    date: "10 Mart 2024", 
    readTime: "8 dk",
    image: "/images/hero-bg.jpg"
  },
  {
    id: "3",
    title: "Türk Mitolojisinde Kurt ve Bozkurt Efsanesi",
    description: "Oğuz Kağan Destanı'nda bozkurtun sembolik anlamı ve Türk kültüründeki yeri",
    category: "Türk Mitolojisi",
    author: "Doç. Dr. Zeynep Demir",
    date: "5 Mart 2024",
    readTime: "6 dk", 
    image: "/images/column-left.jpg"
  },
  {
    id: "4",
    title: "İskandinav Mitolojisi: Ragnarök ve Son Savaş",
    description: "Kuzey mitolojisindeki kıyamet senaryosu ve tanrıların sonu",
    category: "İskandinav Mitolojisi",
    author: "Arda Öztürk",
    date: "1 Mart 2024",
    readTime: "7 dk",
    image: "/images/phoenix-logo.jpg"
  },
  {
    id: "5",
    title: "Mısır Mitolojisi: Ölüler Kitabı ve Ahiret İnancı",
    description: "Antik Mısır'da ölümden sonraki yaşam ve ruhun yolculuğu",
    category: "Mısır Mitolojisi", 
    author: "Dr. Elif Aksoy",
    date: "25 Şubat 2024",
    readTime: "9 dk",
    image: "/images/hero-bg.jpg"
  },
  {
    id: "6",
    title: "Mitolojik Yaratılış Hikayeleri: Karşılaştırmalı Bir Analiz",
    description: "Farklı kültürlerdeki yaratılış mitlerinin benzerlikleri ve farklılıkları",
    category: "Karşılaştırmalı Mitoloji",
    author: "Prof. Dr. Caner Şahin",
    date: "20 Şubat 2024", 
    readTime: "10 dk",
    image: "/images/column-left.jpg"
  }
]

export default function YazilarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
              <BookOpen className="w-8 h-8 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Yazılar
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mitoloji, kültür ve tarih hakkında derinlemesine yazılar
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  
                  {/* Article Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.readTime} okuma</span>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/articles/${article.id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                  >
                    Devamını Oku
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Daha Fazla Yazı Yükle
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
