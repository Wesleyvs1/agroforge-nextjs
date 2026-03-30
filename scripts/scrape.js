const fs = require('fs');
const cheerio = require('cheerio');

async function scrape() {
  const html = fs.readFileSync('site.html', 'utf8');
  const $ = cheerio.load(html);
  
  const categories = [];
  
  // Nível um na navegação
  $('.menu.superior .nivel-um > li > a').each((i, el) => {
    const title = $(el).text().trim();
    const href = $(el).attr('href');
    if (href && href !== 'javascript:;' && !href.startsWith('#')) {
      categories.push({ title, href });
    }
  });

  console.log("Found Categories:");
  console.log(categories);

  // Now extracting products on the homepage?
  const products = [];
  $('.listagem-item').each((i, el) => {
    const title = $(el).find('.nome-produto').text().trim();
    const href = $(el).find('.nome-produto').attr('href') || $(el).find('a').attr('href');
    const priceStr = $(el).find('.preco-promocional').text().trim() || $(el).find('.preco-venda').text().trim();
    const imgObj = $(el).find('img');
    const image = imgObj.attr('data-src') || imgObj.attr('src');
    
    if (title && !title.includes('--PRODUTO_NOME--')) {
      products.push({ title, href, priceStr, image });
    }
  });
  
  console.log(`Found ${products.length} products on homepage:`);
  console.log(products.slice(0, 5));
}

scrape();
