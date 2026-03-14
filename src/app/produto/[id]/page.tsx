'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/whatsapp'

export default function ProdutoDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id))
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Produto não encontrado
        </h1>
        <Link
          href="/loja"
          className="font-bold text-primary hover:text-secondary"
        >
          ← Voltar para Loja
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert(`${quantity}x ${product.name} adicionado ao carrinho!`)
  }

  // Produtos relacionados
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-gray-600">
        <Link href="/loja" className="hover:text-primary">
          Loja
        </Link>
        {' > '}
        <Link
          href={`/loja?category=${product.category}`}
          className="hover:text-primary"
        >
          {product.category}
        </Link>
        {' > '}
        <span className="font-bold text-primary">{product.name}</span>
      </div>

      {/* Produto */}
      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Imagem */}
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Informações */}
        <div>
          <div className="mb-4">
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-primary">
              {product.category}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="mb-4 flex items-center gap-2">
              <div className="text-yellow-400">
                {'★'.repeat(Math.round(product.rating))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>
          )}

          <p className="mb-6 text-lg text-gray-600">
            {product.detailedDescription || product.description}
          </p>

          {/* Especificações */}
          <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-6">
            {product.origin && (
              <div>
                <span className="font-bold text-gray-800">Origem:</span>
                <span className="text-gray-600"> {product.origin}</span>
              </div>
            )}
            {product.weight && (
              <div>
                <span className="font-bold text-gray-800">Peso:</span>
                <span className="text-gray-600"> {product.weight}</span>
              </div>
            )}
            {product.yield && (
              <div>
                <span className="font-bold text-gray-800">Produtividade:</span>
                <span className="text-gray-600"> {product.yield}</span>
              </div>
            )}
            {product.material && (
              <div>
                <span className="font-bold text-gray-800">Material:</span>
                <span className="text-gray-600"> {product.material}</span>
              </div>
            )}
            <div>
              <span className="font-bold text-gray-800">Disponibilidade:</span>
              <span className="text-gray-600">
                {' '}
                {product.stock > 0
                  ? `${product.stock} unidades em estoque`
                  : 'Fora de estoque'}
              </span>
            </div>
          </div>

          {/* Preço e Compra */}
          <div className="border-t-2 border-gray-200 pt-6">
            <div className="mb-6 text-4xl font-bold text-primary">
              {formatCurrency(product.price)}
            </div>

            {product.stock > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-bold text-gray-800">Quantidade:</label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 transition-colors hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 font-bold">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-4 py-2 transition-colors hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-lg bg-primary py-4 text-lg font-bold text-white transition-colors hover:bg-secondary"
                >
                  🛒 Adicionar ao Carrinho
                </button>

                <a
                  href="https://wa.me/5543999998888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-green-500 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-green-600"
                >
                  💬 Comprar via WhatsApp
                </a>
              </div>
            ) : (
              <div className="rounded-lg bg-red-100 p-4 text-center font-bold text-red-700">
                Produto fora de estoque
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/produto/${p.id}`}>
                <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 font-bold text-gray-800">
                      {p.name}
                    </h3>
                    <p className="font-bold text-primary">
                      {formatCurrency(p.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
