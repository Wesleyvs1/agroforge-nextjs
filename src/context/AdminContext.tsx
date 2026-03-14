'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminUser {
  id: string
  username: string
  role: 'admin' | 'editor'
}

interface AdminContextType {
  isAuthenticated: boolean
  user: AdminUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação ao carregar
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth')
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth)
        setUser(parsed)
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem('admin_auth')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    // TODO: Trocar por API real depois (NextAuth)
    if (username === 'admin' && password === 'admin@agroforge') {
      const adminUser: AdminUser = {
        id: '1',
        username: 'Admin',
        role: 'admin',
      }
      setUser(adminUser)
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', JSON.stringify(adminUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de AdminProvider')
  }
  return context
}
