'use client'

import { useAdminData } from '@/context/AdminDataContext'
import { formatCurrency } from '@/lib/whatsapp'
import {
  Package,
  Boxes,
  DollarSign,
  AlertTriangle,
  Star,
  Tag,
  FileText,
  Users,
} from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating?: number
}

export default function RelatoriosAdmin() {
  const { products, blogPosts, suppliers } = useAdminData() as {
    products: Product[]
    blogPosts: Array<{ id: number }>
    suppliers: Array<{ id: number }>
  }

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const totalItems = products.reduce((sum, p) => sum + p.stock, 0)

  const categoryCounts = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const categoryStock = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stock
    return acc
  }, {})

  const lowStock = products
    .filter((p) => p.stock < 10)
    .sort((a, b) => a.stock - b.stock)

  const topRated = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  const summaryStats = [
    {
      icon: Package,
      label: 'Produtos',
      value: products.length,
      iconBg: 'bg-blue-50',
      accent: 'text-blue-600',
    },
    {
      icon: Boxes,
      label: 'Itens em Estoque',
      value: totalItems,
      iconBg: 'bg-emerald-50',
      accent: 'text-emerald-600',
    },
    {
      icon: DollarSign,
      label: 'Valor Total',
      value: formatCurrency(totalValue),
      iconBg: 'bg-amber-50',
      accent: 'text-amber-600',
    },
    {
      icon: AlertTriangle,
      label: 'Sem Estoque',
      value: lowStock.filter((p) => p.stock === 0).length,
      iconBg: 'bg-red-50',
      accent: 'text-red-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
          Analytics
        </p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
          Relatórios
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-stone-200/60 bg-white p-5"
            >
              <div
                className={`mb-3 inline-flex rounded-lg p-2.5 ${stat.iconBg}`}
              >
                <Icon size={18} className={stat.accent} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                {stat.label}
              </p>
              <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-stone-900">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <div className="rounded-xl border border-stone-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Tag size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Produtos por Categoria
            </h2>
          </div>
          <div className="space-y-3">
            {Object.entries(categoryCounts)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([cat, count]) => {
                const percent = Math.round(
                  ((count as number) / products.length) * 100,
                )
                return (
                  <div key={cat}>
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-[12px] font-semibold text-stone-700">
                        {cat}
                      </span>
                      <span className="text-[11px] font-bold text-stone-400">
                        {count as number} ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Stock by Category */}
        <div className="rounded-xl border border-stone-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Boxes size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Estoque por Categoria
            </h2>
          </div>
          <div className="space-y-3">
            {Object.entries(categoryStock)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([cat, stock]) => {
                const percent = totalItems
                  ? Math.round(((stock as number) / totalItems) * 100)
                  : 0
                return (
                  <div key={cat}>
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-[12px] font-semibold text-stone-700">
                        {cat}
                      </span>
                      <span className="text-[11px] font-bold text-stone-400">
                        {stock as number} un.
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Top Rated */}
        <div className="rounded-xl border border-stone-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Star size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Mais Bem Avaliados
            </h2>
          </div>
          <div className="space-y-2">
            {topRated.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-stone-100 px-4 py-2.5 transition-colors hover:bg-stone-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-[10px] font-bold text-stone-400">
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-medium text-stone-700">
                    {p.name}
                  </span>
                </div>
                <span className="text-[12px] font-bold text-amber-500">
                  ★ {p.rating || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="rounded-xl border border-stone-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Estoque Baixo ({'<'}10)
            </h2>
          </div>
          {lowStock.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <Package size={28} className="mb-2 text-stone-300" />
              <p className="text-[12px] text-stone-400">
                Todos os produtos com estoque adequado
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStock.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-stone-100 px-4 py-2.5"
                >
                  <span className="text-[13px] font-medium text-stone-700">
                    {p.name}
                  </span>
                  <span
                    className={`text-[12px] font-bold ${
                      p.stock === 0 ? 'text-red-500' : 'text-amber-500'
                    }`}
                  >
                    {p.stock === 0 ? 'Esgotado' : `${p.stock} un.`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* General Count */}
      <div className="rounded-xl border border-stone-200/60 bg-white p-5">
        <h2 className="mb-4 text-[14px] font-bold text-stone-800">
          Contagem Geral
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: Package,
              label: 'Produtos',
              value: products.length,
              accent: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: FileText,
              label: 'Posts no Blog',
              value: blogPosts.length,
              accent: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              icon: Users,
              label: 'Fornecedores',
              value: suppliers.length,
              accent: 'text-violet-600',
              bg: 'bg-violet-50',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-stone-100 p-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <Icon size={18} className={item.accent} />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold tracking-tight text-stone-900">
                    {item.value}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                    {item.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
