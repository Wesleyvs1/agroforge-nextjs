'use client'

import { useState } from 'react'

export default function Paginas() {
  const [activeTab, setActiveTab] = useState('faq')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

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
        'Entregamos em Almirante Tamandaré, Ponta Grossa, Curitiba, São Paulo e região. Entre em contato para verificar disponibilidade na sua localidade.',
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-4 border-b border-gray-200">
        {[
          { id: 'faq', label: '❓ FAQ' },
          { id: 'termos', label: '📋 Termos e Condições' },
          { id: 'privacidade', label: '🔒 Política de Privacidade' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 font-bold transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div>
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                  className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50"
                >
                  <h3 className="text-left font-bold text-gray-800">
                    {faq.question}
                  </h3>
                  <span
                    className={`text-primary transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedFAQ === faq.id && (
                  <div className="bg-gray-50 px-4 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Termos e Condições */}
      {activeTab === 'termos' && (
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Termos e Condições
          </h2>
          <div className="space-y-6 leading-relaxed text-gray-700">
            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                1. Aceitação dos Termos
              </h3>
              <p>
                Ao acessar e usar o site da AgroForge, você aceita estar
                vinculado por estes termos e condições. Se você não concorda com
                qualquer parte destes termos, por favor, não use este site.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                2. Produtos e Preços
              </h3>
              <p>
                Nos reservamos o direito de modificar, descontinuar ou fazer
                alterações a qualquer produto ou serviço a qualquer momento. Os
                preços estão sujeitos a alterações sem aviso prévio. Todos os
                produtos estão sujeitos à disponibilidade.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                3. Pedidos
              </h3>
              <p>
                Ao fazer um pedido, você está oferecendo para comprar um produto
                em conformidade com estes termos e condições. Nos reservamos o
                direito de rejeitar qualquer pedido. Pedidos estão sujeitos a
                confirmação e aceitação.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                4. Entrega
              </h3>
              <p>
                Os prazos de entrega são estimados e não garantidos. A AgroForge
                não será responsável por atrasos causados por fatores fora de
                seu controle. Os clientes são responsáveis pelas informações de
                endereço corretas.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                5. Limitação de Responsabilidade
              </h3>
              <p>
                A AgroForge não será responsável por quaisquer danos indiretos,
                incidentais, especiais ou consequentes resultantes do seu uso ou
                incapacidade de usar os materiais neste site.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                6. Modificações dos Termos
              </h3>
              <p>
                Nos reservamos o direito de modificar estes termos a qualquer
                momento. Seu uso continuado do site indica sua aceitação dos
                termos modificados.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* Política de Privacidade */}
      {activeTab === 'privacidade' && (
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Política de Privacidade
          </h2>
          <div className="space-y-6 leading-relaxed text-gray-700">
            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                1. Informações que Coletamos
              </h3>
              <p>
                Coletamos informações que você nos fornece diretamente, como
                nome, email, endereço e número de telefone quando você faz um
                pedido ou se cadastra em nossa newsletter. Também coletamos
                informações automaticamente através de cookies e tecnologias
                similares.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                2. Como Usamos Suas Informações
              </h3>
              <p>
                Usamos suas informações para processar pedidos, enviar
                atualizações, responder a consultas, melhorar nossos serviços e
                enviar comunicações de marketing. Nunca compartilharemos suas
                informações pessoais com terceiros sem consentimento expresso.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                3. Segurança
              </h3>
              <p>
                Implementamos medidas de segurança adequadas para proteger suas
                informações pessoais contra acesso não autorizado ou alteração.
                Suas informações de pagamento são processadas com segurança
                através de gateways certificados.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                4. Cookies
              </h3>
              <p>
                Nosso site usa cookies para melhorar sua experiência. Você pode
                desativar cookies através das configurações do seu navegador,
                mas isso pode afetar a funcionalidade do site.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                5. Seus Direitos
              </h3>
              <p>
                Você tem o direito de acessar, corrigir ou deletar suas
                informações pessoais a qualquer momento. Entre em contato
                conosco para exercer esses direitos.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                6. Contato
              </h3>
              <p>
                Se você tiver dúvidas sobre esta política de privacidade, entre
                em contato conosco através do email contato@agroforge.com.br ou
                WhatsApp (43) 99999-8888.
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
