'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Cart from '@/components/Cart'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/loja', label: 'Loja' },
    { href: '/fornecedores', label: 'Fornecedores' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ]

  return (
    <>
      {/* Navbar Principal */}
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-primary">
              🌿 AgroForge
            </Link>

            {/* Nav Desktop */}
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden items-center rounded-full bg-gray-100 px-3 py-1.5 lg:flex">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-32 bg-transparent text-sm outline-none"
                />
                <span className="text-gray-400">🔍</span>
              </div>

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
          <div className="border-t border-gray-200 bg-gray-50 p-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
