'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, Handshake, MessageCircle } from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'

/* eslint-disable @typescript-eslint/no-explicit-any */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Fornecedores() {
  const { suppliers } = useAdminData()

  const featured = suppliers.filter(
    (s: any) => s.featured === true || (s.image && s.image.length > 0),
  )
  const textOnly = suppliers.filter(
    (s: any) => s.featured === false || !s.image || s.image.length === 0,
  )

  return (
    <div className="bg-surface/50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark py-28 md:py-36">
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary-light">
            Nossos Parceiros
          </span>
          <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Indústrias
            <br />
            <span className="text-accent-light">Parceiras</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300">
            Trabalhamos com os melhores fabricantes e fornecedores do Brasil para
            garantir qualidade e confiança em cada produto.
          </p>
        </motion.div>
      </section>

      {/* Logo Grid - Fornecedores Destaque */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="section-subtitle">Confiança e Qualidade</span>
            <h2 className="section-title">Indústrias Parceiras</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-8"
          >
            {featured.map((supplier: any) => (
              <motion.div
                key={supplier.id}
                variants={itemVariants}
                className="group flex flex-col items-center"
              >
                <div className="glass-morphism flex h-36 w-full items-center justify-center rounded-2xl p-6 shadow-lg shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {supplier.image ? (
                    <div className="relative h-20 w-full">
                      <Image
                        src={supplier.image}
                        alt={supplier.name}
                        fill
                        className="object-contain transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <span className="text-center font-heading text-lg font-bold text-stone-700">
                      {supplier.name}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-stone-700">
                  {supplier.name}
                </p>
                <span className="mt-1 text-center text-xs text-stone-400">
                  {supplier.category}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Text-Only Grid */}
      {textOnly.length > 0 && (
        <section className="bg-surface-alt/50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="glass-morphism grid grid-cols-2 divide-x divide-stone-200/50 overflow-hidden rounded-3xl shadow-lg shadow-stone-200/50 sm:grid-cols-4">
              {textOnly.map((supplier: any, index: number) => (
                <motion.div
                  key={supplier.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`group cursor-default px-5 py-6 text-center transition-all duration-300 hover:bg-primary/5 ${
                    index >= 2 ? 'border-t border-stone-200/50 sm:border-t-0' : ''
                  } ${index >= 4 ? 'border-t border-stone-200/50' : ''}`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-700 transition-colors group-hover:text-primary">
                    {supplier.name}
                  </p>
                  <span className="mt-1 block text-[10px] text-stone-400">
                    {supplier.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* "E muito mais..." */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-4xl font-extrabold text-stone-800 md:text-5xl">
              E muito mais...
            </h3>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-stone-900 py-24">
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 block font-bold uppercase tracking-[0.3em] text-primary-light">
            Parceria
          </span>
          <h2 className="mb-8 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Quer ser um Fornecedor?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-400">
            A AgroForge está sempre em busca de novos parceiros de qualidade.
            Entre em contato e faça parte da nossa rede de fornecedores.
          </p>
          <Link
            href="/contato"
            className="accent-button inline-flex items-center gap-3"
          >
            <Handshake size={18} />
            <span>Entre em Contato</span>
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
