/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  env: {
    REACT_APP_API_URL: "http://localhost:4000/api/",
    REACT_APP_BACKEND_URL: "http://localhost:4000/",
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
