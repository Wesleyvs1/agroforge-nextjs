'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

export default function ExpertTips() {
  const { blogPosts } = useAdminData()
  const mainPost = blogPosts[0]
  const sidePosts = blogPosts.slice(1, 4)

  return (
    <section className="bg-[#f3f8fb] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-subtitle">Fique Informado</span>
              <h2 className="section-title">Últimas do Agro</h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Ver Todas as Notícias
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Top Stories Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Main Featured Card */}
          {mainPost && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/blog" className="group block">
                <article className="relative overflow-hidden rounded-2xl bg-stone-900 shadow-xl">
                  <div className="relative h-72 overflow-hidden md:h-96">
                    <Image
                      src={mainPost.image}
                      alt={mainPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Category */}
                    <div className="absolute left-5 top-5">
                      <span
                        className={`rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ${getCategoryColor(mainPost.category)}`}
                      >
                        {mainPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-primary-light md:text-2xl">
                      {mainPost.title}
                    </h3>
                    <p className="mb-4 hidden text-sm leading-relaxed text-stone-300 md:line-clamp-2 md:block">
                      {mainPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <i className="far fa-user text-primary-light" />
                        {mainPost.author || 'Redação'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="far fa-clock text-primary-light" />
                        {new Date(mainPost.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      {mainPost.readTime && (
                        <span className="flex items-center gap-1.5">
                          <i className="far fa-book-open text-primary-light" />
                          {mainPost.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          )}

          {/* Right: 3 Side Cards */}
          <div className="flex flex-col gap-5">
            {sidePosts.map((post: any, index: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/blog" className="group block">
                  <article className="flex gap-0 overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                    {/* Thumbnail */}
                    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-center p-4">
                      <span
                        className={`mb-1.5 inline-block w-fit rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </span>
                      <h4 className="mb-1.5 line-clamp-2 text-sm font-bold leading-snug text-stone-800 transition-colors group-hover:text-primary">
                        {post.title}
                      </h4>
                      <span className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <i className="far fa-clock" />
                        {new Date(post.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
