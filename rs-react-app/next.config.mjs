import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'standalone',
  distDir: './dist',
  images: {
    domains: ['rickandmortyapi.com', 'upload.wikimedia.org'],
  },
};
export default withNextIntl(nextConfig);
