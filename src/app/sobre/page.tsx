import Link from 'next/link'

export default function Sobre() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Sobre a AgroForge
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Conheça a história e valores da sua loja agropecuária de confiança
        </p>
      </div>

      {/* Missão, Visão, Valores */}
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h3 className="mb-4 text-2xl font-bold text-primary">🎯 Missão</h3>
          <p className="leading-relaxed text-gray-700">
            Fornecer produtos agropecuários de alta qualidade, com atendimento
            personalizado e entrega rápida para potencializar a produção dos
            nossos clientes.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <h3 className="mb-4 text-2xl font-bold text-primary">🚀 Visão</h3>
          <p className="leading-relaxed text-gray-700">
            Ser a plataforma de referência em vendas de produtos agropecuários,
            conhecida pela qualidade, confiabilidade e inovação.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <h3 className="mb-4 text-2xl font-bold text-primary">💚 Valores</h3>
          <p className="leading-relaxed text-gray-700">
            Qualidade, Sustentabilidade, Transparência, Inovação e Compromisso
            com nossos clientes e o meio ambiente.
          </p>
        </div>
      </div>

      {/* História */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Nossa História
        </h2>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <p className="mb-4 leading-relaxed text-gray-700">
            A AgroForge nasceu em 2020 com uma visão clara: simplificar o acesso
            a produtos agropecuários de qualidade para pequenos e grandes
            produtores. Começamos como uma pequena loja local em Almirante
            Tamandaré - PR, e evoluímos para uma plataforma robusta de vendas
            online.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700">
            Ao longo dos anos, desenvolvemos relacionamentos sólidos com
            fornecedores de confiança, garantindo que cada produto oferecido
            atenda aos nossos rigorosos padrões de qualidade. Nossa equipe está
            comprometida em entender as necessidades do mercado agropecuário e
            oferecer soluções inovadoras.
          </p>
          <p className="leading-relaxed text-gray-700">
            Hoje, atendemos clientes em toda a região do Paraná e São Paulo, e
            continuamos expandindo. Estamos orgulhosos de ser mais do que um
            simples revendedor – somos parceiros no sucesso de nossos clientes.
          </p>
        </div>
      </section>

      {/* Números */}
      <section className="to-secondary mb-16 rounded-lg bg-gradient-to-r from-primary py-12 text-white">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
          <div>
            <div className="mb-2 text-4xl font-bold">500+</div>
            <div>Clientes Satisfeitos</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold">8+</div>
            <div>Anos de Experiência</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold">50+</div>
            <div>Produtos no Catálogo</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold">2</div>
            <div>Regiões Atendidas</div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Nossa Equipe</h2>
        <p className="mb-8 text-lg text-gray-700">
          Somos profissionais apaixonados por agricultura e pecuária, dedicados
          a oferecer a melhor experiência possível.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              name: 'João Silva',
              role: 'Fundador & CEO',
              image: '👨‍💼',
            },
            {
              name: 'Maria Santos',
              role: 'Gerente de Operações',
              image: '👩‍💼',
            },
            {
              name: 'Carlos Oliveira',
              role: 'Especialista em Produtos',
              image: '👨‍🔬',
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white p-6 text-center shadow-md"
            >
              <div className="mb-4 text-5xl">{member.image}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="font-semibold text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-800">
          Por que Escolher a AgroForge?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              icon: '✓',
              title: 'Produtos Certificados',
              description:
                'Todos os produtos passam por rigoroso controle de qualidade',
            },
            {
              icon: '🚀',
              title: 'Inovação Constante',
              description:
                'Sempre atualizamos nosso catálogo com novos produtos',
            },
            {
              icon: '💬',
              title: 'Atendimento Personalizado',
              description:
                'Equipe disponível para ajudar com suas necessidades específicas',
            },
            {
              icon: '🌱',
              title: 'Compromisso Ambiental',
              description:
                'Incentivamos práticas sustentáveis em toda a cadeia',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-lg bg-primary py-12 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">
          Quer fazer parte da família AgroForge?
        </h2>
        <p className="mb-6 text-green-100">
          Conheça nossos produtos e começe sua jornada conosco
        </p>
        <Link
          href="/loja"
          className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-primary transition-colors hover:bg-gray-100"
        >
          Explorar Loja →
        </Link>
      </section>
    </div>
  )
}
