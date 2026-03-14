'use client'

import { useAdminData } from '@/context/AdminDataContext'
import { formatCurrency } from '@/lib/whatsapp'

export default function RelatoriosAdmin() {
  const { products, blogPosts, suppliers } = useAdminData()

  const totalValue = products.reduce(
    (sum: number, p: { price: number; stock: number }) =>
      sum + p.price * p.stock,
    0,
  )

  const totalItems = products.reduce(
    (sum: number, p: { stock: number }) => sum + p.stock,
    0,
  )

  const categoryCounts = products.reduce(
    (acc: Record<string, number>, p: { category: string }) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    },
    {},
  )

  const categoryStock = products.reduce(
    (acc: Record<string, number>, p: { category: string; stock: number }) => {
      acc[p.category] = (acc[p.category] || 0) + p.stock
      return acc
    },
    {},
  )

  const lowStock = products
    .filter((p: { stock: number }) => p.stock < 10)
    .sort((a: { stock: number }, b: { stock: number }) => a.stock - b.stock)

  const topRated = [...products]
    .sort(
      (a: { rating: number }, b: { rating: number }) =>
        (b.rating || 0) - (a.rating || 0),
    )
    .slice(0, 5)

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        📈 Relatórios e Analytics
      </h1>

      {/* Resumo Geral */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: 'Produtos',
            value: products.length,
            icon: '📦',
            bg: 'bg-blue-50 text-blue-700',
          },
          {
            label: 'Itens em Estoque',
            value: totalItems,
            icon: '📊',
            bg: 'bg-green-50 text-green-700',
          },
          {
            label: 'Valor Total',
            value: formatCurrency(totalValue),
            icon: '💰',
            bg: 'bg-yellow-50 text-yellow-700',
          },
          {
            label: 'Sem Estoque',
            value: lowStock.filter((p: { stock: number }) => p.stock === 0)
              .length,
            icon: '⚠️',
            bg: 'bg-red-50 text-red-700',
          },
        ].map((stat, i) => (
          <div key={i} className={`rounded-xl p-5 ${stat.bg}`}>
            <div className="mb-1 text-2xl">{stat.icon}</div>
            <p className="text-sm opacity-75">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Produtos por Categoria */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            🏷️ Produtos por Categoria
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryCounts)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([cat, count]) => {
                const percent = Math.round(
                  ((count as number) / products.length) * 100,
                )
                return (
                  <div key={cat}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{cat}</span>
                      <span className="text-gray-500">
                        {count as number} ({percent}%)
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
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

        {/* Estoque por Categoria */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            📦 Estoque por Categoria
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryStock)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([cat, stock]) => {
                const percent = Math.round(
                  ((stock as number) / totalItems) * 100,
                )
                return (
                  <div key={cat}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{cat}</span>
                      <span className="text-gray-500">
                        {stock as number} unidades
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
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

        {/* Top Avaliados */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            ⭐ Mais Bem Avaliados
          </h2>
          <div className="space-y-3">
            {topRated.map(
              (p: { id: number; name: string; rating: number }, i: number) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">
                      #{i + 1}
                    </span>
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <span className="font-bold text-yellow-500">
                    ★ {p.rating || 0}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Estoque Baixo */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            ⚠️ Estoque Baixo ({'<'}10)
          </h2>
          {lowStock.length === 0 ? (
            <p className="text-center text-gray-400">
              ✅ Todos os produtos com estoque adequado
            </p>
          ) : (
            <div className="space-y-2">
              {lowStock.map(
                (p: { id: number; name: string; stock: number }) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg bg-red-50 p-3"
                  >
                    <span className="font-medium text-gray-800">{p.name}</span>
                    <span
                      className={`font-bold ${p.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}
                    >
                      {p.stock === 0 ? 'Sem estoque' : `${p.stock} un.`}
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contagem geral */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          📊 Contagem Geral
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-3xl font-bold text-primary">{products.length}</p>
            <p className="text-sm text-gray-500">Produtos</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">
              {blogPosts.length}
            </p>
            <p className="text-sm text-gray-500">Posts no Blog</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">
              {suppliers.length}
            </p>
            <p className="text-sm text-gray-500">Fornecedores</p>
          </div>
        </div>
      </div>
    </div>
  )
}
