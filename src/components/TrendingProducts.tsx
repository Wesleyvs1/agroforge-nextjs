'use client'

import { useAdminData } from '@/context/AdminDataContext'
import CategorySidebar from './CategorySidebar'
import ProductSlider from './ProductSlider'

export default function TrendingProducts() {
  const { products } = useAdminData()

  // Selecionar os primeiros 10 produtos para os mais vendidos
  const bestSellers = products.slice(0, 10)

  return (
    <section className="relative overflow-hidden bg-stone-50 py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 -mr-40 -mt-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left Column: Category Sidebar (3/12 usually, or fixed width) */}
          <div className="w-full shrink-0 lg:w-[320px]">
            <CategorySidebar />
          </div>

          {/* Right Column: Products Slider (9/12) */}
          <div className="w-full overflow-hidden lg:flex-1">
            <ProductSlider products={bestSellers} />
          </div>
        </div>
      </div>
    </section>
  )
}
