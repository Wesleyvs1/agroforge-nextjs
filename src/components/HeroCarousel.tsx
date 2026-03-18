'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image:
      'https://cdn.awsli.com.br/600x450/2717/2717583/produto/260711100/caf--em-gr-os-13ilu9rryd.jpg',
    title: 'A Arte do Café Moído na Hora',
    subtitle:
      'Sinta a pureza e o aroma incomparável de grãos selecionados diretamente para o seu paladar.',
    cta: 'Explorar Sabores',
    href: '/loja',
    color: 'accent',
  },
  {
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
    title: 'Excelência que Brota da Terra',
    subtitle:
      'Sementes e insumos de alta performance para garantir a produtividade da sua lavoura.',
    cta: 'Ver Insumos',
    href: '/loja',
    color: 'primary',
  },
  {
    image:
      'https://cdn.awsli.com.br/300x300/2717/2717583/produto/344774807/1000035914-ogfzecfzjt.jpg',
    title: 'Cuidado em cada Detalhe',
    subtitle:
      'Nutrição premium e suplementos de elite para quem busca o melhor para o seu plantel.',
    cta: 'Linha Animal',
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
