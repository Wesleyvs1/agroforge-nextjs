require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// All known broken Unsplash photo IDs → replacements with verified working IDs
const badToGood = {
  'photo-1610415264399-2fee0e8b8ac4': 'photo-1606567595334-d39972c85dbe',
  'photo-1634912312-8249b6b2a1da':    'photo-1471193945509-9ad0617afabf',
  'photo-1574323347407-f5e1c5c00c6c': 'photo-1543257580-7269da773bf5',
  'photo-1559187539-f41e2fd85d17':    'photo-1447933601403-0c6688de566e',
  'photo-1416879573551-7f8fed97424b': 'photo-1530836369250-ef72a3f5cda8',
};

async function fix() {
  const { data: products } = await s.from('produtos').select('id, name, image');
  let fixed = 0;

  for (const p of (products || [])) {
    if (!p.image) continue;
    for (const [bad, good] of Object.entries(badToGood)) {
      if (p.image.includes(bad)) {
        const newUrl = p.image.replace(bad, good);
        await s.from('produtos').update({ image: newUrl }).eq('id', p.id);
        console.log(`✅ #${p.id} ${p.name.substring(0,40)}`);
        fixed++;
        break;
      }
    }
  }
  
  // Also fix blog_posts
  const { data: posts } = await s.from('blog_posts').select('id, title, image_url');
  for (const p of (posts || [])) {
    if (!p.image_url) continue;
    for (const [bad, good] of Object.entries(badToGood)) {
      if (p.image_url.includes(bad)) {
        const newUrl = p.image_url.replace(bad, good);
        await s.from('blog_posts').update({ image_url: newUrl }).eq('id', p.id);
        console.log(`✅ Blog #${p.id} ${p.title.substring(0,40)}`);
        fixed++;
        break;
      }
    }
  }

  console.log(`\nFixed: ${fixed}`);
  process.exit(0);
}

fix();
