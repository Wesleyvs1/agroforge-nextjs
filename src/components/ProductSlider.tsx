'use client'

import { useRef, useState, useEffect, memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  description: string
  stock: number
  rating?: number
  reviews?: number
  badge?: string
}

export default memo(function ProductSlider({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScroll, 400)
    }
  }, [checkScroll])

  const productChunks = useMemo(() => {
    const chunks = []
    for (let i = 0; i < products.length; i += 2) {
      chunks.push(products.slice(i, i + 2))
    }
    return chunks
  }, [products])

  return (
    <div className="relative w-full">
      <div className="mb-6 flex items-end justify-between px-2">
        <div>
          <h2 className="font-heading text-3xl font-extrabold text-stone-900 md:text-4xl">
            Mais <span className="text-primary">Vendidos</span>
          </h2>
          <p className="mt-2 font-medium text-stone-500">
            Os produtos favoritos da nossa comunidade.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex animate-pulse items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary/80 md:hidden">
            Deslize
            <ChevronRight size={16} />
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                canScrollLeft
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'cursor-not-allowed border-stone-200 text-stone-300'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                canScrollRight
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'cursor-not-allowed border-stone-200 text-stone-300'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-2 md:gap-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {productChunks.map((chunk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1 }}
              className="flex min-w-[280px] max-w-[280px] shrink-0 snap-start flex-col gap-4 sm:min-w-[300px] sm:max-w-[300px] sm:gap-5"
            >
              {chunk.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
})
