const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scraped_products.json', 'utf8'));

const formatted = data.map((p, i) => {
  const result = {
    id: i + 1,
    name: p.name,
    category: p.category, // e.g. "BEBEDOUROS E COMEDOUROS"
    mainCategory: p.mainCategory, // e.g. "Acessórios Pet e Animais"
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    description: p.description,
    detailedDescription: p.detailedDescription,
    stock: p.stock,
    rating: p.rating,
    reviews: p.reviews,
  };
  
  if (p.category === 'PRODUTOS COLONIAIS' && p.name.toLowerCase().includes('café')) {
    result.badge = '☕ Moído na Hora';
  }
  
  return result;
});

const content = `export const products = ${JSON.stringify(formatted, null, 2)};`;

fs.writeFileSync('src/data/products.js', content, 'utf8');

console.log(`Successfully generated src/data/products.js with ${formatted.length} products!`);
