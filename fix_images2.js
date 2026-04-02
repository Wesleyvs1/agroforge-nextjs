require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const fixes = [
  { name: 'Mel Puro de Abelha Silvestre 500g',                      img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=500&fit=crop&q=80' },
  { name: 'Quirera de Milho Grossa 30kg',                           img: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=500&h=500&fit=crop&q=80' },
  { name: 'Peneira Redonda para Grãos e Café 50cm Malha Inox',      img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=500&fit=crop&q=80' },
  { name: 'Peneira Classificadora de Solo 60cm Arame Fino',         img: 'https://images.unsplash.com/photo-1563241527-3004b7be0960?w=500&h=500&fit=crop&q=80' },
  { name: 'Anti-Inflamatório Veterinário Meloxicam 10ml',           img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop&q=80' },
  { name: 'Terramicina Spray Aerossol 125ml',                       img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop&q=80' },
  { name: 'Vitaminado A-D3-E Concentrado para Aves 100ml',          img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop&q=80' },
  { name: 'Complexo B Injetável para Bovinos 100ml',                img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=500&fit=crop&q=80' },
  { name: 'Ivermectina 1% Solução Injetável Para Bovinos 500ml',    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=500&fit=crop&q=80' },
  { name: 'Vermífugo Oral Pastilha para Cães e Gatos 4 comprimidos',img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=500&h=500&fit=crop&q=80' },
  { name: 'Mistura de Sementes Fina para Canários 500g',            img: 'https://images.unsplash.com/photo-1610415264399-2fee0e8b8ac4?w=500&h=500&fit=crop&q=80' },
  { name: 'Regador Plástico 10 Litros com Crivo',                   img: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=500&h=500&fit=crop&q=80' },
  { name: 'Vaso Autoirrigável Redondo Verde 25cm',                  img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop&q=80' },
  { name: 'Doce de Leite Colonial Artesanal 400g',                  img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=500&fit=crop&q=80' },
  { name: 'Ração para Gatos Castrados Frango 3kg',                  img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop&q=80' },
  { name: 'Formicida Granulado Mirex-S 1kg',                        img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&h=500&fit=crop&q=80' },
  { name: 'Raticida Klerat Bloco Parafinado 200g',                  img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop&q=80' },
];

async function run() {
  console.log('Fixing images...');
  for (const f of fixes) {
    const { error } = await s.from('produtos').update({ image: f.img }).eq('name', f.name);
    console.log(error ? '❌ ' + f.name : '✅ ' + f.name.substring(0,40));
  }
  console.log('Done!');
  process.exit(0);
}
run();
