'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose: () => void
}

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const styles = {
    success: 'border-emerald-200/60 bg-emerald-50 text-emerald-800',
    error: 'border-red-200/60 bg-red-50 text-red-800',
    warning: 'border-amber-200/60 bg-amber-50 text-amber-800',
    info: 'border-blue-200/60 bg-blue-50 text-blue-800',
  }

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const iconColors = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  }

  const Icon = icons[type]

  return (
    <div
      className={`fixed right-4 top-4 z-[100] flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-lg transition-all duration-300 ${
        styles[type]
      } ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <Icon size={18} className={iconColors[type]} />
      <span className="text-[13px] font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 rounded-lg p-0.5 opacity-50 transition-opacity hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  )
}
