'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Toast from '@/components/admin/Toast'

interface Supplier {
  id: number
  name: string
  category: string
  description: string
  location: string
  phone: string
  image: string
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
  })

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      location: '',
      phone: '',
      image: '',
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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          🤝 Gerenciar Fornecedores
        </h1>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="hover:bg-secondary rounded-lg bg-primary px-6 py-2 font-bold text-white"
          >
            ➕ Novo Fornecedor
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
            {editing ? '✏️ Editar Fornecedor' : '➕ Novo Fornecedor'}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Categoria</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                placeholder="Ex: Rações, Sementes..."
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">
                Localização
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="Cidade - Estado"
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
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
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="hover:bg-secondary rounded-lg bg-primary px-6 py-2 font-bold text-white"
            >
              💾 {editing ? 'Salvar' : 'Criar'}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier: Supplier) => (
          <div
            key={supplier.id}
            className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-1 text-lg font-bold text-gray-800">
              {supplier.name}
            </h3>
            {supplier.category && (
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                {supplier.category}
              </span>
            )}
            <p className="mb-3 text-sm text-gray-600">{supplier.description}</p>
            <div className="mb-4 space-y-1 text-sm text-gray-500">
              {supplier.location && <p>📍 {supplier.location}</p>}
              {supplier.phone && <p>📞 {supplier.phone}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(supplier)}
                className="rounded bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => setDeleteConfirm(supplier.id)}
                className="rounded bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
              >
                🗑️ Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm">
          <div className="mb-2 text-4xl">📭</div>
          <p className="text-gray-400">Nenhum fornecedor cadastrado</p>
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
