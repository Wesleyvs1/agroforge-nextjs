'use client'

import { useEffect } from 'react'

function hexToRgb(hex: string) {
  let r = 0,
    g = 0,
    b = 0
  if (!hex) return ''
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16)
    g = parseInt(hex.substring(3, 5), 16)
    b = parseInt(hex.substring(5, 7), 16)
  }
  return `${r} ${g} ${b}`
}

export default function ThemeApplier() {
  const applyTheme = () => {
    const savedColors = localStorage.getItem('site_colors')
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors)
        if (colors.primary) {
          document.documentElement.style.setProperty(
            '--color-primary',
            colors.primary,
          )
          document.documentElement.style.setProperty(
            '--color-primary-rgb',
            hexToRgb(colors.primary),
          )
        }
        if (colors.secondary) {
          document.documentElement.style.setProperty(
            '--color-accent',
            colors.secondary,
          )
          document.documentElement.style.setProperty(
            '--color-accent-rgb',
            hexToRgb(colors.secondary),
          )
        }
        if (colors.dark) {
          document.documentElement.style.setProperty(
            '--color-dark',
            colors.dark,
          )
          document.documentElement.style.setProperty(
            '--color-dark-rgb',
            hexToRgb(colors.dark),
          )
        }
      } catch (e) {}
    }
  }

  useEffect(() => {
    applyTheme()
    window.addEventListener('storage', applyTheme)
    window.addEventListener('theme-changed', applyTheme)

    return () => {
      window.removeEventListener('storage', applyTheme)
      window.removeEventListener('theme-changed', applyTheme)
    }
  }, [])

  return null
}
