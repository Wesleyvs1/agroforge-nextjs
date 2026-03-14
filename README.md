# 🚜 AgroForge - Loja Agropecuária

Plataforma moderna de e-commerce para produtos agropecuários, desenvolvida com **Next.js 14**, **React 18**, **TailwindCSS** e integração com **WhatsApp**.

## 🚀 Características

✅ **React + Next.js 14** - Framework moderno e rápido
✅ **TailwindCSS** - Estilização responsiva e profissional
✅ **Carrinho Persistente** - Dados salvos no localStorage
✅ **Integração WhatsApp** - Checkout direto via WhatsApp
✅ **Responsive Design** - Mobile, tablet e desktop
✅ **CMS Básico** - Produtos e posts em JSON
✅ **SEO Otimizado** - Metadata e estrutura semântica
✅ **Google Analytics** - Rastreamento de eventos

## 📋 Requisitos

- Node.js 16+ (recomendado 18+)
- npm ou yarn

## 🔧 Instalação

### 1. Clone ou descompacte o projeto

```bash
cd agroforge-nextjs
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure variáveis de ambiente (opcional)

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# WhatsApp (configurado em src/lib/whatsapp.js)
NEXT_PUBLIC_WHATSAPP_NUMBER=5543999998888
```

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
agroforge-nextjs/
├── src/
│   ├── app/              # Páginas do Next.js
│   │   ├── page.tsx      # Home
│   │   ├── loja/         # Loja com filtros
│   │   ├── produto/      # Detalhe do produto
│   │   ├── sobre/        # Sobre nós
│   │   ├── blog/         # Blog
│   │   ├── contato/      # Contato
│   │   ├── fornecedores/ # Fornecedores
│   │   ├── paginas/      # FAQ, Termos, Privacidade
│   │   └── layout.tsx    # Layout raiz
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Header.js     # Navbar e Carrinho
│   │   ├── Footer.js     # Rodapé
│   │   └── ProductCard.js # Card de produto
│   ├── context/          # Context API
│   │   └── CartContext.js # Gerenciamento do carrinho
│   ├── lib/              # Funções utilitárias
│   │   └── whatsapp.js   # Integração WhatsApp
│   ├── data/             # CMS básico (JSON)
│   │   └── products.js   # Produtos, posts, fornecedores
│   └── styles/           # Estilos globais
│       └── globals.css
├── public/               # Assets estáticos
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 🛒 Funcionalidades

### Home (/)

- Hero com CTA
- Benefícios destacados
- Produtos em destaque
- Últimos posts do blog
- Call-to-action

### Loja (/loja)

- Grid de produtos responsivo
- Filtros por categoria
- Busca por nome/descrição
- Adicionar ao carrinho
- Contador de itens

### Detalhe do Produto (/produto/[id])

- Imagem em destaque
- Descrição detalhada
- Especificações técnicas
- Rating e avaliações
- Seleção de quantidade
- Produtos relacionados

### Carrinho

- Sidebar flutuante
- Adicionar/remover itens
- Ajustar quantidade
- Total em tempo real
- Botão "Finalizar via WhatsApp"

### Integração WhatsApp

Ao clicar "Finalizar via WhatsApp", o carrinho é convertido em mensagem formatada:

```
Olá! Gostaria de fazer um pedido.

ITENS DO PEDIDO:
- Produto 1 (Qt: 2) - R$ 100,00
- Produto 2 (Qt: 1) - R$ 50,00

TOTAL: R$ 150,00

Por favor, confirme a disponibilidade e as formas de pagamento.
```

### Outras Páginas

- **Sobre**: Missão, Visão, Valores, História
- **Blog**: Posts com categorias e datas
- **Fornecedores**: Parceiros da AgroForge
- **Contato**: Formulário + Informações
- **Páginas**: FAQ, Termos e Privacidade

## 🛠️ Customização

### Editar Produtos

Arquivo: `src/data/products.js`

```javascript
export const products = [
  {
    id: 1,
    name: 'Seu Produto',
    category: 'Categoria',
    price: 99.99,
    image: 'URL_DA_IMAGEM',
    description: 'Descrição curta',
    // ... mais campos
  },
]
```

### Editar Número WhatsApp

Arquivo: `src/lib/whatsapp.js`

```javascript
export const WHATSAPP_NUMBER = 'SEU_NUMERO_AQUI' // Ex: 5543999998888
```

### Alterar Cores

Arquivo: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#27ae60',      // Verde
      secondary: '#1e8449',    // Verde escuro
      dark: '#1a472a',         // Verde muito escuro
    },
  },
}
```

## 📊 Analytics

Adicione seu Google Analytics ID em `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-SEU_ID_AQUI
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique "New Project"
4. Importe o repositório
5. Clique Deploy

### Build Local

```bash
npm run build
npm start
```

## 📦 Performance

- **Next.js Image Optimization**: Imagens otimizadas automaticamente
- **CSS Minificado**: TailwindCSS purga CSS não utilizado
- **Code Splitting**: Páginas carregam apenas o necessário
- **localStorage**: Carrinho persiste sem servidor

## 🔒 Segurança

- Validação de formulários
- URLs do WhatsApp codificadas
- Sem exposição de chaves sensíveis
- CORS headers configurados

## 🤝 Suporte

Para dúvidas ou melhorias:

- 📧 Email: contato@agroforge.com.br
- 💬 WhatsApp: (43) 99999-8888

## 📝 Licença

Projeto privado - AgroForge 2026

---

**Desenvolvido com ❤️ para agropecuária brasileira**
