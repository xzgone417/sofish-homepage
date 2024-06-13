const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 引用JS文件
const webScripts = [
  "common",
  "section",
  "media-style",
  "number",
  "contact",
  "index",
  "about",
  "blog",
  "games",
];
// const script_libs = ["bootstrap"."isotope.pkgd"];
// 需要生成的静态页面
const htmls = [
  {
    name: "index.html",
    chunks: ["index"],
  },
];
/**
 * 静态页面配置
 */
module.exports = {
  // 重组js入口文件
  entrys: () => {
    let params = {};
    webScripts.forEach((name) => {
      params[name] = resolve(__dirname, `./src/js/${name}.js`);
    });
    return { ...params };
  },

  // 重组静态页面文件
  staticHtmls: () =>
    htmls.map((item) => {
      console.log('🚀XZG ~ htmls.map ~ item:', item);
      return new HtmlWebpackPlugin({
        inject: true,
        template: resolve(__dirname, `./src/${item.name}`),
        filename: item.name,
        chunks: ["common", "section", "media-style", ...item.chunks],
        minify: false,
        // chunksSortMode: "auto",
        // hash: true, // 添加hash到脚本标签，用于缓存破坏
        // scriptLoading: "blocking", // 将scriptLoading属性设置为'blocking'，这样生成的script标签就不会包含defer属性
      });
    }),
  // 监听热更html页面
  watchHtmls: () =>
    htmls.map((item) => resolve(__dirname, `./src/${item.name}`)),
};
