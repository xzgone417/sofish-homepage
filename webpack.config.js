const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const artTemplate = require("art-template");
const { entrys, staticHtmls, watchHtmls } = require("./static.config");
const htmlData = require("./html.data.json");
// const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// 指定art-template模板路径
artTemplate.defaults.root = resolve(__dirname, "./src");
// 指定模板名称
artTemplate.defaults.extname = ".html";

module.exports = {
  entry: {
    // jquery: ["jquery"],
    ...entrys(),
  },
  output: {
    filename: "js/[name].js", // 输出到浏览器的文件名，可能与压缩后的文件名不同
    // publicPath: "dist/public", // 输出文件的URL路径
    // path: resolve(__dirname, "dist"), // 输出文件的目录
    // libraryTarget: "umd", // 或者根据你的需求选择libraryTarget
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
      // 匹配html页面，并提取内部资源文件
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        // use: [
        // {
        loader: "html-loader",
        options: {
          minimize: false, // 不压缩html内容
          preprocessor: (content, loaderContext) => {
            return artTemplate.compile(content)(htmlData);
          },
        },
        // },
        // {
        //   loader: resolve(__dirname, "exclude-links-loader.js"),
        //   options: {
        //     minimize: false, // 不压缩html内容
        //     preprocessor: (content, loaderContext) => {
        //       return artTemplate.compile(content)(htmlData);
        //     },
        //   },
        // },
        // ],
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
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       test: /\.js$/,
  //       exclude: /\.min\.js$/,
  //       // 这里使用正则表达式，匹配所有非".min.js"结尾的.js文件
  //       // filename: "[name]..min.js",
  //     }),
  //   ],
  // },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
    ...staticHtmls(),
    // 提取css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css", //输出文件
    }),
  ],
  resolve: {
    alias: {
      // 样式路径目录别名
      $css: resolve(__dirname, "src/css"),
    },
  },
  performance: false, // 完全禁用大小限制
  mode: "production",
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
