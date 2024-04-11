/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'http', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: "img.clerk.com" },
            { protocol: 'http', hostname: "img.clerk.com" },
        ]
    }
};

export default nextConfig;
