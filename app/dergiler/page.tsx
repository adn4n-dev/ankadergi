import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MagazineList } from "@/components/magazine-list"

export const metadata = {
  title: 'Dergiler - Anka Dergi',
  description: 'Anka Dergi sayılarını çevrimiçi okuyun.',
}

export default function MagazinesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Dergiler
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Anka Dergi&apos;nin tüm sayılarını buradan okuyabilirsiniz.
            </p>
          </div>
          <MagazineList />
        </div>
      </section>
      <Footer />
    </main>
  )
}
