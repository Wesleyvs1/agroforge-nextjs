# 💻 EXEMPLOS DE CÓDIGO - IMPLEMENTAÇÃO DAS MELHORIAS

## 1️⃣ COMPONENTES BASE

### Button.tsx

```tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-200 flex items-center gap-2'

  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'cursor-not-allowed' : ''
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="animate-spin">⏳</span> : icon}
      {children}
    </button>
  )
}
```

### StatCard.tsx

```tsx
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  color: 'blue' | 'green' | 'yellow' | 'red'
}

const colorMap = {
  blue: 'from-blue-500 to-blue-600 bg-blue-50',
  green: 'from-green-500 to-green-600 bg-green-50',
  yellow: 'from-yellow-500 to-yellow-600 bg-yellow-50',
  red: 'from-red-500 to-red-600 bg-red-50',
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg">
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorMap[color]} opacity-0 transition-opacity group-hover:opacity-5`}
      />

      <div className="relative space-y-4">
        {/* Icon */}
        <div className={`inline-flex rounded-lg bg-${color}-50 p-3`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

          {/* Trend */}
          {trend && (
            <div
              className={`mt-2 flex items-center gap-1 text-sm font-medium ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
              <span>{trend.percentage}% este mês</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### Badge.tsx

```tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray'
  size?: 'sm' | 'md'
}

const variants = {
  primary: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-700',
}

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'sm',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  )
}
```

### Card.tsx

```tsx
interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  hoverable?: boolean
}

export default function Card({
  children,
  header,
  footer,
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-sm ${
        hoverable ? 'transition-shadow hover:shadow-lg' : ''
      }`}
    >
      {header && (
        <div className="border-b border-gray-200 px-6 py-4">{header}</div>
      )}

      <div className="p-6">{children}</div>

      {footer && (
        <div className="border-t border-gray-200 px-6 py-4">{footer}</div>
      )}
    </div>
  )
}
```

---

## 2️⃣ TABELA MELHORADA

### Table.tsx

```tsx
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import React from 'react'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  hoverable?: boolean
  striped?: boolean
}

export default function Table<T extends { id: number | string }>({
  data,
  columns,
  onSort,
  sortKey,
  sortDirection,
  hoverable = true,
  striped = true,
}: TableProps<T>) {
  const handleSort = (key: string) => {
    if (!onSort) return

    let direction: 'asc' | 'desc' = 'asc'
    if (sortKey === key && sortDirection === 'asc') {
      direction = 'desc'
    }
    onSort(key, direction)
  }

  const SortIcon = ({ column }: { column: Column<T> }) => {
    if (!column.sortable || !onSort) return null

    if (sortKey !== column.key) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />
    }

    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-600" />
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort(column.key)}
                  disabled={!column.sortable}
                  className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 disabled:cursor-default"
                >
                  {column.label}
                  <SortIcon column={column} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-gray-500"
              >
                <div className="mb-2 text-4xl">📭</div>
                <p>Nenhum item encontrado</p>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b transition-colors ${
                  hoverable ? 'hover:bg-gray-50' : ''
                } ${striped && idx % 2 === 1 ? 'bg-gray-50' : ''}`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render
                      ? column.render((row as any)[column.key], row)
                      : (row as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
```

---

## 3️⃣ PÁGINA DASHBOARD MELHORADA

### page.tsx (Dashboard Home Redesenhado)

```tsx
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Package,
  TrendingUp,
  Users,
  FileText,
  Activity,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { useAdmin } from '@/context/AdminContext'
import { formatCurrency } from '@/lib/whatsapp'
import StatCard from '@/components/admin/StatCard'
import Card from '@/components/admin/Card'
import Badge from '@/components/admin/Badge'
import Button from '@/components/admin/Button'

export default function DashboardHome() {
  const { products, blogPosts, suppliers } = useAdminData()
  const { user } = useAdmin()

  // Memoizar cálculos pesados
  const stats = useMemo(() => {
    const lowStock = products.filter((p: any) => p.stock > 0 && p.stock <= 5)
    return {
      total: products.length,
      categories: new Set(products.map((p: any) => p.category)).size,
      stockValue: products.reduce(
        (sum: number, p: any) => sum + p.price * p.stock,
        0,
      ),
      outOfStock: products.filter((p: any) => p.stock === 0).length,
      lowStock: lowStock.length,
    }
  }, [products])

  const statCards = [
    {
      icon: Package,
      label: 'Total de Produtos',
      value: stats.total,
      color: 'blue' as const,
      trend: { direction: 'up' as const, percentage: 5 },
    },
    {
      icon: TrendingUp,
      label: 'Valor em Estoque',
      value: formatCurrency(stats.stockValue),
      color: 'green' as const,
      trend: { direction: 'up' as const, percentage: 12 },
    },
    {
      icon: AlertCircle,
      label: 'Sem Estoque',
      value: stats.outOfStock,
      color: 'red' as const,
    },
    {
      icon: Activity,
      label: 'Status do Sistema',
      value: 'Online',
      color: 'green' as const,
    },
  ]

  const recentProducts = products.slice(-5).reverse()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Bem-vindo, <span className="text-green-600">{user?.username}</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Aqui está um resumo do seu negócio AgroForge
          </p>
        </div>
        <div className="hidden text-right lg:block">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Alerts */}
      {stats.outOfStock > 0 && (
        <div className="flex gap-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Produtos sem estoque</p>
            <p className="text-sm">
              {stats.outOfStock} item(ns) necessita(m) reposição urgente
            </p>
          </div>
        </div>
      )}

      {/* Recent Products & Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Products */}
        <div className="lg:col-span-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Produtos Recentes
                </h2>
                <Link
                  href="/admin/produtos"
                  className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            }
          >
            <div className="space-y-3">
              {recentProducts.length > 0 ? (
                recentProducts.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-green-200 hover:bg-green-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <div className="mt-1 flex gap-2">
                        <Badge variant="primary" size="sm">
                          {product.category}
                        </Badge>
                        <Badge
                          variant={product.stock > 0 ? 'success' : 'error'}
                          size="sm"
                        >
                          {product.stock > 0
                            ? `${product.stock} un.`
                            : 'Sem estoque'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(product.price)}
                      </p>
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="text-xs font-semibold text-green-600 hover:text-green-700"
                      >
                        Editar →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 py-8 text-center">
                  <Package className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    Nenhum produto cadastrado
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card>
            <h2 className="mb-4 text-lg font-bold text-gray-900">Resumo</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Posts no Blog
                  </p>
                  <FileText className="h-5 w-5 text-orange-500 opacity-20" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {blogPosts.length}
                </p>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Fornecedores
                  </p>
                  <Users className="h-5 w-5 text-purple-500 opacity-20" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {suppliers.length}
                </p>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Categorias
                  </p>
                  <TrendingUp className="h-5 w-5 text-green-500 opacity-20" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.categories}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card
        header={
          <h2 className="text-lg font-bold text-gray-900">Ações Rápidas</h2>
        }
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/produtos/novo">
            <Button className="w-full" variant="primary">
              <Package className="h-4 w-4" />
              Novo Produto
            </Button>
          </Link>
          <Link href="/admin/blog">
            <Button className="w-full" variant="secondary">
              <FileText className="h-4 w-4" />
              Novo Post
            </Button>
          </Link>
          <Link href="/admin/midia">
            <Button className="w-full" variant="secondary">
              📸 Upload
            </Button>
          </Link>
          <Link href="/admin/customizacao">
            <Button className="w-full" variant="secondary">
              🎨 Cores
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
```

---

## 4️⃣ GRÁFICO COM RECHARTS

### LineChart.tsx

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartDataPoint {
  name: string
  value: number
}

interface LineChartProps {
  data: ChartDataPoint[]
  title?: string
  color?: string
}

export default function Chart({
  data,
  title = 'Gráfico',
  color = '#27ae60',
}: LineChartProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {title && (
        <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

## 5️⃣ MODAL MELHORADO

### Modal.tsx

```tsx
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 ${sizes[size]} w-full rounded-xl bg-white shadow-xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t border-gray-200 p-6">{footer}</div>}
      </div>
    </div>
  )
}
```

---

## 6️⃣ TOAST NOTIFICATION

### Toast.tsx

```tsx
import { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'bg-green-50 text-green-700 border-green-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 5000,
}: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="animate-slideIn fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${colors[type]}`}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-current opacity-50 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
```

---

## 7️⃣ TAILWIND CONFIG ATUALIZADO

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#27ae60',
          600: '#229954',
          700: '#1e8449',
          900: '#1a472a',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
```

---

## 📝 NOTAS DE IMPLEMENTAÇÃO

1. **Importe os ícones do Lucide**: `npm install lucide-react`
2. **Use TypeScript** para type-safety
3. **Memoize dados pesados** com `useMemo`
4. **Teste responsividade** em mobile/tablet/desktop
5. **Garanta acessibilidade** (ARIA labels, keyboard nav)
6. **Documente componentes** com comentários
7. **Reutilize componentes** em todas as páginas

---

Estes exemplos servem como base para implementar as melhorias de design! 🚀
