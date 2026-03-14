'use client'

import Link from 'next/link'
import { blogPosts } from '@/data/products'

export default function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Blog AgroForge
        </h1>
        <p className="text-lg text-gray-600">
          Dicas, notícias e informações sobre agricultura e pecuária
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex gap-2">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-primary">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">
                  📅 {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-800 hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                {post.excerpt}
              </p>
              <a
                href="#"
                className="font-bold text-primary hover:text-secondary"
              >
                Ler Artigo →
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-600">
          Não encontrou o artigo que procura?
        </p>
        <Link
          href="/contato"
          className="inline-block rounded-lg bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-secondary"
        >
          Sugira um Artigo
        </Link>
      </div>
    </div>
  )
}
