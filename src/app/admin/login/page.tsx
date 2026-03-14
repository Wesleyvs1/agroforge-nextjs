'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'

export default function LoginAdmin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login, isAuthenticated } = useAdmin()

  if (isAuthenticated) {
    router.push('/admin')
    return null
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (login(username, password)) {
      router.push('/admin')
    } else {
      setError('Usuário ou senha incorretos')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-secondary to-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">🌿</div>
          <h1 className="text-3xl font-bold text-primary">AgroForge</h1>
          <p className="mt-1 text-gray-500">Painel de Administração</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-secondary disabled:opacity-50"
          >
            {loading ? 'Entrando...' : '🔐 Entrar'}
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-center text-xs text-gray-500">
          Credenciais: <code className="rounded bg-gray-200 px-1">admin</code> /{' '}
          <code className="rounded bg-gray-200 px-1">admin@agroforge</code>
        </div>
      </div>
    </div>
  )
}
