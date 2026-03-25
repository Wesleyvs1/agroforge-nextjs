'use client'

import { useState, useEffect } from 'react'
import Toast from '@/components/admin/Toast'
import { Palette, Settings, Save, RotateCcw } from 'lucide-react'

export default function Customizacao() {
  const [colors, setColors] = useState({
    primary: '#27ae60',
    secondary: '#1e8449',
    dark: '#1a472a',
  })

  const [config, setConfig] = useState({
    companyName: 'AgroForge',
    email: 'agroforge@gmail.com',
    whatsapp: '5541991957593',
    address: 'Rod. dos Minérios, 1949 - Taboão, Curitiba - PR, 82130-570',
    description: 'Sua loja agropecuária de confiança',
    keywords: 'agropecuária, café, sementes, ração, ferramentas, Curitiba',
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
    primary: 'Cor Primária',
    secondary: 'Cor Secundária',
    dark: 'Cor Escura',
  }

  const configFields = [
    { key: 'companyName', label: 'Nome da Empresa', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
    { key: 'address', label: 'Endereço', type: 'text' },
    { key: 'description', label: 'Descrição do Site', type: 'text' },
    { key: 'keywords', label: 'Palavras-chave', type: 'text' },
  ]

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
          Configurações
        </p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
          Customização
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Colors */}
        <div className="rounded-xl border border-stone-200/60 bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <Palette size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">Cores</h2>
          </div>

          {Object.entries(colors).map(([key, color]) => (
            <div key={key} className="mb-5">
              <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                {colorLabels[key] || key}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-stone-200/60"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="flex-1 rounded-lg border border-stone-200/60 bg-stone-50/50 px-3 py-2 font-mono text-[12px] text-stone-700 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div
                className="mt-2 h-7 rounded-lg border border-stone-200/60"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}

          {/* Preview */}
          <div className="mb-5 rounded-lg border border-stone-100 p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
              Preview
            </p>
            <div className="flex gap-2">
              {Object.entries(colors).map(([key, color]) => (
                <button
                  key={key}
                  style={{ backgroundColor: color }}
                  className="rounded-lg px-4 py-2 text-[11px] font-bold text-white"
                >
                  {colorLabels[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveColors}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Save size={14} />
              Salvar Cores
            </button>
            <button
              onClick={resetColors}
              className="flex items-center gap-2 rounded-xl border border-stone-200/60 bg-white px-4 py-2.5 text-[13px] font-semibold text-stone-600 transition-colors hover:bg-stone-50"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>

        {/* General Config */}
        <div className="rounded-xl border border-stone-200/60 bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <Settings size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Configurações Gerais
            </h2>
          </div>

          <div className="space-y-4">
            {configFields.map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={config[field.key as keyof typeof config]}
                  onChange={(e) =>
                    handleConfigChange(field.key, e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-200/60 bg-stone-50/50 px-4 py-2.5 text-[13px] text-stone-700 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
              </div>
            ))}

            <button
              onClick={saveConfig}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Save size={14} />
              Salvar Configurações
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
