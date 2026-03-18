'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const banners = [
  {
    id: 1,
    title: 'Combine e Economize',
    description:
      'Kit Café Premium: Leve o melhor do nosso café com desconto especial. Ideal para o seu dia a dia com aroma e sabor inigualáveis.',
    cta: 'COMPRAR O KIT →',
    image: '/images/kit_cafe_premium_1773634596829.png',
    href: '/loja',
  },
  {
    id: 2,
    title: 'Sabor do Campo',
    description:
      'Kit Colonial Artesanal: Uma seleção perfeita de queijo curado, linguiça defumada e mel puro. Tradição e qualidade na sua mesa.',
    cta: 'VER OFERTA →',
    image: '/images/kit_colonial_artesanal_1773634611224.png',
    href: '/loja',
  },
  {
    id: 3,
    title: 'Cuidado Completo',
    description:
      'Kit Pet Care: Tudo que seu melhor amigo precisa. Ração super premium, coleira de alta resistência e petiscos saudáveis.',
    cta: 'GARANTIR O KIT →',
    image: '/images/kit_pet_care_1773634626451.png',
    href: '/loja',
  },
]

export default function CombineSaveBanners() {
  const [current, setCurrent] = useState(0)

  const nextBanner = () => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="mx-auto mb-8 max-w-7xl px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#111111] shadow-2xl">
        {/* Banner Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex w-full min-w-full flex-shrink-0 flex-col md:flex-row"
            >
              {/* Left Content */}
              <div className="flex flex-1 flex-col justify-center p-8 md:p-14 lg:p-20">
                <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                  {banner.title}
                </h2>
                <p className="mb-8 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
                  {banner.description}
                </p>
                <div>
                  <Link
                    href={banner.href}
                    className="inline-block rounded-md bg-[#f97316] px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#ea580c]"
                  >
                    {banner.cta}
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative h-64 w-full md:h-auto md:w-1/2 lg:w-3/5">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover object-center"
                />
                {/* Gradient overlay to blend image edge with dark background on desktop */}
                <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#111111] to-transparent md:block" />
                {/* Gradient overlay for mobile */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111111] to-transparent md:hidden" />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-8 flex items-center gap-3 md:left-14 lg:left-20">
            <div className="mr-4 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === current ? 'w-6 bg-white' : 'w-2 bg-gray-600'
                  }`}
                  aria-label={`Ir para banner ${idx + 1}`}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={prevBanner}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-transparent text-gray-400 transition-colors hover:border-white hover:text-white"
                aria-label="Anterior"
              >
                ←
              </button>
              <button
                onClick={nextBanner}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-transparent text-gray-400 transition-colors hover:border-white hover:text-white"
                aria-label="Próximo"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
