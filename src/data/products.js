export const products = [
  {
    id: 1,
    name: 'Café Premium Arábica',
    category: 'Café',
    price: 45.0,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Café em grão de alta qualidade, 100% arábica premium. Moemos na hora para máxima frescura.',
    detailedDescription:
      'Nosso café arábica é cuidadosamente selecionado e torrado em pequenos lotes para garantir qualidade incomparável. Perfeito para cafeterias, restaurantes e para o consumidor exigente.',
    stock: 150,
    rating: 4.8,
    reviews: 42,
    origin: 'Minas Gerais',
    roastDate: '2026-03',
  },
  {
    id: 2,
    name: 'Sementes Transgênicas Milho',
    category: 'Sementes',
    price: 120.0,
    image:
      'https://images.unsplash.com/photo-1622383548627-d1bc0898687a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Sementes de milho transgênico com alta produtividade e resistência a pragas.',
    detailedDescription:
      'Desenvolvidas com tecnologia de ponta para maior resistência a pragas e melhor desempenho em diferentes climas. Certificadas e testadas.',
    stock: 300,
    rating: 4.6,
    reviews: 28,
    origin: 'Brasil',
    yield: '150 sacas/hectare',
  },
  {
    id: 3,
    name: 'Ração Premium Ruminantes',
    category: 'Ração',
    price: 85.0,
    image:
      'https://images.unsplash.com/photo-1590483736622-39da8af75bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Ração balanceada com nutrientes essenciais para bovinos e ovinos. Sem aditivos prejudiciais.',
    detailedDescription:
      'Fórmula exclusiva com minerais, vitaminas e proteínas balanceadas. Melhora a produção leiteira e a qualidade da carne.',
    stock: 200,
    rating: 4.7,
    reviews: 35,
    weight: '25kg por saco',
    ingredients: 'Milho, Soja, Farelo de Trigo',
  },
  {
    id: 4,
    name: 'Adubo Orgânico 10kg',
    category: 'Adubos',
    price: 55.0,
    image:
      'https://images.unsplash.com/photo-1416870204780-c1169cb48866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Adubo orgânico enriquecido. Perfeito para hortas e cultivos sustentáveis.',
    detailedDescription:
      'Adubo 100% orgânico, sem produtos químicos. Melhora a qualidade do solo e aumenta a produtividade.',
    stock: 250,
    rating: 4.5,
    reviews: 19,
    type: 'Composto',
    npk: '4-4-4',
  },
  {
    id: 5,
    name: 'Ferramentas Agrícolas Kit 5 Peças',
    category: 'Ferramentas',
    price: 180.0,
    image:
      'https://images.unsplash.com/photo-1416870204780-c1169cb48866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Kit com 5 ferramentas essenciais para agricultura e jardinagem.',
    detailedDescription:
      'Incluindo: enxada, pá, enxadão, garfo e cultivador. Todas feitas com aço resistente.',
    stock: 100,
    rating: 4.4,
    reviews: 12,
    material: 'Aço',
    warranty: '2 anos',
  },
  {
    id: 6,
    name: 'Sementes Hortaliças Sortidas',
    category: 'Sementes',
    price: 35.0,
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Pacote com variedades de sementes: tomate, alface, cenoura e beterraba.',
    detailedDescription:
      'Sementes selecionadas de alta germinação. Perfeitas para hortas domésticas.',
    stock: 400,
    rating: 4.7,
    reviews: 55,
    varieties: 4,
    season: 'Primavera/Verão',
  },
  {
    id: 7,
    name: 'Calcário Agrícola 50kg',
    category: 'Adubos',
    price: 65.0,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description:
      'Calcário para corrigir acidez do solo. Essencial para melhor produtividade.',
    detailedDescription:
      'Calcário moído fino para rápida ação no solo. Aumenta o pH e fornece cálcio.',
    stock: 180,
    rating: 4.6,
    reviews: 23,
    fineness: 'Fino',
    application: '2-3 toneladas por hectare',
  },
  {
    id: 8,
    name: 'Defensivo Agrícola 5L',
    category: 'Defensivos',
    price: 95.0,
    image:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Defensivo natural contra pragas e doenças. Seguro e eficaz.',
    detailedDescription:
      'Formulação ecológica que não prejudica o ambiente. Registrado no MAPA.',
    stock: 150,
    rating: 4.5,
    reviews: 18,
    type: 'Fungicida/Inseticida',
    certification: 'MAPA',
  },
]

export const blogPosts = [
  {
    id: 1,
    title: '5 Dicas Essenciais para Aumentar sua Produtividade Agrícola',
    category: 'Cultivo',
    date: '2026-03-15',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Descubra as melhores práticas para otimizar suas lavouras e aumentar a produção.',
    content: 'Conteúdo completo do artigo...',
  },
  {
    id: 2,
    title: 'Como Escolher o Café Perfeito para sua Casa ou Negócio',
    category: 'Café',
    date: '2026-03-12',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Aprenda a diferença entre os tipos de café e como preparar a bebida perfeita.',
    content: 'Conteúdo completo do artigo...',
  },
  {
    id: 3,
    title: 'Sementes Transgênicas: Entenda os Benefícios',
    category: 'Sementes',
    date: '2026-03-10',
    image:
      'https://images.unsplash.com/photo-1622383548627-d1bc0898687a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Descubra como as sementes transgênicas podem melhorar a resistência das plantas.',
    content: 'Conteúdo completo do artigo...',
  },
]

export const suppliers = [
  {
    id: 1,
    name: 'Rações Premium Ltda',
    category: 'Rações',
    image:
      'https://images.unsplash.com/photo-1590483736622-39da8af75bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Fornecedora de rações balanceadas de alta qualidade.',
    location: 'Curitiba - PR',
    phone: '(41) 3333-4444',
  },
  {
    id: 2,
    name: 'Sementes Brasil',
    category: 'Sementes',
    image:
      'https://images.unsplash.com/photo-1622383548627-d1bc0898687a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Especialista em sementes transgênicas e mudas certificadas.',
    location: 'Ponta Grossa - PR',
    phone: '(42) 3322-5555',
  },
]
