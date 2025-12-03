/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ensure Turbopack uses this project directory as the root. This silences
  // the "inferred workspace root" warning when multiple lockfiles exist.
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
