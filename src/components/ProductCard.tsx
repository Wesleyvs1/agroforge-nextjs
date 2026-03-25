'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/whatsapp'

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  description: string
  stock: number
  rating?: number
  reviews?: number
  badge?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0

  return (
    <Link href={`/produto/${product.id}`}>
      <div className="glass-morphism group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl shadow-lg shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-stone-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary/20">
              <span className="text-[10px]">☕</span>
              {product.badge}
            </div>
          )}

          {/* Discount */}
          {discount > 0 && (
            <div className="absolute right-3 top-3 z-10 rounded-xl bg-accent px-2.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent/20">
              -{discount}%
            </div>
          )}

          {/* Stock warning */}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-stone-900/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              Últimas {product.stock} unidades
            </div>
          )}

          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 z-10 flex items-center justify-center rounded-xl p-2.5 shadow-lg transition-all duration-300 ${
              added
                ? 'scale-110 bg-green-500 text-white'
                : 'translate-y-2 bg-white/90 text-stone-700 opacity-0 backdrop-blur-sm hover:bg-primary hover:text-white group-hover:translate-y-0 group-hover:opacity-100'
            }`}
          >
            {added ? <Check size={16} strokeWidth={3} /> : <ShoppingCart size={16} />}
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category */}
          <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="mb-2 line-clamp-2 font-heading text-sm font-bold leading-snug text-stone-800 transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="mb-3 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={
                      i < Math.round(product.rating!)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-stone-200 text-stone-200'
                    }
                  />
                ))}
              </div>
              <span className="text-[10px] font-medium text-stone-400">
                ({product.reviews})
              </span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          <div className="mb-4">
            {product.originalPrice && (
              <div className="text-xs font-medium text-stone-400 line-through">
                {formatCurrency(product.originalPrice)}
              </div>
            )}
            <div className="font-heading text-xl font-extrabold text-primary">
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]'
            }`}
          >
            {added ? (
              <>
                <Check size={14} strokeWidth={3} />
                Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                Comprar Agora
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
