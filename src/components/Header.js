'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Cart from '@/components/Cart'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems } = useCart()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/loja?q=${encodeURIComponent(searchQuery.trim())}#catalogo`)
    }
  }, [searchQuery, router])

  const navLinks = useMemo(() => [
    { href: '/', label: 'Home' },
    { href: '/loja', label: 'Loja' },
    { href: '/blog', label: 'Blog' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/#localizacao', label: 'Localização' },
    { href: '/contato', label: 'Contato' },
  ], [])

  return (
    <>
      {/* Navbar Principal */}
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center transition-transform hover:scale-[1.02]"
            >
              <Image
                src="/images/logo.png"
                alt="AgroForge Logo"
                width={300}
                height={100}
                className="h-16 w-auto object-contain md:h-24"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Nav Desktop */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative py-1 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-stone-600 hover:text-primary'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="hidden items-center rounded-full bg-gray-100 px-3 py-1.5 transition-shadow focus-within:ring-1 focus-within:ring-primary/30 lg:flex"
              >
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="flex items-center text-gray-400 transition-colors hover:text-primary"
                  aria-label="Buscar produtos"
                >
                  <span className="text-lg">🔍</span>
                </button>
              </form>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 transition-colors hover:text-primary"
              >
                <span className="text-xl">🛒</span>
                {getTotalItems() > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Menu Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden"
              >
                <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-gray-50 p-6 md:hidden">
            <div className="mb-6 flex justify-center border-b border-gray-200 pb-6">
              <Image
                src="/images/logo.png"
                alt="AgroForge"
                width={160}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 font-bold uppercase tracking-wider ${
                    isActive
                      ? 'text-primary'
                      : 'text-stone-600 hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
