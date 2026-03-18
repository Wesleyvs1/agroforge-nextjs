'use client'

import { useState, useEffect } from 'react'
import Toast from '@/components/admin/Toast'

export default function Customizacao() {
  const [colors, setColors] = useState({
    primary: '#27ae60',
    secondary: '#1e8449',
    dark: '#1a472a',
  })

  const [config, setConfig] = useState({
    companyName: 'AgroForge',
    email: 'contato@agroforge.com.br',
    whatsapp: '5543999998888',
    address: 'Almirante Tamandaré - PR',
    description: 'Sua loja agropecuária de confiança',
    keywords: 'agropecuária, café, sementes, ração',
  })

  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)

  useEffect(() => {
    const savedColors = localStorage.getItem('site_colors')
    const savedConfig = localStorage.getItem('site_config')
    if (savedColors) setColors(JSON.parse(savedColors))
    if (savedConfig) setConfig(JSON.parse(savedConfig))
  }, [])

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value }
    setColors(newColors)
  }

  const saveColors = () => {
    localStorage.setItem('site_colors', JSON.stringify(colors))
    setToast({
      message: 'Cores salvas! Recarregue para ver as mudanças.',
      type: 'success',
    })
  }

  const resetColors = () => {
    const defaults = {
      primary: '#27ae60',
      secondary: '#1e8449',
      dark: '#1a472a',
    }
    setColors(defaults)
    localStorage.setItem('site_colors', JSON.stringify(defaults))
    setToast({ message: 'Cores restauradas!', type: 'info' })
  }

  const handleConfigChange = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const saveConfig = () => {
    localStorage.setItem('site_config', JSON.stringify(config))
    setToast({ message: 'Configurações salvas!', type: 'success' })
  }

  const colorLabels: Record<string, string> = {
    primary: 'Cor Primária (Verde)',
    secondary: 'Cor Secundária (Verde Escuro)',
    dark: 'Cor Escura (Fundo)',
  }

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        🎨 Customização do Site
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* CORES */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">🎨 Cores</h2>

          {Object.entries(colors).map(([key, color]) => (
            <div key={key} className="mb-5">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                {colorLabels[key] || key}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded-lg border"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm"
                />
              </div>
              <div
                className="mt-2 h-8 rounded-lg border"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}

          {/* Preview */}
          <div className="mb-4 rounded-lg border p-4">
            <p className="mb-2 text-sm font-bold text-gray-500">Preview:</p>
            <div className="flex gap-2">
              <button
                style={{ backgroundColor: colors.primary }}
                className="rounded-lg px-4 py-2 text-sm font-bold text-white"
              >
                Primária
              </button>
              <button
                style={{ backgroundColor: colors.secondary }}
                className="rounded-lg px-4 py-2 text-sm font-bold text-white"
              >
                Secundária
              </button>
              <button
                style={{ backgroundColor: colors.dark }}
                className="rounded-lg px-4 py-2 text-sm font-bold text-white"
              >
                Escura
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveColors}
              className="hover:bg-secondary flex-1 rounded-lg bg-primary py-2 font-bold text-white transition-colors"
            >
              💾 Salvar Cores
            </button>
            <button
              onClick={resetColors}
              className="rounded-lg bg-gray-200 px-4 py-2 font-bold text-gray-700 transition-colors hover:bg-gray-300"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* CONFIGURAÇÕES GERAIS */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            ⚙️ Configurações Gerais
          </h2>

          <div className="space-y-4">
            {[
              { key: 'companyName', label: 'Nome da Empresa', type: 'text' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
              { key: 'address', label: 'Endereço', type: 'text' },
              { key: 'description', label: 'Descrição do Site', type: 'text' },
              { key: 'keywords', label: 'Palavras-chave', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={config[field.key as keyof typeof config]}
                  onChange={(e) =>
                    handleConfigChange(field.key, e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}

            <button
              onClick={saveConfig}
              className="hover:bg-secondary w-full rounded-lg bg-primary py-2 font-bold text-white transition-colors"
            >
              💾 Salvar Configurações
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
