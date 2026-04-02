require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Inserting products...');
  
  const produtos = [
    {
      name: 'Café Artesanal Especial',
      category: 'CAFÉS',
      maincategory: 'Café Moído na Hora',
      price: 45.90,
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&h=500&fit=crop',
      description: 'Café artesanal moído na hora, grãos selecionados.',
      detaileddescription: 'Café premium para os amantes de um bom café. Safra 2024.',
      stock: 50,
      rating: '4.9',
      reviews: 120
    },
    {
      name: 'Café Fazenda Pura',
      category: 'CAFÉS',
      maincategory: 'Café Moído na Hora',
      price: 38.50,
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=500&h=500&fit=crop',
      description: 'Café 100% arábica torra média.',
      detaileddescription: 'Sabor intenso e notas de chocolate.',
      stock: 30,
      rating: '4.8',
      reviews: 85
    },
    {
      name: 'Bebedouro Smart Automático',
      category: 'ACESSÓRIOS PARA PET',
      maincategory: 'Acessórios Pet e Animais',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
      description: 'Água fresca para o seu pet o dia todo.',
      detaileddescription: 'Bebedouro inteligente com filtro de carvão ativado.',
      stock: 15,
      rating: '4.7',
      reviews: 42
    },
    {
      name: 'Comedouro Interativo Colors',
      category: 'ACESSÓRIOS PARA PET',
      maincategory: 'Acessórios Pet e Animais',
      price: 55.00,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
      description: 'Tigela interativa anti-estresse para cães.',
      detaileddescription: 'Ajuda a diminuir a velocidade da alimentação do seu cão.',
      stock: 25,
      rating: '4.5',
      reviews: 60
    },
    {
      name: 'Pá de Jardinagem Inox',
      category: 'FERRAMENTAS',
      maincategory: 'Jardinagem e Agro',
      price: 32.90,
      image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop',
      description: 'Pá resistente para hortas e jardins.',
      detaileddescription: 'Feita de aço inox com cabo de madeira envernizada.',
      stock: 100,
      rating: '4.8',
      reviews: 110
    },
    {
      name: 'Tesoura de Poda Profissional',
      category: 'FERRAMENTAS',
      maincategory: 'Jardinagem e Agro',
      price: 89.90,
      image: 'https://images.unsplash.com/photo-1416879573551-7f8fed97424b?w=500&h=500&fit=crop',
      description: 'Tesoura de poda de alta precisão.',
      detaileddescription: 'Lâminas afiadas e cabo ergonômico.',
      stock: 40,
      rating: '4.9',
      reviews: 210
    }
  ];

  const { error: prodErr } = await supabase.from('produtos').insert(produtos);
  if (prodErr) { console.error('Erro produtos:', prodErr); } else { console.log('Produtos inseridos'); }

  console.log('Inserting blog posts...');
  
  const blogPosts = [
    {
      title: 'A Arte da Torra: Como escolher o café ideal',
      abstract: 'Descubra os segredos da torrefação e aprenda a escolher.',
      content: 'A torra do café é um processo mágico. Neste artigo, exploramos...',
      image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
      author: 'Especialista em Café'
    },
    {
      title: 'Moagem Perfeita: Guia definitivo',
      abstract: 'Qual moagem é ideal para o seu método de preparo?',
      content: 'Fina, grossa ou média. A moagem muda tudo...',
      image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
      author: 'Mestre Cafeeiro'
    },
    {
      title: 'Qualidade de vida para seu Pet',
      abstract: 'Veja dicas de como manter seu animal sempre feliz e hidratado.',
      content: 'Hidratação é fundamental. Os bebedouros automáticos...',
      image_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=400&fit=crop',
      author: 'Veterinário Online'
    },
    {
      title: 'Alimentação Lenta: Benefícios para os Cães',
      abstract: 'Por que potes interativos fazem tão bem para a digestão canina.',
      content: 'Comer muito rápido pode causar engasgos e torção gástrica...',
      image_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=400&fit=crop',
      author: 'Comportamento Animal'
    },
    {
      title: 'Como iniciar sua própria horta em casa',
      abstract: 'Passos simples para cultivar seus próprios temperos.',
      content: 'Ter uma horta é terapêutico. Você só precisa de uma boa pá e...',
      image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=400&fit=crop',
      author: 'Agricultura Urbana'
    },
    {
      title: 'Melhores épocas para podar suas plantas',
      abstract: 'Evite prejudicar o crescimento da sua horta.',
      content: 'A poda é essencial, mas deve ser feita com as ferramentas certas...',
      image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=400&fit=crop',
      author: 'Especialista Agro'
    }
  ];

  const { error: blogErr } = await supabase.from('blog_posts').insert(blogPosts);
  if (blogErr) { console.error('Erro blog:', blogErr); } else { console.log('Blog inserido'); }

  console.log('Finished seeding!');
  process.exit(0);
}

run();
