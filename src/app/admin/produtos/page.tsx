'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAdminData } from '@/context/AdminDataContext'
import { formatCurrency } from '@/lib/whatsapp'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Toast from '@/components/admin/Toast'

export default function ProdutosAdmin() {
  const { products, deleteProduct } = useAdminData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const categories = [
    ...new Set(products.map((p: { category: string }) => p.category)),
  ]

  const filteredProducts = products.filter(
    (p: { name: string; category: string }) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchCategory = !selectedCategory || p.category === selectedCategory
      return matchSearch && matchCategory
    },
  )

  const handleDelete = (id: number) => {
    deleteProduct(id)
    setDeleteConfirm(null)
    setToast({ message: 'Produto deletado com sucesso!', type: 'success' })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            📦 Gerenciar Produtos
          </h1>
          <p className="text-gray-500">
            {products.length} produto(s) cadastrado(s)
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="hover:bg-secondary inline-block rounded-lg bg-primary px-6 py-2 text-center font-bold text-white transition-colors"
        >
          ➕ Novo Produto
        </Link>
      </div>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-2">
        <input
          type="text"
          placeholder="🔍 Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat as string} value={cat as string}>
              {cat as string}
            </option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                  Nome
                </th>
                <th className="hidden px-6 py-4 text-left text-sm font-bold text-gray-600 md:table-cell">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                  Preço
                </th>
                <th className="hidden px-6 py-4 text-left text-sm font-bold text-gray-600 sm:table-cell">
                  Estoque
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-600">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(
                (product: {
                  id: number
                  name: string
                  category: string
                  price: number
                  stock: number
                }) => (
                  <tr
                    key={product.id}
                    className="border-b transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-500">#{product.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-primary">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span
                        className={`font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-800'}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/produtos/${product.id}`}
                          className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100"
                        >
                          ✏️ Editar
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="rounded-lg bg-red-50 px-3 py-1 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <div className="mb-2 text-4xl">📭</div>
            <p>Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      {deleteConfirm && (
        <ConfirmModal
          title="Deletar Produto"
          message="Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita."
          confirmLabel="Deletar"
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          variant="danger"
        />
      )}

      {/* Toast */}
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
