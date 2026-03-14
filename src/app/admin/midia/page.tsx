'use client'

import { useState, useRef } from 'react'
import Toast from '@/components/admin/Toast'

interface MediaItem {
  id: string
  name: string
  url: string
  size: string
  date: string
  folder: string
}

export default function MidiaAdmin() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agroforge_media')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)
  const [selectedFolder, setSelectedFolder] = useState('Todos')
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const folders = ['Todos', 'Produtos', 'Banners', 'Blog', 'Geral']

  const saveMedia = (items: MediaItem[]) => {
    setMediaItems(items)
    localStorage.setItem('agroforge_media', JSON.stringify(items))
  }

  const handleFiles = (files: FileList) => {
    const newItems: MediaItem[] = []

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          message: `${file.name} excede 5MB`,
          type: 'error',
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const item: MediaItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: e.target?.result as string,
          size: (file.size / 1024).toFixed(1) + ' KB',
          date: new Date().toLocaleDateString('pt-BR'),
          folder: 'Geral',
        }
        newItems.push(item)
        if (newItems.length === files.length) {
          const updated = [...mediaItems, ...newItems]
          saveMedia(updated)
          setToast({
            message: `${newItems.length} arquivo(s) enviado(s)!`,
            type: 'success',
          })
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDelete = (id: string) => {
    const updated = mediaItems.filter((m) => m.id !== id)
    saveMedia(updated)
    setToast({ message: 'Arquivo deletado!', type: 'success' })
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setToast({ message: 'URL copiada!', type: 'info' })
  }

  const filteredItems =
    selectedFolder === 'Todos'
      ? mediaItems
      : mediaItems.filter((m) => m.folder === selectedFolder)

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        🖼️ Gerenciar Mídia
      </h1>

      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`mb-8 cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-green-50'
            : 'border-gray-300 hover:border-primary'
        }`}
      >
        <div className="mb-3 text-5xl">📤</div>
        <p className="text-lg font-bold text-gray-700">
          Arraste imagens aqui ou clique para selecionar
        </p>
        <p className="mt-1 text-sm text-gray-500">
          JPG, PNG, WebP • Máximo 5MB
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {folders.map((folder) => (
          <button
            key={folder}
            onClick={() => setSelectedFolder(folder)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
              selectedFolder === folder
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {folder}
          </button>
        ))}
      </div>

      {/* Galeria */}
      {filteredItems.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm">
          <div className="mb-2 text-4xl">📭</div>
          <p className="text-gray-400">Nenhuma imagem encontrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-40 overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => copyUrl(item.url)}
                    className="rounded bg-white px-3 py-1 text-xs font-bold text-gray-800"
                  >
                    📋 Copiar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-800">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.size} • {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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
