'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Minus, Plus, MessageCircle } from 'lucide-react'
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Sidebar Premium */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-surface shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 p-8">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-primary-dark">Seu Pedido</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-all hover:bg-stone-200 hover:text-dark"
              >
                <X size={20} className="transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="mb-8 p-8 bg-white/50 rounded-full glass-morphism">
                    <ShoppingBag size={48} className="text-stone-300" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-stone-800">
                    Sacola Vazia
                  </h3>
                  <p className="mt-4 text-stone-500 leading-relaxed mb-10 max-w-[240px]">
                    Sua jornada de excelência começa ao adicionar seu primeiro item.
                  </p>
                  <Link
                    href="/loja"
                    onClick={onClose}
                    className="premium-button text-sm !px-10"
                  >
                    Explorar Produtos
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item: any) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-5 items-start"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-stone-100 border border-stone-200 shadow-inner">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col h-24 justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="line-clamp-1 font-heading font-bold text-stone-900 pr-2">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="font-heading font-extrabold text-primary">
                            {formatCurrency(item.price)}
                          </p>

                          <div className="flex items-center rounded-xl bg-white/50 border border-stone-200 overflow-hidden shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-primary transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-primary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Premium Section */}
            {cart.length > 0 && (
              <div className="bg-stone-100/80 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-stone-200">
                <div className="mb-8 space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-heading font-extrabold text-stone-800 text-lg">Investimento Total</span>
                    <span className="text-3xl font-heading font-extrabold text-primary tracking-tighter">
                      {formatCurrency(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sendToWhatsApp(cart)
                    onClose()
                  }}
                  className="accent-button w-full !py-5 flex items-center justify-center gap-3"
                >
                  <span className="uppercase tracking-widest font-bold text-sm">Finalizar via WhatsApp</span>
                  <MessageCircle size={20} />
                </button>

                <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Transação segura • AgroForge
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
