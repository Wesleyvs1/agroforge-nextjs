require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const IMG_DIR = 'C:\\Users\\Bomba\\.gemini\\antigravity\\brain\\9096d62c-0ba9-430c-9f3e-9ed1bdfa0ec4';

const mappings = [
  { img: 'ivermectina_1775750809845.png', match: '%Ivermectina 1% Solução Injetável Para Bovinos 500ml%' },
  { img: 'raticida_1775750827140.png', match: '%Raticida Klerat Bloco Parafinado 200g%' },
  { img: 'complexo_b_1775750841927.png', match: '%Complexo B Injetável para Bovinos 100ml%' },
  { img: 'vitaminado_1775750857117.png', match: '%Vitaminado A-D3-E Concentrado para Aves 100ml%' },
  { img: 'suplemento_horse_1775750872740.png', match: '%Suplemento Mineral Top Horse 5kg%' },
  { img: 'racao_pintinhos_1775750888173.png', match: '%Ração Inicial para Pintinhos 0-21 Dias 10kg%' },
  { img: 'racao_galinhas_1775750903417.png', match: '%Ração Postura Completa para Galinhas 25kg%' },
  { img: 'snack_atum_1775750918181.png', match: '%Snack de Atum Liofilizado para Gatos 30g%' },
  { img: 'peneira_1775750933475.png', match: '%Peneira Classificadora de Solo 60cm Arame Fino%' },
  { img: 'meloxicam_1775750947707.png', match: '%Anti-Inflamatório Veterinário Meloxicam 10ml%' },
  { img: 'gaiola_ovalada_1775750962332.png', match: '%Gaiola Ovalada para Canário Grande Cromada%' },
  { img: 'foice_rural_1775750975463.png', match: '%Foice Rural Aço Inox 55cm com Cabo%' },
  { img: 'enxada_1775750989001.png', match: '%Enxada Larga de Aço Carbono com Cabo%' },
  { img: 'tesoura_poda_1775751005763.png', match: '%Tesoura de Poda Profissional%' },
];

async function run() {
  console.log('🔄 Iniciando LOTE 3 upload e atualização das imagens...');
  
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
      console.log(`✅ Lote 3 Atualizado com sucesso: ${item.match} -> ${publicUrl}`);
    }
  }
  
  console.log('🎉 Lote 3 Finalizado!');
}

run();
