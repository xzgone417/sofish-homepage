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
  "single-blog",
  "media-style",
];
// 需要生成的静态页面
const htmls = [
  {
    name: "index.html",
    chunks: ["index"],
  },
  {
    name: "games.html",
    chunks: ["games"],
  },
  {
    name: "blogs.html",
    chunks: ["blogs"],
  },
  {
    name: "contact.html",
    chunks: ["contact"],
  },
  {
    name: "blogs-2.html",
    chunks: ["blogs"],
  },
  {
    name: "single-blog-01.html",
    chunks: ["single-blog"],
  },
  {
    name: "single-blog-02.html",
    chunks: ["single-blog"],
  },
  {
    name: "single-blog-03.html",
    chunks: ["single-blog"],
  },
  {
    name: "single-blog-04.html",
    chunks: ["single-blog"],
  },
  {
    name: "single-blog-05.html",
    chunks: ["single-blog"],
  },
  {
    name: "single-blog-06.html",
    chunks: ["single-blog"],
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
        template: path.resolve(__dirname, `./src/${item.name}`),
        filename: item.name,
        chunks: ["common", "section", "media-style", ...item.chunks],
        minify: false,
        // scriptLoading: "blocking", // 将scriptLoading属性设置为'blocking'，这样生成的script标签就不会包含defer属性
      });
    }),
  // 监听热更html页面
  watchHtmls: () =>
    htmls.map((item) => path.resolve(__dirname, `./src/${item.name}`)),
  jsonImport: (fullPath) => {
    let jsonData = {};
    let fileNameWithExtension = path.basename(fullPath);
    let baseName = fileNameWithExtension.replace(/\.html$/, "");
    try {
      const filePath = path.join("src/json", `${baseName}.json`);
      const jsonFiles = fs.readFileSync(filePath, "utf8");
      const commonFiles = fs.readFileSync("src/json/common.json", "utf8");
      const once_jsonData = JSON.parse(jsonFiles);
      const once_commonData = JSON.parse(commonFiles);
      jsonData = { ...once_commonData, ...once_jsonData };
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
