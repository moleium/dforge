/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['highlight.js'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
      '@components': './src/components',
      '@lib': './src/lib',
      '@styles': './src/app',
      '@highlight': './src/highlight',
      '@parser': './src/parser',
      '@previewer': './src/previewer'
    }
    return config
  },
  output: 'export',
  basePath: '/dforge'
}

module.exports = nextConfig