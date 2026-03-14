'use client'

import { useEffect, useState } from 'react'

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
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-gray-900',
    info: 'bg-blue-600 text-white',
  }

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return (
    <div
      className={`fixed right-4 top-4 z-[100] flex items-center gap-3 rounded-lg px-6 py-3 shadow-lg transition-all duration-300 ${
        styles[type]
      } ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <span>{icons[type]}</span>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  )
}
