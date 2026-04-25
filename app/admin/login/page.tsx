'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        localStorage.setItem('admin_token', 'verified')
        router.push('/admin')
      } else {
        setError('Hatalı şifre')
        setPassword('')
      }
    } catch (err) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

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

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Yönetici Şifresi
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifre girin"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isLoading ? 'Kontrol ediliyor...' : 'Giriş Yap'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-md text-xs text-muted-foreground">
              <p className="font-semibold mb-1">Demo Şifresi:</p>
              <p>admin123</p>
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
