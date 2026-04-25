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
      icon: <Phone className="w-6 h-6" />,
      title: "Telefon",
      details: ["+90 555 123 45 67", "+90 555 987 65 43"],
      description: "Hafta içi 09:00 - 18:00 arası"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adres",
      details: ["Mahmut Şevket Paşa Sk. No:42", "İstanbul, Türkiye"],
      description: "Merkez ofisimiz"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Çalışma Saatleri",
      details: ["Pazartesi - Cuma: 09:00 - 18:00", "Cumartesi: 10:00 - 16:00"],
      description: "Pazar günleri kapalıyız"
    }
  ]

  const faqItems = [
    {
      question: "Derginize nasıl abone olabilirim?",
      answer: "Web sitemiz üzerinden abonelik formunu doldurarak veya doğrudan bizimle iletişime geçerek abone olabilirsiniz."
    },
    {
      question: "Makale göndermek istiyorum, ne yapmalıyım?",
      answer: "Makale göndermek için yayin@ankadergi.com adresine çalışmanızı ve kısa bir özgeçmişinizi göndermeniz yeterlidir."
    },
    {
      question: "Dergiyi satın alabilir miyim?",
      answer: "Evet, dergilerimizi web sitemiz üzerinden dijital olarak veya seçili kitabevlerinden basılı olarak temin edebilirsiniz."
    },
    {
      question: "İş birliği teklifleriniz için nasıl ulaşabilirim?",
      answer: "İş birliği tekliflerinizi info@ankadergi.com adresine detaylı bir şekilde göndermenizi rica ederiz."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-primary">
                  {info.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-foreground font-medium text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Mesaj Gönderin
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Adınızı giriniz"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Konu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Konu seçiniz</option>
                    <option value="genel">Genel Bilgi</option>
                    <option value="abonelik">Abonelik</option>
                    <option value="makale">Makale Gönderimi</option>
                    <option value="isbirligi">İş Birliği</option>
                    <option value="teknik">Teknik Destek</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Mesajınızı buraya yazabilirsiniz..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:bg-primary/90"
                >
                  <Send size={20} />
                  Mesajı Gönder
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    Mahmut Şevket Paşa Sk. No:42
                  </p>
                  <p className="text-muted-foreground text-sm">
                    İstanbul, Türkiye
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-3xl p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
              Sıkça Sorulan Sorular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Sosyal Medya
            </h2>
            <p className="text-muted-foreground mb-8">
              Sosyal medya hesaplarımızdan bizi takip edebilirsiniz
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/90 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
