'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/context/CartContext'
import { AdminProvider } from '@/context/AdminContext'
import { AdminDataProvider } from '@/context/AdminDataContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminDataProvider>
        <CartProvider>{children}</CartProvider>
      </AdminDataProvider>
    </AdminProvider>
  )
}
