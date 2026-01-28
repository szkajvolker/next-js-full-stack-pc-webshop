import type { NextConfig } from "next";
import { initDns } from "./lib/utils/initDns";

initDns();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
