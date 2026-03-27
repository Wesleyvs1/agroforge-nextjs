'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAdmin } from '@/context/AdminContext'
import { Leaf, Lock, User } from 'lucide-react'

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
    <div className="flex min-h-screen items-center justify-center bg-stone-950 p-4">
      {/* Subtle background grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950" />

      <div className="relative w-full max-w-[380px]">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <Image 
              src="/images/logo.png" 
              alt="AgroForge" 
              width={320} 
              height={100} 
              className="h-24 w-auto object-contain" 
            />
          </div>
          <p className="mt-2 text-[13px] text-stone-500 uppercase tracking-widest font-semibold">
            Painel de Administração
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-500">
                Usuário
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] py-3 pl-10 pr-4 text-[14px] text-stone-200 placeholder:text-stone-600 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-500">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] py-3 pl-10 pr-4 text-[14px] text-stone-200 placeholder:text-stone-600 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-[12px] font-medium text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3 text-[13px] font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2.5 text-center text-[11px] text-stone-600">
            Credenciais:{' '}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-stone-400">
              admin
            </code>{' '}
            /{' '}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-stone-400">
              admin@agroforge
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
