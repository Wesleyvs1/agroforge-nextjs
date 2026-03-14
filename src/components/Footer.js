import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Seção 1 */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary">AgroForge</h3>
            <p className="text-sm text-gray-400">
              Sua loja agropecuária de confiança com produtos de qualidade e
              atendimento personalizado.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://wa.me/5543999998888"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                WhatsApp
              </a>
              <a
                href="tel:+5543999998888"
                className="transition-colors hover:text-primary"
              >
                Telefone
              </a>
            </div>
          </div>

          {/* Seção 2 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Links Úteis</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/loja"
                  className="transition-colors hover:text-primary"
                >
                  Loja
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="transition-colors hover:text-primary"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="transition-colors hover:text-primary"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Seção 3 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Informações</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Almirante Tamandaré - PR</li>
              <li>📞 (43) 3526-7890</li>
              <li>💬 WhatsApp: (43) 99999-8888</li>
              <li>📧 contato@agroforge.com.br</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-8 text-sm text-gray-400 md:flex-row">
          <p>
            Copyright © {currentYear}{' '}
            <strong className="text-white">AgroForge</strong>. Todos os direitos
            reservados.
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link
              href="/paginas#termos"
              className="transition-colors hover:text-primary"
            >
              Termos e Condições
            </Link>
            <Link
              href="/paginas#privacidade"
              className="transition-colors hover:text-primary"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
