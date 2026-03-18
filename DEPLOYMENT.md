# 📋 Guia de Deployment e Próximas Fases

## ✅ Fase 4 Completada

Este projeto implementa:

### ✓ Next.js + React

- App Router (Next.js 14)
- Componentes reutilizáveis
- Otimização de imagens
- SSR e Static Generation

### ✓ TailwindCSS

- Design responsivo
- Componentes customizados
- Dark mode pronto
- Animações suaves

### ✓ Carrinho com localStorage

- Persistência de dados
- Sincronização em tempo real
- Operações CRUD completas

### ✓ Integração WhatsApp

- Mensagens formatadas
- Totais calculados automaticamente
- Links diretos para chat

### ✓ CMS Básico

- Produtos em `src/data/products.js`
- Posts de blog
- Informações de fornecedores
- Fácil de editar e expandir

---

## 🚀 Deployment

### Opção 1: Vercel (RECOMENDADO)

Vercel é a plataforma oficial do Next.js e oferece:

- Deploy automático via Git
- Domínios customizados grátis
- SSL grátis
- Edge Functions
- Analytics

**Passos:**

1. Faça push para GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/agroforge.git
git push -u origin main
```

2. Acesse https://vercel.com
3. Clique "New Project"
4. Selecione seu repositório GitHub
5. Clique "Deploy"

**Conectar Domínio Customizado:**

- Vá para Project Settings > Domains
- Adicione seu domínio (ex: agroforge.com.br)
- Configure DNS do seu provedor

---

### Opção 2: Netlify

1. Conecte seu repositório GitHub
2. Defina build command: `npm run build`
3. Defina publish directory: `.next`
4. Deploy automático

---

### Opção 3: Self-Hosted (VPS)

**Requisitos:**

- VPS com Node.js instalado
- PM2 para gerenciar processo
- Nginx como reverse proxy
- SSL com Let's Encrypt

**Instalação:**

```bash
# SSH na VPS
ssh usuario@seu-servidor.com

# Clone o repositório
git clone https://github.com/seu-usuario/agroforge.git
cd agroforge-nextjs

# Instale dependências
npm install

# Build
npm run build

# Instale PM2 globalmente
npm install -g pm2

# Inicie a aplicação
pm2 start npm --name "agroforge" -- start

# Salve configuração PM2
pm2 save

# Configure para iniciar no boot
pm2 startup
```

**Configurar Nginx:**

```nginx
server {
    listen 80;
    server_name agroforge.com.br www.agroforge.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Domínio e SSL

### Registrar Domínio

Opções:

- [Registro.br](https://registro.br) (domínios .com.br)
- [GoDaddy](https://godaddy.com)
- [Namecheap](https://namecheap.com)

### Configurar DNS

Se usar Vercel:

1. Vá para Vercel > Project Settings > Domains
2. Siga as instruções para alterar DNS

Se usar próprio servidor:

```
A Record: seu-ip
CNAME: www -> seu-dominio.com.br
```

---

## 🔄 Fase 5: Integrações Avançadas (Opcional)

### Email Marketing

- Integrar com SendGrid/Mailchimp
- Newsletter automática
- Confirmação de pedidos por email

### CMS Headless

- Strapi (auto-hospedado)
- Sanity (cloud)
- Contentful (cloud)

**Exemplo com Strapi:**

```bash
npx create-strapi-app@latest agroforge-strapi --quickstart
```

### Banco de Dados

- PostgreSQL (recomendado)
- MongoDB
- Integrar com Prisma ORM

**Exemplo Prisma:**

```javascript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
```

### Pagamento Online

Se quiser adicionar pagamento (sem ser WhatsApp):

- **Stripe**: Integração mais robusta
- **PayPal**: Suporte para mais países
- **Mercado Pago**: Popular no Brasil

**Exemplo Stripe:**

```bash
npm install @stripe/react-js @stripe/js
```

### Autenticação

- NextAuth.js
- Auth0
- Firebase Authentication

**Exemplo NextAuth:**

```bash
npm install next-auth
```

---

## 📊 Analytics Avançado

### Google Analytics 4

Já configurado no `layout.tsx`. Adicione seu ID em `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-SEU_ID
```

### Hotjar

Rastreia comportamento dos usuários:

```html
<!-- Adicionar no layout.tsx -->
<script>
  ;(function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        ;(h.hj.q = h.hj.q || []).push(arguments)
      }
    h._hjSettings = { hjid: 3012345, hjsv: 6 }
    // ... resto do código
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
</script>
```

### Mixpanel

Eventos customizados:

```bash
npm install mixpanel-browser
```

---

## 🛠️ Manutenção e Atualizações

### Atualizar Next.js

```bash
npm install next@latest react@latest react-dom@latest
```

### Atualizar TailwindCSS

```bash
npm install -D tailwindcss@latest
```

### Verificar Segurança

```bash
npm audit
npm audit fix
```

---

## 📈 SEO

Este projeto já inclui:

- ✅ Metadata dinâmica
- ✅ Open Graph
- ✅ Sitemap estruturado
- ✅ Mobile responsive
- ✅ Imagens otimizadas

### Melhorias Adicionais:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'AgroForge - Loja Agropecuária',
  description: 'Produtos agropecuários de qualidade com entrega rápida',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'AgroForge',
    description: 'Loja agropecuária',
    type: 'website',
    locale: 'pt_BR',
  },
}
```

### Registrar em Mecanismos de Busca

1. **Google Search Console**
   - https://search.google.com/search-console
   - Adicionar propriedade
   - Verificar domínio

2. **Bing Webmaster Tools**
   - https://www.bing.com/webmaster

---

## 💡 Dicas Extras

### Performance

```javascript
// Usar Next.js Image para otimizar
import Image from 'next/image'
;<Image
  src={product.image}
  alt={product.name}
  width={300}
  height={300}
  priority // para imagens acima da dobra
/>
```

### Variáveis de Ambiente

```bash
# .env.local (não commit)
NEXT_PUBLIC_WHATSAPP=5543999998888

# .env.production
NODE_ENV=production
```

### Monitoramento de Erros

```bash
npm install @sentry/nextjs
```

---

## ❓ FAQ Deploy

**P: Qual plataforma escolher?**
R: Vercel para simplicidade, VPS para controle total.

**P: Custa dinheiro?**
R: Vercel oferece plano gratuito. Domínio custa ~R$ 50/ano.

**P: Quanto tempo para deploy?**
R: Vercel: 2 minutos. VPS: 30 minutos (primeira vez).

**P: Preciso de conhecimentos?**
R: Vercel: nenhum. VPS: Linux básico recomendado.

---

## 📞 Suporte

Para dúvidas sobre deployment:

- 📧 contato@agroforge.com.br
- 💬 WhatsApp (43) 99999-8888

Documentação oficial:

- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- TailwindCSS: https://tailwindcss.com/docs

---

**Parabéns! Seu site está pronto para ir ao ar! 🚀**
