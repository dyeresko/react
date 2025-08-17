/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: './dist',
  images: {
    domains: ['rickandmortyapi.com', 'upload.wikimedia.org'],
  },
};
export default nextConfig;
