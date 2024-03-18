/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fruitshop2-predic8.azurewebsites.net",
      },
    ],
  },
};

export default nextConfig;
