import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Admin Panel
            </h1>
            <p className="text-xl text-muted-foreground">
              Yönetim paneli
            </p>
          </header>

          <div className="text-center py-20">
            <div className="bg-card rounded-2xl p-12 shadow-lg border border-border/50 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Admin Panel
              </h2>
              <p className="text-muted-foreground mb-8">
                Bu sayfa geliştirme aşamasındadır.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  ← Ana Sayfaya Dön
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
