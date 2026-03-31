import type { NextConfig } from "next";
import { initDns } from "./lib/utils/initDns";

initDns();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
