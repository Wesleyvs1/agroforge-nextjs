'use client'

import { useAdmin } from '@/context/AdminContext'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAdmin()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f5]">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <Image
              src="/images/logo.png"
              alt="AgroForge"
              width={200}
              height={50}
              className="h-14 w-auto animate-pulse object-contain"
            />
          </div>
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-[3px] border-stone-200 border-t-primary"></div>
          <p className="text-[13px] font-medium text-stone-400">
            Carregando painel...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/admin/login')
    return null
  }

  return (
    <div className="flex min-h-screen bg-[#f8f7f5]">
      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
