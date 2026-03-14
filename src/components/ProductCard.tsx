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
  image: string
  description: string
  stock: number
  rating?: number
  reviews?: number
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
    alert(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <Link href={`/produto/${product.id}`}>
      <div className="flex h-full transform cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Imagem */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          {product.stock < 10 && (
            <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              Últimas unidades
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex flex-1 flex-col p-4">
          {/* Categoria e Rating */}
          <div className="mb-2 flex items-start justify-between">
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-primary">
              {product.category}
            </span>
            {product.rating && (
              <div className="text-sm text-yellow-400">
                ★ {product.rating} ({product.reviews} reviews)
              </div>
            )}
          </div>

          {/* Nome */}
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-800 hover:text-primary">
            {product.name}
          </h3>

          {/* Descrição */}
          <p className="mb-4 line-clamp-2 flex-1 text-xs text-gray-600">
            {product.description}
          </p>

          {/* Preço */}
          <div className="mb-3 text-2xl font-bold text-primary">
            {formatCurrency(product.price)}
          </div>

          {/* Botão */}
          <button
            onClick={handleAddToCart}
            className="w-full rounded bg-gray-100 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-primary hover:text-white"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </Link>
  )
}
