import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/products'

export default function ExpertTips() {
  const mainPost = blogPosts[0]
  const sidePosts = blogPosts.slice(1, 3)

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">
          Dicas de Especialistas
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-500">
          Artigos e dicas para você aproveitar ao máximo nossos produtos
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card grande — esquerda */}
          {mainPost && (
            <div className="group lg:col-span-2">
              <Link href="/blog">
                <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden md:h-80">
                    <Image
                      src={mainPost.image}
                      alt={mainPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                        {mainPost.category}
                      </span>
                      <h3 className="text-xl font-bold text-white md:text-2xl">
                        {mainPost.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 text-sm text-gray-600">
                      {mainPost.excerpt}
                    </p>
                    <span className="hover:text-secondary font-bold text-primary">
                      Ler Artigo →
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Cards menores — direita */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <Link key={post.id} href="/blog" className="group">
                <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="mb-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {post.category}
                    </span>
                    <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-800 group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-gray-500">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
