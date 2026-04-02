require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Unique, curated Unsplash images — each URL is different and topically relevant
const products = [
  // ───── ACESSÓRIOS PARA PET ─────
  {
    name: 'Coleira Ajustável Nylon Premium para Cães',
    category: 'ACESSÓRIOS PARA PET',
    maincategory: 'Acessórios Pet e Animais',
    price: 34.90,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop&q=80',
    description: 'Coleira reforçada em nylon com fivela metálica e regulagem de tamanho.',
    detaileddescription: 'Ideal para passeios diários. Disponível nos tamanhos P, M e G. Resistente à água e de fácil higienização.',
    stock: 40, rating: '4.7', reviews: 89
  },
  {
    name: 'Arranhador Poste Sisal para Gatos 70cm',
    category: 'ACESSÓRIOS PARA PET',
    maincategory: 'Acessórios Pet e Animais',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop&q=80',
    description: 'Arranhador vertical em sisal natural com base antiderrapante.',
    detaileddescription: 'Protege seus móveis e garante o exercício natural dos gatos. 70cm de altura, base 30x30cm.',
    stock: 25, rating: '4.8', reviews: 62
  },

  // ───── FARELOS E QUIRERAS ─────
  {
    name: 'Farelo de Trigo Integral 25kg',
    category: 'FARELOS E QUIRERAS',
    maincategory: 'Alimentação Animal',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1c5c00c6c?w=500&h=500&fit=crop&q=80',
    description: 'Farelo de trigo integral puro, ideal para complementação alimentar de ruminantes e suínos.',
    detaileddescription: 'Rico em fibras e proteínas. Armazenamento em local seco e arejado. Validade 90 dias.',
    stock: 80, rating: '4.5', reviews: 34
  },
  {
    name: 'Quirera de Milho Grossa 30kg',
    category: 'FARELOS E QUIRERAS',
    maincategory: 'Alimentação Animal',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1601597111214-f73dc0e1e091?w=500&h=500&fit=crop&q=80',
    description: 'Quirera de milho moída grossa, excelente fonte de energia para aves e suínos.',
    detaileddescription: 'Produto 100% natural sem aditivos químicos. Saco de 30kg reforçado.',
    stock: 60, rating: '4.6', reviews: 28
  },

  // ───── FERRAMENTAS ─────
  {
    name: 'Enxada Larga de Aço Carbono com Cabo',
    category: 'FERRAMENTAS',
    maincategory: 'Ferramentas Agrícolas',
    price: 67.90,
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&h=500&fit=crop&q=80',
    description: 'Enxada larga para capina, encabada com madeira eucalipto tratado 1,4m.',
    detaileddescription: 'Lâmina em aço carbono temperado. Largura da lâmina 22cm. Ideal para hortas e lavouras.',
    stock: 50, rating: '4.8', reviews: 115
  },
  {
    name: 'Foice Rural Aço Inox 55cm com Cabo',
    category: 'FERRAMENTAS',
    maincategory: 'Ferramentas Agrícolas',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&q=80',
    description: 'Foice profissional para corte de mato, cana e pastagem.',
    detaileddescription: 'Lâmina em aço inox com tratamento anticorrosivo. Cabo em madeira de 55cm ergonômico.',
    stock: 30, rating: '4.6', reviews: 74
  },

  // ───── FERTILIZANTES ─────
  {
    name: 'Fertilizante NPK 04-14-08 Granulado 5kg',
    category: 'FERTILIZANTES',
    maincategory: 'Insumos Agrícolas',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop&q=80',
    description: 'Fertilizante granulado NPK formulação 04-14-08 para culturas diversas.',
    detaileddescription: 'Indicado para fruticultura e horticultura. Aplicação via sulco ou lanço. Embalagem 5kg.',
    stock: 120, rating: '4.7', reviews: 88
  },
  {
    name: 'Húmus de Minhoca Orgânico 10kg',
    category: 'FERTILIZANTES',
    maincategory: 'Insumos Agrícolas',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&h=500&fit=crop&q=80',
    description: 'Adubo orgânico de húmus de minhoca californiana, rico em nutrientes.',
    detaileddescription: 'Melhora a estrutura do solo e a absorção de nutrientes. 100% orgânico, sem agrotóxicos.',
    stock: 90, rating: '4.9', reviews: 143
  },

  // ───── GAIOLAS ─────
  {
    name: 'Gaiola Ovalada para Canário Grande Cromada',
    category: 'GAIOLAS',
    maincategory: 'Acessórios Pet e Animais',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=500&h=500&fit=crop&q=80',
    description: 'Gaiola ovalada de aço cromado com poleiro, comedouro e bebedouro inclusos.',
    detaileddescription: 'Dimensões: 45x30x55cm. Espaçamento entre grades: 11mm. Ideal para canários e pintassilgos.',
    stock: 18, rating: '4.5', reviews: 37
  },
  {
    name: 'Gaiola Retangular para Coelhos e Caviinhos',
    category: 'GAIOLAS',
    maincategory: 'Acessórios Pet e Animais',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=500&fit=crop&q=80',
    description: 'Gaiola espaçosa com bandeja removível para fácil higienização.',
    detaileddescription: 'Estrutura em arame galvanizado. Dimensões: 80x50x45cm. Porta dupla com trinco de segurança.',
    stock: 12, rating: '4.4', reviews: 22
  },

  // ───── JARDINAGEM ─────
  {
    name: 'Regador Plástico 10 Litros com Crivo',
    category: 'JARDINAGEM',
    maincategory: 'Jardinagem e Agro',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop&q=80',
    description: 'Regador de plástico resistente de 10L com crivo removível para rega suave.',
    detaileddescription: 'Alça ergonômica dupla. Bico longo de alcance. Ideal para hortas, vasos e canteiros.',
    stock: 35, rating: '4.6', reviews: 58
  },
  {
    name: 'Vaso Autoirrigável Redondo Verde 25cm',
    category: 'JARDINAGEM',
    maincategory: 'Jardinagem e Agro',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop&q=80',
    description: 'Vaso com reservatório de água interno para autossuficiência hídrica das plantas.',
    detaileddescription: 'Material: polietileno de alta qualidade. Capacidade do reservatório: 400ml. Diâmetro: 25cm.',
    stock: 55, rating: '4.8', reviews: 92
  },

  // ───── MEDICAMENTOS ─────
  {
    name: 'Terramicina Spray Aerossol 125ml',
    category: 'MEDICAMENTOS',
    maincategory: 'Saúde Animal',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=500&h=500&fit=crop&q=80',
    description: 'Antibiótico tópico em spray para tratamento de feridas em animais.',
    detaileddescription: 'Princípio ativo: Oxitetraciclina 3,27%. Uso externo. Consulte o veterinário antes do uso.',
    stock: 65, rating: '4.7', reviews: 102
  },
  {
    name: 'Anti-Inflamatório Veterinário Meloxicam 10ml',
    category: 'MEDICAMENTOS',
    maincategory: 'Saúde Animal',
    price: 48.50,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=500&fit=crop&q=80',
    description: 'Anti-inflamatório injetável de uso veterinário. Apresentação 2mg/ml.',
    detaileddescription: 'Indicado para dor e inflamação em bovinos, equinos e suínos. Venda sob prescrição.',
    stock: 40, rating: '4.9', reviews: 67
  },

  // ───── PENEIRAS ─────
  {
    name: 'Peneira Classificadora de Solo 60cm Arame Fino',
    category: 'PENEIRAS',
    maincategory: 'Ferramentas Agrícolas',
    price: 58.00,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&h=500&fit=crop&q=80',
    description: 'Peneira circular 60cm em arame fino galvanizado para classificação de terra e substrato.',
    detaileddescription: 'Malha 3mm. Aro em madeira de lei tratada. Ideal para preparação de substratos e classificação de grãos.',
    stock: 22, rating: '4.5', reviews: 41
  },
  {
    name: 'Peneira Redonda para Grãos e Café 50cm Malha Inox',
    category: 'PENEIRAS',
    maincategory: 'Ferramentas Agrícolas',
    price: 72.00,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&q=80',
    description: 'Peneira inox específica para classificação de café e grãos por tamanho.',
    detaileddescription: 'Malha 5mm em tela de inox. Aro em madeira 50cm. Indica granulometria do produto colhido.',
    stock: 18, rating: '4.6', reviews: 29
  },

  // ───── PETISCOS PARA PETS ─────
  {
    name: 'Ossinho Mastigável Natural para Cães Médios 4un',
    category: 'PETISCOS PARA PETS',
    maincategory: 'Acessórios Pet e Animais',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop&q=80',
    description: 'Petisco mastigável natural que promove saúde bucal e entretém o cão.',
    detaileddescription: 'Ingredientes 100% naturais sem conservantes artificiais. Pacote com 4 unidades. Para cães de 10-25kg.',
    stock: 75, rating: '4.8', reviews: 134
  },
  {
    name: 'Snack de Atum Liofilizado para Gatos 30g',
    category: 'PETISCOS PARA PETS',
    maincategory: 'Acessórios Pet e Animais',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop&q=80',
    description: 'Petisco de atum liofilizado para gatos, sabor intenso e textura crocante.',
    detaileddescription: 'Processado a frio para conservar nutrientes. Ingrediente único: atum. Sem corantes ou aromas.',
    stock: 85, rating: '4.9', reviews: 178
  },

  // ───── PRODUTOS COLONIAIS ─────
  {
    name: 'Mel Puro de Abelha Silvestre 500g',
    category: 'PRODUTOS COLONIAIS',
    maincategory: 'Produtos Coloniais',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=500&fit=crop&q=80',
    description: 'Mel puro de abelha silvestre coletado de floradas do cerrado e mata nativa.',
    detaileddescription: 'Sem aquecimento, sem processamento industrial. Certificado orgânico. Pote de vidro 500g.',
    stock: 30, rating: '4.9', reviews: 201
  },
  {
    name: 'Doce de Leite Colonial Artesanal 400g',
    category: 'PRODUTOS COLONIAIS',
    maincategory: 'Produtos Coloniais',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=500&fit=crop&q=80',
    description: 'Doce de leite produzido artesanalmente com leite integral e açúcar cristal.',
    detaileddescription: 'Receita tradicional colonial da região. Embalagem de vidro vedada. Validade 90 dias.',
    stock: 45, rating: '4.8', reviews: 88
  },

  // ───── RAÇÃO CÃES E GATOS ─────
  {
    name: 'Ração Premier Adulto Cães Raças Médias 15kg',
    category: 'RAÇÃO CÃES E GATOS',
    maincategory: 'Rações',
    price: 219.90,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&h=500&fit=crop&q=80',
    description: 'Ração super premium formulada para cães adultos de raças médias com frango.',
    detaileddescription: 'Fonte de ômega-3 e ômega-6. Enriquecida com vitaminas e minerais. DHA para saúde cognitiva.',
    stock: 35, rating: '4.9', reviews: 245
  },
  {
    name: 'Ração para Gatos Castrados Frango 3kg',
    category: 'RAÇÃO CÃES E GATOS',
    maincategory: 'Rações',
    price: 74.90,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop&q=80',
    description: 'Ração especialmente formulada para gatos castrados com controle de peso.',
    detaileddescription: 'Fórmula com baixo teor de gordura e magnésio. Protege o sistema urinário. Saco 3kg.',
    stock: 50, rating: '4.7', reviews: 189
  },

  // ───── RAÇÃO PARA AVES ─────
  {
    name: 'Ração Postura Completa para Galinhas 25kg',
    category: 'RAÇÃO PARA AVES',
    maincategory: 'Rações',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=500&fit=crop&q=80',
    description: 'Ração completa farelada para galinhas em postura com vitaminas e minerais.',
    detaileddescription: 'Estimula a produção de ovos com casca dura. Com calcário e vitamina D3. Saco 25kg.',
    stock: 45, rating: '4.6', reviews: 73
  },
  {
    name: 'Ração Inicial para Pintinhos 0-21 Dias 10kg',
    category: 'RAÇÃO PARA AVES',
    maincategory: 'Rações',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1612774412771-005ed8e861d2?w=500&h=500&fit=crop&q=80',
    description: 'Ração farelada inicial de alto desempenho para pintos de corte ou postura.',
    detaileddescription: 'Com coccidiostático para prevenção de coccidiose. Alto teor proteico. Saco 10kg.',
    stock: 60, rating: '4.7', reviews: 55
  },

  // ───── RAÇÃO PARA EQUINOS ─────
  {
    name: 'Ração Pelletizada Premium para Cavalos 30kg',
    category: 'RAÇÃO PARA EQUINOS',
    maincategory: 'Rações',
    price: 185.00,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=500&fit=crop&q=80',
    description: 'Ração equina pelletizada de alta energia para cavalos de trabalho e esporte.',
    detaileddescription: 'Formulação com milho, farelo de soja, vitaminas A, D e E. Saco 30kg. Para cavalos adultos.',
    stock: 20, rating: '4.8', reviews: 41
  },
  {
    name: 'Suplemento Mineral Top Horse 5kg',
    category: 'RAÇÃO PARA EQUINOS',
    maincategory: 'Rações',
    price: 139.00,
    image: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=500&h=500&fit=crop&q=80',
    description: 'Suplemento mineral completo para equinos com biotina, zinco e fósforo.',
    detaileddescription: 'Indicado para melhora de cascos, pelo e desempenho. Misturar à ração. Pote 5kg.',
    stock: 15, rating: '4.7', reviews: 32
  },

  // ───── RAÇÃO PARA PÁSSAROS ─────
  {
    name: 'Mistura de Sementes Fina para Canários 500g',
    category: 'RAÇÃO PARA PÁSSAROS',
    maincategory: 'Rações',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1501386761578-eee54b12edd6?w=500&h=500&fit=crop&q=80',
    description: 'Mix de sementes selecionadas de alpiste, painço e niger para canários.',
    detaileddescription: 'Semente limpa e higienizadas. Pacote de 500g com zíper refechável. Enriquecida com vitaminas.',
    stock: 90, rating: '4.7', reviews: 67
  },
  {
    name: 'Ração Granulada para Papagaios e Calopsitas 600g',
    category: 'RAÇÃO PARA PÁSSAROS',
    maincategory: 'Rações',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=500&h=500&fit=crop&q=80',
    description: 'Ração granulada nutricionalmente completa para psitacídeos de médio porte.',
    detaileddescription: 'Extrusada com frutas e legumes. Sem corantes artificiais. Embalagem 600g com lacre.',
    stock: 40, rating: '4.8', reviews: 94
  },

  // ───── SUPLEMENTOS E VITAMINAS ─────
  {
    name: 'Vitaminado A-D3-E Concentrado para Aves 100ml',
    category: 'SUPLEMENTOS E VITAMINAS',
    maincategory: 'Saúde Animal',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=500&fit=crop&q=80',
    description: 'Suplemento vitamínico concentrado com vitaminas A, D3 e E para aves de postura.',
    detaileddescription: 'Melhora a postura e imunidade das aves. Dosagem: 1ml/litro de água. Frasco 100ml.',
    stock: 70, rating: '4.6', reviews: 83
  },
  {
    name: 'Complexo B Injetável para Bovinos 100ml',
    category: 'SUPLEMENTOS E VITAMINAS',
    maincategory: 'Saúde Animal',
    price: 38.90,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&h=500&fit=crop&q=80',
    description: 'Complexo B injetável com B1, B6 e B12 para bovinos e equinos.',
    detaileddescription: 'Indicado para carências vitamínicas, estresse e subnutrição. Frasco 100ml. Uso IV ou IM.',
    stock: 45, rating: '4.8', reviews: 56
  },

  // ───── VENENOS ─────
  {
    name: 'Formicida Granulado Mirex-S 1kg',
    category: 'VENENOS',
    maincategory: 'Defensivos Agrícolas',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=500&h=500&fit=crop&q=80',
    description: 'Formicida isca granulada para combate de formigas saúvas e quenquéns.',
    detaileddescription: 'Princípio ativo: Sulfluramida 0,3%. Aplicar 8-10g por m² do formigueiro. Embalagem 1kg.',
    stock: 100, rating: '4.7', reviews: 127
  },
  {
    name: 'Raticida Klerat Bloco Parafinado 200g',
    category: 'VENENOS',
    maincategory: 'Defensivos Agrícolas',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&h=500&fit=crop&q=80',
    description: 'Raticida em bloco parafinado de segunda geração para controle de ratos e camundongos.',
    detaileddescription: 'Brodifacuom 0,005%. Resistente à umidade. Indicado para ambientes internos e externos.',
    stock: 80, rating: '4.5', reviews: 44
  },

  // ───── VERMÍFUGOS ─────
  {
    name: 'Ivermectina 1% Solução Injetável Para Bovinos 500ml',
    category: 'VERMÍFUGOS',
    maincategory: 'Saúde Animal',
    price: 74.90,
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=500&h=500&fit=crop&q=80',
    description: 'Antiparasitário de amplo espectro contra endo e ectoparasitas em bovinos.',
    detaileddescription: 'Ivermectina 1%. Dosagem: 1ml/50kg IM. Período de carência: 28 dias. Frasco 500ml.',
    stock: 28, rating: '4.8', reviews: 98
  },
  {
    name: 'Vermífugo Oral Pastilha para Cães e Gatos 4 comprimidos',
    category: 'VERMÍFUGOS',
    maincategory: 'Saúde Animal',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop&q=80',
    description: 'Vermífugo palatável em comprimido para cães e gatos. Ação contra Toxocara e Ancylostoma.',
    detaileddescription: 'Praziquantel + Pirantel. 4 comprimidos por embalagem. Pode ser partido na ração.',
    stock: 100, rating: '4.7', reviews: 167
  }
];

async function seed() {
  console.log(`\n🌱 Seeding ${products.length} produtos...\n`);

  let success = 0;
  let errors = 0;

  for (const product of products) {
    const { error } = await supabase.from('produtos').insert([product]);
    if (error) {
      console.error(`❌ [${product.category}] ${product.name}: ${error.message}`);
      errors++;
    } else {
      console.log(`✅ [${product.category}] ${product.name}`);
      success++;
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅ Inseridos: ${success}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`Total: ${products.length}`);
  process.exit(0);
}

seed();
