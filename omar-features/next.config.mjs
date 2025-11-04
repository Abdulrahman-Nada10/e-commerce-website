import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: __dirname,
    },
    images: {
        // قائمة النطاقات المسموح بها لجلب الصور
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/img/**', // المسار الافتراضي لصور Fake Store API
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                // استخدام '**' للسماح بأي مسار خلف اسم المضيف
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc', // اسم المضيف الجديد
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
