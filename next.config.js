/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Compressão e otimização de produção
  compress: true,
  // Otimização de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.awsli.com.br',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'hwhvspuenanqyoiqcnop.supabase.co',
      },
    ],
    // Formatos de imagem otimizados
    formats: ['image/avif', 'image/webp'],
    // Cache de imagens por 1 ano
    minimumCacheTTL: 31536000,
    // Limite de imagens por página
    dangerouslyAllowSVG: false,
  },
  // Otimização de headers de cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache estático por 1 ano
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache para imagens públicas
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable',
          },
        ],
      },
    ]
  },
  // Otimização de webpack
  webpack: (config, { isServer }) => {
    // Tree shaking mais agressivo
    config.optimization.usedExports = true
    // Minimização melhorada
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  // Experimental features para performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'cheerio'],
  },
}

module.exports = nextConfig
