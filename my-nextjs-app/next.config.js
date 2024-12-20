const withPWA = require("next-pwa")({
    dest: "public",
    runtimeCaching: [
        {
            urlPattern: /\/api\/.*/,
            handler: "NetworkFirst",
            options: {
                cacheName: "api-cache",
                networkTimeoutSeconds: 10,
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60, // 1 day
                },
            },
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: "CacheFirst",
            options: {
                cacheName: "image-cache",
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                },
            },
        },
    ],
});

module.exports = withPWA({
    reactStrictMode: true,
});
