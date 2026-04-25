import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Admin Panel
            </h1>
            <p className="text-xl text-muted-foreground">
              Yönetim paneli
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dergi Upload Section */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Dergi Yükle
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                  <div className="text-4xl text-muted-foreground mb-2">📄</div>
                  <p className="text-sm text-muted-foreground">
                    Dergi PDF ve kapak görseli yükleyebilirsiniz
                  </p>
                </div>
                <Link 
                  href="/admin/login"
                  className="block w-full text-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Dergi Yükleme Sistemi
                </Link>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                İstatistikler
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground">Toplam Ziyaretçi</span>
                  <span className="font-bold text-foreground">1,234</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground">Toplam Dergi</span>
                  <span className="font-bold text-foreground">4</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground">Toplam Makale</span>
                  <span className="font-bold text-foreground">12</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Hızlı İşlemler
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/"
                  className="block w-full text-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Ana Sayfayı Görüntüle
                </Link>
                <Link 
                  href="/dergiler"
                  className="block w-full text-center bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  Dergileri Yönet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
