'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  {
    emoji: '🐶',
    name: 'Ração Cães e Gatos',
    count: 'RAÇÃO CÃES E GATOS',
    href: '/loja?categoria=RAÇÃO%20CÃES%20E%20GATOS#catalogo',
  },
  {
    emoji: '🍞',
    name: 'Coloniais',
    count: 'PRODUTOS COLONIAIS',
    href: '/loja?categoria=PRODUTOS%20COLONIAIS#catalogo',
  },
  {
    emoji: '💊',
    name: 'Medicamentos',
    count: 'MEDICAMENTOS',
    href: '/loja?categoria=MEDICAMENTOS#catalogo',
  },
  {
    emoji: '🔧',
    name: 'Ferramentas',
    count: 'FERRAMENTAS',
    href: '/loja?categoria=FERRAMENTAS#catalogo',
  },
  {
    emoji: '🥣',
    name: 'Acessórios Pet',
    count: 'ACESSÓRIOS PARA PET',
    href: '/loja?categoria=ACESS%C3%93RIOS%20PARA%20PET#catalogo',
  },
  {
    emoji: '🌱',
    name: 'Jardinagem',
    count: 'JARDINAGEM',
    href: '/loja?categoria=JARDINAGEM#catalogo',
  },
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
    <section
      id="colecoes"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 md:py-20"
    >
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
        className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:gap-8"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={itemVariants}>
            <Link
              href={cat.href}
              className="group flex flex-col items-center gap-3 text-center"
            >
              {/* Circular thumb — matching reference style */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/10 bg-primary/[0.04] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:bg-primary/[0.08] group-hover:shadow-xl group-hover:shadow-primary/10 md:h-28 md:w-28 lg:h-32 lg:w-32">
                <span className="text-4xl transition-transform duration-500 group-hover:scale-125 md:text-5xl">
                  {cat.emoji}
                </span>
              </div>
              <div>
                <h6 className="font-heading text-sm font-bold text-stone-800 transition-colors group-hover:text-primary md:text-base">
                  {cat.name}
                </h6>
                <span className="mt-0.5 block text-xs text-stone-400">
                  {cat.count}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
