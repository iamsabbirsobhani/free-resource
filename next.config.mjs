/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "img.freepik.com",
            "pub-5da859198666414bbca8c7866fa6d266.r2.dev",
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
