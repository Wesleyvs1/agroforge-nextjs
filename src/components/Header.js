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
      {/* Header Top */}
      <div className="hidden border-b border-gray-200 bg-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl justify-between px-4 py-3 text-sm text-gray-600">
          <div>
            <Link href="/sobre" className="mr-6 hover:text-primary">
              ℹ️ Sobre Nós
            </Link>
          </div>
          <div>
            <a href="tel:+5543999998888" className="hover:text-primary">
              📞 (43) 3526-7890
            </a>
          </div>
        </div>
      </div>

      {/* Navbar Principal */}
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-primary">
              AgroForge
            </Link>

            {/* Search Bar - Desktop */}
            <div className="mx-8 hidden flex-1 md:flex">
              <div className="flex w-full max-w-md rounded-lg bg-gray-100">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
                />
                <button className="px-4 text-primary hover:text-secondary">
                  🔍
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
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
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="mt-4 hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
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
