'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products, blogPosts } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const featuredProducts = products.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-dark via-secondary to-primary py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-green-400 blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold leading-tight">
            Qualidade da Terra ao Seu Prato
          </h1>
          <p className="mb-8 text-xl text-green-100">
            Produtos 100% de qualidade direto de nossos fornecedores para sua
            mesa. Sustentabilidade e excelência garantidas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loja"
              className="rounded-lg bg-green-400 px-8 py-3 font-bold text-dark transition-colors hover:bg-green-300"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/sobre"
              className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: '✓',
              title: '100% de Qualidade',
              description: 'Seleção premium de fornecedores confiáveis',
            },
            {
              icon: '🚚',
              title: 'Entrega Rápida',
              description: 'Chegam em sua casa em até 48 horas',
            },
            {
              icon: '💚',
              title: 'Sustentável',
              description: 'Respeito ao meio ambiente em cada produto',
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{benefit.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Nossos Produtos em Destaque
          </h2>
          <p className="text-lg text-gray-600">
            Seleção premium de produtos frescos e de qualidade
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/loja"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-secondary"
          >
            Ver Todos os Produtos →
          </Link>
        </div>
      </section>

      {/* BLOG */}
      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">
              Blog AgroForge
            </h2>
            <p className="text-lg text-gray-600">
              Dicas, notícias e informações sobre agricultura e pecuária
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
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
                  <h3 className="mb-2 line-clamp-2 font-bold text-gray-800 hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                  <Link
                    href="/blog"
                    className="font-bold text-primary hover:text-secondary"
                  >
                    Ler Artigo →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-secondary"
            >
              Ver Todos os Artigos →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Pronto para começar?</h2>
          <p className="mb-8 text-lg text-green-100">
            Faça seu primeiro pedido hoje e aproveite nossa seleção premium
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loja"
              className="rounded-lg bg-white px-8 py-3 font-bold text-primary transition-colors hover:bg-gray-100"
            >
              Fazer Pedido Agora
            </Link>
            <Link
              href="https://wa.me/5543999998888"
              target="_blank"
              className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-colors hover:bg-white hover:text-primary"
            >
              💬 WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
