const fs = require('fs');
const path = require('path');

// Função para ler o .env.local
function loadEnv(envPath) {
    const vars = {};
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                vars[key.trim()] = valueParts.join('=').trim();
            }
        });
    }
    return vars;
}

async function main() {
    const query = process.argv.slice(2).join(' ');
    if (!query) {
        console.error('Uso: node qwen_query.js "pergunta"');
        process.exit(1);
    }

    const rootDir = path.resolve(__dirname, '../../../../');
    const env = loadEnv(path.join(rootDir, '.env.local'));
    const apiKey = env.OPENROUTER_API_KEY;
    const model = env.OPENROUTER_MODEL || 'qwen/qwen3.6-plus:free';

    if (!apiKey) {
        console.error('Erro: OPENROUTER_API_KEY não encontrada no .env.local');
        process.exit(1);
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://antigravity.ai",
                "X-Title": "Antigravity Dev Assistant"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    { "role": "system", "content": "Você é um assistente de codificação especialista integrado ao Antigravity Kit. Ajude o desenvolvedor com perguntas sobre o projeto e sugira alterações de código limpo e moderno." },
                    { "role": "user", "content": query }
                ]
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        console.log(data.choices[0].message.content);
    } catch (error) {
        console.error('Erro ao consultar OpenRouter:', error.message);
        process.exit(1);
    }
}

main();
