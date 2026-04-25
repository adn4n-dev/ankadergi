import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Mail, Phone, MapPin, Users, Target, Award } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Ayşe Yılmaz",
    role: "Kurucu ve Baş Editör",
    bio: "Mitoloji ve kültür tarihi alanında 15 yıllık akademik deneyim",
    image: "/images/phoenix-logo.jpg",
    expertise: ["Antik Mitoloji", "Kültürel Araştırmalar", "Akademik Yayıncılık"]
  },
  {
    name: "Prof. Mehmet Kaya",
    role: "Yayın Danışmanı",
    bio: "Felsefe ve düşünce tarihi profesörü, 20+ yıllık tecrübe",
    image: "/images/phoenix-logo.jpg",
    expertise: ["Felsefe", "Düşünce Tarihi", "Eleştirel Kuram"]
  },
  {
    name: "Doç. Dr. Zeynep Demir",
    role: "İçerik Direktörü",
    bio: "Türk mitolojisi ve halk bilimi uzmanı",
    image: "/images/phoenix-logo.jpg",
    expertise: ["Türk Mitolojisi", "Halk Bilimi", "Sözlü Kültür"]
  },
  {
    name: "Arda Öztürk",
    role: "Sanat Yönetmeni",
    bio: "Grafik tasarım ve dijital yayıncılık konusunda uzman",
    image: "/images/phoenix-logo.jpg",
    expertise: ["Grafik Tasarım", "Dijital Yayıncılık", "UI/UX"]
  }
]

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Misyonumuz",
    description: "Mitoloji, kültür ve sanat alanında derinlemesine, özgün ve erişilebilir içerikler üreterek okuyucuların bilgilendirilmesi ve ilham verilmesi."
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Vizyonumuz",
    description: "Türkiye'nin lider kültür ve mitoloji platformu olarak, evrensel bilgiyi yerel değerlerle birleştiren bir köprü olmak."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Değerlerimiz",
    description: "Bilimsel titizlik, özgünlük, erişilebilirlik ve kültürel çeşitliliğe saygı yayıncılık felsefemizin temelini oluşturur."
  }
]

const milestones = [
  {
    year: "2020",
    title: "Kuruluş",
    description: "Anka Dergi, mitoloji ve kültür tutkunları tarafından kuruldu."
  },
  {
    year: "2021",
    title: "İlk Sayı",
    description: "Anka Dergi'nin ilk sayısı yayımlandı ve büyük ilgi gördü."
  },
  {
    year: "2022",
    title: "Dijital Platform",
    description: "Web platformumuz yayına başladı ve global okuyuculara ulaştık."
  },
  {
    year: "2023",
    title: "Akademik İşbirlikleri",
    description: "Üniversiteler ve araştırma kurumlarıyla işbirlikleri başlattık."
  },
  {
    year: "2024",
    title: "Küresel Genişleme",
    description: "İçeriklerimizi farklı dillere çevirerek uluslararası alana açıldık."
  }
]

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-8 h-8 text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                </svg>
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hakkımızda
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Anka Dergi: Fikirler Sınırların Ötesine Kanat Açar
            </p>
          </div>

          {/* About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Anka Dergi Hikayesi
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Anka Dergi, 2020 yılında mitoloji, kültür ve sanata tutkun bir grup akademisyen ve yazar tarafından kuruldu. Amacımız, antik bilgelikle modern düşünce arasında bir köprü kurarak, evrensel değerleri günümüz okuyucusuyla buluşturmaktı.
                </p>
                <p>
                  İsim mitolojideki Anka Kuşu'ndan esinlenerek seçildi. Tıpkı Anka Kuşu'nun küllerinden yeniden doğması gibi, biz de kültürel mirasımızı modern bir yaklaşımla yeniden yorumlayarak gelecek nesillere taşımayı hedefliyoruz.
                </p>
                <p>
                  Bugün binlerce okuyucuya ulaşan platformumuz, bilimsel titizlikle hazırlanmış içerikleriyle Türkiye'nin önde gelen kültür ve mitoloji yayınları arasında yer alıyor.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero-bg.jpg"
                  alt="Anka Dergi Ofis"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Misyon, Vizyon ve Değerlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 text-center"
                >
                  <div className="flex justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Ekibimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 text-center"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-xs mb-3">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Yolculuğumuz
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-card rounded-xl p-4 shadow-lg border border-border/50">
                        <span className="text-primary font-bold text-sm">
                          {milestone.year}
                        </span>
                        <h3 className="font-serif font-bold text-foreground mt-1 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Bize Ulaşın
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Aklınıza takılan bir soru mu var? İş birliği teklifi mi etmek istiyorsunuz? 
              Bizimle iletişime geçmekten çekinmeyin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@ankadergi.com"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
              >
                <Mail size={20} />
                info@ankadergi.com
              </a>
              <a
                href="tel:+905551234567"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
              >
                <Phone size={20} />
                +90 555 123 45 67
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
              >
                <MapPin size={20} />
                İstanbul, Türkiye
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
