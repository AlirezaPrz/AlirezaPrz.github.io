import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    remotePatterns: [
      // Letterboxd posters (from the RSS feed)
      { protocol: "https", hostname: "a.ltrbxd.com" },
      // Last.fm album art (both hosts are in use)
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" },
      { protocol: "https", hostname: "lastfm-img.freetls.fastly.net" },
      // Favourite film posters (Wikipedia)
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
}

export default nextConfig
