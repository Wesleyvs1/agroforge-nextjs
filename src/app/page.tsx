'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import HeroCarousel from '@/components/HeroCarousel'
import QuickCategories from '@/components/QuickCategories'
import CoffeeHighlight from '@/components/CoffeeHighlight'
import CombineSaveBanners from '@/components/CombineSaveBanners'
import VideoBanner from '@/components/VideoBanner'
import WhyAgroForge from '@/components/WhyAgroForge'
import ExpertTips from '@/components/ExpertTips'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Home() {
  // 8 produtos mais vendidos
  const bestSellers = products.slice(0, 8)

  return (
    <div className="bg-surface/50">
      {/* 1. Carrossel Hero */}
      <HeroCarousel />

      {/* 2. Coleções (Categorias rápidas) */}
      <QuickCategories />

      {/* 3. Café Moído na Hora — Banner Destaque */}
      <CoffeeHighlight />

      {/* 4. Mais Vendidos */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-subtitle">Seleção Exclusiva</span>
          <h2 className="section-title">Os Mais Vendidos</h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bestSellers.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/loja" className="premium-button">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* 4.5 Seção Dinâmica - Combine e Economize */}
      <div className="bg-stone-100/50 py-16">
        <CombineSaveBanners />
      </div>

      {/* 5. Veja em Ação — Video Banner */}
      <VideoBanner />

      {/* 6. Por que AgroForge? */}
      <WhyAgroForge />

      {/* 7. Dicas de Especialistas */}
      <ExpertTips />
    </div>
  )
}
