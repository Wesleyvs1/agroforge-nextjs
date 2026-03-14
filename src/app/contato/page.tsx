'use client'

import { useState } from 'react'

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Obrigado pelo contato! Responderemos em breve.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
        Entre em Contato
      </h1>
      <p className="mb-12 text-center text-lg text-gray-600">
        Dúvidas? Fale conosco! Estamos aqui para ajudar.
      </p>

      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Informações */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Nossas Informações
          </h2>

          {[
            {
              icon: '📞',
              title: 'Telefone',
              content: '(43) 3526-7890',
              hours: 'Seg-Sexta: 8h às 18h | Sab: 8h às 12h',
            },
            {
              icon: '📧',
              title: 'Email',
              content: 'contato@agroforge.com.br',
              secondary: 'vendas@agroforge.com.br',
            },
            {
              icon: '📍',
              title: 'Endereço',
              content: 'Rua da Agricultura, 123',
              secondary: 'Almirante Tamandaré - PR | CEP: 83430-000',
            },
            {
              icon: '💬',
              title: 'WhatsApp',
              content: '(43) 99999-8888',
              secondary: 'Disponível 24h',
            },
          ].map((info, idx) => (
            <div
              key={idx}
              className="mb-4 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-primary">
                <span>{info.icon}</span>
                {info.title}
              </h3>
              <p className="font-semibold text-gray-800">{info.content}</p>
              {info.secondary && (
                <p className="text-sm text-gray-600">{info.secondary}</p>
              )}
              {info.hours && (
                <p className="text-sm text-gray-600">{info.hours}</p>
              )}
            </div>
          ))}
        </div>

        {/* Formulário */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Envie uma Mensagem
          </h2>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-white p-8 shadow-md"
          >
            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-800">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-800">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(43) 99999-8888"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-800">
                Assunto
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione um assunto</option>
                <option value="produtos">Dúvida sobre produtos</option>
                <option value="entrega">Pedido/Entrega</option>
                <option value="sugestao">Sugestão</option>
                <option value="reclamacao">Reclamação</option>
                <option value="parceria">Parcerias</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-bold text-gray-800">
                Mensagem
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Digite sua mensagem aqui..."
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-secondary"
            >
              📧 Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-lg bg-primary p-12 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">
          Prefere falar pelo WhatsApp?
        </h2>
        <p className="mb-6 text-green-100">
          Estamos disponíveis 24h para tirar suas dúvidas e ajudar com pedidos
        </p>
        <a
          href="https://wa.me/5543999998888"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-primary transition-colors hover:bg-gray-100"
        >
          💬 Abrir WhatsApp
        </a>
      </div>
    </div>
  )
}
