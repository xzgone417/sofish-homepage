module.exports = {
  // 引用JS文件
  webScripts: [
    "common",
    "index",
    "blogs",
    "games",
    "topup",
    "user-center",
    "gift-center",
    "single-blog",
    "media-style",
  ],
  // 需要生成的静态页面
  enUS_htmls: [
    {
      name: "index.html",
      template: "view/index.html",
      chunks: ["index"],
    },
    {
      name: "games.html",
      template: "view/games.html",
      chunks: ["games"],
    },
    {
      name: "blogs.html",
      template: "view/blogs.html",
      chunks: ["blogs"],
    },
    {
      name: "blogs-2.html",
      template: "view/blogs-2.html",
      chunks: ["blogs"],
    },
    {
      name: "single-blog-01.html",
      template: "view/single-blog-01.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-02.html",
      template: "view/single-blog-02.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-03.html",
      template: "view/single-blog-03.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-04.html",
      template: "view/single-blog-04.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-05.html",
      template: "view/single-blog-05.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-06.html",
      template: "view/single-blog-06.html",
      chunks: ["single-blog"],
    },
    {
      name: "topup.html",
      template: "view/topup.html",
      chunks: ["topup"],
    },
    {
      name: "user-center.html",
      template: "view/user-center.html",
      chunks: ["user-center"],
    },
    {
      name: "gift-center.html",
      template: "view/gift-center.html",
      chunks: ["gift-center"],
    },
    {
      name: "recharge-order.html",
      template: "view/recharge-order.html",
      chunks: ["recharge-order"],
    },
  ],
  zhCN_htmls: [
    {
      name: "index-zhCN.html",
      template: "zhCN/index.html",
      chunks: ["index"],
    },
    {
      name: "games-zhCN.html",
      template: "zhCN/games.html",
      chunks: ["games"],
    },
    {
      name: "blogs-zhCN.html",
      template: "zhCN/blogs.html",
      chunks: ["blogs"],
    },
    {
      name: "blogs-2-zhCN.html",
      template: "zhCN/blogs-2.html",
      chunks: ["blogs"],
    },
    {
      name: "single-blog-01-zhCN.html",
      template: "zhCN/single-blog-01.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-02-zhCN.html",
      template: "zhCN/single-blog-02.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-03-zhCN.html",
      template: "zhCN/single-blog-03.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-04-zhCN.html",
      template: "zhCN/single-blog-04.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-05-zhCN.html",
      template: "zhCN/single-blog-05.html",
      chunks: ["single-blog"],
    },
    {
      name: "single-blog-06-zhCN.html",
      template: "zhCN/single-blog-06.html",
      chunks: ["single-blog"],
    },
  ],
};
