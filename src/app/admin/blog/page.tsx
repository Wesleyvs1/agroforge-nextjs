'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Toast from '@/components/admin/Toast'
import MediaPicker from '@/components/admin/MediaPicker'
import {
  Plus,
  FileText,
  Pencil,
  Trash2,
  Save,
  X,
  ImageIcon,
} from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  content: string
}

export default function BlogAdmin() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } =
    useAdminData() as {
      blogPosts: BlogPost[]
      addBlogPost: (post: Omit<BlogPost, 'id'>) => void
      updateBlogPost: (id: number, post: Omit<BlogPost, 'id'>) => void
      deleteBlogPost: (id: number) => void
    }
  const [editing, setEditing] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cultivo',
    date: new Date().toISOString().split('T')[0],
    image: '',
    excerpt: '',
    content: '',
  })
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const categories = [
    'Cultivo',
    'Café',
    'Sementes',
    'Pecuária',
    'Tecnologia',
    'Sustentabilidade',
  ]

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Cultivo',
      date: new Date().toISOString().split('T')[0],
      image: '',
      excerpt: '',
      content: '',
    })
    setEditing(null)
    setCreating(false)
  }

  const startEdit = (post: BlogPost) => {
    setFormData({
      title: post.title || '',
      category: post.category || 'Cultivo',
      date: post.date || new Date().toISOString().split('T')[0],
      image: post.image || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
    })
    setEditing(post.id)
    setCreating(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) {
      setToast({ message: 'Título é obrigatório', type: 'error' })
      return
    }

    if (editing) {
      updateBlogPost(editing, formData)
      setToast({ message: 'Post atualizado!', type: 'success' })
    } else {
      addBlogPost(formData)
      setToast({ message: 'Post criado!', type: 'success' })
    }
    resetForm()
  }

  const handleDelete = (id: number) => {
    deleteBlogPost(id)
    setDeleteConfirm(null)
    setToast({ message: 'Post deletado!', type: 'success' })
  }

  const inputClass =
    'w-full rounded-lg border border-stone-200/60 bg-stone-50/50 px-4 py-2.5 text-[13px] text-stone-700 placeholder:text-stone-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
            Conteúdo
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
            Blog
          </h1>
        </div>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Plus size={16} />
            Novo Post
          </button>
        )}
      </div>

      {/* Form */}
      {(creating || editing) && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-stone-200/60 bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-stone-800">
              {editing ? 'Editar Post' : 'Novo Post'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Data
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, date: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Imagem
              </label>
              <button
                type="button"
                onClick={() => setShowMediaPicker(true)}
                className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <ImageIcon size={14} />
                Biblioteca
              </button>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, image: e.target.value }))
                }
                placeholder="Ou cole a URL..."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Resumo
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((p) => ({ ...p, excerpt: e.target.value }))
              }
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Conteúdo
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((p) => ({ ...p, content: e.target.value }))
              }
              rows={6}
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Save size={14} />
              {editing ? 'Salvar' : 'Publicar'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-stone-200/60 px-5 py-2.5 text-[13px] font-semibold text-stone-600 transition-colors hover:bg-stone-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-stone-200/60 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                Título
              </th>
              <th className="hidden px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 md:table-cell">
                Categoria
              </th>
              <th className="hidden px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 sm:table-cell">
                Data
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {blogPosts.map((post: BlogPost) => (
              <tr
                key={post.id}
                className="transition-colors hover:bg-stone-50/50"
              >
                <td className="px-5 py-3.5 text-[13px] font-semibold text-stone-800">
                  {post.title}
                </td>
                <td className="hidden px-5 py-3.5 md:table-cell">
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {post.category}
                  </span>
                </td>
                <td className="hidden px-5 py-3.5 text-[12px] text-stone-400 sm:table-cell">
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => startEdit(post)}
                      className="flex items-center gap-1.5 rounded-lg border border-stone-200/60 px-3 py-1.5 text-[11px] font-semibold text-stone-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Pencil size={12} />
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(post.id)}
                      className="flex items-center rounded-lg border border-stone-200/60 p-1.5 text-stone-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogPosts.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <FileText size={32} className="mb-3 text-stone-300" />
            <p className="text-[13px] font-medium text-stone-400">
              Nenhum post cadastrado
            </p>
          </div>
        )}
      </div>

      <MediaPicker
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          setFormData((p) => ({ ...p, image: url }))
          setShowMediaPicker(false)
        }}
      />

      {deleteConfirm && (
        <ConfirmModal
          title="Deletar Post"
          message="Tem certeza que deseja deletar este post?"
          confirmLabel="Deletar"
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
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
