const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', "fhupmhxzhukzzqunrtur.supabase.co"],
    },
};
 
module.exports = withNextIntl(nextConfig);