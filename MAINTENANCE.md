# Guia de Manutenção - AgroForge

Este documento descreve as ferramentas instaladas para garantir a qualidade, consistência e facilidade de manutenção do código.

## 🛠️ Ferramentas Instaladas

### 1. Qualidade de Código (Linting)
- **ESLint**: Configurado com as melhores práticas para Next.js e TypeScript.
- **Configuração**: `.eslintrc.json` estendendo `next/core-web-vitals` e `prettier`.
- **Comando**: `npm run lint`

### 2. Formatação Automática
- **Prettier**: Garante que todo o código siga o mesmo estilo (aspas simples, sem ponto e vírgula, indentação de 2 espaços).
- **Integração Tailwind**: Organiza automaticamente as classes do Tailwind para melhor legibilidade.
- **Configuração**: `.prettierrc`
- **Comando**: `npm run format`

### 3. Interface e UX
- **Lucide React**: Biblioteca de ícones modernos e leves.
- **Framer Motion**: Biblioteca para animações fluidas e profissionais.
- **Tailwind Merge & Clsx**: Utilitários para gerenciar classes CSS dinâmicas (`src/lib/utils.ts`).

### 4. Type Safety
- **TypeScript**: Adicionado suporte completo com tipos para Node, React e React DOM.

---

## 🚀 Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run lint` | Verifica erros e avisos no código |
| `npm run format` | Formata automaticamente todos os arquivos |
| `npm run validate` | Executa lint, format e build (ideal antes de subir para produção) |
| `npm run build` | Cria a versão otimizada para produção |

---

## 💡 Melhores Práticas de Manutenção

1. **Sempre rode o format**: Antes de enviar qualquer mudança, execute `npm run format`.
2. **Preste atenção aos avisos de Lint**: O ESLint avisará sobre coisas como o uso de `<img>` (recomenda-se `<Image />` do Next.js).
3. **Use o helper `cn`**: Para concatenar classes Tailwind de forma limpa:
   ```tsx
   import { cn } from '@/lib/utils'

   const MyComponent = ({ active }) => (
     <div className={cn("base-class", active && "active-class")}>...</div>
   )
   ```
4. **Ícones**: Sempre use `lucide-react` para manter a consistência visual.
5. **Animações**: Use `framer-motion` para micro-interações.
