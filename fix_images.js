require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixImages() {
  // Use reliable Unsplash images that are confirmed working
  const updates = [
    {
      name: 'Pá de Jardinagem Inox',
      image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop&q=80'
    },
    {
      name: 'Tesoura de Poda Profissional',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=500&fit=crop&q=80'
    },
    {
      name: 'Bebedouro Smart Automático',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop&q=80'
    },
    {
      name: 'Comedouro Interativo Colors',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop&q=80'
    },
    {
      name: 'Café Artesanal Especial',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&h=500&fit=crop&q=80'
    },
    {
      name: 'Café Fazenda Pura',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&q=80'
    }
  ];

  for (const u of updates) {
    const { error } = await supabase.from('produtos').update({ image: u.image }).eq('name', u.name);
    console.log(`${u.name}: ${error ? '❌ ' + error.message : '✅'}`);
  }

  // Also fix blog post images to use reliable URLs
  const blogUpdates = [
    {
      keywords: ['torra', 'moagem'],
      image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop&q=80'
    },
    {
      keywords: ['pet', 'cão', 'cães', 'alimentação'],
      image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=450&fit=crop&q=80'
    },
    {
      keywords: ['horta', 'podar', 'plantas'],
      image_url: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=800&h=450&fit=crop&q=80'
    }
  ];

  const { data: posts } = await supabase.from('blog_posts').select('id, title');
  for (const post of posts || []) {
    const titleLower = post.title.toLowerCase();
    for (const bu of blogUpdates) {
      if (bu.keywords.some(k => titleLower.includes(k))) {
        const { error } = await supabase.from('blog_posts').update({ image_url: bu.image_url }).eq('id', post.id);
        console.log(`Blog #${post.id} "${post.title}": ${error ? '❌ ' + error.message : '✅'}`);
        break;
      }
    }
  }

  // Also set café posts image
  const { error: cafeErr } = await supabase
    .from('blog_posts')
    .update({ image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop&q=80' })
    .or('title.ilike.%café%,title.ilike.%torra%,title.ilike.%moagem%');
  console.log('Café posts:', cafeErr ? '❌ ' + cafeErr.message : '✅');

  console.log('\nDone!');
  process.exit(0);
}

fixImages();
