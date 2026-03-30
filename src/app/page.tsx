'use client'

import { useAdminData } from '@/context/AdminDataContext'
import HeroCarousel from '@/components/HeroCarousel'
import QuickCategories from '@/components/QuickCategories'
import TrendingProducts from '@/components/TrendingProducts'
import CoffeeHighlight from '@/components/CoffeeHighlight'
import WhyAgroForge from '@/components/WhyAgroForge'
import LocationSection from '@/components/LocationSection'
import ExpertTips from '@/components/ExpertTips'

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
