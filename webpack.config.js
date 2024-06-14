const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const artTemplate = require("art-template");
const {
  entrys,
  staticHtmls,
  watchHtmls,
  jsonImport,
} = require("./static.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// 指定art-template模板路径
artTemplate.defaults.root = resolve(__dirname, "./src");
// 指定模板名称
artTemplate.defaults.extname = ".html";
module.exports = {
  entry: {
    ...entrys(),
  },
  output: {
    filename: "js/[name].js", // 输出到浏览器的文件名，可能与压缩后的文件名不同
    clean: true, // 在生成文件之前清空 output 目录
  },

  module: {
    rules: [
      // MiniCssExtractPlugin.loader 提取CSS为独立文件
      // css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // webpack 将 Less 编译为 CSS 的 loader。
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      // 匹配图片资源，指定构建后存储位置和命名
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i, // 添加 svg 格式
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.art$/,
        use: ["art-template-loader"],
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: "json-loader",
          },
          {
            loader: "file-loader", // 或者 'url-loader'
            options: {
              name: "[name].[ext]",
              outputPath: "assets/json/", // 输出目录
            },
          },
        ],
      },
      // 匹配html页面，并提取内部资源文件
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false, // 不压缩html内容
              preprocessor: (content, loaderContext) => {
                const one_jsonData = jsonImport(loaderContext.resourcePath);
                return artTemplate.compile(content)(one_jsonData);
              },
            },
          },
        ],
      },
      // 将jquery暴露给全局对象（self、window 和 global）
      // {
      //   test: require.resolve("jquery"),
      //   loader: "expose-loader",
      //   options: {
      //     exposes: ["$", "jQuery"],
      //   },
      // },
    ],
  },
  plugins: [
    ...staticHtmls(),
    // 提取css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css", //输出文件
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
  ],
  resolve: {
    alias: {
      // 样式路径目录别名
      $css: resolve(__dirname, "src/css"),
      $json: resolve(__dirname, "src/json"),
    },
  },
  performance: false, // 完全禁用大小限制
  mode: "development",
  devServer: {
    static: {
      // 指定服务运行目录
      directory: resolve(__dirname, "dist"),
    },

    watchFiles: [...watchHtmls()],
    compress: true, //gzip压缩
    port: 3000, //指定端口号
    open: true, //服务启动后自动在浏览器打开
    hot: true, //开启热更
  },
};
