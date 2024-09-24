

const nextConfig = {
    // Enable styled-components support in the Next.js compiler
    compiler: {
        styledComponents: true,
    },
    output: 'standalone',
    crossOrigin: 'anonymous',
    reactStrictMode: false,

    // Configure allowed domains for optimized images
    images: {
        domains: ['cms.yourdomain.com', 'localhost'],
        minimumCacheTTL: 60, // Cache images for 60 seconds
        deviceSizes: [640, 750, 1080, 1200, 1920],
        formats: ['image/avif', 'image/webp'],
    },
    transpilePackages: ['@studio-freight/compono'],

    // Custom Webpack configuration
    webpack: (config, { dev }) => {
        if (config.cache && !dev) {
            config.cache = {
                type: 'memory',
            };
        }
        return config;
    },

    // Ignore ESLint errors during builds
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Optimize fonts loading
    optimizeFonts: true,
    experimental: {
        scrollRestoration: true, // Preserve scroll position on route changes
        reactCompiler: true,
        serverActions: true, // Enables Server Actions (concurrent features)
    },
    // Caching for API Routes (Edge and serverless functions)
    // Configuring headers for better caching of API routes and assets
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=59' }, // Cache API responses for 1 day
                ],
            },
            {
                source: '/public/images/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }, // Cache static assets long-term
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }, // Cache Next.js static files
                ],
            },
            {
                source: '/',
                headers: [
                    { key: 'Link', value: '</_next/static/css/styles.css>; rel=preload; as=style' },
                    { key: 'Link', value: '</_next/static/js/main.js>; rel=preload; as=script' },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://cms.yourdomain.com/:path*', // Proxy to external API
            },
        ];
    },

    // Enable SWC minification for faster builds
    swcMinify: true,

    // Bundling optimizations for faster route loading
    optimizeCss: true,   // Enable CSS optimization
    productionBrowserSourceMaps: true,
    // Enable gzip or brotli compression for responses
    compress: true,

    // Enable PWA support with a custom service worker
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
    },
};

export default nextConfig;


