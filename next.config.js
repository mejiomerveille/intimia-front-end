/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: [
      'images.unsplash.com',
    ]
  },
  //  i18n: {
  //   defaultLocale: 'gb',
  //   locales: ['fr', 'gb'],
  // },
  // reloadOnPrerender: process.env.NODE_ENV === 'development',
}
