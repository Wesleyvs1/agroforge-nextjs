-- Run this in Supabase SQL Editor
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags TEXT;

-- Update categories for existing posts
UPDATE public.blog_posts SET category = 'Café' WHERE title ILIKE '%café%' OR title ILIKE '%torra%' OR title ILIKE '%moagem%';
UPDATE public.blog_posts SET category = 'Pet' WHERE title ILIKE '%pet%' OR title ILIKE '%cão%' OR title ILIKE '%cães%' OR title ILIKE '%alimentação%';
UPDATE public.blog_posts SET category = 'Cultivo' WHERE title ILIKE '%horta%' OR title ILIKE '%podar%' OR title ILIKE '%plantas%' OR title ILIKE '%épocas%';

-- Verify
SELECT id, title, category FROM public.blog_posts ORDER BY id DESC;
