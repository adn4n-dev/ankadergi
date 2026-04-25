'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (password === 'anka123') {
      setIsLoggedIn(true)
      localStorage.setItem('admin_token', 'verified')
    } else {
      alert('Hatalı şifre!')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-serif text-center text-foreground mb-2">
                Anka Dergi
              </h1>
              <p className="text-center text-muted-foreground mb-8">Admin Girişi</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Yönetici Şifresi
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre girin"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Giriş Yap
                </button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-md text-xs text-muted-foreground">
                <p className="font-semibold mb-1">Demo Şifresi:</p>
                <p>anka123</p>
              </div>

              <div className="mt-6 text-center">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Ana Sayfaya Dön
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

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
                
                <form action="/api/admin/upload" method="POST" encType="multipart/form-data" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Dergi PDF
                    </label>
                    <input
                      type="file"
                      name="pdf"
                      accept=".pdf"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kapak Görseli
                    </label>
                    <input
                      type="file"
                      name="cover"
                      accept="image/*"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Dergiyi Yükle
                  </button>
                </form>
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
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    localStorage.removeItem('admin_token')
                  }}
                  className="w-full text-center bg-destructive text-destructive-foreground px-4 py-3 rounded-lg font-medium hover:bg-destructive/90 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  )
}
