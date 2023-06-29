/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/app',
    env: {
        url: 'https://edcoach.ai/api/',
        per_page:10,
        per_page_list:[10,20,50,100]
      },
      
}

module.exports = nextConfig
