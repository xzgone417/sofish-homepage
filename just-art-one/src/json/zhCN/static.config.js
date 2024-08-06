const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webScripts, enUS_htmls, zhCN_htmls } = require("./libs/package");

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
  staticHtmls: () => {
    const htmls = [...zhCN_htmls, ...enUS_htmls];
    return htmls.map((item) => {
      return new HtmlWebpackPlugin({
        inject: "body",
        template: path.resolve(__dirname, `./src/${item.template}`),
        filename: item.name,
        chunks: ["common", "section", "media-style", ...item.chunks],
        minify: false,
        // scriptLoading: "blocking", // 将scriptLoading属性设置为'blocking'，这样生成的script标签就不会包含defer属性
      });
    });
  },
  // 监听热更html页面
  watchHtmls: () => {
    const htmls = [...zhCN_htmls, ...enUS_htmls];
    return htmls.map((item) => path.resolve(__dirname, `./src/${item.name}`));
  },

  jsonImport: (_fullPath) => {
    let jsonData = {};
    let fullPath = _fullPath.replace(/\\/g, "/");
    const fullDirectory = path.dirname(fullPath);
    let directory = fullDirectory.split("/").pop();
    let baseName = path.basename(fullPath, ".html");
    // let fileNameWithExtension = fullPath.split("/").slice(-2).join("/");
    // let baseName = fileNameWithExtension.replace(/\.html$/, "");
    try {
      const filePath = path.join("src/json", directory, `${baseName}.json`);
      const commonFilePath = path.join("src/json", directory, "common.json");
      const jsonFiles = fs.readFileSync(filePath, "utf8");
      const commonFiles = fs.readFileSync(commonFilePath, "utf8");
      const once_jsonData = JSON.parse(jsonFiles);
      const once_commonData = JSON.parse(commonFiles);
      jsonData = { ...once_commonData, ...once_jsonData };
    } catch (err) {
      console.error(err);
    }
    // const jsonFiles = fs
    //   .readdirSync("src/json")
    //   .filter((file) => file.endsWith(".json"))
    //   .map((file) => path.resolve("src/json", file));
    // // 然后你可以遍历这个jsonFiles数组来使用每个JSON文件
    // jsonFiles.forEach((file) => {
    //   const data = require(file); // 这里会加载并解析JSON文件
    //   console.log(data);
    // });
    return jsonData;
  },
};
