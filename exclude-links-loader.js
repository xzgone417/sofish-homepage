// exclude-links-loader.js
module.exports = function (source) {
  const htmlLoader = require("html-loader");
  let processedSource = source;

  // 排除 <link> 标签
  processedSource = processedSource.replace(/<link[^>]*>/g, (match) => {
    return `<!-- excluded by webpack -->${match}<!-- /excluded by webpack -->`;
  });

  // 使用 html-loader 处理剩下的内容
  return htmlLoader.call(this, processedSource);
};
