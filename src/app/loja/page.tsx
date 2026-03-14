'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function Loja() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['Todos', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === 'Todos' || product.category === selectedCategory
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Nossa Loja</h1>
        <p className="text-lg text-gray-600">
          Explore nossa seleção completa de produtos agropecuários
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          <div className="sticky top-20 rounded-lg bg-white p-6 shadow-md">
            {/* Busca */}
            <div className="mb-6">
              <h3 className="mb-3 font-bold text-gray-800">Buscar</h3>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Categorias */}
            <div>
              <h3 className="mb-3 font-bold text-gray-800">Categorias</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary font-bold text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="md:col-span-3">
          {/* Contagem */}
          <div className="mb-6 text-gray-600">
            Mostrando <strong>{filteredProducts.length}</strong> produto(s)
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-lg bg-white p-12 text-center shadow-md">
              <p className="text-lg text-gray-600">
                Nenhum produto encontrado. Tente outra busca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="rounded-lg bg-primary py-12 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">
          Não encontrou o que procura?
        </h2>
        <p className="mb-6 text-green-100">
          Fale conosco! Temos mais produtos e posso ajudar você a encontrar
          exatamente o que precisa.
        </p>
        <a
          href="https://wa.me/5543999998888"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-primary transition-colors hover:bg-gray-100"
        >
          💬 Fale Conosco no WhatsApp
        </a>
      </section>
    </div>
  )
}
