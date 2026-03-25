'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  { emoji: '🌾', name: 'Rações', href: '/loja' },
  { emoji: '🪢', name: 'Cabos', href: '/loja' },
  { emoji: '🍞', name: 'Coloniais', href: '/loja' },
  { emoji: '🎣', name: 'Pesca', href: '/loja' },
  { emoji: '🐴', name: 'Montaria', href: '/loja' },
  { emoji: '🔧', name: 'Ferramentas', href: '/loja' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function QuickCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <span className="section-subtitle">Explore por Categoria</span>
        <h2 className="section-title">Coleções</h2>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={itemVariants}>
            <Link
              href={cat.href}
              className="glass-morphism group flex flex-col items-center gap-4 rounded-2xl p-7 shadow-lg shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <span className="text-4xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                {cat.emoji}
              </span>
              <span className="font-heading text-sm font-bold text-stone-700 transition-colors group-hover:text-primary">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
