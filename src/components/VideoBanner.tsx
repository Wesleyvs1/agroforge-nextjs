import Link from 'next/link'

export default function VideoBanner() {
  return (
    <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gray-900">
      {/* Fake video background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-gray-800 to-gray-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.08'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Play button */}
        <div className="mx-auto mb-6 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20">
          <span className="ml-1 text-3xl text-white">▶</span>
        </div>

        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          Veja em Ação
        </h2>
        <p className="mb-8 text-lg text-gray-300">
          Descubra como nossos produtos fazem a diferença no campo e na sua casa
        </p>
        <Link
          href="/loja"
          className="inline-block rounded-lg bg-primary px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-secondary hover:shadow-xl"
        >
          Explorar Produtos
        </Link>
      </div>
    </section>
  )
}
