/** @type {import('next').NextConfig} */
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);// // 获取当前模块的文件路径
// const __dirname = path.dirname(__filename);// // 获取当前文件的目录路径

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "standalone",
  reactStrictMode: !isProd, // 在生产环境中禁用 StrictMode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.cdn.adventurecity.sofishgame.com",
        port: "",
        pathname: "/webh5/**",
      },
      {
        protocol: "http",
        hostname: "tmp-test.sofishgame.com",
        port: "",
        pathname: "/public/images/**",
      },
    ],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.js$/,
  //     // exclude: /node_modules/,
  //     use: {
  //       loader: "babel-loader",
  //       options: {
  //         presets: ["@babel/preset-env"],
  //       },
  //     },
  //   });
  //   return config;
  // },
  webpack: (config, { dev, isServer }) => {
    // 使用 esbuild-loader 处理 JS/TS 文件，包括 node_modules
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules/, // 确保处理 node_modules 中的文件
      use: {
        loader: "esbuild-loader",
        options: {
          loader: "jsx", // 处理 JS/JSX 文件，或者 ts/tsx
          target: "es2015", // 你可以根据需要调整目标版本
        },
      },
    });

    // 如果是生产模式，使用 ESBuildMinifyPlugin 压缩代码
    // if (!dev && !isServer) {
    //   config.plugins.push(new ESBuildPlugin());
    // }
    return config;
  },
};

export default nextConfig;
