'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAdminData } from '@/context/AdminDataContext'

export default function BlogPostPage() {
  const params = useParams()
  const { blogPosts } = useAdminData()
  const idStr = params?.id
  const post = blogPosts.find((p: any) => p.id.toString() === idStr)

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <h1 className="mb-4 font-heading text-4xl font-bold text-stone-800">
          Artigo não encontrado
        </h1>
        <p className="mb-8 text-stone-500">
          O artigo que você procura pode ter sido removido ou o link está
          incorreto.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-dark"
        >
          <ArrowLeft size={18} />
          Voltar para o Blog
        </Link>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-stone-50">
      {/* Hero Image Header */}
      <header className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-black/20" />

        {/* Navigation & Header Content */}
        <div className="absolute inset-0 mx-auto flex max-w-4xl flex-col p-6 pt-24 md:p-10 md:pt-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-auto"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-auto"
          >
            <span className="mb-4 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {post.category}
            </span>
            <h1 className="mb-6 font-heading text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-300 md:gap-8">
              <span className="flex items-center gap-2">
                <User size={16} className="text-primary-light" />
                {post.author || 'Redação AgroForge'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-primary-light" />
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-primary-light" />
                  {post.readTime}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-12 md:py-20 lg:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-white p-8 shadow-2xl shadow-stone-200/50 md:p-12"
        >
          {/* Excerpt Lead */}
          <p className="mb-10 text-xl font-medium leading-relaxed text-stone-600 md:text-2xl">
            {post.excerpt}
          </p>

          <div className="my-8 h-px w-full bg-stone-100" />

          {/* HTML Content */}
          <div
            className="prose prose-stone prose-lg hover:prose-a:text-primary-dark prose-p:leading-relaxed prose-a:text-primary prose-a:font-semibold prose-img:rounded-2xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="my-10 h-px w-full bg-stone-100" />

          {/* Article Footer */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Escrito por
                </p>
                <p className="font-bold text-stone-800">
                  {post.author || 'Redação AgroForge'}
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-xl border-2 border-stone-200 px-6 py-2.5 font-bold text-stone-600 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary">
              <Share2 size={18} />
              Compartilhar Artigo
            </button>
          </div>
        </motion.div>
      </main>
    </article>
  )
}
