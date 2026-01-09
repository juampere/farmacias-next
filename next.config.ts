import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
});

const nextConfig: NextConfig = {
  // Aquí podés agregar otras opciones de Next.js si las tenés
};

export default withPWA(nextConfig);