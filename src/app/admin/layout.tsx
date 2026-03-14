'use client'

import { useAdmin } from '@/context/AdminContext'
import { AdminDataProvider } from '@/context/AdminDataContext'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAdmin()
  const router = useRouter()
  const pathname = usePathname()

  // Não proteger a rota de login
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/admin/login')
    return null
  }

  return (
    <AdminDataProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </AdminDataProvider>
  )
}
