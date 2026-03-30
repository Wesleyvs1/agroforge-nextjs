'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown, Mail, User, Clock } from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'

/* eslint-disable @typescript-eslint/no-explicit-any */

const categoryColors: Record<string, string> = {
  Café: 'bg-amber-700',
  Pecuária: 'bg-emerald-700',
  Pet: 'bg-sky-600',
  Sustentabilidade: 'bg-teal-600',
  Cultivo: 'bg-lime-700',
}

function getCategoryColor(category: string) {
  return categoryColors[category] || 'bg-primary'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function Blog() {
  const { blogPosts } = useAdminData()
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = [
    'Todos',
    ...new Set(blogPosts.map((p: any) => p.category)),
  ]

  const filtered =
    selectedCategory === 'Todos'
      ? blogPosts
      : blogPosts.filter((p: any) => p.category === selectedCategory)

  const featuredPosts = filtered.slice(0, 2)
  const sidePosts = filtered.slice(2, 5)
  const remainingPosts = filtered.slice(5)

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
            Blog AgroForge
          </span>
          <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Notícias do
            <br />
            <span className="text-accent-light">Agronegócio</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300">
            As últimas novidades sobre café, pecuária, pets e sustentabilidade
            no campo brasileiro.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <button
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight - 80,
                behavior: 'smooth',
              })
            }
            className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-primary/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-primary hover:shadow-xl"
            aria-label="Rolar para baixo"
          >
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[72px] z-20 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-2">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stories */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-primary-dark md:text-4xl">
              Destaques
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-accent" />
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Ver Todas
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: 2 Featured */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            {featuredPosts.map((post: any, index: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl bg-stone-900 shadow-xl shadow-stone-300/20"
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-72 overflow-hidden sm:h-80">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="mb-3 font-heading text-lg font-bold leading-tight text-white transition-colors group-hover:text-primary-light md:text-xl">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-stone-300">
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-primary-light" />
                        {post.author || 'Redação'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-primary-light" />
                        {new Date(post.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Right: Side Cards */}
          <div className="flex flex-col gap-4">
            {sidePosts.map((post: any, index: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-morphism group overflow-hidden rounded-2xl shadow-lg shadow-stone-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link href={`/blog/${post.id}`} className="flex gap-0">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <span
                      className={`mb-1.5 inline-block w-fit rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </span>
                    <h4 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-stone-800 transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <span className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <Clock size={10} />
                      {new Date(post.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}

            {sidePosts.length === 0 && (
              <div className="glass-morphism flex flex-1 items-center justify-center rounded-2xl p-8 text-center text-stone-400 shadow-lg shadow-stone-200/50">
                <p>Nenhum post encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Remaining Posts */}
      {remainingPosts.length > 0 && (
        <section className="bg-surface-alt/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="mb-3 font-heading text-3xl font-extrabold text-primary-dark">
                Mais Notícias
              </h2>
              <div className="h-1 w-16 rounded-full bg-accent" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {remainingPosts.map((post: any) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="glass-morphism group overflow-hidden rounded-3xl shadow-lg shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute left-3 top-3">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${getCategoryColor(post.category)}`}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 line-clamp-2 font-heading text-base font-bold text-stone-800 transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-stone-500">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span className="flex items-center gap-1">
                          <User size={10} />
                          {post.author || 'Redação'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
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
            Fique por dentro
          </span>
          <h2 className="mb-8 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Receba Nossas Novidades
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-400">
            Assine nossa newsletter e receba em primeira mão as últimas notícias
            do agronegócio, dicas práticas e ofertas exclusivas.
          </p>

          <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 rounded-2xl border-2 border-stone-700 bg-stone-800/50 px-5 py-3.5 text-sm text-white placeholder-stone-500 outline-none backdrop-blur-sm transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
            />
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-3.5 font-heading text-sm font-bold text-white shadow-xl shadow-accent/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent/30 active:scale-[0.98]">
              <Mail size={16} />
              Assinar Grátis
            </button>
          </div>

          <p className="mt-4 text-xs text-stone-600">
            Sem spam. Cancele quando quiser.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
