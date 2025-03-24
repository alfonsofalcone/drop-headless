/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.drop.it",
        pathname: "/uploads/**", // Percorso delle immagini
      },
    ],
  }
};

export default nextConfig;
