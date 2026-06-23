-- Run this in Supabase Dashboard → SQL Editor
-- Phase 6: Storage buckets + RLS policies for Argentina 2026 Hub

-- ─── Buckets ───────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'documents',
    'documents',
    false,
    52428800, -- 50 MB
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'photos',
    'photos',
    true,
    10485760, -- 10 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  )
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ─── documents bucket (private) ────────────────────────────────────────────

DROP POLICY IF EXISTS "documents_select_anon" ON storage.objects;
DROP POLICY IF EXISTS "documents_insert_service" ON storage.objects;
DROP POLICY IF EXISTS "documents_update_service" ON storage.objects;
DROP POLICY IF EXISTS "documents_delete_service" ON storage.objects;
DROP POLICY IF EXISTS "photos_public_select" ON storage.objects;
DROP POLICY IF EXISTS "photos_anon_insert" ON storage.objects;
DROP POLICY IF EXISTS "photos_anon_update" ON storage.objects;
DROP POLICY IF EXISTS "photos_anon_delete" ON storage.objects;

CREATE POLICY "documents_select_anon"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'documents');

CREATE POLICY "documents_insert_service"
  ON storage.objects FOR INSERT TO service_role
  WITH CHECK (bucket_id = 'documents');

CREATE POLICY "documents_update_service"
  ON storage.objects FOR UPDATE TO service_role
  USING (bucket_id = 'documents');

CREATE POLICY "documents_delete_service"
  ON storage.objects FOR DELETE TO service_role
  USING (bucket_id = 'documents');

-- ─── photos bucket (public — Phase 11) ─────────────────────────────────────

CREATE POLICY "photos_public_select"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'photos');

CREATE POLICY "photos_anon_insert"
  ON storage.objects FOR INSERT TO anon
  WITH CHECK (bucket_id = 'photos');

CREATE POLICY "photos_anon_update"
  ON storage.objects FOR UPDATE TO anon
  USING (bucket_id = 'photos');

CREATE POLICY "photos_anon_delete"
  ON storage.objects FOR DELETE TO anon
  USING (bucket_id = 'photos');

-- ─── CORS (configure in Dashboard → Storage → Configuration) ───────────────
-- Add allowed origins:
--   http://localhost:3000
--   https://argentina2026.vercel.app  (or your production domain)
