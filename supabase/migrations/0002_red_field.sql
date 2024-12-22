/*
  # PDF Storage Configuration

  1. Storage Configuration
    - Create a new storage bucket for PDFs
    - Set up RLS policies for secure access

  2. Security
    - Enable RLS on storage bucket
    - Add policies for authenticated users
*/

-- Create a new storage bucket for PDFs if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('pdfs', 'pdfs')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload their own PDFs
CREATE POLICY "Users can upload their own PDFs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pdfs' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read their own PDFs
CREATE POLICY "Users can read their own PDFs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'pdfs' AND
  (storage.foldername(name))[1] = auth.uid()::text
);