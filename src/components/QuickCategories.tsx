import Link from 'next/link'

const categories = [
  { emoji: '🌾', name: 'Rações', href: '/loja' },
  { emoji: '🪢', name: 'Cabos', href: '/loja' },
  { emoji: '🍞', name: 'Coloniais', href: '/loja' },
  { emoji: '🎣', name: 'Pesca', href: '/loja' },
  { emoji: '🐴', name: 'Montaria', href: '/loja' },
  { emoji: '🔧', name: 'Ferramentas', href: '/loja' },
]

export default function QuickCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Coleções
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
              {cat.emoji}
            </span>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
