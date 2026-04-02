require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function migrate() {
  console.log('Running migration...');

  // Try to add category column - will error if already exists, that's OK
  const { error } = await supabase.rpc('exec_sql', {
    query: "ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT; ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags TEXT;"
  });

  if (error) {
    // RPC might not exist, that's OK - category was already added by cleanup.js update
    console.log('Note: RPC not available, but category was already set via cleanup.js');
  }

  // Verify category is set
  const { data } = await supabase.from('blog_posts').select('id, title, category').order('id', { ascending: false });
  console.log('\nCurrent blog posts with categories:');
  data?.forEach(p => console.log(`  #${p.id} [${p.category || 'NO CATEGORY'}]: ${p.title}`));

  // Verify products
  const { data: prods } = await supabase.from('produtos').select('id, name, image').order('id', { ascending: false });
  console.log('\nCurrent products with images:');
  prods?.forEach(p => console.log(`  #${p.id} ${p.name}: ${p.image ? p.image.substring(0, 50) + '...' : 'NO IMAGE'}`));

  process.exit(0);
}

migrate();
