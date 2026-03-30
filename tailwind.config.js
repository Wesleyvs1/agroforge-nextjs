/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary-rgb, 45 90 39) / <alpha-value>)', // #2D5A27
          light: '#4C8A44',
          dark: '#1A3317',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent-rgb, 196 109 41) / <alpha-value>)', // #C46D29
          light: '#E18C4D',
        },
        surface: {
          DEFAULT: '#F8F6F2', // Paper/Clay (Orgânico)
          alt: '#EBE7DF',
        },
        dark: 'rgb(var(--color-dark-rgb, 20 30 17) / <alpha-value>)', // #141E11
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
