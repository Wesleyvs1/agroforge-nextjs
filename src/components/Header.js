'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { sendToWhatsApp, formatCurrency } from '@/lib/whatsapp'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } =
    useCart()

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
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 transition-colors hover:text-primary"
              >
                🛒
                {getTotalItems() > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Menu Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden"
              >
                ☰
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

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:relative md:bg-transparent md:bg-opacity-0">
          <div
            className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-white md:relative md:h-auto md:w-80 md:border-l md:border-gray-200 md:bg-white md:shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-4">
              <h2 className="text-lg font-bold">
                Carrinho ({getTotalItems()})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-2xl hover:text-primary md:hidden"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>Seu carrinho está vazio</p>
                <Link
                  href="/loja"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 block text-primary hover:text-secondary"
                >
                  Continuar comprando →
                </Link>
              </div>
            ) : (
              <>
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="mb-2 text-sm text-gray-600">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-gray-200 p-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      {formatCurrency(getTotalPrice())}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      sendToWhatsApp(cart)
                      setCartOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-secondary"
                  >
                    💬 Finalizar via WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
