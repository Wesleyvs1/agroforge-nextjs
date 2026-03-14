'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAdmin()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/produtos', label: 'Produtos', icon: '📦' },
    { href: '/admin/midia', label: 'Mídia', icon: '🖼️' },
    { href: '/admin/customizacao', label: 'Customização', icon: '🎨' },
    { href: '/admin/blog', label: 'Blog', icon: '📝' },
    { href: '/admin/fornecedores', label: 'Fornecedores', icon: '🤝' },
    { href: '/admin/relatorios', label: 'Relatórios', icon: '📈' },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-dark p-2 text-white md:hidden"
      >
        {collapsed ? '✕' : '☰'}
      </button>

      <aside
        className={`${
          collapsed ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 flex h-screen w-64 flex-col bg-dark text-white transition-transform md:relative md:translate-x-0`}
      >
        {/* Logo */}
        <div className="border-b border-secondary p-6">
          <h1 className="text-2xl font-bold">🌿 AgroForge</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setCollapsed(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-secondary hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="space-y-3 border-t border-secondary p-4">
          <div>
            <p className="text-xs text-gray-400">Logado como:</p>
            <p className="font-bold">{user?.username}</p>
          </div>
          <button
            onClick={() => {
              logout()
              router.push('/admin/login')
            }}
            className="w-full rounded-lg bg-red-600 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            🚪 Sair
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  )
}
