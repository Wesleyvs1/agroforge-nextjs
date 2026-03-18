# 🎨 PROMPT DE MELHORIA DO DESIGN - DASHBOARD AGROFORGE

## 📋 CONTEXTO DO PROJETO

- **Nome:** AgroForge
- **Tipo:** Dashboard Administrativo (Next.js 13+ com App Router)
- **Stack:** React, TypeScript, Tailwind CSS, Lucide Icons
- **Público:** Gerenciadores de loja agropecuária
- **Tema:** Verde agropecuário (#27ae60, #1e8449, #1a472a)

---

## ⚠️ PROBLEMAS ATUAIS

### Design

- Cards simples sem profundidade visual
- Tipografia pouco hierárquica
- Falta de ícones profissionais (apenas emojis)
- Sem animações ou transições suaves
- Layout genérico sem identidade visual
- Modo escuro ausente
- Contraste visual inadequado em alguns elementos

### Funcionalidades

- Gráficos/charts não implementados
- Sem filtros avançados de data
- Sem exportação de relatórios (PDF/Excel)
- Sem busca global
- Sem notificações de estoque baixo
- Sem dashboard de analytics
- Falta responsividade em tablets

### UX/Usabilidade

- Loading states genéricos
- Sem breadcrumbs de navegação
- Atalhos rápidos pouco destacados
- Listagem de produtos muito simples
- Sem preview antes de salvar
- Sem undo/redo de ações

---

## 🎯 OBJETIVOS DE MELHORIA

### 1. DESIGN VISUAL (PRIORIDADE ALTA)

- [ ] Implementar design system consistente
- [ ] Criar paleta de cores expandida (neutros, status, feedback)
- [ ] Definir tipografia hierárquica (Heading 1-6, Body, Caption)
- [ ] Adicionar ícones Lucide React em todos os elementos
- [ ] Criar componentes reutilizáveis (Card, Button, Input, Badge, etc.)
- [ ] Implementar sombras e elevação (z-index)
- [ ] Adicionar transições CSS fluidas
- [ ] Criar modo escuro completo

### 2. DASHBOARD HOME

- [ ] Header com breadcrumb e status do usuário
- [ ] Cards de estatísticas com mini-gráficos
- [ ] Widget de "próximos eventos" ou "tarefas pendentes"
- [ ] Resumo visual com ícones grandes
- [ ] Últimos produtos como cards visuais (não tabela)
- [ ] Alertas destacados (estoque baixo, produtos sem descrição, etc.)
- [ ] Atalhos rápidos redesenhados como cards grandes

### 3. TABELAS E LISTAGENS

- [ ] Tabelas responsive com scroll horizontal em mobile
- [ ] Rows com hover effects e ações contextuais
- [ ] Filtros avançados (data range, múltiplas categorias)
- [ ] Busca com autocomplete
- [ ] Paginação clara (x de y itens)
- [ ] Checkboxes para ações em massa
- [ ] Ordenação por coluna
- [ ] Empty states customizados

### 4. FORMULÁRIOS

- [ ] Validação em tempo real com feedback visual
- [ ] Labels descritivos com tooltips
- [ ] Campos agrupados logicamente
- [ ] Preview de imagens antes de salvar
- [ ] Editor de texto rico (para blog)
- [ ] Campos condicionais (mostrar/ocultar)
- [ ] Confirmação visual antes de submeter

### 5. GRÁFICOS E ANALYTICS

- [ ] Gráfico de vendas/movimentação (linha)
- [ ] Distribuição por categoria (pizza)
- [ ] Estoque por categoria (barra horizontal)
- [ ] Tendência de estoque (área)
- [ ] Cards com KPI e tendências (↑↓)
- [ ] Data range customizável

### 6. NAVEGAÇÃO

- [ ] Sidebar melhorada com ícones
- [ ] Breadcrumb em todas as páginas
- [ ] Menu mobile colapsável
- [ ] Indicador de página ativa
- [ ] Avatar de usuário com dropdown (logout, perfil)
- [ ] Links rápidos/favoritos

### 7. FEEDBACK VISUAL

- [ ] Toast notifications melhoradas (posição, animação)
- [ ] Modais com backdrop blur
- [ ] Loading skeletons (não spinners genéricos)
- [ ] Progress bars para operações longas
- [ ] Success/Error/Info estados claros
- [ ] Confirmação visual de ações

---

## 🛠️ RECOMENDAÇÕES TÉCNICAS

### Dependências a Adicionar

```json
{
  "recharts": "^2.8.0", // Gráficos
  "lucide-react": "^0.263.0", // Ícones
  "date-fns": "^2.30.0", // Datas
  "zustand": "^4.4.0", // Estado global (opcional)
  "react-hot-toast": "^2.4.0", // Notificações
  "next-themes": "^0.2.1", // Modo escuro
  "react-query": "^3.39.3" // Cache de dados (opcional)
}
```

### Estrutura de Cores (Tailwind)

```js
// tailwind.config.js
colors: {
  primary: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    500: '#27ae60',  // Verde principal
    600: '#229954',
    700: '#1e8449',  // Verde secundário
    900: '#1a472a',  // Verde escuro
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
}
```

### Componentes a Criar

```
/components/admin
├── Card.tsx              // Card base com variações
├── StatCard.tsx          // Card de estatística
├── Badge.tsx             // Tags/labels
├── Button.tsx            // Botões padronizados
├── Input.tsx             // Inputs estilizados
├── Select.tsx            // Selects customizados
├── Table.tsx             // Tabela componente
├── Modal.tsx             // Modal melhorado
├── Toast.tsx             // Toast notificação
├── Skeleton.tsx          // Loading skeleton
├── EmptyState.tsx        // Estado vazio
├── Breadcrumb.tsx        // Navegação
├── Header.tsx            // Header página
├── Chart/
│   ├── LineChart.tsx
│   ├── PieChart.tsx
│   ├── BarChart.tsx
│   └── AreaChart.tsx
└── ...
```

---

## 📐 ESPECIFICAÇÕES DE DESIGN

### Tipografia

```
H1: 36px, bold, tracking-tight, text-gray-900
H2: 28px, semibold, tracking-tight, text-gray-800
H3: 24px, semibold, text-gray-800
Body: 16px, normal, text-gray-700
Caption: 12px, medium, text-gray-500
```

### Spacing (Base 4px)

```
xs: 4px    / 0.25rem
sm: 8px    / 0.5rem
md: 16px   / 1rem
lg: 24px   / 1.5rem
xl: 32px   / 2rem
```

### Border Radius

```
sm: 6px    (inputs, buttons)
md: 8px    (cards)
lg: 12px   (sections)
xl: 16px   (modais)
```

### Sombras

```
none:      box-shadow: none
sm:        0 1px 2px rgba(0,0,0,0.05)
base:      0 1px 3px rgba(0,0,0,0.1)
md:        0 4px 6px rgba(0,0,0,0.1)
lg:        0 10px 15px rgba(0,0,0,0.1)
hover:     0 20px 25px rgba(0,0,0,0.15)
```

### Estados de Interação

```
Hover:     shadow aumenta, cor mais clara
Active:    cor mais escura, offset descido
Focus:     ring-2 ring-primary ring-offset-2
Disabled:  opacity-50, cursor-not-allowed
Loading:   animate-pulse ou skeleton
```

---

## 📱 RESPONSIVIDADE

### Breakpoints (Tailwind padrão)

- Mobile: 320px - 767px (sm:)
- Tablet: 768px - 1023px (md:)
- Desktop: 1024px+ (lg:)

### Ajustes por Tela

```
Mobile:
- 1 coluna de cards
- Menu drawer full-width
- Tabelas com scroll horizontal
- Botões full-width em formulários

Tablet:
- 2 colunas de cards
- Menu sidebar 180px
- Tabelas parcialmente visíveis

Desktop:
- 3-4 colunas de cards
- Menu sidebar 240px
- Tabelas completas
```

---

## 🌙 MODO ESCURO

### Paleta Noturna

```
Fundo:       #0f172a (slate-950)
Superfície:  #1e293b (slate-900)
Bordas:      #334155 (slate-700)
Texto:       #f1f5f9 (slate-100)
Detalhe:     #cbd5e1 (slate-300)
```

### Implementação

```tsx
// Usar next-themes com Tailwind
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>

// Classes: dark:bg-slate-900 dark:text-slate-100
```

---

## 🎬 ANIMAÇÕES RECOMENDADAS

### Transições

```css
- Fade: opacity 200ms ease-in-out
- Slide: transform 300ms ease-out
- Scale: transform 200ms ease-in
- Height: max-height 300ms ease-out
```

### Efeitos Especiais

- Hover cards: elevate + shadow
- Loading: pulse ou shimmer
- Success: checkmark animation
- Error: shake animation
- Tooltip: fade-in with delay

---

## 📊 PÁGINAS A MELHORAR (ORDEM DE PRIORIDADE)

1. **Dashboard Home** (Prioridade 🔴)
   - [ ] Header com data/hora
   - [ ] Cards com mini-gráficos
   - [ ] Alertas destacados
   - [ ] Atalhos redesenhados

2. **Produtos** (Prioridade 🔴)
   - [ ] Tabela melhorada
   - [ ] Filtros avançados
   - [ ] Busca com autocomplete
   - [ ] Ações em massa

3. **Blog** (Prioridade 🟡)
   - [ ] Editor de texto rico
   - [ ] Preview de imagem
   - [ ] Listagem com thumbs

4. **Relatórios** (Prioridade 🟡)
   - [ ] Gráficos Recharts
   - [ ] Date range picker
   - [ ] Exportar PDF/Excel

5. **Customização** (Prioridade 🟢)
   - [ ] Color picker melhorado
   - [ ] Preview em tempo real
   - [ ] Presets de tema

6. **Mídia** (Prioridade 🟢)
   - [ ] Galeria visual
   - [ ] Drag & drop melhorado
   - [ ] Crop de imagem

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Design System (1-2 semanas)

- [ ] Criar componentes base (Button, Card, Input, etc.)
- [ ] Definir tokens de design (cores, spacing, typography)
- [ ] Implementar modo escuro
- [ ] Criar Storybook (opcional)

### Fase 2: Dashboard & Navegação (1-2 semanas)

- [ ] Melhorar header e sidebar
- [ ] Redesenhar dashboard home
- [ ] Adicionar breadcrumb
- [ ] Melhorar feedback visual

### Fase 3: Tabelas e Formulários (1-2 semanas)

- [ ] Componente Table melhorado
- [ ] Filtros avançados
- [ ] Validação de formulários
- [ ] Preview de dados

### Fase 4: Gráficos e Analytics (1 semana)

- [ ] Implementar Recharts
- [ ] Criar dashboard de analytics
- [ ] Date range pickers
- [ ] Exportação de dados

### Fase 5: Polish & Otimizações (1 semana)

- [ ] Animações e transições
- [ ] Loading states
- [ ] Performance
- [ ] Testes e bugs

---

## 🚀 RESULTADO ESPERADO

Após implementar as melhorias:

✨ **Visual**

- Dashboard profissional e moderno
- Paleta de cores consistente
- Tipografia clara e hierárquica
- Ícones em todas as ações
- Modo escuro funcional
- Animações suaves

📊 **Funcionalidade**

- Gráficos visuais de dados
- Filtros avançados
- Busca global
- Ações em massa
- Exportação de dados
- Analytics detalhado

🎯 **UX**

- Navegação intuitiva
- Feedback claro de ações
- Mensagens de erro/sucesso
- Confirmações de operações
- Responsivo em todos os devices

---

## 💡 INSPIRAÇÕES & REFERÊNCIAS

- Shadcn UI (componentes React)
- Vercel Dashboard
- Stripe Dashboard
- Supabase Admin
- Linear App

---

## 📝 NOTAS IMPORTANTES

1. **Manter compatibilidade** com contextos existentes (AdminDataContext, AdminContext)
2. **Não quebrar funcionalidades** existentes durante o refactor
3. **Testar responsividade** em mobile, tablet e desktop
4. **Validar performance** (não adicionar dependências pesadas)
5. **Documentar componentes** criados para manutenção futura
6. **Usar TypeScript** para melhor autocompletar e type-safety
7. **Implementar testes** para componentes críticos (opcional)

---

## 📞 PRÓXIMOS PASSOS

1. **Revisar este prompt** com o designer/desenvolvedor
2. **Priorizar** quais melhorias fazer primeiro
3. **Estimar timeline** realista
4. **Começar pela Fase 1** (Design System)
5. **Testar regularmente** em diferentes devices
6. **Coletar feedback** do usuário final

---

**Última atualização:** 2026-03-18
**Status:** Pronto para implementação
