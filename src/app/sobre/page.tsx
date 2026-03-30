'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Target,
  Rocket,
  Heart,
  ShieldCheck,
  Lightbulb,
  MessageCircle,
  Sprout,
  Users,
  Package,
  Calendar,
  ChevronRight,
  ChevronDown,
  MapPin,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stats = [
  { value: '500+', label: 'Clientes Satisfeitos', icon: Users },
  { value: '8+', label: 'Anos de Experiência', icon: Calendar },
  { value: '50+', label: 'Produtos no Catálogo', icon: Package },
  { value: '2', label: 'Regiões Atendidas', icon: MapPin },
]

const values = [
  {
    icon: Target,
    title: 'Missão',
    description:
      'Fornecer produtos agropecuários de alta qualidade, com atendimento personalizado e entrega rápida para potencializar a produção dos nossos clientes.',
  },
  {
    icon: Rocket,
    title: 'Visão',
    description:
      'Ser a plataforma de referência em vendas de produtos agropecuários, conhecida pela qualidade, confiabilidade e inovação.',
  },
  {
    icon: Heart,
    title: 'Valores',
    description:
      'Qualidade, Sustentabilidade, Transparência, Inovação e Compromisso com nossos clientes e o meio ambiente.',
  },
]

const differentials = [
  {
    icon: ShieldCheck,
    title: 'Produtos Certificados',
    description:
      'Todos os produtos passam por rigoroso controle de qualidade antes de chegar até você.',
  },
  {
    icon: Lightbulb,
    title: 'Inovação Constante',
    description:
      'Sempre atualizamos nosso catálogo com as melhores novidades do mercado agropecuário.',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento Personalizado',
    description:
      'Equipe especializada disponível para ajudar com suas necessidades específicas.',
  },
  {
    icon: Sprout,
    title: 'Compromisso Ambiental',
    description:
      'Incentivamos práticas sustentáveis em toda a nossa cadeia de produção e distribuição.',
  },
]

const team = [
  { name: 'Leandro', role: 'Fundador & CEO', initials: 'LE' },
  { name: 'Diogo', role: 'Gerente de Operações', initials: 'DI' },
]

export default function Sobre() {
  return (
    <div className="bg-surface/50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark py-28 md:py-36">
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary-light">
            Conheça a AgroForge
          </span>
          <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Tradição e Inovação
            <br />
            <span className="text-accent-light">no Campo</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300">
            Conheça a história, os valores e a equipe por trás da sua loja
            agropecuária de confiança.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <button
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight - 80,
                behavior: 'smooth',
              })
            }
            className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-primary/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-primary hover:shadow-xl"
            aria-label="Rolar para baixo"
          >
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-subtitle">O que nos guia</span>
          <h2 className="section-title">Nossos Pilares</h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {values.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-morphism group rounded-3xl p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <item.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 font-heading text-2xl font-bold text-primary-dark">
                {item.title}
              </h3>
              <p className="leading-relaxed text-stone-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* História */}
      <section className="bg-surface-alt/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="section-subtitle">Desde 2020</span>
            <h2 className="section-title">Nossa História</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl"
          >
            <div className="glass-morphism rounded-3xl p-10 shadow-xl shadow-stone-200/50 md:p-14">
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="hidden shrink-0 md:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-heading text-sm font-bold text-primary">
                      2020
                    </div>
                  </div>
                  <p className="leading-relaxed text-stone-700">
                    A AgroForge nasceu com uma visão clara: simplificar o acesso
                    a produtos agropecuários de qualidade para pequenos e
                    grandes produtores. Começamos como uma pequena loja em
                    Curitiba – PR, e evoluímos para uma plataforma robusta de
                    vendas online.
                  </p>
                </div>

                <div className="h-px bg-stone-200" />

                <div className="flex gap-6">
                  <div className="hidden shrink-0 md:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 font-heading text-sm font-bold text-accent">
                      2022
                    </div>
                  </div>
                  <p className="leading-relaxed text-stone-700">
                    Ao longo dos anos, desenvolvemos relacionamentos sólidos com
                    fornecedores de confiança, garantindo que cada produto
                    oferecido atenda aos nossos rigorosos padrões de qualidade.
                    Nossa equipe está comprometida em entender as necessidades
                    do mercado agropecuário e oferecer soluções inovadoras.
                  </p>
                </div>

                <div className="h-px bg-stone-200" />

                <div className="flex gap-6">
                  <div className="hidden shrink-0 md:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-heading text-sm font-bold text-primary">
                      Hoje
                    </div>
                  </div>
                  <p className="leading-relaxed text-stone-700">
                    Hoje, atendemos clientes em toda a região do Paraná e São
                    Paulo, e continuamos expandindo. Estamos orgulhosos de ser
                    mais do que um simples revendedor – somos parceiros no
                    sucesso de nossos clientes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Números */}
      <section className="relative overflow-hidden bg-stone-900 py-24">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center"
            >
              <div className="mx-auto mb-4 inline-flex rounded-2xl bg-white/5 p-4 text-primary-light">
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="mb-2 font-heading text-4xl font-extrabold text-white md:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium tracking-wide text-stone-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Equipe */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-subtitle">Quem faz acontecer</span>
          <h2 className="section-title">Nossa Equipe</h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
          <p className="mx-auto mt-8 max-w-2xl text-lg text-stone-600">
            Profissionais apaixonados por agricultura e pecuária, dedicados a
            oferecer a melhor experiência possível.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2"
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-morphism group rounded-3xl p-8 text-center shadow-xl shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-heading text-2xl font-bold text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                {member.initials}
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-stone-800">
                {member.name}
              </h3>
              <p className="font-semibold text-primary">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Diferenciais */}
      <section className="bg-surface-alt/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="section-subtitle">Nossos Diferenciais</span>
            <h2 className="section-title">Por que Escolher a AgroForge?</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {differentials.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-morphism group flex gap-6 rounded-3xl p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="shrink-0">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-stone-800">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-stone-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative overflow-hidden bg-stone-900 py-24">
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 block font-bold uppercase tracking-[0.3em] text-primary-light">
            Faça Parte
          </span>
          <h2 className="mb-8 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Quer fazer parte da família AgroForge?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-400">
            Conheça nossos produtos e comece sua jornada conosco. Estamos
            prontos para ajudar você a alcançar resultados excepcionais.
          </p>
          <Link
            href="/loja"
            className="accent-button inline-flex items-center gap-3"
          >
            <span>Explorar Loja</span>
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
