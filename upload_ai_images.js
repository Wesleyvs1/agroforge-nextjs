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
  { img: 'racao_papagaios_1775710415700.png', match: '%Papagaios e Calopsitas%' },
  { img: 'racao_canarios_1775710430091.png', match: '%Mistura de Sementes Fina para Canários%' },
  { img: 'arranhador_gato_1775710444353.png', match: '%Arranhador %' },
  { img: 'gaiola_coelho_1775710458788.png', match: '%Gaiola Retangular para Coelhos%' },
  { img: 'vaso_autoirrigavel_1775710481460.png', match: '%Vaso Autoirrigável%' },
  { img: 'doce_leite_1775710498378.png', match: '%Doce de Leite%' },
  { img: 'coleira_nylon_1775710510325.png', match: '%Coleira Ajustável%' },
  { img: 'regador_plastico_1775710523441.png', match: '%Regador Plástico%' }
];

async function run() {
  console.log('🔄 Iniciando upload e atualização das imagens...');
  
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
      console.log(`✅ Atualizado com sucesso: ${item.match} -> ${publicUrl}`);
    }
  }
  
  console.log('🎉 Finalizado!');
}

run();
