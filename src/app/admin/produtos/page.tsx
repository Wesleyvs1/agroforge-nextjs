'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAdminData } from '@/context/AdminDataContext'
import { formatCurrency } from '@/lib/whatsapp'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Toast from '@/components/admin/Toast'
import { Plus, Search, Package, Pencil, Trash2, Filter } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

export default function ProdutosAdmin() {
  const { products, deleteProduct } = useAdminData() as {
    products: Product[]
    deleteProduct: (id: number) => void
  }
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const categories = [...new Set(products.map((p: Product) => p.category))]

  const filteredProducts = products.filter((p: Product) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = !selectedCategory || p.category === selectedCategory
    return matchSearch && matchCategory
  })

  const handleDelete = (id: number) => {
    deleteProduct(id)
    setDeleteConfirm(null)
    setToast({ message: 'Produto deletado com sucesso!', type: 'success' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
            Catálogo
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
            Produtos
          </h1>
          <p className="mt-1 text-[13px] text-stone-400">
            {products.length} produto(s) cadastrado(s)
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} />
          Novo Produto
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-stone-200/60 bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stone-200/60 bg-stone-50/50 py-2.5 pl-10 pr-4 text-[13px] text-stone-700 placeholder:text-stone-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none rounded-lg border border-stone-200/60 bg-stone-50/50 py-2.5 pl-10 pr-8 text-[13px] text-stone-700 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat as string} value={cat as string}>
                {cat as string}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-stone-200/60 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                  ID
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                  Nome
                </th>
                <th className="hidden px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 md:table-cell">
                  Categoria
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                  Preço
                </th>
                <th className="hidden px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 sm:table-cell">
                  Estoque
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product: Product) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-stone-50/50"
                >
                  <td className="px-5 py-3.5 text-[12px] text-stone-400">
                    #{product.id}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-stone-800">
                    {product.name}
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-bold text-stone-800">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span
                      className={`text-[13px] font-bold ${
                        product.stock === 0
                          ? 'text-red-500'
                          : product.stock < 10
                            ? 'text-amber-500'
                            : 'text-stone-700'
                      }`}
                    >
                      {product.stock === 0 ? 'Esgotado' : product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="flex items-center gap-1.5 rounded-lg border border-stone-200/60 px-3 py-1.5 text-[11px] font-semibold text-stone-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={12} />
                        Editar
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
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
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <Package size={32} className="mb-3 text-stone-300" />
            <p className="text-[13px] font-medium text-stone-400">
              Nenhum produto encontrado
            </p>
          </div>
        )}
      </div>

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
