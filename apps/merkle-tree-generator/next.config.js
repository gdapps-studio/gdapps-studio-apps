/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? "../static/wasm/c580fd4adb2b3c63.wasm"
        : "static/wasm/c580fd4adb2b3c63.wasm";

    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
  turbopack: {},
};

export default nextConfig;
