require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const IMG_DIR = 'C:\\Users\\Bomba\\.gemini\\antigravity\\brain\\d06f2d50-e656-4433-89dd-3c1384e04cb5';

const mappings = [
  { img: 'racao_caes_premium_1775710590053.png', match: '%Ração Premier Adulto Cães%' },
  { img: 'racao_gatos_castrados_1775710602592.png', match: '%Ração para Gatos Castrados%' },
  { img: 'racao_cavalos_1775710617170.png', match: '%Ração Pelletizada Premium para Cavalos%' },
  { img: 'mel_puro_1775710634620.png', match: '%Mel Puro de Abelha Silvestre%' },
  { img: 'fertilizante_npk_1775710654421.png', match: '%Fertilizante NPK%' },
  { img: 'humus_minhoca_1775710666649.png', match: '%Húmus de Minhoca%' },
  { img: 'formicida_granulado_1775710687527.png', match: '%Formicida Granulado Mirex%' },
  { img: 'terramicina_spray_1775710701455.png', match: '%Terramicina Spray%' }
];

async function run() {
  console.log('🔄 Iniciando LOTE 2 upload e atualização das imagens...');
  
  for (const item of mappings) {
    const fullPath = path.join(IMG_DIR, item.img);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Arquivo não encontrado: ${item.img}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = `produtos/ai_gen_${item.img}`;

    // Upload
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error(`❌ Erro no upload de ${item.img}:`, uploadError.message);
      continue;
    }

    // Get URL
    const { data } = supabase.storage.from('media').getPublicUrl(fileName);
    const publicUrl = data.publicUrl;

    // Update product
    const { error: updateError } = await supabase
      .from('produtos')
      .update({ image: publicUrl })
      .ilike('name', item.match);

    if (updateError) {
      console.error(`❌ Erro ao atualizar DB (${item.match}):`, updateError.message);
    } else {
      console.log(`✅ Lote 2 Atualizado com sucesso: ${item.match} -> ${publicUrl}`);
    }
  }
  
  console.log('🎉 Lote 2 Finalizado!');
}

run();
