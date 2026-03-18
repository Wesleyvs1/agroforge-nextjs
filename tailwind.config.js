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
          DEFAULT: '#2D5A27', // Sap Green (Forte, Natural)
          light: '#4C8A44',
          dark: '#1A3317',
        },
        accent: {
          DEFAULT: '#C46D29', // Rust/Copper (Terra, Tradição)
          light: '#E18C4D',
        },
        surface: {
          DEFAULT: '#F8F6F2', // Paper/Clay (Orgânico)
          alt: '#EBE7DF',
        },
        dark: '#141E11',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
