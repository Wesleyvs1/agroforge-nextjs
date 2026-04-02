'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Bone,
  Pill,
  Tags,
  PackageCheck,
  Wrench,
  Flower2,
} from 'lucide-react'

const categories = [
  {
    name: 'Ração Cães e Gatos',
    icon: <Bone size={18} />,
    href: '/loja?categoria=RAÇÃO%20CÃES%20E%20GATOS#catalogo',
  },
  {
    name: 'Medicamentos',
    icon: <Pill size={18} />,
    href: '/loja?categoria=MEDICAMENTOS#catalogo',
  },
  {
    name: 'Acessórios Pet',
    icon: <Tags size={18} />,
    href: '/loja?categoria=ACESS%C3%93RIOS%20PARA%20PET#catalogo',
  },
  {
    name: 'Produtos Coloniais',
    icon: <PackageCheck size={18} />,
    href: '/loja?categoria=PRODUTOS%20COLONIAIS#catalogo',
  },
  {
    name: 'Ferramentas',
    icon: <Wrench size={18} />,
    href: '/loja?categoria=FERRAMENTAS#catalogo',
  },
  {
    name: 'Jardinagem',
    icon: <Flower2 size={18} />,
    href: '/loja?categoria=JARDINAGEM#catalogo',
  },
]

export default function CategorySidebar() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-stone-900 p-8 shadow-xl">
      {/* Background with texture & gradient */}
      <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-[80px]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-extrabold text-white">
            Nossas <br />
            <span className="text-primary-light">Categorias</span>
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-accent" />
        </div>

        {/* Categories List */}
        <ul className="flex flex-grow flex-col gap-2">
          {categories.map((cat, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={cat.href}
                className="group flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5 text-stone-300 transition-all duration-300 hover:bg-primary/20 hover:text-white"
              >
                <div className="flex items-center gap-3 font-medium">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                    {cat.icon}
                  </span>
                  {cat.name}
                </div>
                <ChevronRight
                  size={16}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary-light group-hover:opacity-100"
                />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* View All Details */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <Link
            href="/loja"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-light"
          >
            Ver Todas Categorias
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
