'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  ChevronRight,
  User,
  AtSign,
  FileText,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefone',
    content: '(41) 3336-7593',
    secondary: '(41) 99195-7593 (celular)',
    color: 'primary',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'agroforge@gmail.com',
    secondary: 'Resposta em até 24h',
    color: 'accent',
  },
  {
    icon: MapPin,
    title: 'Endereço',
    content: 'Rod. dos Minérios, 1949 - Taboão',
    secondary: 'Curitiba - PR | CEP: 82130-570',
    color: 'primary',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: '(41) 99195-7593',
    secondary: 'Disponível em horário comercial',
    color: 'accent',
  },
]

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="bg-surface/50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark py-28 md:py-36">
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.05]" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary-light">
            Fale Conosco
          </span>
          <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Entre em
            <br />
            <span className="text-accent-light">Contato</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300">
            Dúvidas, sugestões ou pedidos? Estamos aqui para ajudar você.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* Info Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="mb-4 font-heading text-3xl font-extrabold text-primary-dark">
                Nossas Informações
              </h2>
              <div className="h-1 w-16 rounded-full bg-accent" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-morphism group rounded-2xl p-6 shadow-lg shadow-stone-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="flex gap-5">
                    <div
                      className={`shrink-0 inline-flex rounded-xl p-3 transition-colors duration-300 ${
                        info.color === 'primary'
                          ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                          : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white'
                      }`}
                    >
                      <info.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-heading text-lg font-bold text-stone-800">
                        {info.title}
                      </h3>
                      <p className="font-semibold text-stone-700">
                        {info.content}
                      </p>
                      {info.secondary && (
                        <p className="mt-1 text-sm text-stone-500">
                          {info.secondary}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Horário de Funcionamento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 glass-morphism rounded-2xl p-6 shadow-lg shadow-stone-200/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Clock size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-800">
                  Horário de Funcionamento
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between rounded-xl bg-stone-50 px-4 py-2.5">
                  <span className="font-medium text-stone-600">Segunda a Sexta</span>
                  <span className="font-bold text-primary">8h às 18h</span>
                </div>
                <div className="flex justify-between rounded-xl bg-stone-50 px-4 py-2.5">
                  <span className="font-medium text-stone-600">Sábado</span>
                  <span className="font-bold text-primary">8h às 12h</span>
                </div>
                <div className="flex justify-between rounded-xl bg-stone-50 px-4 py-2.5">
                  <span className="font-medium text-stone-600">Domingo</span>
                  <span className="font-bold text-stone-400">Fechado</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="mb-10">
              <h2 className="mb-4 font-heading text-3xl font-extrabold text-primary-dark">
                Envie uma Mensagem
              </h2>
              <div className="h-1 w-16 rounded-full bg-accent" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="glass-morphism rounded-3xl p-8 shadow-xl shadow-stone-200/50 md:p-10"
            >
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 px-5 py-4 text-sm font-semibold text-green-700"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                    ✓
                  </div>
                  Obrigado pelo contato! Responderemos em breve.
                </motion.div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Nome */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                    <User size={14} />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="w-full rounded-xl border-2 border-stone-200 bg-white px-5 py-3.5 text-sm transition-all duration-200 placeholder:text-stone-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                    <AtSign size={14} />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="w-full rounded-xl border-2 border-stone-200 bg-white px-5 py-3.5 text-sm transition-all duration-200 placeholder:text-stone-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                    <Phone size={14} />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(43) 99999-8888"
                    className="w-full rounded-xl border-2 border-stone-200 bg-white px-5 py-3.5 text-sm transition-all duration-200 placeholder:text-stone-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                {/* Assunto */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                    <FileText size={14} />
                    Assunto
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border-2 border-stone-200 bg-white px-5 py-3.5 text-sm transition-all duration-200 text-stone-700 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="produtos">Dúvida sobre produtos</option>
                    <option value="entrega">Pedido/Entrega</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="parceria">Parcerias</option>
                  </select>
                </div>
              </div>

              {/* Mensagem */}
              <div className="mt-5">
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                  <MessageCircle size={14} />
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui..."
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border-2 border-stone-200 bg-white px-5 py-3.5 text-sm transition-all duration-200 placeholder:text-stone-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 font-heading font-bold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="relative overflow-hidden bg-stone-900 py-24">
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <span className="mb-4 block font-bold uppercase tracking-[0.3em] text-primary-light">
            Atendimento Rápido
          </span>
          <h2 className="mb-8 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Prefere falar pelo WhatsApp?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-400">
            Estamos disponíveis 24h para tirar suas dúvidas e ajudar com pedidos.
            Resposta rápida garantida.
          </p>
          <a
            href="https://wa.me/5541991957593"
            target="_blank"
            rel="noopener noreferrer"
            className="accent-button inline-flex items-center gap-3"
          >
            <MessageCircle size={18} />
            <span>Abrir WhatsApp</span>
            <ChevronRight size={18} />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
