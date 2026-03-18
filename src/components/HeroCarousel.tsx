'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Aroma Intenso, Tradição no Grão',
    subtitle:
      'Cafés especiais selecionados na origem para os paladares mais exigentes.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    cta: 'Navegar Grãos',
    href: '/loja',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Soluções para o Campo Moderno',
    subtitle:
      'Inovação e resistência em cada ferramenta para sua produtividade decolar.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop',
    cta: 'Ver Agrícola',
    href: '/loja',
    color: 'accent',
  },
  {
    id: 3,
    title: 'Cuidado Vital: Linha Animal',
    subtitle:
      'Nossos melhores amigos merecem nutrição e carinho de alta performance.',
    image:
      'https://images.unsplash.com/photo-1486235460219-00a0f2afc438?q=80&w=2070&auto=format&fit=crop',
    cta: 'Explorar Pet',
    href: '/loja',
    color: 'primary',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-[600px] overflow-hidden bg-dark md:h-[750px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="scale-105 transform object-cover brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                AgroForge • Premium Selection
              </span>
              <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white drop-shadow-2xl md:text-7xl">
                {slides[current].title}
              </h1>
              <p className="mb-10 text-xl font-light leading-relaxed text-stone-200/90 md:text-2xl">
                {slides[current].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={slides[current].href}
                  className={
                    slides[current].color === 'accent'
                      ? 'accent-button'
                      : 'premium-button'
                  }
                >
                  {slides[current].cta}
                </Link>
                <button className="rounded-full border border-white/30 px-8 py-3 font-heading font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                  Saiba Mais
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        <button
          onClick={prev}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-12 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group relative flex h-1 items-center py-4"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                index === current
                  ? 'w-12 bg-white'
                  : 'w-6 bg-white/30 group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
