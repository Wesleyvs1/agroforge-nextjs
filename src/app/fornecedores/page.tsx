import Link from 'next/link'
import Image from 'next/image'
import { suppliers } from '@/data/products'

export default function Fornecedores() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Nossos Fornecedores
        </h1>
        <p className="text-lg text-gray-600">
          Conheça os melhores fornecedores que confiam na AgroForge
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={supplier.image}
                alt={supplier.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {supplier.name}
              </h3>
              <span className="mb-3 inline-block rounded-full bg-primary px-2 py-1 text-xs font-bold text-white">
                {supplier.category}
              </span>
              <p className="mb-4 text-sm text-gray-600">
                {supplier.description}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📍 {supplier.location}</p>
                <p>📞 {supplier.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parceria */}
      <div className="to-secondary rounded-lg bg-gradient-to-r from-primary p-12 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">
          Quer se tornar um Fornecedor?
        </h2>
        <p className="mb-6">
          A AgroForge está sempre em busca de novos parceiros de qualidade
        </p>
        <Link
          href="/contato"
          className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-primary transition-colors hover:bg-gray-100"
        >
          Entre em Contato
        </Link>
      </div>
    </div>
  )
}
