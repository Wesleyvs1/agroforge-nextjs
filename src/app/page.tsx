'use client'

import { useAdminData } from '@/context/AdminDataContext'
import dynamic from 'next/dynamic'
import QuickCategories from '@/components/QuickCategories'
import WhyAgroForge from '@/components/WhyAgroForge'
import LocationSection from '@/components/LocationSection'
import ExpertTips from '@/components/ExpertTips'

// Dynamic imports para componentes pesados com loading
const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'), {
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="relative h-[460px] overflow-hidden rounded-3xl bg-stone-200 animate-pulse md:min-h-[480px]" />
    </div>
  ),
  ssr: true,
})

const TrendingProducts = dynamic(() => import('@/components/TrendingProducts'), {
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="h-96 animate-pulse rounded-3xl bg-stone-200" />
    </div>
  ),
  ssr: true,
})

const CoffeeHighlight = dynamic(() => import('@/components/CoffeeHighlight'), {
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="h-64 animate-pulse rounded-3xl bg-stone-200" />
    </div>
  ),
  ssr: true,
})

export default function Home() {
  const { products } = useAdminData()

  return (
    <div className="bg-surface/50">
      {/* 1. Carrossel Hero */}
      <HeroCarousel />

      {/* 2. Coleções (Categorias rápidas) */}
      <QuickCategories />

      {/* 3. Mais Vendidos — Seção Premium (Dynamic Slider) */}
      <TrendingProducts />

      {/* 4. Por que AgroForge? */}
      <WhyAgroForge />

      {/* 5. Café Moído na Hora — Banner Destaque */}
      <CoffeeHighlight />

      {/* 6. Nossa Localização */}
      <LocationSection />

      {/* 7. Dicas de Especialistas */}
      <ExpertTips />
    </div>
  )
}
