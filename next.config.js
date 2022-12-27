/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
		return [
			{
				source: "/:path*",
				destination: "https://openapi.naver.com/:path*",
			},
		];
}
}

module.exports = nextConfig
