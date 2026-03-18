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
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
    <div className="bg-surface/30 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Catálogo AgroForge</span>
            <h1 className="section-title text-5xl md:text-6xl mb-6">Nossa Curadoria</h1>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>
        </header>

        {/* Layout da Loja */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Sidebar de Filtros */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Barra de Busca Premium */}
              <div className="glass-morphism rounded-3xl p-6 shadow-xl shadow-stone-200/50">
                <h3 className="flex items-center gap-2 mb-4 font-heading font-bold text-primary-dark">
                  <Search size={18} />
                  <span>Pesquisar</span>
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="O que você procura?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border-none bg-stone-100 px-5 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Categorias em Glassmorphism */}
              <div className="glass-morphism rounded-3xl p-6 shadow-xl shadow-stone-200/50">
                <h3 className="flex items-center gap-2 mb-6 font-heading font-bold text-primary-dark">
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
                        <div className="absolute inset-y-0 left-0 w-1 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform" />
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
              <span className="text-sm font-medium text-stone-500 tracking-wider uppercase">
                {filteredProducts.length} itens encontrados
              </span>
              <div className="h-px flex-1 bg-stone-200 mx-6 hidden md:block" />
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-24 glass-morphism rounded-3xl text-center"
                >
                  <div className="bg-stone-100 p-6 rounded-full mb-6 text-stone-400">
                    <PackageSearch size={48} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-stone-800 mb-2">Sem resultados</h3>
                  <p className="text-stone-500 max-w-xs">
                    Não encontramos nada para sua busca. Tente ajustar os filtros ou buscar outro termo.
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
      <section className="bg-stone-900 py-24 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
          <span className="text-primary-light font-bold tracking-[0.3em] uppercase mb-4 block">Atendimento Personalizado</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-8">
            Busca algo específico para sua produção?
          </h2>
          <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para ajudar você a encontrar 
            as melhores soluções técnicas para o seu negócio agropecuário.
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
