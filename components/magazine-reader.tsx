'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Magazine {
  id: string
  title: string
  description: string
  issue_number: string
  pdf_url: string
  cover_url: string
  created_at: string
}

export function MagazineReader() {
  const params = useParams()
  const [magazine, setMagazine] = useState<Magazine | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [isRendering, setIsRendering] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!params.id) return
    fetch(`/api/magazines/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Dergi bulunamad\u0131')
        return res.json()
      })
      .then(data => setMagazine(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [params.id])

  useEffect(() => {
    if (!magazine?.pdf_url) return
    const loadPdf = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
        const doc = await pdfjsLib.getDocument(magazine.pdf_url).promise
        setPdfDoc(doc)
        setTotalPages(doc.numPages)
      } catch (err) {
        setError('PDF y\u00fcklenemedi')
      }
    }
    loadPdf()
  }, [magazine?.pdf_url])

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current || isRendering) return
    setIsRendering(true)
    try {
      const page = await pdfDoc.getPage(pageNum)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const containerWidth = containerRef.current?.clientWidth || 800
      const viewport = page.getViewport({ scale: 1 })
      const fitScale = Math.min((containerWidth - 40) / viewport.width, (window.innerHeight - 300) / viewport.height)
      const finalScale = fitScale * scale
      const scaledViewport = page.getViewport({ scale: finalScale })

      canvas.width = scaledViewport.width
      canvas.height = scaledViewport.height

      await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise
    } catch (err) {
      console.error('Render error:', err)
    } finally {
      setIsRendering(false)
    }
  }, [pdfDoc, scale, isRendering])

  useEffect(() => {
    if (pdfDoc && currentPage > 0) {
      renderPage(currentPage)
    }
  }, [pdfDoc, currentPage, scale, renderPage])

  const goToPage = (page: number, direction: 'left' | 'right') => {
    if (page < 1 || page > totalPages || isFlipping) return
    setFlipDirection(direction)
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage(page)
      setTimeout(() => setIsFlipping(false), 400)
    }, 200)
  }

  const prevPage = () => goToPage(currentPage - 1, 'left')
  const nextPage = () => goToPage(currentPage + 1, 'right')

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPage()
      else if (e.key === 'ArrowRight') nextPage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  if (isLoading) {
    return <div className="pt-28 pb-16 text-center text-muted-foreground">Y\u00fckleniyor...</div>
  }

  if (error || !magazine) {
    return (
      <div className="pt-28 pb-16 text-center">
        <p className="text-muted-foreground mb-4">{error || 'Dergi bulunamad\u0131'}</p>
        <Link href="/dergiler" className="text-primary hover:underline">Dergilere D\u00f6n</Link>
      </div>
    )
  }

  return (
    <section className="pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <Link href="/dergiler" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-1">
              <ArrowLeft size={16} />
              T\u00fcm Dergiler
            </Link>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-foreground">
              {magazine.title}
              {magazine.issue_number && <span className="text-primary ml-2 text-base font-normal">Say\u0131 {magazine.issue_number}</span>}
            </h1>
          </div>
          <a href={magazine.pdf_url} download>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={16} />
              &#304;ndir
            </Button>
          </a>
        </div>

        {/* Reader */}
        <div className="bg-muted/50 rounded-2xl border border-border overflow-hidden">
          {/* Controls */}
          <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setScale(s => Math.max(0.5, s - 0.15))} title="K\u00fc\u00e7\u00fclt">
                <ZoomOut size={18} />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
              <Button variant="ghost" size="sm" onClick={() => setScale(s => Math.min(2.5, s + 0.15))} title="B\u00fcy\u00fct">
                <ZoomIn size={18} />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={prevPage} disabled={currentPage <= 1 || isFlipping}>
                <ChevronLeft size={20} />
              </Button>
              <span className="text-sm font-medium text-foreground min-w-[5rem] text-center">
                {currentPage} / {totalPages}
              </span>
              <Button variant="ghost" size="sm" onClick={nextPage} disabled={currentPage >= totalPages || isFlipping}>
                <ChevronRight size={20} />
              </Button>
            </div>
            <div className="w-[88px]" />
          </div>

          {/* Canvas Area */}
          <div ref={containerRef} className="relative flex items-center justify-center overflow-auto" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
            {/* Left click area */}
            <button
              onClick={prevPage}
              disabled={currentPage <= 1}
              className="absolute left-0 top-0 bottom-0 w-1/5 z-10 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
              aria-label="\u00d6nceki sayfa"
            >
              <div className="h-full flex items-center justify-start pl-4">
                <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
                  <ChevronLeft size={24} className="text-white" />
                </div>
              </div>
            </button>

            {/* Page */}
            <div className={`transition-all duration-400 ease-in-out ${
              isFlipping
                ? flipDirection === 'right'
                  ? 'opacity-0 -translate-x-8 scale-95'
                  : 'opacity-0 translate-x-8 scale-95'
                : 'opacity-100 translate-x-0 scale-100'
            }`}>
              <div className="shadow-2xl rounded-sm bg-white">
                <canvas ref={canvasRef} className="block max-w-full" />
              </div>
            </div>

            {/* Right click area */}
            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              className="absolute right-0 top-0 bottom-0 w-1/5 z-10 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
              aria-label="Sonraki sayfa"
            >
              <div className="h-full flex items-center justify-end pr-4">
                <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
                  <ChevronRight size={24} className="text-white" />
                </div>
              </div>
            </button>

            {isRendering && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
          </div>

          {/* Bottom page indicator */}
          <div className="flex items-center justify-center gap-1 py-3 bg-card border-t border-border">
            {totalPages <= 20 ? (
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1, i + 1 > currentPage ? 'right' : 'left')}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i + 1 === currentPage ? 'bg-primary w-6' : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Sayfa ${i + 1}`}
                />
              ))
            ) : (
              <span className="text-xs text-muted-foreground">Sayfa {currentPage} / {totalPages}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}