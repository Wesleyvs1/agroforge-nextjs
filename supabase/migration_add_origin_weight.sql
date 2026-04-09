-- Run this in Supabase SQL Editor to add missing columns
ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS origin TEXT;
ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS weight TEXT;

-- Verify
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'produtos' ORDER BY ordinal_position;
