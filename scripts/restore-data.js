const fs = require('fs');

const file = 'src/data/products.js';
let code = fs.readFileSync(file, 'utf8');

const posts = `
export const blogPosts = [
  {
    id: 1,
    title: 'Como escolher a ração ideal para o seu cavalo',
    slug: 'escolher-racao-cavalo',
    excerpt: 'Dicas essenciais para garantir a nutrição e performance do seu parceiro.',
    content: '<p>Escolher a ração correta é fundamental para a saúde do cavalo...</p>',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1471&auto=format&fit=crop',
    category: 'Nutrição Animal',
    date: '10 de Janeiro, 2026',
    author: 'Equipe AgroForge',
  },
  {
    id: 2,
    title: 'Cuidados essenciais com o solo no verão',
    slug: 'cuidados-solo-verao',
    excerpt: 'Prepare sua terra para as altas temperaturas e evite perdas na lavoura.',
    content: '<p>O verão traz desafios únicos para a agricultura...</p>',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1470&auto=format&fit=crop',
    category: 'Agricultura',
    date: '05 de Fevereiro, 2026',
    author: 'João Silva',
  },
  {
    id: 3,
    title: 'Vacinação em bovinos: Calendário 2026',
    slug: 'vacinacao-bovinos-2026',
    excerpt: 'Mantenha seu rebanho protegido. Veja as datas e vacinas obrigatórias.',
    content: '<p>A vacinação é a principal ferramenta contra doenças no rebanho...</p>',
    image: 'https://images.unsplash.com/photo-1596733430284-f74372801402?q=80&w=1470&auto=format&fit=crop',
    category: 'Pecuária',
    date: '20 de Fevereiro, 2026',
    author: 'Dra. Maria Oliveira',
  },
  {
    id: 4,
    title: 'Novas tecnologias no controle de pragas',
    slug: 'novas-tecnologias-controle-pragas',
    excerpt: 'Conheça os equipamentos que estão revolucionando a proteção das plantações.',
    content: '<p>A inovação no campo não para...</p>',
    image: 'https://images.unsplash.com/photo-1586771107584-568c56976722?q=80&w=1470&auto=format&fit=crop',
    category: 'Tecnologia',
    date: '02 de Março, 2026',
    author: 'Equipe AgroForge',
  },
];

export const suppliers = [
  {
    id: 1,
    name: 'AgroSul Sementes',
    category: 'Sementes e Mudas',
    logo: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=400&auto=format&fit=crop',
    description: 'Fornecedor líder de sementes certificadas para diversas culturas.',
    contact: 'contato@agrosul.com.br',
    phone: '(41) 3333-1111',
  },
  {
    id: 2,
    name: 'VetPharma Saúde Animal',
    category: 'Medicamentos Veterinários',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop',
    description: 'Laboratório especializado em saúde e bem-estar animal.',
    contact: 'vendas@vetpharma.com',
    phone: '(11) 4444-2222',
  },
  {
    id: 3,
    name: 'Tratores & Cia',
    category: 'Maquinário',
    logo: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop',
    description: 'Venda e manutenção de tratores e implementos agrícolas.',
    contact: 'comercial@tratorescia.com.br',
    phone: '(51) 3333-4444',
  },
  {
    id: 4,
    name: 'NutriBov',
    category: 'Nutrição Animal',
    logo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=400&auto=format&fit=crop',
    description: 'Rações e suplementos de alta performance para bovinos.',
    contact: 'sac@nutribov.com.br',
    phone: '(31) 2222-5555',
  },
];
`;

if (!code.includes('export const blogPosts')) {
  fs.writeFileSync(file, code + '\\n\\n' + posts);
  console.log("Restored missing exports!");
} else {
  console.log("Exports already exist.");
}
