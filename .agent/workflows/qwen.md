---
description: Execute uma consulta ao modelo Qwen 3.6 Plus via OpenRouter.
---

# 🚀 Workflow: /qwen

Este comando permite interagir diretamente com o motor da **Qwen** de dentro do seu fluxo de desenvolvimento.

## 🛠️ Como Funciona
1. O workflow recebe sua mensagem como argumento.
2. Ele executa o script de consulta usando a chave configurada no `.env.local`.
3. O modelo processa sua entrada considerando o contexto de desenvolvedor e retorna uma resposta no terminal.

## ⚙️ Execução
// turbo
```bash
node .agent/skills/qwen-integration/scripts/qwen_query.js "{0}"
```

---

> [!CAUTION]
> Certifique-se de que sua pergunta não contenha dados sensíveis não protegidos. A OpenRouter processará a mensagem fora do ambiente local.
