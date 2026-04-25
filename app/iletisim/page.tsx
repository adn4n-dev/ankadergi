"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-posta",
      details: ["info@ankadergi.com", "yayin@ankadergi.com"],
      description: "Genel bilgiler ve yayın işleri için"
    },

    {
      icon: <Clock className="w-6 h-6" />,
      title: "Çalışma Saatleri",
      details: ["Pazartesi - Cuma: 09:00 - 18:00", "Cumartesi: 10:00 - 16:00"],
      description: "Pazar günleri kapalıyız"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
              <MessageCircle className="w-8 h-8 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              İletişim
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bizimle iletişime geçmekten çekinmeyin. Sorularınızı ve görüşlerinizi bekliyoruz.
            </p>
          </div>

          {/* Contact Info Grid */}
                </div>
              </div>
              
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Bize Ulaşın
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Her türlü soru, görüş ve önerileriniz için bizimle iletişime geçebilirsiniz.
              </p>

              <div className="space-y-6">
                <div className="bg-secondary/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">E-posta</h3>
                  <a 
                    href="mailto:Anka20Nfkal26@gmail.com"
                    className="text-primary hover:text-primary/80 transition-colors text-lg"
                  >
                    Anka20Nfkal26@gmail.com
                  </a>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Mesai saatlerimiz: Hafta içi 09:00 - 18:00</p>
                  <p>Size en kısa sürede dönüş yapmaya çalışacağız.</p>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
