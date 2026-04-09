# Qwen Integration Skill

Este módulo gerencia a comunicação com a API da OpenRouter para utilizar o modelo **Qwen 3.6 Plus**.

## 🛠️ Capacidades
- **Análise de Código**: Enviar trechos de código para revisão e sugestões de refatoração.
- **Geração de Funções**: Solicitar a criação de novos componentes ou hooks baseados no contexto do projeto.
- **Explicação de Arquitetura**: Perguntar sobre a estrutura de pastas e fluxos de dados.

## 📁 Estrutura
- `scripts/qwen_query.py`: Script principal para chamadas de API.
- `references/prompts.json`: Templates de prompts pré-definidos.

## 🚀 Como Usar
Para interagir com a Qwen, use o comando de barra:
```bash
/qwen "Sua pergunta aqui"
```

Ou chame o script manualmente:
```bash
python .agent/skills/qwen-integration/scripts/qwen_query.py "Pergunta"
```

## ⚙️ Configuração
As variáveis `OPENROUTER_API_KEY` e `OPENROUTER_MODEL` devem estar configuradas no `.env.local`.
