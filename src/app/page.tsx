'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import ProductCard from '@/components/ProductCard'
import HeroCarousel from '@/components/HeroCarousel'
import QuickCategories from '@/components/QuickCategories'
import CoffeeHighlight from '@/components/CoffeeHighlight'
import WhyAgroForge from '@/components/WhyAgroForge'
import ExpertTips from '@/components/ExpertTips'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
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

export default function Home() {
  const { products } = useAdminData()
  const bestSellers = products.slice(0, 8)

  return (
    <div className="bg-surface/50">
      {/* 1. Carrossel Hero */}
      <HeroCarousel />

      {/* 2. Coleções (Categorias rápidas) */}
      <QuickCategories />

      {/* 3. Mais Vendidos — Seção Premium */}
      <section className="relative overflow-hidden bg-primary-dark py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left"
          >
            <div>
              <span className="mb-3 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary-light">
                <Sparkles size={14} />
                Seleção Exclusiva
              </span>
              <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
                Os Mais{' '}
                <span className="text-accent-light">Vendidos</span>
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-accent md:mt-6" />
            </div>
            <Link
              href="/loja"
              className="group hidden items-center gap-2 text-sm font-semibold text-stone-300 transition-colors hover:text-white md:flex"
            >
              Ver catálogo completo
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {bestSellers.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:hidden"
          >
            <Link
              href="/loja"
              className="accent-button inline-flex items-center gap-2"
            >
              Ver Catálogo Completo
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. Por que AgroForge? */}
      <WhyAgroForge />

      {/* 5. Café Moído na Hora — Banner Destaque */}
      <CoffeeHighlight />

      {/* 6. Dicas de Especialistas */}
      <ExpertTips />
    </div>
  )
}
