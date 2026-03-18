import Image from 'next/image'
import Link from 'next/link'

export default function CoffeeHighlight() {
  return (
    <section className="relative overflow-hidden bg-dark">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2070&auto=format&fit=crop"
        alt="Café Moído na Hora"
        fill
        className="object-cover opacity-30"
      />

      {/* Green overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-primary/40 to-dark/90" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center text-white md:py-24">
        {/* Pulsing badge */}
        <div className="mb-6 animate-pulse rounded-full bg-amber-500/90 px-5 py-2 text-sm font-bold shadow-lg">
          ✨ Especial da Casa
        </div>

        <h2 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
          ☕ Café Moído na Hora
        </h2>
        <p className="mb-8 max-w-xl text-lg text-green-100/80">
          Grãos selecionados, torrados artesanalmente e moídos no momento do seu
          pedido. Frescura e aroma que você não encontra em outro lugar.
        </p>
        <Link
          href="/loja"
          className="hover:bg-secondary inline-block rounded-lg bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl"
        >
          Quero o Meu ☕
        </Link>
      </div>
    </section>
  )
}
