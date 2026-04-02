require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function cleanup() {
  console.log('🧹 Starting cleanup...\n');

  // 1. Delete produto "Teste" (id=1, price=0, name=Teste)
  const { error: e1 } = await supabase
    .from('produtos')
    .delete()
    .or('name.eq.Teste,price.eq.0');
  console.log('1. Produto Teste removido:', e1 ? `❌ ${e1.message}` : '✅');

  // 2. Find duplicate blog posts and keep only the 6 most recent ones
  const { data: allPosts } = await supabase
    .from('blog_posts')
    .select('id, title')
    .order('id', { ascending: true });

  if (allPosts && allPosts.length > 6) {
    // Delete the oldest (first 6 = from seeder.js failed run)
    const toDelete = allPosts.slice(0, allPosts.length - 6).map(p => p.id);
    console.log(`2. Deleting ${toDelete.length} duplicate blog posts with ids: ${toDelete.join(', ')}`);
    const { error: e2 } = await supabase
      .from('blog_posts')
      .delete()
      .in('id', toDelete);
    console.log('   Duplicados removidos:', e2 ? `❌ ${e2.message}` : '✅');
  } else {
    console.log(`2. Blog posts count: ${allPosts?.length}. No cleanup needed.`);
  }

  // 3. Add category column to blog_posts (we'll update category via data)
  // Update Ferramentas blog posts to correct category
  const { data: remaining } = await supabase
    .from('blog_posts')
    .select('id, title')
    .order('id', { ascending: false });
  
  console.log('\n3. Remaining blog posts:');
  remaining?.forEach(p => console.log(`   #${p.id}: ${p.title}`));

  // 4. Update blog posts with categories
  if (remaining) {
    const categoryMap = [
      { keywords: ['café', 'torra', 'moagem'], category: 'Café' },
      { keywords: ['pet', 'cão', 'cães', 'animal', 'alimentação'], category: 'Pet' },
      { keywords: ['horta', 'podar', 'plantas', 'jardim', 'agro', 'épocas'], category: 'Cultivo' },
    ];

    for (const post of remaining) {
      const titleLower = post.title.toLowerCase();
      let cat = 'Geral';
      for (const map of categoryMap) {
        if (map.keywords.some(k => titleLower.includes(k))) {
          cat = map.category;
          break;
        }
      }
      await supabase.from('blog_posts').update({ category: cat }).eq('id', post.id);
    }
    console.log('4. Categories updated ✅');
  }

  // 5. Fix product images — update ferramentas with better images
  const { error: e5a } = await supabase
    .from('produtos')
    .update({ image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop' })
    .eq('name', 'Pá de Jardinagem Inox');
  
  const { error: e5b } = await supabase
    .from('produtos')
    .update({ image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop' })
    .eq('name', 'Tesoura de Poda Profissional');

  // Pet images - use a real cat/dog product image
  const { error: e5c } = await supabase
    .from('produtos')
    .update({ image: 'https://images.unsplash.com/photo-1600369671374-30d8cbe1bb33?w=500&h=500&fit=crop' })
    .eq('name', 'Bebedouro Smart Automático');

  const { error: e5d } = await supabase
    .from('produtos')
    .update({ image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop' })
    .eq('name', 'Comedouro Interativo Colors');

  console.log('\n5. Product images updated:');
  console.log('   Pá de Jardinagem:', e5a ? `❌ ${e5a.message}` : '✅');
  console.log('   Tesoura de Poda:', e5b ? `❌ ${e5b.message}` : '✅');
  console.log('   Bebedouro Smart:', e5c ? `❌ ${e5c.message}` : '✅');
  console.log('   Comedouro Colors:', e5d ? `❌ ${e5d.message}` : '✅');

  console.log('\n✨ Cleanup complete!');
  process.exit(0);
}

cleanup();
