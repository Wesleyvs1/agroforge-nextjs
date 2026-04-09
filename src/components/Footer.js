'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CreditCard, QrCode, Barcode, Facebook, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Brand Logo (Top of Footer) */}
        <div className="mb-10 flex">
          <Image
            src="/images/logo.png"
            alt="AgroForge"
            width={300}
            height={100}
            className="h-20 w-auto object-contain md:h-24"
            loading="lazy"
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1 — Categorias */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Categorias</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/loja?q=café#catalogo"
                  className="transition-colors hover:text-primary"
                >
                  ☕ Café Moído na Hora
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=PRODUTOS%20COLONIAIS#catalogo"
                  className="transition-colors hover:text-primary"
                >
                  🧀 Produtos Coloniais
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=RAÇÃO%20CÃES%20E%20GATOS#catalogo"
                  className="transition-colors hover:text-primary"
                >
                  🐕 Ração Cães e Gatos
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=MEDICAMENTOS#catalogo"
                  className="transition-colors hover:text-primary"
                >
                  💊 Medicamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=FERRAMENTAS#catalogo"
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
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800" title="Cartão de Crédito/Débito">
                <CreditCard className="text-blue-400" size={24} />
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800" title="Pix">
                <QrCode className="text-teal-400" size={24} />
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gray-800" title="Boleto">
                <Barcode className="text-gray-300" size={24} />
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Pague com segurança via Pix, cartão ou boleto.
            </p>
          </div>

          {/* Coluna 4 — Contato & Redes */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Contato</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link
                href="/#localizacao"
                className="group block transition-colors hover:text-primary"
              >
                <p>📍 Rod. dos Minérios, 1949 - Taboão</p>
                <p className="pl-5">Curitiba - PR, 82130-570</p>
              </Link>
              <p>📞 (41) 99195-7593</p>
              <p>📞 (41) 3336-7593</p>
              <p>📧 agroforge@gmail.com</p>
              <p className="mt-1 text-[11px] text-gray-500">
                CNPJ: 37.837.323/0001-44
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-[#1877F2] hover:text-white"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-[#E4405F] hover:text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/5541991957593"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-[#25D366] hover:text-white"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
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
