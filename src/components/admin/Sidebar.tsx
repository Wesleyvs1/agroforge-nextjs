'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Palette,
  FileText,
  Handshake,
  BarChart3,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAdmin()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/produtos', label: 'Produtos', icon: Package },
    { href: '/admin/midia', label: 'Mídia', icon: ImageIcon },
    { href: '/admin/customizacao', label: 'Customização', icon: Palette },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/fornecedores', label: 'Fornecedores', icon: Handshake },
    { href: '/admin/relatorios', label: 'Relatórios', icon: BarChart3 },
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
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 text-white md:hidden"
      >
        {collapsed ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`${
          collapsed ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 flex h-screen w-[260px] flex-col border-r border-stone-200/60 bg-stone-950 text-white transition-transform md:relative md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
            <Leaf size={18} className="text-primary-light" />
          </div>
          <div>
            <h1 className="font-heading text-[15px] font-bold tracking-tight">
              AgroForge
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
              Painel Admin
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
            Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setCollapsed(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-white/[0.08] text-white'
                    : 'text-stone-400 hover:bg-white/[0.04] hover:text-stone-200'
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2 : 1.5}
                  className={
                    active
                      ? 'text-primary-light'
                      : 'text-stone-500 group-hover:text-stone-300'
                  }
                />
                {item.label}
                {active && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-light" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User area */}
        <div className="border-t border-white/[0.06] px-4 py-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-[11px] font-bold uppercase text-stone-300">
              {user?.username?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-stone-200">
                {user?.username}
              </p>
              <p className="text-[11px] text-stone-500">Administrador</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout()
              router.push('/admin/login')
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 text-[12px] font-semibold text-stone-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={14} />
            Encerrar sessão
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  )
}
