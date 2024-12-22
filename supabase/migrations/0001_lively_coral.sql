/*
  # PDF Compression Storage Schema

  1. New Tables
    - `compressed_documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `original_name` (text)
      - `compressed_name` (text)
      - `original_size` (bigint)
      - `compressed_size` (bigint)
      - `compression_level` (text)
      - `storage_path` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `compressed_documents` table
    - Add policies for authenticated users to:
      - Read their own documents
      - Create new documents
*/

CREATE TYPE compression_level AS ENUM ('high', 'medium', 'low');

CREATE TABLE compressed_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  original_name text NOT NULL,
  compressed_name text NOT NULL,
  original_size bigint NOT NULL,
  compressed_size bigint NOT NULL,
  compression_level compression_level NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE compressed_documents ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own documents
CREATE POLICY "Users can read own documents"
  ON compressed_documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own documents
CREATE POLICY "Users can insert own documents"
  ON compressed_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);