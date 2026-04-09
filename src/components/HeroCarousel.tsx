'use client'

import { useState, useEffect, useCallback, useRef, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
} from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Produtos Coloniais Direto do Produtor',
    subtitle:
      'Queijos, mel, linguiça e café moído na hora com qualidade artesanal.',
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2070&auto=format&fit=crop',
    productImage:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=800&auto=format&fit=crop',
    cta: 'Explorar Coloniais',
    href: '/loja?categoria=PRODUTOS%20COLONIAIS#catalogo',
  },
  {
    id: 2,
    title: 'Nutrição Premium para Seu Pet',
    subtitle: 'Rações, medicamentos e acessórios para cães e gatos.',
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
    productImage:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop',
    cta: 'Explorar Pet',
    href: '/loja?categoria=RAÇÃO%20CÃES%20E%20GATOS#catalogo',
  },
  {
    id: 3,
    title: 'Ferramentas para o Campo Moderno',
    subtitle: 'Cavadeiras, discos, cabos e tudo para sua propriedade.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop',
    productImage:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
    cta: 'Explorar Ferramentas',
    href: '/loja?categoria=FERRAMENTAS#catalogo',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
  }, [])

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
    resetTimer()
  }, [resetTimer])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    resetTimer()
  }, [resetTimer])

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
      resetTimer()
    },
    [current, resetTimer],
  )

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const productVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <section className="relative bg-surface pb-2 pt-4 md:pb-4 md:pt-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Banner Container */}
        <div className="relative overflow-hidden rounded-3xl md:rounded-[2rem]">
          {/* Background image layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slides[current].image}
              alt=""
              fill
              className="object-cover brightness-[0.35]"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/40" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Main Content — generous padding to avoid arrow overlap */}
          <div className="relative z-10 flex min-h-[460px] items-center px-6 pb-32 pt-16 sm:px-16 md:min-h-[480px] md:px-20 md:py-20 lg:min-h-[520px] lg:px-24 lg:py-16">
            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: Text content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`text-${current}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="max-w-xl"
                >
                  <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    AgroForge • Qualidade do Campo
                  </span>
                  <h1 className="mb-5 font-heading text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                    {slides[current].title}
                  </h1>
                  <p className="mb-10 text-base font-light leading-relaxed text-white/75 md:text-lg">
                    {slides[current].subtitle}
                  </p>
                  <Link
                    href={slides[current].href}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 font-heading text-sm font-bold text-white shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98]"
                  >
                    {slides[current].cta}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                      <ShoppingCart size={14} />
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Right: Product image */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`product-${current}`}
                  custom={direction}
                  variants={productVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                    delay: 0.1,
                  }}
                  className="hidden justify-center lg:flex"
                >
                  <Link
                    href={slides[current].href}
                    className="relative block h-[320px] w-[420px] transition-transform duration-300 hover:scale-[1.02] xl:h-[360px] xl:w-[480px]"
                  >
                    <div className="absolute inset-0 rounded-3xl bg-white/[0.07] backdrop-blur-sm" />
                    <Image
                      src={slides[current].productImage}
                      alt={slides[current].title}
                      fill
                      className="rounded-3xl object-cover object-center drop-shadow-2xl"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
                    <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary-light/20 blur-2xl" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows — outside content padding zone */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-lg transition-all hover:bg-primary hover:text-white active:scale-90 md:left-4 md:flex md:h-11 md:w-11"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-lg transition-all hover:bg-primary hover:text-white active:scale-90 md:right-4 md:flex md:h-11 md:w-11"
            aria-label="Próximo slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Bottom controls zone — dots + scroll button stacked with space */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 pb-5">
            {/* Progress dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                  className={`duration-400 h-2 rounded-full transition-all ${
                    index === current
                      ? 'w-7 bg-white shadow-md'
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            {/* Scroll-down button */}
            <a
              href="#colecoes"
              className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-primary/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-primary hover:shadow-xl"
              aria-label="Rolar para baixo"
            >
              <ChevronDown size={20} className="animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
