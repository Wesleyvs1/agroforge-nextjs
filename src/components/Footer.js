import Link from 'next/link'
import Image from 'next/image'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Brand Logo (Top of Footer) */}
        <div className="mb-10 flex">
          <Image 
            src="/images/logo.png" 
            alt="AgroForge" 
            width={300} 
            height={100} 
            className="h-20 w-auto object-contain md:h-24" 
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1 — Categorias */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Categorias</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/loja"
                  className="transition-colors hover:text-primary"
                >
                  ☕ Café Moído na Hora
                </Link>
              </li>
              <li>
                <Link
                  href="/loja"
                  className="transition-colors hover:text-primary"
                >
                  🧀 Produtos Coloniais
                </Link>
              </li>
              <li>
                <Link
                  href="/loja"
                  className="transition-colors hover:text-primary"
                >
                  🐕 Rações Pet
                </Link>
              </li>
              <li>
                <Link
                  href="/loja"
                  className="transition-colors hover:text-primary"
                >
                  💊 Medicamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/loja"
                  className="transition-colors hover:text-primary"
                >
                  🔧 Ferramentas
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2 — Sobre AgroForge */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">
              Sobre AgroForge
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/sobre"
                  className="transition-colors hover:text-primary"
                >
                  Quem Somos
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
                  href="/fornecedores"
                  className="transition-colors hover:text-primary"
                >
                  Fornecedores
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
              <li>
                <Link
                  href="/paginas#termos"
                  className="transition-colors hover:text-primary"
                >
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Formas de Pagamento */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Pagamento</h3>
            <div className="flex flex-wrap gap-3 text-gray-400">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800">
                <i className="fa-brands fa-cc-visa text-xl text-blue-400"></i>
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800">
                <i className="fa-brands fa-cc-mastercard text-xl text-orange-400"></i>
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800">
                <i className="fa-brands fa-pix text-xl text-teal-400"></i>
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800">
                <i className="fa-solid fa-barcode text-xl text-gray-300"></i>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Pague com segurança via Pix, cartão ou boleto.
            </p>
          </div>

          {/* Coluna 4 — Contato & Redes */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">
              Contato
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📍 Rod. dos Minérios, 1949 - Taboão</p>
              <p className="pl-5">Curitiba - PR, 82130-570</p>
              <p>📞 (41) 99195-7593</p>
              <p>📞 (41) 3336-7593</p>
              <p>📧 agroforge@gmail.com</p>
              <p className="mt-1 text-[11px] text-gray-500">CNPJ: 37.837.323/0001-44</p>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary hover:text-white"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary hover:text-white"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/5541991957593"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
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
