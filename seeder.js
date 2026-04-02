require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const imageDir = 'C:\\Users\\Bomba\\.gemini\\antigravity\\brain\\5890dc6a-c33a-46ff-9eaa-5b83ae245de3';

const images = {
  cafe1: 'cafe_moido_1_1775097121316.png',
  cafe2: 'cafe_moido_2_1775097133387.png',
  pet1: 'acessorio_pet_1_1775097146597.png',
  pet2: 'acessorio_pet_2_1775097160826.png',
  ferramenta1: 'ferramenta_1_1775097176529.png',
  ferramenta2: 'ferramenta_2_1775097190546.png',
  blogCafe: 'blog_cafe_1775097210632.png',
  blogPet: 'blog_pet_1775097227850.png',
  blogAgro: 'blog_agro_1775097242771.png',
};

async function uploadImage(fileName, folderName = 'Seeder') {
  const filePath = path.join(imageDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return null;
  }
  const fileBuffer = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from('media')
    .upload(`${folderName}/${fileName}`, fileBuffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) {
    console.error('Error uploading', fileName, error);
    return null;
  }

  const { data: publicData } = supabase.storage.from('media').getPublicUrl(`${folderName}/${fileName}`);
  
  // Register in media_items
  await supabase.from('media_items').insert([{
    name: fileName,
    url: publicData.publicUrl,
    folder: folderName
  }]);

  return publicData.publicUrl;
}

async function run() {
  console.log('Uploading images...');
  
  const cafe1Url = await uploadImage(images.cafe1, 'Produtos');
  const cafe2Url = await uploadImage(images.cafe2, 'Produtos');
  const pet1Url = await uploadImage(images.pet1, 'Produtos');
  const pet2Url = await uploadImage(images.pet2, 'Produtos');
  const ferramenta1Url = await uploadImage(images.ferramenta1, 'Produtos');
  const ferramenta2Url = await uploadImage(images.ferramenta2, 'Produtos');
  
  const blogCafeUrl = await uploadImage(images.blogCafe, 'Blog');
  const blogPetUrl = await uploadImage(images.blogPet, 'Blog');
  const blogAgroUrl = await uploadImage(images.blogAgro, 'Blog');

  console.log('Inserting products...');
  
  const produtos = [
    {
      name: 'Café Artesanal Especial',
      category: 'CAFÉS',
      maincategory: 'Café Moído na Hora',
      price: 45.90,
      image: cafe1Url,
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
      image: cafe2Url,
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
      image: pet1Url,
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
      image: pet2Url,
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
      image: ferramenta1Url,
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
      image: ferramenta2Url,
      description: 'Tesoura de poda de alta precisão.',
      detaileddescription: 'Lâminas afiadas e cabo ergonômico.',
      stock: 40,
      rating: '4.9',
      reviews: 210
    }
  ];

  const { error: prodErr } = await supabase.from('produtos').insert(produtos);
  if (prodErr) console.error('Erro produtos:', prodErr);

  console.log('Inserting blog posts...');
  
  const blogPosts = [
    {
      title: 'A Arte da Torra: Como escolher o café ideal',
      abstract: 'Descubra os segredos da torrefação e aprenda a escolher.',
      content: 'A torra do café é um processo mágico. Neste artigo, exploramos...',
      image_url: blogCafeUrl,
      author: 'Especialista em Café'
    },
    {
      title: 'Moagem Perfeita: Guia definitivo',
      abstract: 'Qual moagem é ideal para o seu método de preparo?',
      content: 'Fina, grossa ou média. A moagem muda tudo...',
      image_url: blogCafeUrl,
      author: 'Mestre Cafeeiro'
    },
    {
      title: 'Qualidade de vida para seu Pet',
      abstract: 'Veja dicas de como manter seu animal sempre feliz e hidratado.',
      content: 'Hidratação é fundamental. Os bebedouros automáticos...',
      image_url: blogPetUrl,
      author: 'Veterinário Online'
    },
    {
      title: 'Alimentação Lenta: Benefícios para os Cães',
      abstract: 'Por que potes interativos fazem tão bem para a digestão canina.',
      content: 'Comer muito rápido pode causar engasgos e torção gástrica...',
      image_url: blogPetUrl,
      author: 'Comportamento Animal'
    },
    {
      title: 'Como iniciar sua própria horta em casa',
      abstract: 'Passos simples para cultivar seus próprios temperos.',
      content: 'Ter uma horta é terapêutico. Você só precisa de uma boa pá e...',
      image_url: blogAgroUrl,
      author: 'Agricultura Urbana'
    },
    {
      title: 'Melhores épocas para podar suas plantas',
      abstract: 'Evite prejudicar o crescimento da sua horta.',
      content: 'A poda é essencial, mas deve ser feita com as ferramentas certas...',
      image_url: blogAgroUrl,
      author: 'Especialista Agro'
    }
  ];

  const { error: blogErr } = await supabase.from('blog_posts').insert(blogPosts);
  if (blogErr) console.error('Erro blog:', blogErr);

  console.log('Finished seeding!');
  process.exit(0);
}

run();
