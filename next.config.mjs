
/**
 * @type {import('next').NextConfig}
 * @description Configuration options for the Next.js application.
 */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      'media.istockphoto.com', 
      'firebasestorage.googleapis.com', 
      'storage.googleapis.com',
      'cdn.chotot.com',
      'images.unsplash.com'
    ],
  },
};

export default nextConfig;
