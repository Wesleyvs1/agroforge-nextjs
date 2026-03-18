'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Toast from '@/components/admin/Toast'

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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">📝 Gerenciar Blog</h1>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="hover:bg-secondary rounded-lg bg-primary px-6 py-2 font-bold text-white"
          >
            ➕ Novo Post
          </button>
        )}
      </div>

      {/* Formulário */}
      {(creating || editing) && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold">
            {editing ? '✏️ Editar Post' : '➕ Novo Post'}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">Título *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full rounded-lg border px-4 py-2"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, date: e.target.value }))
                }
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">
                URL da Imagem
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, image: e.target.value }))
                }
                placeholder="https://..."
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Resumo</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((p) => ({ ...p, excerpt: e.target.value }))
              }
              rows={2}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Conteúdo</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((p) => ({ ...p, content: e.target.value }))
              }
              rows={6}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="hover:bg-secondary rounded-lg bg-primary px-6 py-2 font-bold text-white"
            >
              💾 {editing ? 'Salvar' : 'Publicar'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-gray-200 px-6 py-2 font-bold text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">Título</th>
              <th className="hidden px-6 py-3 text-left text-sm font-bold md:table-cell">
                Categoria
              </th>
              <th className="hidden px-6 py-3 text-left text-sm font-bold sm:table-cell">
                Data
              </th>
              <th className="px-6 py-3 text-right text-sm font-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post: BlogPost) => (
              <tr
                key={post.id}
                className="border-b transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="hidden px-6 py-4 md:table-cell">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                    {post.category}
                  </span>
                </td>
                <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEdit(post)}
                      className="rounded bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(post.id)}
                      className="rounded bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogPosts.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <div className="mb-2 text-4xl">📭</div>
            <p>Nenhum post cadastrado</p>
          </div>
        )}
      </div>

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
