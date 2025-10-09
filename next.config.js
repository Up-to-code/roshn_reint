const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', "fhupmhxzhukzzqunrtur.supabase.co" , "17mm2glo1t.ufs.sh"] ,
    },
};
 
module.exports = withNextIntl(nextConfig);