'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, PackageSearch } from 'lucide-react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

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
    <div className="min-h-screen bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Catálogo AgroForge</span>
            <h1 className="section-title mb-6 text-5xl md:text-6xl">
              Nossa Curadoria
            </h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-accent" />
          </motion.div>
        </header>

        {/* Layout da Loja */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Sidebar de Filtros */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Barra de Busca Premium */}
              <div className="glass-morphism rounded-3xl p-6 shadow-xl shadow-stone-200/50">
                <h3 className="mb-4 flex items-center gap-2 font-heading font-bold text-primary-dark">
                  <Search size={18} />
                  <span>Pesquisar</span>
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="O que você procura?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border-none bg-stone-100 px-5 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Categorias em Glassmorphism */}
              <div className="glass-morphism rounded-3xl p-6 shadow-xl shadow-stone-200/50">
                <h3 className="mb-6 flex items-center gap-2 font-heading font-bold text-primary-dark">
                  <SlidersHorizontal size={18} />
                  <span>Categorias</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group relative overflow-hidden rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'text-stone-600 hover:bg-stone-100 hover:text-primary'
                      }`}
                    >
                      <span className="relative z-10">{category}</span>
                      {selectedCategory !== category && (
                        <div className="absolute inset-y-0 left-0 w-1 -translate-x-full transform bg-primary transition-transform group-hover:translate-x-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid de Produtos */}
          <main className="lg:col-span-3">
            <div className="mb-8 flex items-center justify-between border-b border-stone-200 pb-4">
              <span className="text-sm font-medium uppercase tracking-wider text-stone-500">
                {filteredProducts.length} itens encontrados
              </span>
              <div className="mx-6 hidden h-px flex-1 bg-stone-200 md:block" />
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-morphism flex flex-col items-center justify-center rounded-3xl py-24 text-center"
                >
                  <div className="mb-6 rounded-full bg-stone-100 p-6 text-stone-400">
                    <PackageSearch size={48} />
                  </div>
                  <h3 className="mb-2 font-heading text-2xl font-bold text-stone-800">
                    Sem resultados
                  </h3>
                  <p className="max-w-xs text-stone-500">
                    Não encontramos nada para sua busca. Tente ajustar os
                    filtros ou buscar outro termo.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedCategory + searchTerm}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariants} layout>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Footer CTA Section */}
      <section className="relative mt-20 overflow-hidden bg-stone-900 py-24">
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="mb-4 block font-bold uppercase tracking-[0.3em] text-primary-light">
            Atendimento Personalizado
          </span>
          <h2 className="mb-8 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Busca algo específico para sua produção?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-400">
            Nossa equipe de especialistas está pronta para ajudar você a
            encontrar as melhores soluções técnicas para o seu negócio
            agropecuário.
          </p>
          <a
            href="https://wa.me/5543999998888"
            target="_blank"
            rel="noopener noreferrer"
            className="accent-button inline-flex items-center gap-3"
          >
            <span>Consultar Especialista</span>
            <span className="text-xl">💬</span>
          </a>
        </div>
      </section>
    </div>
  )
}
