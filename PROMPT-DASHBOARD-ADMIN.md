# 🎯 PROMPT PARA CRIAR DASHBOARD ADMIN - AgroForge

Copie este prompt e cole em uma IA (Claude, ChatGPT, etc) para gerar o dashboard completo.

---

## PROMPT COMPLETO

```
Você é um desenvolvedor experiente em React e Next.js. Preciso que crie um DASHBOARD ADMIN completo
para a plataforma AgroForge (loja agropecuária).

### CONTEXTO DO PROJETO
- Framework: Next.js 14
- Styling: TailwindCSS
- State: Context API ou Zustand
- Storage: localStorage (temporário) + JSON (futuro: banco de dados)
- Estrutura existente: src/data/products.js

### 🎯 FUNCIONALIDADES PRINCIPAIS DO DASHBOARD

#### 1. AUTENTICAÇÃO ADMIN
- Tela de login simples (usuário admin / senha temporária)
- Proteção de rotas (apenas admin acessa /admin)
- Logout functionality
- Sessão armazenada em localStorage
- Nota: Usar senha hardcoded por enquanto (depois migrar para NextAuth)

#### 2. DASHBOARD HOME
- Cards com estatísticas:
  - Total de produtos
  - Total de categorias
  - Últimos 5 produtos cadastrados
  - Link rápido para cada seção

#### 3. GERENCIAMENTO DE PRODUTOS
Página completa: /admin/produtos

Funcionalidades:
- LISTAR PRODUTOS
  - Tabela com: ID, Nome, Categoria, Preço, Estoque, Ações
  - Filtro por categoria
  - Busca por nome
  - Botões: Editar, Excluir, Visualizar

- CRIAR NOVO PRODUTO
  - Form com campos:
    - Nome (text, required)
    - Categoria (select com opções)
    - Preço (number, required)
    - Descrição curta (textarea)
    - Descrição detalhada (textarea)
    - Estoque (number)
    - Rating (number 0-5)
    - Imagem (upload de arquivo)
    - URL alternativa para imagem
    - Origem (text)
    - Peso/Quantidade (text)
    - Dados customizados (JSON opcional)
  - Validação de campos obrigatórios
  - Preview da imagem antes de salvar
  - Botões: Salvar, Cancelar, Salvar e Continuar

- EDITAR PRODUTO
  - Formulário preenchido com dados atuais
  - Trocar imagem (deletar anterior, fazer upload de nova)
  - Histórico de últimas edições (data/hora)
  - Botões: Salvar, Cancelar, Excluir

- EXCLUIR PRODUTO
  - Modal de confirmação
  - Mensagem: "Tem certeza que deseja excluir [nome]?"
  - Opção de manter ou deletar imagem
  - Log de deleção

#### 4. GERENCIAMENTO DE MÍDIA
Página completa: /admin/midia

Funcionalidades:
- UPLOAD DE IMAGENS
  - Drag & drop para enviar múltiplas imagens
  - Suporta: JPG, PNG, WebP
  - Limite de tamanho: 5MB
  - Preview em grid

- GALERIA DE IMAGENS
  - Mostrar todas as imagens do site
  - Nome, tamanho, data de upload
  - Ações: Visualizar, Deletar, Copiar URL
  - Pasta de destino:
    - Produtos
    - Banners
    - Carrossel
    - Blog

- GERENCIAR BANNERS
  - Editar banner principal (hero da home)
  - Upload de nova imagem
  - Preview em tempo real
  - Texto do banner (title, subtitle)
  - Link do CTA
  - Data de ativação

- GERENCIAR CARROSSEL
  - Adicionar múltiplas imagens ao carrossel
  - Ordenar (drag & drop)
  - Editar textos e links de cada slide
  - Deletar slides
  - Tempo de transição (em segundos)
  - Efeito de transição (fade, slide, zoom)

#### 5. CUSTOMIZAÇÃO VISUAL
Página completa: /admin/customizacao

Funcionalidades:
- ALTERAR CORES DO SITE
  - Setor de cores (visual picker ou input hex)
  - Cor primária (verde principal)
  - Cor secundária (verde escuro)
  - Cor escura (fundo)
  - Cor de sucesso/erro/warning
  - Preview em tempo real das cores
  - Salvar como tema
  - Reset para cor padrão
  - Histórico de cores anteriores

- CUSTOMIZAR SEÇÕES
  - Home:
    - Mostrar/Esconder cada seção (hero, benefícios, produtos, blog)
    - Alterar título de cada seção
    - Alterar descrição de cada seção
  - Loja:
    - Items por página
    - Ordem de exibição
  - Blog:
    - Posts em destaque
    - Número de posts por página

- CONFIGURAÇÕES GERAIS
  - Logo da empresa (upload)
  - Nome da empresa
  - Email de contato
  - Número WhatsApp
  - Endereço
  - Horários de funcionamento
  - Descrição do site (meta description)
  - Palavras-chave

#### 6. GERENCIAMENTO DE BLOG
Página completa: /admin/blog

Funcionalidades:
- LISTAR POSTS
  - Tabela com: ID, Título, Categoria, Data, Status (publicado/rascunho)
  - Ações: Editar, Visualizar, Excluir

- CRIAR/EDITAR POST
  - Campos:
    - Título (required)
    - Categoria (select)
    - Slug (auto-generated)
    - Excerpt/Resumo
    - Conteúdo (editor rich text ou markdown)
    - Imagem de capa (upload)
    - Data de publicação
    - Status (publicado/rascunho)
    - Tags
  - Preview do post
  - Botões: Publicar, Salvar como Rascunho, Visualizar, Deletar

#### 7. GERENCIAMENTO DE FORNECEDORES
Página completa: /admin/fornecedores

Funcionalidades:
- CRUD completo (Criar, Ler, Atualizar, Deletar)
- Campos: Nome, Categoria, Descrição, Local, Telefone, Email, Imagem
- Tabela com listagem
- Form para criar/editar

#### 8. ANALYTICS & RELATÓRIOS
Página completa: /admin/relatorios

Funcionalidades:
- Gráficos:
  - Produtos mais visualizados
  - Categorias mais populares
  - Últimos acessos
- Exportar relatórios em PDF/CSV
- Filtro por período (últimos 7 dias, 30 dias, 90 dias)

### 🏗️ ESTRUTURA DE PASTAS NECESSÁRIA

```

src/
├── app/
│ └── admin/
│ ├── layout.tsx # Layout do admin
│ ├── page.tsx # Dashboard home
│ ├── produtos/
│ │ ├── page.tsx # Listar produtos
│ │ ├── novo/page.tsx # Criar novo
│ │ └── [id]/page.tsx # Editar
│ ├── midia/page.tsx # Gerenciar mídia
│ ├── customizacao/page.tsx # Customizar site
│ ├── blog/page.tsx # Gerenciar blog
│ ├── fornecedores/page.tsx # Gerenciar fornecedores
│ ├── relatorios/page.tsx # Relatórios
│ └── login/page.tsx # Tela de login
├── components/
│ └── admin/
│ ├── Sidebar.jsx # Menu lateral
│ ├── Header.jsx # Header admin
│ ├── ProductForm.jsx # Form de produtos
│ ├── MediaUpload.jsx # Upload de mídia
│ ├── ColorPicker.jsx # Seletor de cores
│ └── ConfirmModal.jsx # Modal de confirmação
├── context/
│ └── AdminContext.js # Context do admin
└── hooks/
└── useAdmin.js # Hook para autenticação

```

### 🎨 DESIGN & UX

- Layout: Sidebar esquerdo (menu) + Conteúdo direito
- Cores: Usar tema AgroForge (verde primário)
- Componentes:
  - Tables com paginação
  - Forms com validação
  - Modals de confirmação
  - Toasts para mensagens (sucesso, erro, warning)
  - Loading spinners
  - Empty states com mensagens amigáveis

- Responsividade:
  - Desktop: Sidebar fixo
  - Mobile: Sidebar colapsável (hambúrguer menu)

### 🔐 SEGURANÇA

- Verificar autenticação em cada rota admin
- Redirect para login se não autenticado
- Proteger dados sensíveis
- Validação de todos os inputs
- Sanitizar dados antes de salvar

### 💾 ARMAZENAMENTO

Fase 1 (Atual): localStorage + JSON em src/data/
Fase 2 (Futura): Banco de dados PostgreSQL + API

Para esta versão:
- Salvar produtos em JSON
- Salvar imagens em /public/uploads (base64 ou arquivo)
- Salvar configurações em localStorage

### ✨ FUNCIONALIDADES EXTRAS

- Dark mode toggle
- Tema responsivo
- Atalhos de teclado (Ctrl+S para salvar)
- Busca global
- Últimas atividades/logs
- Backup automático
- Versioning de produtos (histórico de edições)

### 📋 COMPONENTES ESPECÍFICOS NECESSÁRIOS

1. FileUpload - Upload de imagens com preview
2. ColorPicker - Seletor de cores visual
3. RichTextEditor - Editor de texto para blog
4. DataTable - Tabela com paginação e filtros
5. Modal - Diálogos de confirmação
6. Toast - Notificações de sucesso/erro
7. SidebarMenu - Menu lateral navegável
8. FormInput - Inputs com validação
9. ImageGallery - Galeria de imagens
10. StatsCard - Cards com estatísticas

### 📝 NOTAS IMPORTANTES

- Usar TypeScript para type safety
- Manter código limpo e bem documentado
- Seguir padrão do projeto existente
- Usar TailwindCSS para styling
- Sem dependências externas pesadas (manter minimalista)
- Tudo em português (labels, mensagens, validações)
- Timestamps automáticos para criação/edição
- Soft delete para produtos (não deletar, apenas marcar como inativo)

### 🎯 PRIORIDADES

1. CRÍTICO: Autenticação admin + CRUD de produtos
2. IMPORTANTE: Upload de imagens + Customização de cores
3. IMPORTANTE: Gerenciamento de banners e carrossel
4. SECUNDÁRIO: Blog e Fornecedores
5. NICE TO HAVE: Analytics e Relatórios

### 🔍 TESTE

Incluir exemplos de:
- Criar produto
- Editar produto
- Deletar produto
- Fazer upload de imagem
- Alterar cor do site
- Fazer logout
- Tentar acessar admin sem autenticação (deve redirecionar)

---

Por favor, crie o dashboard admin completo seguindo todas as especificações acima.
Comece pela estrutura de pastas, depois autenticação, depois produtos, depois mídia e customização.
Inclua comentários no código e estruture de forma escalável.
```

---

## 📋 COMO USAR ESTE PROMPT

1. Copie o prompt acima
2. Cole em sua IA favorita (Claude, ChatGPT, etc)
3. Ela vai gerar:
   - Componentes React
   - Páginas Next.js
   - Contextos e hooks
   - Utilitários
   - Estilos Tailwind

4. Coloque os arquivos na estrutura do AgroForge
5. Configure no seu `package.json` se necessário
6. Rode `npm run dev` e acesse `/admin/login`

---

## 🔐 CREDENCIAIS TEMPORÁRIAS (customize depois)

```
Usuário: admin
Senha: admin@agroforge
```

---

## 📊 ESTRUTURA DE DADOS QUE SERÁ CRIADA

```javascript
// Admin Context
{
  isAuthenticated: boolean,
  user: { id, name, email, role },
  login(usuario, senha),
  logout(),
}

// Product no banco de dados
{
  id: number,
  name: string,
  category: string,
  price: number,
  image: string (URL ou base64),
  description: string,
  stock: number,
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: string,
  ...outros campos
}

// Site Config
{
  colors: {
    primary: string (hex),
    secondary: string (hex),
    dark: string (hex),
  },
  general: {
    logo: string (URL),
    companyName: string,
    email: string,
    whatsapp: string,
    address: string,
  },
  sections: {
    home: { visible: boolean, title: string },
    loja: { visible: boolean, itemsPerPage: number },
  }
}
```

---

## ✅ CHECKLIST PARA O DASHBOARD

- [ ] Login/Logout funcional
- [ ] Listar produtos com paginação
- [ ] Criar novo produto com validação
- [ ] Editar produto existente
- [ ] Deletar produto (com confirmação)
- [ ] Upload de imagens
- [ ] Galeria de mídia
- [ ] Customizar cores do site
- [ ] Gerenciar banners
- [ ] Gerenciar carrossel
- [ ] Alterar informações gerais
- [ ] Gerenciar blog posts
- [ ] Gerenciar fornecedores
- [ ] Relatórios e analytics
- [ ] Toasts de sucesso/erro
- [ ] Validação completa de forms
- [ ] Mobile responsivo
- [ ] Dark mode (extra)
- [ ] Documentação inline
- [ ] Testes básicos

---

## 🎯 RESULTADO ESPERADO

Após usar este prompt, você terá um dashboard admin **production-ready** com:

- ✅ Interface profissional
- ✅ Todas as funcionalidades solicitadas
- ✅ Código limpo e bem documentado
- ✅ 100% responsivo
- ✅ Pronto para expandir com banco de dados

---

**Dica**: Se a IA gerar código muito longo, peça para ela:

- Separar em múltiplos prompts
- Gerar um componente por vez
- Fornecer apenas estrutura (después você preenche)

---

Qualquer dúvida sobre o prompt, consulte as especificações acima!
