'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { sendToWhatsApp, formatCurrency } from '@/lib/whatsapp'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } =
    useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Seu Carrinho</h2>
              <p className="text-sm text-gray-500">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}{' '}
                selecionados
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              ✕
            </button>
          </div>

          {/* Items List */}
          <div className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 text-6xl opacity-20">🛒</div>
                <h3 className="text-lg font-medium text-gray-900">
                  O carrinho está vazio
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Parece que você ainda não adicionou nenhum produto.
                </p>
                <Link
                  href="/loja"
                  onClick={onClose}
                  className="mt-8 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-secondary hover:shadow-lg"
                >
                  Ir para a Loja
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item: any) => (
                  <div key={item.id} className="group flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between gap-2">
                          <h4 className="line-clamp-1 font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="font-bold text-primary">
                          {formatCurrency(item.price)}
                        </p>

                        <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-primary"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-primary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Estimado</span>
                  <span className="text-primary">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sendToWhatsApp(cart)
                  onClose()
                }}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary py-4 font-bold text-white transition-all hover:bg-secondary hover:shadow-xl"
              >
                <span className="relative z-10">Finalizar via WhatsApp</span>
                <span className="relative z-10 text-xl">💬</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Você será redirecionado para o WhatsApp para confirmar o pedido.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
