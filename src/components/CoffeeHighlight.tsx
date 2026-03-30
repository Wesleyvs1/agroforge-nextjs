'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react'

export default function CoffeeHighlight() {
  const benefits = [
    'Grãos 100% Arábica selecionados',
    'Torra artesanal toda semana',
    'Moído exatamente no momento do seu pedido',
  ]

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Background decorations */}
      <div className="absolute left-0 top-0 -ml-40 -mt-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 -mb-40 -mr-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="text-accent-dark mb-6 flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-bold shadow-sm">
              <Sparkles size={16} />
              Especial da Casa
            </div>

            <h2 className="mb-6 font-heading text-4xl font-extrabold leading-tight text-stone-900 md:text-5xl lg:text-6xl">
              Café <span className="text-primary">Moído na Hora</span>
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-stone-600">
              Transforme a sua rotina com um café de verdade. Esqueça os pacotes
              de prateleira: nós preparamos e moemos o seu café no momento exato
              em que você faz o pedido.
            </p>

            <ul className="mb-10 space-y-4">
              {benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 font-medium text-stone-700"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/loja?q=café#catalogo"
              className="group flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-dark hover:shadow-2xl hover:shadow-primary/30"
            >
              <span>Quero o Meu ☕</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRight size={16} strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>

          {/* Right Column: Imagery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 z-0 rounded-[60px] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-2xl" />

            {/* Image Container with Glassmorphism Border */}
            <div className="glass-morphism relative z-10 aspect-square w-full overflow-hidden rounded-[40px] border-4 border-white/50 shadow-2xl md:aspect-[4/3] lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop"
                alt="Processo de moagem de café"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay gradient for text readability of the floating card */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Floating Quality Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-6 left-6 flex max-w-[220px] items-center gap-3 rounded-2xl bg-white/95 p-4 text-left shadow-xl backdrop-blur-md"
              >
                <div className="text-accent-dark flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-base font-black">
                  100%
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-stone-500">
                    Qualidade Garantida
                  </p>
                  <p className="font-heading text-sm font-bold text-stone-800">
                    Torra Fresca
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
