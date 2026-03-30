const fs = require('fs');
const cheerio = require('cheerio');

const categoriesList = [
  { title: 'BEBEDOUROS E COMEDOUROS', href: 'https://www.agroforge.com.br/bebedoutos-e-comedouros', mainCategory: 'Acessórios Pet e Animais' },
  { title: 'COLEIRAS E ACESSÓRIOS PARA PET', href: 'https://www.agroforge.com.br/coleiras-e-acessorios-para-pet-23334999', mainCategory: 'Acessórios Pet e Animais' },
  { title: 'FARELOS E QUIRERAS', href: 'https://www.agroforge.com.br/farelos', mainCategory: 'Alimentação Animal' },
  { title: 'FERRAMENTAS', href: 'https://www.agroforge.com.br/ferramentas', mainCategory: 'Ferramentas e Jardinagem' },
  { title: 'FERTILIZANTES', href: 'https://www.agroforge.com.br/fertilizantes', mainCategory: 'Ferramentas e Jardinagem' },
  { title: 'GAIOLAS', href: 'https://www.agroforge.com.br/gaiolas', mainCategory: 'Acessórios Pet e Animais' },
  { title: 'JARDINAGEM', href: 'https://www.agroforge.com.br/jardinagem', mainCategory: 'Ferramentas e Jardinagem' },
  { title: 'MEDICAMENTOS', href: 'https://www.agroforge.com.br/medicamentos-22596212', mainCategory: 'Saúde e Tratamento' },
  { title: 'PENEIRAS', href: 'https://www.agroforge.com.br/peneiras', mainCategory: 'Ferramentas e Jardinagem' },
  { title: 'PETISCOS PARA PETS', href: 'https://www.agroforge.com.br/petiscos-para-pets-23330155', mainCategory: 'Alimentação Animal' },
  { title: 'PRODUTOS COLONIAIS', href: 'https://www.agroforge.com.br/produtos-coloniais', mainCategory: 'Empório' },
  { title: 'RAÇÃO CÃES E GATOS', href: 'https://www.agroforge.com.br/racoes', mainCategory: 'Alimentação Animal' },
  { title: 'RAÇÃO PARA AVES', href: 'https://www.agroforge.com.br/racao-para-aves-23330230', mainCategory: 'Alimentação Animal' },
  { title: 'RAÇÃO PARA EQUINOS', href: 'https://www.agroforge.com.br/racao-para-equinos-23330233', mainCategory: 'Alimentação Animal' },
  { title: 'RAÇÃO PARA PÁSSAROS', href: 'https://www.agroforge.com.br/racao-para-passaros-23330237', mainCategory: 'Alimentação Animal' },
  { title: 'SELARIA', href: 'https://www.agroforge.com.br/selaria', mainCategory: 'Acessórios Pet e Animais' },
  { title: 'SUPLEMENTOS E VITAMINAS', href: 'https://www.agroforge.com.br/suplementos', mainCategory: 'Saúde e Tratamento' },
  { title: 'VENENOS', href: 'https://www.agroforge.com.br/venenos', mainCategory: 'Saúde e Tratamento' },
  { title: 'VERMÍFUGOS', href: 'https://www.agroforge.com.br/vermifugos-22596253', mainCategory: 'Saúde e Tratamento' }
];

async function fetchCategory(cat) {
  try {
    const res = await fetch(cat.href);
    const html = await res.text();
    const $ = cheerio.load(html);
    const categoryProducts = [];
    
    $('.listagem-item').each((i, el) => {
      const title = $(el).find('.nome-produto').text().trim();
      const href = $(el).find('.nome-produto').attr('href') || $(el).find('a').attr('href');
      
      let priceStr = $(el).find('.preco-promocional').text().trim() || $(el).find('.preco-venda').text().trim();
      let originalPriceStr = $(el).find('s.preco-venda').text().trim();
      
      let price = 0;
      let originalPrice = 0;
      
      if (priceStr && priceStr.includes('R$')) {
        price = parseFloat(priceStr.replace(/[^0-9,]/g, '').replace(',', '.'));
      }
      if (!price && $(el).find('strong.preco-promocional').length > 0) {
          const raw = $(el).find('strong.preco-promocional').text().trim();
          price = parseFloat(raw.replace(/[^0-9,]/g, '').replace(',', '.'));
      }
      
      if (originalPriceStr && originalPriceStr.includes('R$')) {
        originalPrice = parseFloat(originalPriceStr.replace(/[^0-9,]/g, '').replace(',', '.'));
      }

      const imgObj = $(el).find('img');
      const image = imgObj.attr('data-src') || imgObj.attr('src');
      
      if (title && !title.includes('--PRODUTO_NOME--')) {
        categoryProducts.push({ 
          name: title, 
          url: href, 
          image: image, 
          price: price || 0,
          originalPrice: originalPrice || undefined,
          category: cat.title,
          mainCategory: cat.mainCategory,
          description: title,
          detailedDescription: `Produto premium da categoria ${cat.title}. Ideal para o seu dia a dia na agropecuária.`,
          stock: Math.floor(Math.random() * 50) + 5,
          rating: (Math.random() * 1 + 4).toFixed(1),
          reviews: Math.floor(Math.random() * 50) + 1
        });
      }
    });

    console.log(`Scraped ${categoryProducts.length} from ${cat.title}`);
    return categoryProducts;
  } catch (err) {
    console.error(`Error fetching ${cat.href}:`, err.message);
    return [];
  }
}

async function scrapeAll() {
  let allProducts = [];
  for (const cat of categoriesList) {
    const prods = await fetchCategory(cat);
    allProducts = allProducts.concat(prods);
    // short delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }
  
  // Format to JSON string
  fs.writeFileSync('scraped_products.json', JSON.stringify(allProducts, null, 2));
  console.log(`\nDONE! Total products scraped: ${allProducts.length}`);
}

scrapeAll();
