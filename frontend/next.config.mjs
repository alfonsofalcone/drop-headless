/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Specifica la porta del server Strapi
        pathname: "/uploads/**", // Percorso delle immagini
      },
    ],
  },
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
    localeDetection: false,
  }
};

export default nextConfig;
