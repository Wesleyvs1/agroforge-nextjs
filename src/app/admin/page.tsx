'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Activity,
  ArrowRight,
  Plus,
  FileText,
  Upload,
  Palette,
  Users,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { useAdmin } from '@/context/AdminContext'
import { formatCurrency } from '@/lib/whatsapp'

interface StatCardData {
  icon: React.ElementType
  label: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  accent: string
  iconBg: string
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'neutral',
  accent,
  iconBg,
}: StatCardData) {
  return (
    <div className="group rounded-xl border border-stone-200/60 bg-white p-5 transition-all hover:border-stone-300/80">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon size={20} className={accent} />
        </div>
        {change && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              changeType === 'positive'
                ? 'bg-emerald-50 text-emerald-600'
                : changeType === 'negative'
                  ? 'bg-red-50 text-red-500'
                  : 'bg-stone-100 text-stone-500'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-stone-900">
        {value}
      </p>
    </div>
  )
}

export default function DashboardHome() {
  const { products, blogPosts, suppliers } = useAdminData() as {
    products: Array<{
      id: number
      name: string
      category: string
      price: number
      stock: number
    }>
    blogPosts: Array<{ id: number }>
    suppliers: Array<{ id: number }>
  }
  const { user } = useAdmin()

  const stats = useMemo(() => {
    const outOfStock = products.filter((p) => p.stock === 0).length
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length
    const stockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
    const categories = new Set(products.map((p) => p.category)).size
    return { outOfStock, lowStock, stockValue, categories }
  }, [products])

  const statCards: StatCardData[] = [
    {
      icon: Package,
      label: 'Produtos',
      value: products.length,
      change: `${stats.categories} categorias`,
      changeType: 'neutral',
      accent: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      label: 'Valor em Estoque',
      value: formatCurrency(stats.stockValue),
      change: '↑ 12%',
      changeType: 'positive',
      accent: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      icon: AlertTriangle,
      label: 'Sem Estoque',
      value: stats.outOfStock,
      change: stats.lowStock > 0 ? `${stats.lowStock} baixo` : undefined,
      changeType: 'negative',
      accent: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      icon: Activity,
      label: 'Sistema',
      value: 'Online',
      change: 'Operacional',
      changeType: 'positive',
      accent: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
  ]

  const recentProducts = products.slice(-5).reverse()

  const quickActions = [
    {
      href: '/admin/produtos/novo',
      label: 'Novo Produto',
      icon: Plus,
      style: 'bg-primary text-white hover:bg-primary-dark',
    },
    {
      href: '/admin/blog',
      label: 'Novo Post',
      icon: FileText,
      style:
        'border border-stone-200/60 bg-white text-stone-700 hover:border-stone-300',
    },
    {
      href: '/admin/midia',
      label: 'Upload Mídia',
      icon: Upload,
      style:
        'border border-stone-200/60 bg-white text-stone-700 hover:border-stone-300',
    },
    {
      href: '/admin/customizacao',
      label: 'Cores & Tema',
      icon: Palette,
      style:
        'border border-stone-200/60 bg-white text-stone-700 hover:border-stone-300',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
            Visão Geral
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
            Bom dia, {user?.username}
          </h1>
        </div>
        <p className="hidden text-[13px] text-stone-400 lg:block">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Alert: stock warning */}
      {stats.outOfStock > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200/60 bg-amber-50/50 px-5 py-4">
          <AlertTriangle
            size={18}
            className="mt-0.5 flex-shrink-0 text-amber-500"
          />
          <div>
            <p className="text-[13px] font-semibold text-amber-800">
              {stats.outOfStock} produto(s) sem estoque
            </p>
            <p className="mt-0.5 text-[12px] text-amber-600">
              {stats.lowStock > 0 &&
                `Além disso, ${stats.lowStock} produto(s) com estoque baixo. `}
              Verifique a reposição.
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
          Ações Rápidas
        </p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-[13px] font-semibold transition-all ${action.style}`}
              >
                <Icon size={16} />
                {action.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Recent Products — 3 columns */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-stone-200/60 bg-white">
            <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
              <h2 className="text-[14px] font-bold text-stone-800">
                Últimos Produtos
              </h2>
              <Link
                href="/admin/produtos"
                className="flex items-center gap-1 text-[12px] font-semibold text-primary hover:text-primary-dark"
              >
                Ver todos
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-stone-100">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-stone-50/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-stone-800">
                        {product.name}
                      </p>
                      <span className="mt-0.5 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        {product.category}
                      </span>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-[13px] font-bold text-stone-800">
                        {formatCurrency(product.price)}
                      </p>
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="text-[11px] font-semibold text-primary hover:text-primary-dark"
                      >
                        Editar →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-12 text-center">
                  <Package size={32} className="mb-3 text-stone-300" />
                  <p className="text-[13px] text-stone-400">
                    Nenhum produto cadastrado
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary — 2 columns */}
        <div className="space-y-4 lg:col-span-2">
          {/* Blog summary */}
          <div className="rounded-xl border border-stone-200/60 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                  Posts no Blog
                </p>
                <p className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
                  {blogPosts.length}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <FileText size={20} className="text-orange-500" />
              </div>
            </div>
          </div>

          {/* Suppliers summary */}
          <div className="rounded-xl border border-stone-200/60 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                  Fornecedores
                </p>
                <p className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
                  {suppliers.length}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                <Users size={20} className="text-violet-500" />
              </div>
            </div>
          </div>

          {/* Stock items */}
          <div className="rounded-xl border border-stone-200/60 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                  Itens em Estoque
                </p>
                <p className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Package size={20} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
