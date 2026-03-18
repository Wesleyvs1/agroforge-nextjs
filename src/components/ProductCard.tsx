'use client'

import Link from 'next/link'
import Image from 'next/image'
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
    alert(`${product.name} adicionado ao carrinho!`)
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0

  return (
    <Link href={`/produto/${product.id}`}>
      <div className="group flex h-full transform cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Imagem */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badge — Café Moído na Hora */}
          {product.badge && (
            <div className="absolute left-2 top-2 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-md">
              {product.badge}
            </div>
          )}

          {/* Badge — Desconto */}
          {discount > 0 && (
            <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
              -{discount}%
            </div>
          )}

          {/* Últimas unidades */}
          {product.stock < 10 && (
            <div className="absolute bottom-2 left-2 z-10 rounded bg-red-600/90 px-2 py-0.5 text-[10px] font-semibold text-white">
              Últimas unidades
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex flex-1 flex-col p-4">
          {/* Categoria */}
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {product.category}
          </span>

          {/* Nome */}
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-800 transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="mb-3 text-xs text-gray-500">
              <span className="text-yellow-400">★</span> {product.rating}{' '}
              <span className="text-gray-400">({product.reviews})</span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Preço */}
          <div className="mb-3">
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </div>
            )}
            <div className="text-2xl font-extrabold text-primary">
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={handleAddToCart}
            className="hover:bg-secondary w-full rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:shadow-lg"
          >
            Comprar Agora
          </button>
        </div>
      </div>
    </Link>
  )
}
