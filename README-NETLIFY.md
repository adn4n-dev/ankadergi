# Netlify Deploy Manual Guide

## Adım 1: GitHub'a Push Et
```bash
git init
git add .
git commit -m "Initial commit - mythology website"
git branch -M main
git remote add origin https://github.com/KULLANICI/mythology-website.git
git push -u origin main
```

## Adım 2: Netlify'e Bağlan
1. [Netlify](https://netlify.com)'e giriş yap
2. "New site from Git" seç
3. GitHub'ı seç ve repository'u bağla

## Adım 3: Build Ayarları
```
Build command: npm run build
Publish directory: .next
Node version: 18
```

## Adım 4: Environment Variables
```
NODE_VERSION: 18
NEXT_PUBLIC_SITE_URL: https://your-site.netlify.app
```

## Alternatif: Manuel Build
Eğer Node.js sorunları devam ederse:
1. VS Code'de `Ctrl + Shift + P`
2. "Tasks: Run Task" seç
3. "npm: build" çalıştır
4. Oluşan `.next` klasörünü zip'le
5. Netlify "Manual deploy" ile yükle

## Mevcut Durum
✅ Tüm sayfalar hazır
✅ Tema açık renge çevrildi  
✅ Karartma kaldırıldı
✅ API'ler hazır
✅ Responsive tasarım

Sadece build işlemi kaldı!
