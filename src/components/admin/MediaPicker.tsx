'use client'

import { useState, useRef, useEffect } from 'react'
import {
  X,
  Search,
  Upload,
  FolderOpen,
  Check,
  Copy,
  Trash2,
  ImageIcon,
  FolderPlus,
} from 'lucide-react'

interface MediaItem {
  id: string
  name: string
  url: string
  size: string
  date: string
  folder: string
}

interface MediaPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

const DEFAULT_FOLDERS = ['Todos', 'Produtos', 'Banners', 'Blog', 'Geral']

function getMediaItems(): MediaItem[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('agroforge_media')
  return saved ? JSON.parse(saved) : []
}

function saveMediaItems(items: MediaItem[]) {
  localStorage.setItem('agroforge_media', JSON.stringify(items))
}

function getCustomFolders(): string[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('agroforge_media_folders')
  return saved ? JSON.parse(saved) : []
}

function saveCustomFolders(folders: string[]) {
  localStorage.setItem('agroforge_media_folders', JSON.stringify(folders))
}

export default function MediaPicker({
  isOpen,
  onClose,
  onSelect,
}: MediaPickerProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedFolder, setSelectedFolder] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [customFolders, setCustomFolders] = useState<string[]>([])
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setMediaItems(getMediaItems())
      setCustomFolders(getCustomFolders())
      setSelectedItem(null)
      setSearchTerm('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const allFolders = [...DEFAULT_FOLDERS, ...customFolders]

  const filteredItems = mediaItems.filter((item) => {
    const matchFolder =
      selectedFolder === 'Todos' || item.folder === selectedFolder
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchFolder && matchSearch
  })

  const handleUpload = (files: FileList) => {
    const newItems: MediaItem[] = []
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const item: MediaItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: e.target?.result as string,
          size: (file.size / 1024).toFixed(1) + ' KB',
          date: new Date().toLocaleDateString('pt-BR'),
          folder: selectedFolder === 'Todos' ? 'Geral' : selectedFolder,
        }
        newItems.push(item)
        const updated = [...getMediaItems(), item]
        saveMediaItems(updated)
        setMediaItems(updated)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDelete = (id: string) => {
    const updated = mediaItems.filter((m) => m.id !== id)
    saveMediaItems(updated)
    setMediaItems(updated)
    if (selectedItem === id) setSelectedItem(null)
  }

  const handleCreateFolder = () => {
    const name = newFolderName.trim()
    if (!name || allFolders.includes(name)) return
    const updated = [...customFolders, name]
    setCustomFolders(updated)
    saveCustomFolders(updated)
    setNewFolderName('')
    setShowNewFolder(false)
  }

  const handleSelectAndUse = () => {
    const item = mediaItems.find((m) => m.id === selectedItem)
    if (item) {
      onSelect(item.url)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm">
      <div className="flex h-[85vh] w-full max-w-[800px] flex-col rounded-2xl border border-stone-200/60 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <ImageIcon size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Biblioteca de Mídia
            </h2>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-400">
              {mediaItems.length} arquivo(s)
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600"
          >
            <X size={16} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-stone-100 px-5 py-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-stone-200/60 bg-stone-50/50 py-2 pl-9 pr-3 text-[12px] text-stone-700 placeholder:text-stone-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          {/* Upload */}
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-semibold text-white hover:bg-primary-dark"
          >
            <Upload size={14} />
            Upload
          </button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Folders */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-stone-100 px-5 py-2.5">
          {allFolders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                selectedFolder === folder
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              }`}
            >
              <FolderOpen size={12} />
              {folder}
            </button>
          ))}
          {showNewFolder ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                placeholder="Nome da pasta"
                className="w-28 rounded-md border border-stone-200/60 px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-primary/20"
                autoFocus
              />
              <button
                onClick={handleCreateFolder}
                className="flex h-6 w-6 items-center justify-center rounded text-emerald-500 hover:bg-emerald-50"
              >
                <Check size={12} />
              </button>
              <button
                onClick={() => {
                  setShowNewFolder(false)
                  setNewFolderName('')
                }}
                className="flex h-6 w-6 items-center justify-center rounded text-stone-400 hover:bg-stone-100"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewFolder(true)}
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-[11px] font-semibold text-stone-400 hover:bg-stone-100 hover:text-stone-600"
            >
              <FolderPlus size={12} />
              Nova
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ImageIcon size={36} className="mb-3 text-stone-200" />
              <p className="text-[13px] font-medium text-stone-400">
                {searchTerm
                  ? 'Nenhuma imagem encontrada'
                  : 'Nenhuma imagem nesta pasta'}
              </p>
              <p className="mt-1 text-[11px] text-stone-300">
                Faça upload de imagens para começar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                    selectedItem === item.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-transparent hover:border-stone-200'
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    {/* Selection check */}
                    {selectedItem === item.id && (
                      <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                        <Check size={12} />
                      </div>
                    )}
                    {/* Actions overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-stone-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(item.url)
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-stone-700"
                      >
                        <Copy size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(item.id)
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-white"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="px-2 py-1.5">
                    <p className="truncate text-[10px] font-semibold text-stone-600">
                      {item.name}
                    </p>
                    <p className="text-[9px] text-stone-400">{item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-100 px-5 py-3.5">
          <p className="text-[11px] text-stone-400">
            {selectedItem
              ? '1 imagem selecionada'
              : 'Clique em uma imagem para selecionar'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-stone-200/60 px-4 py-2 text-[12px] font-semibold text-stone-600 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSelectAndUse}
              disabled={!selectedItem}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={14} />
              Usar Imagem
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
