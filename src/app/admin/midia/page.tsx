'use client'

import { useState, useRef } from 'react'
import Toast from '@/components/admin/Toast'
import ImageCropper from '@/components/admin/ImageCropper'
import {
  Upload,
  FolderOpen,
  FolderPlus,
  Copy,
  Trash2,
  ImageIcon,
  Search,
  Check,
  X,
} from 'lucide-react'

interface MediaItem {
  id: string
  name: string
  url: string
  size: string
  date: string
  folder: string
}

const DEFAULT_FOLDERS = ['Todos', 'Produtos', 'Banners', 'Blog', 'Geral']

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
  const [searchTerm, setSearchTerm] = useState('')
  const [customFolders, setCustomFolders] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agroforge_media_folders')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [cropImage, setCropImage] = useState<{
    url: string
    name: string
    originalSize: string
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const allFolders = [...DEFAULT_FOLDERS, ...customFolders]

  const saveMedia = (items: MediaItem[]) => {
    setMediaItems(items)
    localStorage.setItem('agroforge_media', JSON.stringify(items))
  }

  const handleFiles = (files: FileList) => {
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
        const url = e.target?.result as string
        // Open cropper
        setCropImage({
          url,
          name: file.name,
          originalSize: (file.size / 1024).toFixed(1) + ' KB',
        })
      }
      reader.readAsDataURL(file)
    })
  }

  const handleCropComplete = (croppedUrl: string) => {
    if (!cropImage) return

    const item: MediaItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: cropImage.name,
      url: croppedUrl,
      size: cropImage.originalSize,
      date: new Date().toLocaleDateString('pt-BR'),
      folder: selectedFolder === 'Todos' ? 'Geral' : selectedFolder,
    }

    const updated = [...mediaItems, item]
    saveMedia(updated)
    setCropImage(null)
    setToast({ message: 'Imagem enviada e recortada!', type: 'success' })
  }

  const handleSkipCrop = () => {
    if (!cropImage) return

    const item: MediaItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: cropImage.name,
      url: cropImage.url,
      size: cropImage.originalSize,
      date: new Date().toLocaleDateString('pt-BR'),
      folder: selectedFolder === 'Todos' ? 'Geral' : selectedFolder,
    }

    const updated = [...mediaItems, item]
    saveMedia(updated)
    setCropImage(null)
    setToast({ message: 'Imagem enviada!', type: 'success' })
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

  const handleCreateFolder = () => {
    const name = newFolderName.trim()
    if (!name || allFolders.includes(name)) {
      setToast({ message: 'Nome inválido ou já existe', type: 'error' })
      return
    }
    const updated = [...customFolders, name]
    setCustomFolders(updated)
    localStorage.setItem('agroforge_media_folders', JSON.stringify(updated))
    setNewFolderName('')
    setShowNewFolder(false)
    setToast({ message: `Pasta "${name}" criada!`, type: 'success' })
  }

  const handleDeleteFolder = (folderName: string) => {
    if (DEFAULT_FOLDERS.includes(folderName)) return
    const updated = customFolders.filter((f) => f !== folderName)
    setCustomFolders(updated)
    localStorage.setItem('agroforge_media_folders', JSON.stringify(updated))
    // Move items from deleted folder to 'Geral'
    const updatedMedia = mediaItems.map((m) =>
      m.folder === folderName ? { ...m, folder: 'Geral' } : m,
    )
    saveMedia(updatedMedia)
    if (selectedFolder === folderName) setSelectedFolder('Todos')
    setToast({ message: `Pasta "${folderName}" removida`, type: 'info' })
  }

  const filteredItems = mediaItems.filter((item) => {
    const matchFolder =
      selectedFolder === 'Todos' || item.folder === selectedFolder
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchFolder && matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
          Biblioteca
        </p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
          Mídia
        </h1>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
          dragActive
            ? 'border-primary/40 bg-primary/5'
            : 'border-stone-200 hover:border-stone-300'
        }`}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
          <Upload size={22} className="text-stone-400" />
        </div>
        <p className="text-[14px] font-semibold text-stone-700">
          Arraste imagens aqui ou clique para selecionar
        </p>
        <p className="mt-1 text-[12px] text-stone-400">
          JPG, PNG, WebP • Máximo 5MB • Recorte automático antes do upload
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

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Buscar por nome de arquivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stone-200/60 bg-stone-50/50 py-2.5 pl-9 pr-4 text-[12px] text-stone-700 placeholder:text-stone-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <p className="text-[11px] font-semibold text-stone-400">
          {filteredItems.length} de {mediaItems.length} arquivo(s)
        </p>
      </div>

      {/* Folder Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {allFolders.map((folder) => (
          <div key={folder} className="group relative">
            <button
              onClick={() => setSelectedFolder(folder)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-[12px] font-semibold transition-colors ${
                selectedFolder === folder
                  ? 'bg-stone-900 text-white'
                  : 'border border-stone-200/60 bg-white text-stone-500 hover:text-stone-700'
              }`}
            >
              <FolderOpen size={14} />
              {folder}
            </button>
            {/* Delete custom folder */}
            {!DEFAULT_FOLDERS.includes(folder) && (
              <button
                onClick={() => handleDeleteFolder(folder)}
                className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white group-hover:flex"
              >
                <X size={8} />
              </button>
            )}
          </div>
        ))}
        {showNewFolder ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              placeholder="Nome da pasta"
              className="w-32 rounded-lg border border-stone-200/60 px-3 py-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-primary/20"
              autoFocus
            />
            <button
              onClick={handleCreateFolder}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-100"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => {
                setShowNewFolder(false)
                setNewFolderName('')
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-400 hover:bg-stone-200"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewFolder(true)}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-dashed border-stone-300 px-3.5 py-2 text-[12px] font-semibold text-stone-400 transition-colors hover:border-stone-400 hover:text-stone-600"
          >
            <FolderPlus size={14} />
            Nova Pasta
          </button>
        )}
      </div>

      {/* Gallery */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-stone-200/60 bg-white py-16 text-center">
          <ImageIcon size={32} className="mb-3 text-stone-300" />
          <p className="text-[13px] font-medium text-stone-400">
            {searchTerm
              ? `Nenhum resultado para "${searchTerm}"`
              : 'Nenhuma imagem encontrada'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border border-stone-200/60 bg-white transition-all hover:border-stone-300"
            >
              <div className="relative h-40 overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-stone-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => copyUrl(item.url)}
                    className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-700"
                  >
                    <Copy size={12} />
                    Copiar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="px-3 py-2.5">
                <p className="truncate text-[12px] font-semibold text-stone-700">
                  {item.name}
                </p>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-[10px] text-stone-400">
                    {item.size} • {item.date}
                  </p>
                  <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[8px] font-bold uppercase text-stone-400">
                    {item.folder}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Cropper */}
      {cropImage && (
        <ImageCropper
          imageUrl={cropImage.url}
          onCrop={handleCropComplete}
          onCancel={handleSkipCrop}
        />
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
