/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // قائمة النطاقات المسموح بها لجلب الصور
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/img/**', // المسار الافتراضي لصور Fake Store API
            },
        ],
    },
};

export default nextConfig;
