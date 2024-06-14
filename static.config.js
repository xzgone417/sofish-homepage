const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 引用JS文件
const webScripts = [
  "common",
  "section",
  "index",
  "contact",
  "blogs",
  "games",
  "media-style",
];
// const script_libs = ["bootstrap"."isotope.pkgd"];
// 需要生成的静态页面
const htmls = [
  {
    name: "index.html",
    template: "index.html",
    chunks: ["index"],
  },
  {
    name: "games.html",
    template: "games.html",
    chunks: ["games"],
  },
  {
    name: "blogs.html",
    template: "blogs.html",
    chunks: ["blogs"],
  },
  {
    name: "blogs-2.html",
    template: "blogs.html",
    chunks: ["blogs"],
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
      params[name] = path.resolve(__dirname, `./src/js/${name}.js`);
    });
    return { ...params };
  },

  // 重组静态页面文件
  staticHtmls: () =>
    htmls.map((item) => {
      return new HtmlWebpackPlugin({
        inject: "body",
        template: path.resolve(__dirname, `./src/${item.template}`),
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
    htmls.map((item) => path.resolve(__dirname, `./src/${item.template}`)),
  jsonImport: (fullPath) => {
    let jsonData = {};
    let fileNameWithExtension = path.basename(fullPath);
    let baseName = fileNameWithExtension.replace(/\.html$/, "");
    try {
      const filePath = path.join("src/json", `${baseName}.json`);
      const jsonFiles = fs.readFileSync(filePath, "utf8");
      jsonData = JSON.parse(jsonFiles);
    } catch (err) {
      console.error(err);
    }
    // const jsonFiles = fs
    //   .readdirSync("src/json/index")
    //   .filter((file) => file.endsWith(".json"))
    //   .map((file) => path.resolve("src/json/index", file));
    // 然后你可以遍历这个jsonFiles数组来使用每个JSON文件
    // jsonFiles.forEach((file) => {
    //   const data = require(file); // 这里会加载并解析JSON文件
    //   console.log(data);
    // });
    return jsonData;
  },
};
