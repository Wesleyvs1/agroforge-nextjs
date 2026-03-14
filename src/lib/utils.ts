import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge tailwind classes with conditional logic.
 * Standard in modern Next.js / Tailwind projects.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
