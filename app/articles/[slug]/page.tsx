import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User, Share2, Bookmark } from "lucide-react"

// Mock article data - in real app this would come from API
const articles: Record<string, any> = {
  "anka-kusu-mitolojisi": {
    id: "1",
    title: "Anka Kuşu Mitolojisi: Yeniden Doğuşun Sembolü",
    description: "Antik mitolojide Anka Kuşu'nun kökenleri ve farklı kültürlerdeki yeri",
    content: `
# Anka Kuşu Mitolojisi: Yeniden Doğuşun Sembolü

Anka Kuşu, yeniden doğuşun ve ölümsüzlüğün en güçlü sembollerinden biridir. Bu efsanevi kuş, kültürden kültüre farklı isimlerle ve özelliklerle karşımıza çıksa da, temel anlamı hep aynı kalmıştır: ölümün ardından gelen yeniden doğuş.

## Antik Mısır'da Bennu Kuşu

Anka Kuşu'nun en eski formlarından biri Antik Mısır mitolojisindeki Bennu kuşudur. Bennu, Ra'nın ruhunu temsil eder ve Heliopolis şehriyle ilişkilendirilir. Efsaneye göre, Bennu kuşu her 500 yılda bir kendini yakar ve küllerinden yeniden doğar. Bu döngü, güneşin batıp yeniden doğmasına benzetilir.

## Antik Yunan'da Phoenix

Yunan mitolojisinde Phoenix, altın ve kırmızı tüyleriyle tanımlanan muhteşem bir kuştur. Yaşamının sonuna geldiğinde, aromatik bitkilerden yaptığı yuvaya girer ve kendini yakar. Küllerinden genç bir phoenix ortaya çıkar ve külleri Mısır'daki Heliopolis tapınağına götürülür.

## Diğer Kültürlerde Anka Kuşu

- **Çin Mitolojisi:** Fenghuang olarak bilinir, iyi şans ve refahın sembolüdür
- **Japon Mitolojisi:** Ho-oo adıyla bilinir, imparatorluk ailesiyle ilişkilendirilir
- **Roma Mitolojisi:** Phoenix, imparatorluğun sonsuzluğunu temsil eder
- **Hristiyanlık:** Dirilişin sembolü olarak kabul edilir

## Anka Kuşu'nun Anlamı

Anka Kuşu, insanlığın en derin arzularından birini yansıtır: ölümsüzlük. Ancak bu sembol, fiziksel ölümsüzlükten çok, ruhsal yenilenme ve dönüşüm anlamına gelir. Her son, yeni bir başlangıcın habercisidir.

## Modern Dünyada Anka Kuşu

Günümüzde Anka Kuşu sembolü, edebiyattan sinemaya, sanattan psikolojiye kadar birçok alanda karşımıza çıkar. Özellikle zorlukların üstesinden gelme ve yeniden başlama temalarında sıkça kullanılır.

## Sonuç

Anka Kuşu efsanesi, binlerce yıldır insanlığın kolektif bilincinde yer alan güçlü bir semboldür. Yeniden doğuş, umut ve sonsuzluk gibi evrensel temaları temsil eder ve bu yüzden de zamanın ötesinde bir etkiye sahiptir.
    `,
    category: "Mitoloji",
    author: "Dr. Ayşe Yılmaz",
    date: "20 Nisan 2024",
    readTime: "8 dk",
    image: "/images/phoenix-logo.jpg",
    tags: ["Anka Kuşu", "Yeniden Doğuş", "Mitoloji", "Antik Mısır", "Yunan Mitolojisi"]
  },
  "antik-yunan-felsefe-mitoloji": {
    id: "2",
    title: "Antik Yunan'da Felsefe ve Mitolojinin Kesişimi",
    description: "Platon ve Aristoteles'in mitoloji anlayışı ve felsefi düşünceleri nasıl etkilediği",
    content: `
# Antik Yunan'da Felsefe ve Mitolojinin Kesişimi

Antik Yunan'da felsefe ve mitoloji, birbirinden ayrı düşünülemez iki alandır. Felsefi düşünce, mitolojik anlatılardan beslenmiş; mitoloji ise felsefi sorgulamayla yeni bir anlam kazanmıştır.

## Platon ve Mitoloji

Platon, mitleri "soylu yalanlar" olarak tanımlar. Ona göre mitler, gerçeği doğrudan anlatmasalar da, derin felsefi gerçekliklere işaret ederler. Platon'un diyaloglarında sıkça kullandığı mitler, karmaşık felsefi fikirleri daha anlaşılır kılmak için bir araç işlevi görür.

## Aristoteles'in Yaklaşımı

Aristoteles, öğretmeni Platon'a göre daha rasyonel bir yaklaşım sergiler. Ona göre mitler, doğa olaylarını açıklamak için kullanılan ilkel denemelerdir ancak felsefi düşünce geliştikçe yerlerini bilimsel açıklamalara bırakmalıdırlar.

## Stoacılar ve Mitoloji

Stoacı filozoflar, mitleri alegorik olarak yorumlarlar. Onlara göre mitolojik öyküler, evrenin doğası ve insanın yaşam amacı hakkında derin felsefi gerçeklikler içerir.

## Sonuç

Antik Yunan'da felsefe ve mitoloji arasındaki bu dinamik ilişki, Batı düşüncesinin temelini oluşturmuştur. Felsefe, mitolojinin imgelerinden beslenmiş; mitoloji ise felsefin sorgulayıcı doğasıyla zenginleşmiştir.
    `,
    category: "Felsefe",
    author: "Prof. Mehmet Kaya",
    date: "18 Nisan 2024",
    readTime: "6 dk",
    image: "/images/hero-bg.jpg",
    tags: ["Felsefe", "Antik Yunan", "Platon", "Aristoteles", "Stoacılık"]
  }
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = articles["anka-kusu-mitolojisi"] // Default article
  
  if (!article) {
    notFound()
  }

  const relatedArticles = Object.values(articles).filter((a: any) => a.id !== article.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/yazilar" className="hover:text-foreground">Yazılar</Link>
            <span>/</span>
            <span className="text-foreground">{article.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-muted-foreground text-sm">
                {article.readTime} okuma
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Article Meta */}
            <div className="flex items-center justify-between border-y border-border py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{article.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                  <Share2 size={18} />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12">
            <div className="aspect-video rounded-2xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-16">
            <div 
              className="text-foreground leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
            />
          </article>

          {/* Tags */}
          <div className="mb-16">
            <h3 className="font-semibold text-foreground mb-4">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          <section className="border-t border-border pt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              İlgili Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle: any) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary mb-2 uppercase tracking-wide block">
                      {relatedArticle.category}
                    </span>
                    <h3 className="font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedArticle.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Back to Articles */}
          <div className="text-center mt-16">
            <Link
              href="/yazilar"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              <ChevronLeft size={20} />
              Tüm Yazılara Dön
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
