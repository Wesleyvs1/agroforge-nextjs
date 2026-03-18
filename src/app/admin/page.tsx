'use client'

import Link from 'next/link'
import { useAdminData } from '@/context/AdminDataContext'
import { useAdmin } from '@/context/AdminContext'
import { formatCurrency } from '@/lib/whatsapp'

export default function DashboardHome() {
  const { products, blogPosts, suppliers } = useAdminData()
  const { user } = useAdmin()

  const stats = [
    {
      label: 'Total de Produtos',
      value: products.length,
      icon: '📦',
      href: '/admin/produtos',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Categorias',
      value: new Set(products.map((p: { category: string }) => p.category))
        .size,
      icon: '🏷️',
      href: '/admin/produtos',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      label: 'Valor em Estoque',
      value: formatCurrency(
        products.reduce(
          (sum: number, p: { price: number; stock: number }) =>
            sum + p.price * p.stock,
          0,
        ),
      ),
      icon: '💰',
      href: '/admin/produtos',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      label: 'Sem Estoque',
      value: products.filter((p: { stock: number }) => p.stock === 0).length,
      icon: '⚠️',
      href: '/admin/produtos',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
  ]

  const quickLinks = [
    {
      href: '/admin/produtos/novo',
      label: '➕ Novo Produto',
      bg: 'bg-primary hover:bg-secondary',
    },
    {
      href: '/admin/midia',
      label: '🖼️ Upload de Imagem',
      bg: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      href: '/admin/customizacao',
      label: '🎨 Customizar Cores',
      bg: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      href: '/admin/blog',
      label: '📝 Novo Post',
      bg: 'bg-orange-600 hover:bg-orange-700',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo, {user?.username}! 👋
        </h1>
        <p className="mt-1 text-gray-500">
          Gerencie todos os aspectos do site AgroForge
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            href={stat.href}
            className={`rounded-xl border p-6 transition-shadow hover:shadow-lg ${stat.color}`}
          >
            <div className="mb-2 text-3xl">{stat.icon}</div>
            <p className="text-sm opacity-75">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Atalhos Rápidos */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          ⚡ Atalhos Rápidos
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg p-4 text-center font-bold text-white transition-colors ${link.bg}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid com últimos dados */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Últimos Produtos */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              📦 Últimos Produtos
            </h2>
            <Link
              href="/admin/produtos"
              className="hover:text-secondary text-sm font-bold text-primary"
            >
              Ver todos →
            </Link>
          </div>
          <div className="space-y-2">
            {products
              .slice(-5)
              .reverse()
              .map(
                (product: {
                  id: number
                  name: string
                  category: string
                  price: number
                }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-bold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {formatCurrency(product.price)}
                      </p>
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>

        {/* Resumo */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            📊 Resumo Geral
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <span className="text-gray-600">Posts no Blog</span>
              <span className="text-2xl font-bold text-gray-800">
                {blogPosts.length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <span className="text-gray-600">Fornecedores</span>
              <span className="text-2xl font-bold text-gray-800">
                {suppliers.length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <span className="text-gray-600">Itens em Estoque</span>
              <span className="text-2xl font-bold text-gray-800">
                {products.reduce(
                  (sum: number, p: { stock: number }) => sum + p.stock,
                  0,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
