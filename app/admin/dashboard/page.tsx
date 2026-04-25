'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2, LogOut, FileText, BookOpen, Upload } from 'lucide-react'

interface Article {
  id: string
  title: string
  description: string
  content: string
  slug: string
  category: string
  is_featured: boolean
  is_published: boolean
  created_at: string
}

interface Magazine {
  id: string
  title: string
  description: string
  issue_number: string
  pdf_url: string
  cover_url: string
  is_published: boolean
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'articles' | 'magazines'>('articles')

  // Articles state
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    slug: '',
    category: 'Genel',
    is_featured: false,
    is_published: true,
  })

  // Magazines state
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [isMagLoading, setIsMagLoading] = useState(true)
  const [showMagForm, setShowMagForm] = useState(false)
  const [magFormData, setMagFormData] = useState({
    title: '',
    description: '',
    issue_number: '',
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin')
      return
    }
    fetchArticles()
    fetchMagazines()
  }, [router])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles/admin')
      if (!response.ok) throw new Error('Makale yüklenemedi')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMagazines = async () => {
    try {
      const response = await fetch('/api/magazines/admin')
      if (!response.ok) throw new Error('Dergiler yüklenemedi')
      const data = await response.json()
      setMagazines(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsMagLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  // Article handlers
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.slug) {
      alert('Lütfen tüm gerekli alanları doldurun')
      return
    }
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/articles/${editingId}` : '/api/articles'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'verified',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Kayıt başarısız')
      fetchArticles()
      setShowForm(false)
      setEditingId(null)
      setFormData({ title: '', description: '', content: '', slug: '', category: 'Genel', is_featured: false, is_published: true })
    } catch (error) {
      alert('Hata: ' + (error as Error).message)
    }
  }

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      slug: article.slug,
      category: article.category,
      is_featured: article.is_featured,
      is_published: article.is_published,
    })
    setEditingId(article.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu makaleyi silmek istediğinize emin misiniz?')) return
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': 'verified' },
      })
      if (!response.ok) throw new Error('Silme başarısız')
      fetchArticles()
    } catch (error) {
      alert('Hata: ' + (error as Error).message)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ title: '', description: '', content: '', slug: '', category: 'Genel', is_featured: false, is_published: true })
  }

  // Magazine handlers
  const handleUploadMagazine = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pdfFile || !magFormData.title) {
      alert('PDF dosyası ve başlık gerekli')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', pdfFile)
      formData.append('title', magFormData.title)
      formData.append('description', magFormData.description)
      formData.append('issue_number', magFormData.issue_number)
      if (coverFile) {
        formData.append('cover_image', coverFile)
      }

      const response = await fetch('/api/magazines', {
        method: 'POST',
        headers: { 'x-admin-token': 'verified' },
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Yükleme başarısız')
      }

      fetchMagazines()
      setShowMagForm(false)
      setMagFormData({ title: '', description: '', issue_number: '' })
      setPdfFile(null)
      setCoverFile(null)
    } catch (error) {
      alert('Hata: ' + (error as Error).message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteMagazine = async (id: string) => {
    if (!confirm('Bu dergiyi silmek istediğinize emin misiniz?')) return
    try {
      const response = await fetch(`/api/magazines/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': 'verified' },
      })
      if (!response.ok) throw new Error('Silme başarısız')
      fetchMagazines()
    } catch (error) {
      alert('Hata: ' + (error as Error).message)
    }
  }

  const handleCancelMag = () => {
    setShowMagForm(false)
    setMagFormData({ title: '', description: '', issue_number: '' })
    setPdfFile(null)
    setCoverFile(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif text-foreground">Anka Dergi - Admin</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={18} />
            Çıkış Yap
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex gap-2 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'articles'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText size={18} />
            Makaleler
          </button>
          <button
            onClick={() => setActiveTab('magazines')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'magazines'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen size={18} />
            Dergiler
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-8">
        {/* ===== ARTICLES TAB ===== */}
        {activeTab === 'articles' && (
          <>
            <div className="mb-6">
              {!showForm && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  <Plus size={18} />
                  Yeni Makale Ekle
                </Button>
              )}
            </div>

            {showForm && (
              <div className="bg-card rounded-lg shadow-lg p-6 mb-8 border border-border">
                <h2 className="text-xl font-serif text-foreground mb-4">
                  {editingId ? 'Makaleyi Düzenle' : 'Yeni Makale Ekle'}
                </h2>
                <form onSubmit={handleSaveArticle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Başlık *</label>
                      <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Makale başlığı" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">URL Slug *</label>
                      <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="makale-basligi" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Kısa Açıklama *</label>
                    <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Makale açıklaması" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">İçerik</label>
                    <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Makale içeriği" rows={6} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Kategori</label>
                      <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Kategori" />
                    </div>
                    <div className="flex gap-4 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
                        <span className="text-sm font-medium text-foreground">Öne çıkan makale</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} />
                        <span className="text-sm font-medium text-foreground">Yayınla</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">{editingId ? 'Güncelle' : 'Ekle'}</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>İptal</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-serif text-foreground">Makaleler ({articles.length})</h2>
              </div>
              {isLoading ? (
                <div className="p-6 text-center text-muted-foreground">Yükleniyor...</div>
              ) : articles.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">Henüz makale yok</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Başlık</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Kategori</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Durum</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">{article.title}</p>
                            <p className="text-sm text-muted-foreground">{article.slug}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground">{article.category}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {article.is_published && <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded">Yayınlı</span>}
                              {article.is_featured && <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded">Öne Çıkan</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(article)} className="text-primary hover:text-primary/80 transition-colors" title="Düzenle"><Edit2 size={18} /></button>
                              <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-700 transition-colors" title="Sil"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ===== MAGAZINES TAB ===== */}
        {activeTab === 'magazines' && (
          <>
            <div className="mb-6">
              {!showMagForm && (
                <Button
                  onClick={() => setShowMagForm(true)}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  <Upload size={18} />
                  Yeni Dergi Yükle
                </Button>
              )}
            </div>

            {showMagForm && (
              <div className="bg-card rounded-lg shadow-lg p-6 mb-8 border border-border">
                <h2 className="text-xl font-serif text-foreground mb-4">Yeni Dergi Yükle</h2>
                <form onSubmit={handleUploadMagazine} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Dergi Başlığı *</label>
                      <Input
                        value={magFormData.title}
                        onChange={(e) => setMagFormData({ ...magFormData, title: e.target.value })}
                        placeholder="Örn: Anka Dergi Sayı 1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Sayı Numarası</label>
                      <Input
                        value={magFormData.issue_number}
                        onChange={(e) => setMagFormData({ ...magFormData, issue_number: e.target.value })}
                        placeholder="Örn: 1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Açıklama</label>
                    <Textarea
                      value={magFormData.description}
                      onChange={(e) => setMagFormData({ ...magFormData, description: e.target.value })}
                      placeholder="Dergi hakkında kısa açıklama"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">PDF Dosyası *</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="cursor-pointer">
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                          <p className="text-sm text-muted-foreground">
                            {pdfFile ? pdfFile.name : 'PDF dosyası seçin'}
                          </p>
                          {pdfFile && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Kapak Görseli</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id="cover-upload"
                        />
                        <label htmlFor="cover-upload" className="cursor-pointer">
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                          <p className="text-sm text-muted-foreground">
                            {coverFile ? coverFile.name : 'Kapak görseli seçin (opsiyonel)'}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" disabled={isUploading} className="bg-primary hover:bg-primary/90 text-white">
                      {isUploading ? 'Yükleniyor...' : 'Dergiyi Yükle'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancelMag}>İptal</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-serif text-foreground">Dergiler ({magazines.length})</h2>
              </div>
              {isMagLoading ? (
                <div className="p-6 text-center text-muted-foreground">Yükleniyor...</div>
              ) : magazines.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">Henüz dergi yok</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {magazines.map((mag) => (
                    <div key={mag.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {mag.cover_url ? (
                        <img src={mag.cover_url} alt={mag.title} className="w-full h-48 object-cover" />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <BookOpen size={48} className="text-muted-foreground" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-serif font-semibold text-foreground">{mag.title}</h3>
                        {mag.issue_number && (
                          <p className="text-sm text-muted-foreground">Sayı {mag.issue_number}</p>
                        )}
                        {mag.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{mag.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <a
                            href={mag.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            PDF Görüntüle
                          </a>
                          <button
                            onClick={() => handleDeleteMagazine(mag.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Sil"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
