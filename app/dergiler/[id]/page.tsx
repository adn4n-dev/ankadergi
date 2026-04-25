import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MagazineReader } from "@/components/magazine-reader"

export default function MagazineReadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <MagazineReader />
      <Footer />
    </main>
  )
}
