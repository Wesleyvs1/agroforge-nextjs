'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Toast from '@/components/admin/Toast'
import {
  Plus,
  Handshake,
  Pencil,
  Trash2,
  Save,
  X,
  MapPin,
  Phone,
} from 'lucide-react'

interface Supplier {
  id: number
  name: string
  category: string
  description: string
  location: string
  phone: string
  image: string
  featured: boolean
}

export default function FornecedoresAdmin() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } =
    useAdminData() as {
      suppliers: Supplier[]
      addSupplier: (s: Omit<Supplier, 'id'>) => void
      updateSupplier: (id: number, s: Omit<Supplier, 'id'>) => void
      deleteSupplier: (id: number) => void
    }
  const [editing, setEditing] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    phone: '',
    image: '',
    featured: true,
  })

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      location: '',
      phone: '',
      image: '',
      featured: true,
    })
    setEditing(null)
    setCreating(false)
  }

  const startEdit = (supplier: Supplier) => {
    setFormData({
      name: supplier.name || '',
      category: supplier.category || '',
      description: supplier.description || '',
      location: supplier.location || '',
      phone: supplier.phone || '',
      image: supplier.image || '',
      featured: supplier.featured !== false,
    })
    setEditing(supplier.id)
    setCreating(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) {
      setToast({ message: 'Nome é obrigatório', type: 'error' })
      return
    }

    if (editing) {
      updateSupplier(editing, formData)
      setToast({ message: 'Fornecedor atualizado!', type: 'success' })
    } else {
      addSupplier(formData)
      setToast({ message: 'Fornecedor criado!', type: 'success' })
    }
    resetForm()
  }

  const handleDelete = (id: number) => {
    deleteSupplier(id)
    setDeleteConfirm(null)
    setToast({ message: 'Fornecedor deletado!', type: 'success' })
  }

  const inputClass =
    'w-full rounded-lg border border-stone-200/60 bg-stone-50/50 px-4 py-2.5 text-[13px] text-stone-700 placeholder:text-stone-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
            Parceiros
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
            Fornecedores
          </h1>
        </div>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Plus size={16} />
            Novo Fornecedor
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
              {editing ? 'Editar Fornecedor' : 'Novo Fornecedor'}
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
                Nome *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Categoria
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                placeholder="Ex: Rações, Sementes..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Localização
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="Cidade - Estado"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                Telefone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              URL da Imagem
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData((p) => ({ ...p, image: e.target.value }))
              }
              className={inputClass}
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 rounded-lg border border-stone-200/60 bg-stone-50/30 px-4 py-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, featured: e.target.checked }))
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-stone-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-stone-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
            </label>
            <div>
              <p className="text-[13px] font-semibold text-stone-700">
                Fornecedor Destaque
              </p>
              <p className="text-[11px] text-stone-400">
                Destaques aparecem com logo na grade principal. Não-destaques
                aparecem na lista de texto.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Save size={14} />
              {editing ? 'Salvar' : 'Criar'}
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier: Supplier) => (
          <div
            key={supplier.id}
            className="rounded-xl border border-stone-200/60 bg-white p-5 transition-all hover:border-stone-300/80"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-stone-800">
                {supplier.name}
              </h3>
              {supplier.featured !== false && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                  Destaque
                </span>
              )}
            </div>
            {supplier.category && (
              <span className="mt-1.5 inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                {supplier.category}
              </span>
            )}
            <p className="mt-2 text-[12px] leading-relaxed text-stone-500">
              {supplier.description}
            </p>
            <div className="mt-3 space-y-1">
              {supplier.location && (
                <p className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <MapPin size={12} />
                  {supplier.location}
                </p>
              )}
              {supplier.phone && (
                <p className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <Phone size={12} />
                  {supplier.phone}
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-1.5 border-t border-stone-100 pt-4">
              <button
                onClick={() => startEdit(supplier)}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200/60 px-3 py-1.5 text-[11px] font-semibold text-stone-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Pencil size={12} />
                Editar
              </button>
              <button
                onClick={() => setDeleteConfirm(supplier.id)}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200/60 px-3 py-1.5 text-[11px] font-semibold text-stone-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={12} />
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="flex flex-col items-center rounded-xl border border-stone-200/60 bg-white py-16 text-center">
          <Handshake size={32} className="mb-3 text-stone-300" />
          <p className="text-[13px] font-medium text-stone-400">
            Nenhum fornecedor cadastrado
          </p>
        </div>
      )}

      {deleteConfirm && (
        <ConfirmModal
          title="Deletar Fornecedor"
          message="Tem certeza que deseja deletar este fornecedor?"
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
