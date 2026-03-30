'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  FileText,
  Lock,
  ChevronDown,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'Como faço para fazer um pedido?',
    answer:
      'Basta navegar pelo nosso catálogo, adicionar os produtos ao carrinho e finalizar a compra via WhatsApp. Você pode criar uma conta ou fazer compra como visitante.',
  },
  {
    id: 2,
    question: 'Qual é o prazo de entrega?',
    answer:
      'Entregamos em toda a região do Paraná e São Paulo em até 7 dias úteis após a confirmação do pagamento. Para regiões mais distantes, consulte o prazo conosco.',
  },
  {
    id: 3,
    question: 'Vocês entregam em minha região?',
    answer:
      'Entregamos em Curitiba, região metropolitana e todo o Paraná. Entre em contato para verificar disponibilidade na sua localidade.',
  },
  {
    id: 4,
    question: 'Qual é a política de devolução?',
    answer:
      'Aceitamos devoluções de produtos em até 7 dias após a entrega, desde que estejam em perfeito estado e com embalagem original. Entre em contato para solicitar a devolução.',
  },
  {
    id: 5,
    question: 'Quais formas de pagamento vocês aceitam?',
    answer:
      'Aceitamos Cartão de Crédito, Débito, Boleto Bancário, Transferência Bancária e PIX. Todas as transações são seguras.',
  },
  {
    id: 6,
    question: 'Como posso rastrear meu pedido?',
    answer:
      'Após a confirmação do pedido, você receberá um link de rastreamento via WhatsApp ou Email.',
  },
]

const tabs = [
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'termos', label: 'Termos e Condições', icon: FileText },
  { id: 'privacidade', label: 'Política de Privacidade', icon: Lock },
]

export default function Paginas() {
  const [activeTab, setActiveTab] = useState('faq')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

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
            Central de Ajuda
          </span>
          <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Informações
            <br />
            <span className="text-accent-light">Importantes</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300">
            Tire suas dúvidas e conheça nossas políticas e termos de uso.
          </p>
        </motion.div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[72px] z-20 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-6 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-primary'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <AnimatePresence mode="wait">
          {/* FAQ */}
          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12">
                <h2 className="mb-4 font-heading text-3xl font-extrabold text-primary-dark">
                  Perguntas Frequentes
                </h2>
                <div className="h-1 w-16 rounded-full bg-accent" />
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => {
                  const isOpen = expandedFAQ === faq.id
                  return (
                    <div
                      key={faq.id}
                      className="glass-morphism overflow-hidden rounded-2xl shadow-lg shadow-stone-200/30 transition-all duration-200"
                    >
                      <button
                        onClick={() => setExpandedFAQ(isOpen ? null : faq.id)}
                        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-stone-50/50"
                      >
                        <h3 className="font-heading text-base font-bold text-stone-800">
                          {faq.question}
                        </h3>
                        <div
                          className={`shrink-0 rounded-xl p-1.5 transition-all duration-300 ${
                            isOpen
                              ? 'rotate-180 bg-primary text-white'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          <ChevronDown size={16} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-stone-100 px-6 pb-6 pt-4 leading-relaxed text-stone-600">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Termos */}
          {activeTab === 'termos' && (
            <motion.div
              key="termos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12">
                <h2 className="mb-4 font-heading text-3xl font-extrabold text-primary-dark">
                  Termos e Condições
                </h2>
                <div className="h-1 w-16 rounded-full bg-accent" />
              </div>

              <div className="glass-morphism rounded-3xl p-8 shadow-xl shadow-stone-200/50 md:p-12">
                <div className="space-y-8">
                  {[
                    {
                      title: '1. Aceitação dos Termos',
                      text: 'Ao acessar e usar o site da AgroForge, você aceita estar vinculado por estes termos e condições. Se você não concorda com qualquer parte destes termos, por favor, não use este site.',
                    },
                    {
                      title: '2. Produtos e Preços',
                      text: 'Nos reservamos o direito de modificar, descontinuar ou fazer alterações a qualquer produto ou serviço a qualquer momento. Os preços estão sujeitos a alterações sem aviso prévio. Todos os produtos estão sujeitos à disponibilidade.',
                    },
                    {
                      title: '3. Pedidos',
                      text: 'Ao fazer um pedido, você está oferecendo para comprar um produto em conformidade com estes termos e condições. Nos reservamos o direito de rejeitar qualquer pedido. Pedidos estão sujeitos a confirmação e aceitação.',
                    },
                    {
                      title: '4. Entrega',
                      text: 'Os prazos de entrega são estimados e não garantidos. A AgroForge não será responsável por atrasos causados por fatores fora de seu controle. Os clientes são responsáveis pelas informações de endereço corretas.',
                    },
                    {
                      title: '5. Limitação de Responsabilidade',
                      text: 'A AgroForge não será responsável por quaisquer danos indiretos, incidentais, especiais ou consequentes resultantes do seu uso ou incapacidade de usar os materiais neste site.',
                    },
                    {
                      title: '6. Modificações dos Termos',
                      text: 'Nos reservamos o direito de modificar estes termos a qualquer momento. Seu uso continuado do site indica sua aceitação dos termos modificados.',
                    },
                  ].map((section, idx) => (
                    <div key={idx}>
                      <h3 className="mb-3 font-heading text-lg font-bold text-stone-800">
                        {section.title}
                      </h3>
                      <p className="leading-relaxed text-stone-600">
                        {section.text}
                      </p>
                      {idx < 5 && <div className="mt-8 h-px bg-stone-100" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacidade */}
          {activeTab === 'privacidade' && (
            <motion.div
              key="privacidade"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12">
                <h2 className="mb-4 font-heading text-3xl font-extrabold text-primary-dark">
                  Política de Privacidade
                </h2>
                <div className="h-1 w-16 rounded-full bg-accent" />
              </div>

              <div className="glass-morphism rounded-3xl p-8 shadow-xl shadow-stone-200/50 md:p-12">
                <div className="space-y-8">
                  {[
                    {
                      title: '1. Informações que Coletamos',
                      text: 'Coletamos informações que você nos fornece diretamente, como nome, email, endereço e número de telefone quando você faz um pedido ou se cadastra em nossa newsletter. Também coletamos informações automaticamente através de cookies e tecnologias similares.',
                    },
                    {
                      title: '2. Como Usamos Suas Informações',
                      text: 'Usamos suas informações para processar pedidos, enviar atualizações, responder a consultas, melhorar nossos serviços e enviar comunicações de marketing. Nunca compartilharemos suas informações pessoais com terceiros sem consentimento expresso.',
                    },
                    {
                      title: '3. Segurança',
                      text: 'Implementamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso não autorizado ou alteração. Suas informações de pagamento são processadas com segurança através de gateways certificados.',
                    },
                    {
                      title: '4. Cookies',
                      text: 'Nosso site usa cookies para melhorar sua experiência. Você pode desativar cookies através das configurações do seu navegador, mas isso pode afetar a funcionalidade do site.',
                    },
                    {
                      title: '5. Seus Direitos',
                      text: 'Você tem o direito de acessar, corrigir ou deletar suas informações pessoais a qualquer momento. Entre em contato conosco para exercer esses direitos.',
                    },
                    {
                      title: '6. Contato',
                      text: 'Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco através do email agroforge@gmail.com ou WhatsApp (41) 99195-7593.',
                    },
                  ].map((section, idx) => (
                    <div key={idx}>
                      <h3 className="mb-3 font-heading text-lg font-bold text-stone-800">
                        {section.title}
                      </h3>
                      <p className="leading-relaxed text-stone-600">
                        {section.text}
                      </p>
                      {idx < 5 && <div className="mt-8 h-px bg-stone-100" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            Ainda com dúvidas?
          </span>
          <h2 className="mb-8 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Fale diretamente com nossa equipe
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-400">
            Estamos disponíveis pelo WhatsApp para responder qualquer questão
            sobre nossos produtos, entregas ou políticas.
          </p>
          <a
            href="https://wa.me/5541991957593"
            target="_blank"
            rel="noopener noreferrer"
            className="accent-button inline-flex items-center gap-3"
          >
            <MessageCircle size={18} />
            <span>Falar pelo WhatsApp</span>
            <ChevronRight size={18} />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
