const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 引用JS文件
const scripts = [
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
const lib_scripts = [];
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
    let lib_params = {};
    scripts.forEach((name) => {
      params[name] = resolve(__dirname, `./src/js/${name}.js`);
    });
    // lib_scripts.forEach((name) => {
    //   lib_params[name] = resolve(__dirname, `./src/js/libs/${name}.js`);
    // });

    return { ...lib_params, ...params };
  },

  // 重组静态页面文件
  staticHtmls: () =>
    htmls.map((item) => {
      return new HtmlWebpackPlugin({
        inject: "body",
        // hash: true, // 添加hash到脚本标签，用于缓存破坏
        template: resolve(__dirname, `./src/${item.name}`),
        filename: item.name,
        chunks: ["common", "section", "media-style", ...item.chunks],
        minify: false,
        // minify: {
        //   collapseWhitespace: true,
        //   removeComments: true,
        //   removeRedundantAttributes: true,
        //   useShortDoctype: true,
        //   removeEmptyAttributes: true,
        //   removeStyleLinkTypeAttributes: true,
        //   keepClosingSlash: true,
        //   minifyJS: true,
        //   minifyCSS: true,
        //   minifyURLs: true,
        // },
        // transformTemplateContent: (content, config) => {
        //   // 使用正则表达式匹配并保护 <link> 和 <script> 标签
        //   return content.replace(/<(link|script)[^>]*>/g, (match) => {
        //     // 添加注释以防止进一步处理
        //     return `<!-- webpackIgnore: true -->${match}<!-- /webpackIgnore -->`;
        //   });
        // },
        // templateParameters: function (compilation, assets, options) {
        //   const htmlWebpackPlugin = this;
        //   const { htmlWebpackPluginOptions, webpack } = htmlWebpackPlugin;
        //   const originalHtml = htmlWebpackPlugin.options.templateContent;

        //   // 这里你可以对originalHtml进行操作，例如跳过某个代码块
        //   const modifiedHtml = originalHtml.replace(
        //     /<!-- webpack_skip_start -->[\s\S]*<!-- webpack_skip_end -->/,
        //     ""
        //   );
        //   return {
        //     ...options,
        //     compilation,
        //     webpack,
        //     htmlWebpackPlugin,
        //     htmlWebpackPluginOptions,
        //     assets,
        //     // 将修改后的HTML返回给插件
        //     templateContent: () => modifiedHtml,
        //   };
        // },
        // scriptLoading: "blocking", // 将scriptLoading属性设置为'blocking'，这样生成的script标签就不会包含defer属性
      });
    }),
  // 监听热更html页面
  watchHtmls: () =>
    htmls.map((item) => resolve(__dirname, `./src/${item.name}`)),
};
