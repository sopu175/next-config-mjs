# Next.js 14 Project Configuration

This project is built using **Next.js 14**, offering a highly performant, scalable, and maintainable web application structure. Below are some of the core configurations implemented to optimize the project.

## Key Features

- **Styled-Components Support**: Styled-components are enabled to allow writing actual CSS syntax in JavaScript, ensuring seamless styling and theming.
  
  ```javascript
  compiler: {
      styledComponents: true,
  }```
- **Standalone Build: The project is output as a standalone application for easy deployment across different environments.
  
  ```
  output: 'standalone',
  ```
- **Optimized Image Handling: Configured image domains for optimized images, cache settings, device sizes, and preferred formats like avif and webp.
```
images: {
    domains: ['yourdomain.com.au', 'localhost'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 1080, 1200, 1920],
    formats: ['image/avif', 'image/webp'],
}
```
- **Caching Strategy: Custom caching for static assets and API routes for better performance.
```
async headers() {
    return [
        {
            source: '/api/:path*',
            headers: [
                { key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=59' },
            ],
        },
        {
            source: '/public/images/static/:path*',
            headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
        },
        {
            source: '/_next/static/:path*',
            headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
        },
    ];
}

```
- **API Route Rewrites: Proxy API requests to an external CMS to separate frontend and backend concerns.

 ```
  async rewrites() {
    return [
        {
            source: '/api/:path*',
            destination: 'https://cms.yourdomain.com/:path*',
        },
    ];
}
```
- **Webpack Customization: Memory-based caching is enabled for optimized performance in production.
```
webpack: (config, { dev }) => {
    if (config.cache && !dev) {
        config.cache = {
            type: 'memory',
        };
    }
    return config;
}
```
- **SWC Minification: Enabled for faster builds and code optimization.
```
swcMinify: true,
```
- ***CSS & Font Optimization: CSS optimization is enabled, and fonts are loaded asynchronously to enhance performance.
```
optimizeCss: true,
optimizeFonts: true,
```
- **PWA Support: Progressive Web App (PWA) support is enabled, with a custom service worker caching strategy to provide offline capabilities.
```
pwa: {
    dest: 'public',
    runtimeCaching: [
        {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'https-cache',
                expiration: {
                    maxEntries: 200,
                },
            },
        },
    ],
}
```
- **Scroll Restoration: Maintains scroll position on route changes, improving user experience.
```
experimental: {
    scrollRestoration: true,
}
```

##Development & Build Setup
- **Clone the repository
```
git clone https://github.com/your-repo.git
```
- **Install dependencies
```
npm install
```
- **Run the development server
```
npm run dev
```
- **Build for production
```
npm run build
```
- **Start the production server
```
npm start
```

##Linting & ESLint
- **ESLint errors are ignored during production builds for faster deploys.
```
eslint: {
    ignoreDuringBuilds: true,
}
```
```

Feel free to adjust any parts to better suit your project, especially the repository link and any specific project details.

```
