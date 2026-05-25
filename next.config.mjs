/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb', 'mongoose'],

  // Compress responses
  compress: true,

  // Image optimization
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.cloudflarestorage.com' },
      { protocol: 'https', hostname: 'pub-ef870e8af3bd4d27b398c74259f23059.r2.dev' },
    ],
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ];
  },

  webpack: (config, { dev }) => {
    // Only apply custom splitChunks in production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
