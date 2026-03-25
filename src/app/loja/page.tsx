'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  PackageSearch,
  ChevronRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import ProductCard from '@/components/ProductCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Loja() {
  const { products } = useAdminData()
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
    <div className="bg-surface/50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark py-28 md:py-36">
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary-light">
            Catálogo AgroForge
          </span>
          <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Nossa
            <br />
            <span className="text-accent-light">Curadoria</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300">
            Produtos selecionados com rigor para atender as necessidades do
            produtor moderno.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-morphism rounded-3xl p-6 shadow-xl shadow-stone-200/50"
              >
                <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-primary-dark">
                  <Search size={16} />
                  <span>Pesquisar</span>
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="O que você procura?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border-2 border-stone-200 bg-white px-5 py-3 text-sm transition-all duration-200 placeholder:text-stone-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-morphism rounded-3xl p-6 shadow-xl shadow-stone-200/50"
              >
                <h3 className="mb-6 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-primary-dark">
                  <SlidersHorizontal size={16} />
                  <span>Categorias</span>
                </h3>
                <div className="flex flex-col gap-1.5">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category
                    const count =
                      category === 'Todos'
                        ? products.length
                        : products.filter((p) => p.category === category).length

                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`group relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-stone-600 hover:bg-stone-100 hover:text-primary'
                        }`}
                      >
                        <span className="relative z-10">{category}</span>
                        <span
                          className={`relative z-10 rounded-full px-2 py-0.5 text-xs font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-stone-100 text-stone-500 group-hover:bg-primary/10 group-hover:text-primary'
                          }`}
                        >
                          {count}
                        </span>
                        {!isActive && (
                          <div className="absolute inset-y-0 left-0 w-1 -translate-x-full transform bg-primary transition-transform duration-300 group-hover:translate-x-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Quick tip */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-3xl bg-gradient-to-br from-primary-dark to-primary p-6 text-white shadow-xl shadow-primary/10"
              >
                <div className="mb-3 inline-flex rounded-xl bg-white/10 p-2.5">
                  <Sparkles size={18} />
                </div>
                <h4 className="mb-2 font-heading text-sm font-bold">
                  Precisa de ajuda?
                </h4>
                <p className="mb-4 text-xs leading-relaxed text-white/70">
                  Nossa equipe está pronta para ajudar você a encontrar o produto
                  ideal.
                </p>
                <a
                  href="https://wa.me/5541991957593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2 text-xs font-bold transition-colors hover:bg-white/25"
                >
                  <MessageCircle size={12} />
                  Falar com especialista
                </a>
              </motion.div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-stone-500">
                  {filteredProducts.length} itens encontrados
                </span>
                {selectedCategory !== 'Todos' && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {selectedCategory}
                  </span>
                )}
              </div>
              <div className="hidden h-px flex-1 bg-stone-200 md:mx-6 md:block" />
            </motion.div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-morphism flex flex-col items-center justify-center rounded-3xl py-28 text-center shadow-lg shadow-stone-200/50"
                >
                  <div className="mb-6 rounded-2xl bg-stone-100 p-6 text-stone-400">
                    <PackageSearch size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-heading text-2xl font-bold text-stone-800">
                    Sem resultados
                  </h3>
                  <p className="mb-6 max-w-xs text-stone-500">
                    Não encontramos nada para sua busca. Tente ajustar os filtros
                    ou buscar outro termo.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('Todos')
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Limpar filtros
                    <ChevronRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedCategory + searchTerm}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
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
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden bg-stone-900 py-24">
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
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
            href="https://wa.me/5541991957593"
            target="_blank"
            rel="noopener noreferrer"
            className="accent-button inline-flex items-center gap-3"
          >
            <span>Consultar Especialista</span>
            <MessageCircle size={18} />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
