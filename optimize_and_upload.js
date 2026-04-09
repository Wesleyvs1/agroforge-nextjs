require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Pasta onde estão as imagens geradas pela IA (Sessão atual)
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
  console.log('🔄 Iniciando Compressão Direta (PNG -> WEBP via Sharp) e Atualização...');
  
  for (const item of mappings) {
    const fullPath = path.join(IMG_DIR, item.img);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Arquivo não encontrado: ${item.img}`);
      continue;
    }

    try {
      const originalSize = fs.statSync(fullPath).size;
      
      // Criar buffer WebP otimizado em memória (reduz brutalmente o tamanho)
      const webpBuffer = await sharp(fullPath)
        .webp({ quality: 80, effort: 4 })
        .toBuffer();
        
      const optimizedSize = webpBuffer.length;
      const reduction = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);
      
      const newWebPFileName = item.img.replace('.png', '.webp');
      const supabaseFilePath = `produtos/ai_gen_${newWebPFileName}`;

      console.log(`🚀 Otimizando: ${item.img} | Vantagem: ${reduction}% menor (${(originalSize/1024).toFixed(0)}KB -> ${(optimizedSize/1024).toFixed(0)}KB)`);

      // Upload do arquivo WEBP
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(supabaseFilePath, webpBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

      if (uploadError) {
        console.error(`❌ Erro no upload ao Supabase:`, uploadError.message);
        continue;
      }

      // Obter URL final public
      const { data } = supabase.storage.from('media').getPublicUrl(supabaseFilePath);
      const publicUrl = data.publicUrl;

      // Update banco de dados substituindo a ".png" pesada por ".webp" super leve
      const { error: updateError } = await supabase
        .from('produtos')
        .update({ image: publicUrl })
        .ilike('name', item.match);

      if (updateError) {
        console.error(`❌ Erro DB (${item.match}):`, updateError.message);
      } else {
        console.log(`✅ Atualizado com WEBP: -> ${publicUrl}\n`);
      }
      
    } catch (err) {
      console.error(`Ocorreu um erro no pipeline Sharp para ${item.img}:`, err);
    }
  }
  
  console.log('🎉 Compressão e Otimização Lote 3 (WEBP) Finalizada com Sucesso!');
}

run();
