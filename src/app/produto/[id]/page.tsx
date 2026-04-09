'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  MapPin,
  Award,
  Package,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/whatsapp'
import ProductCard from '@/components/ProductCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function ProdutoDetail({ params }: { params: { id: string } }) {
  const { products } = useAdminData()
  const product = products.find((p) => p.id === parseInt(params.id))
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  // Memoizar produtos relacionados para evitar re-cálculo
  const relatedProducts = useMemo(() => 
    product 
      ? products
          .filter((p) => p.category === product.category && p.id !== product.id)
          .slice(0, 4)
      : [],
    [product, products]
  )

  if (!product) {
    return (
      <div className="bg-surface/50">
        <section className="relative overflow-hidden bg-primary-dark py-28">
          <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <Package
              size={64}
              className="mx-auto mb-6 text-stone-500"
              strokeWidth={1}
            />
            <h1 className="mb-4 font-heading text-4xl font-extrabold text-white">
              Produto não encontrado
            </h1>
            <p className="mb-8 text-stone-400">
              O produto que você procura não está disponível.
            </p>
            <Link
              href="/loja"
              className="premium-button inline-flex items-center gap-2"
            >
              <span>Voltar para Loja</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const discount =
    'originalPrice' in product && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null

  return (
    <div className="bg-surface/50">
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-sm">
          <Link
            href="/loja"
            className="font-medium text-stone-500 transition-colors hover:text-primary"
          >
            Loja
          </Link>
          <ChevronRight size={14} className="text-stone-300" />
          <Link
            href={`/loja?category=${product.category}`}
            className="font-medium text-stone-500 transition-colors hover:text-primary"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} className="text-stone-300" />
          <span className="font-bold text-primary-dark">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="group relative overflow-hidden rounded-3xl bg-stone-100 shadow-xl shadow-stone-200/50">
              <div className="relative pb-[100%]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              {discount && (
                <div className="absolute right-4 top-4 rounded-xl bg-accent px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                  -{discount}%
                </div>
              )}
              {'badge' in product && product.badge && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                  <Award size={14} />
                  {product.badge}
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Category Badge */}
            <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              {product.category}
            </span>

            <h1 className="mb-4 font-heading text-3xl font-extrabold text-stone-900 md:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="mb-6 flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product.rating!)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-stone-500">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>
            )}

            <p className="mb-8 text-lg leading-relaxed text-stone-600">
              {product.detailedDescription || product.description}
            </p>

            {/* Specs */}
            <div className="mb-8 space-y-3 rounded-2xl bg-stone-50 p-6">
              {product.origin && (
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm font-medium text-stone-600">
                    <span className="font-bold text-stone-800">Origem:</span>{' '}
                    {product.origin}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Package size={16} className="text-primary" />
                <span className="text-sm font-medium text-stone-600">
                  <span className="font-bold text-stone-800">
                    Disponibilidade:
                  </span>{' '}
                  {product.stock > 0
                    ? `${product.stock} unidades em estoque`
                    : 'Fora de estoque'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 border-t-2 border-stone-100 pt-6">
              {'originalPrice' in product && product.originalPrice && (
                <div className="mb-1 text-lg font-medium text-stone-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </div>
              )}
              <div className="font-heading text-4xl font-extrabold text-primary md:text-5xl">
                {formatCurrency(product.price)}
              </div>
            </div>

            {/* Add to Cart */}
            {product.stock > 0 ? (
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-stone-700">
                    Quantidade:
                  </span>
                  <div className="flex items-center rounded-xl border-2 border-stone-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-primary"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[3rem] text-center font-heading text-lg font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-4 py-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-primary"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Success Toast */}
                {addedToCart && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs">
                      ✓
                    </div>
                    {quantity}x {product.name} adicionado ao carrinho!
                  </motion.div>
                )}

                {/* Buttons */}
                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 font-heading font-bold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
                >
                  <ShoppingCart size={20} />
                  Adicionar ao Carrinho
                </button>

                <a
                  href="https://wa.me/5541991957593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-4 font-heading font-bold text-white shadow-xl shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent/30 active:scale-[0.98]"
                >
                  <MessageCircle size={20} />
                  Comprar via WhatsApp
                </a>
              </div>
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-center font-bold text-red-600">
                Produto temporariamente indisponível
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Entrega Rápida' },
                { icon: ShieldCheck, label: 'Compra Segura' },
                { icon: RotateCcw, label: 'Devoluções' },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 rounded-xl bg-stone-50 p-3 text-center"
                >
                  <badge.icon
                    size={18}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                  <span className="text-[11px] font-semibold text-stone-500">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-surface-alt/50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <span className="section-subtitle">Você também pode gostar</span>
              <h2 className="section-title">Produtos Relacionados</h2>
              <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {relatedProducts.map((p) => (
                <motion.div key={p.id} variants={itemVariants}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
