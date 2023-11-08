/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG:true,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            }, {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
