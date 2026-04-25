import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Sparkles, Crown, Sword, Heart } from "lucide-react"

const mythologyCategories = [
  {
    title: "Antik Yunan Mitolojisi",
    description: "Zeus, Hera, Poseidon ve Olimpos tanrılarının epik hikayeleri",
    icon: <Crown className="w-8 h-8" />,
    color: "from-amber-500 to-orange-600",
    articleCount: 24,
    featuredTopics: ["Olimpos Tanrıları", "Truva Savaşı", "Herakles'in 12 İşi", "Odysseia"]
  },
  {
    title: "Türk Mitolojisi", 
    description: "Oğuz Kağan, Dede Korkut ve bozkurt efsaneleri",
    icon: <Sword className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-600",
    articleCount: 18,
    featuredTopics: ["Oğuz Destanı", "Bozkurt Efsanesi", "Dede Korkut Hikayeleri", "Göktürkler"]
  },
  {
    title: "İskandinav Mitolojisi",
    description: "Thor, Odin ve Ragnarök'ün kuzey epikleri",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500 to-indigo-600", 
    articleCount: 21,
    featuredTopics: ["Ragnarök", "Thor'un Çekici", "Yggdrasil", "Valhalla"]
  },
  {
    title: "Mısır Mitolojisi",
    description: "Ra, İsis ve firavunların ilahi dünyası",
    icon: <Heart className="w-8 h-8" />,
    color: "from-yellow-500 to-amber-600",
    articleCount: 15,
    featuredTopics: ["Ra'nın Yolculuğu", "İsis ve Osiris", "Anubis", "Ölüler Kitabı"]
  },
  {
    title: "Romalı Mitolojisi",
    description: "Jüpiter, Mars ve Roma İmparatorluğu'nun tanrıları",
    icon: <Crown className="w-8 h-8" />,
    color: "from-red-500 to-pink-600",
    articleCount: 12,
    featuredTopics: ["Romulus ve Remus", "Jüpiter", "Venus", "Aeneas"]
  },
  {
    title: "Norse Mitolojisi",
    description: "Cermen halklarının efsaneleri ve kahramanlık öyküleri",
    icon: <Sword className="w-8 h-8" />,
    color: "from-green-500 to-emerald-600",
    articleCount: 16,
    featuredTopics: ["Einherjar", "Valkürler", "Yggdrasil", "Bifrost Köprüsü"]
  }
]

const featuredArticles = [
  {
    id: "1",
    title: "Anka Kuşu: Tüm Kültürlerde Yeniden Doğuş Sembolü",
    category: "Karşılaştırmalı Mitoloji",
    readTime: "8 dk"
  },
  {
    id: "2", 
    title: "Truva Savaşı: Mit ve Gerçek Arasında",
    category: "Antik Yunan",
    readTime: "12 dk"
  },
  {
    id: "3",
    title: "Ragnarök: İskandinav Kıyameti",
    category: "İskandinav Mitolojisi",
    readTime: "6 dk"
  }
]

export default function MitolojiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
              <Sparkles className="w-8 h-8 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mitoloji
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dünyanın dört bir yanından efsaneler, tanrılar ve kahramanlık hikayeleri
            </p>
          </div>

          {/* Mythology Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {mythologyCategories.map((category, index) => (
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

          {/* Featured Articles Section */}
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-3xl p-8 mb-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Öne Çıkan Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="group bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:bg-card transition-all duration-300"
                >
                  <span className="text-xs font-medium text-primary mb-2 uppercase tracking-wide block">
                    {article.category}
                  </span>
                  <h3 className="font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-sm">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{article.readTime} okuma</span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mythology Timeline */}
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              Mitoloji Zaman Çizelgesi
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2" />
              <div className="space-y-12">
                <div className="flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    MÖ 3000 - Mısır Mitolojisi
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                    MÖ 1200 - Antik Yunan Mitolojisi
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    MÖ 500 - Romalı Mitolojisi
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    MS 800 - İskandinav Mitolojisi
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                    MS 1000 - Türk Mitolojisi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
