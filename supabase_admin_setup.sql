-- Admin tablosu oluştur
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage bucket oluştur (PDF'ler için)
INSERT INTO storage.buckets (id, name, public)
VALUES ('magazines', 'magazines', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket için RLS politikaları
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'magazines');

CREATE POLICY "Admin upload access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'magazines');

CREATE POLICY "Admin delete access"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'magazines');

-- Dergiler tablosu oluştur
CREATE TABLE IF NOT EXISTS magazines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  pdf_url TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  issue_number INTEGER,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin kullanıcısı oluştur (şifre: admin123)
-- Not: Gerçek uygulamada bcrypt ile hash'lenmiş şifre kullanın
INSERT INTO admins (email, password_hash)
VALUES ('admin@ankadergi.com', '$2b$10$placeholder_hash_for_admin123')
ON CONFLICT (email) DO NOTHING;
