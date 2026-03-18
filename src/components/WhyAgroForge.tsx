const features = [
  {
    icon: '✅',
    title: 'Qualidade Garantida',
    description:
      'Todos os nossos produtos passam por rigoroso controle de qualidade para garantir o melhor para você.',
  },
  {
    icon: '⭐',
    title: 'Melhor Avaliação',
    description:
      'Mais de 1.000 avaliações positivas de clientes satisfeitos em toda a região.',
  },
  {
    icon: '🚀',
    title: 'Entrega Rápida',
    description:
      'Receba seus produtos em até 48h. Embalagem cuidadosa para manter a qualidade.',
  },
]

export default function WhyAgroForge() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">
        Por que AgroForge?
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-gray-500">
        Mais do que uma loja, somos a sua parceira no campo e na cidade
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="group rounded-xl border border-gray-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl transition-transform duration-300 group-hover:scale-110">
              {feat.icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-800">
              {feat.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
