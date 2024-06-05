// 引用模板和中间件
const express = require("express");

// 导入model中的js例如
// 挂载中间件

const path = require("path");

const router = express.Router();

// 渲染页面，浏览器api获取本地资源然后渲染上浏览器画面
router.get("/", (req, res) => {
  res.redirect("/index");
});
router.get("/index", (req, res) => {
  res.render("index.html");
});
router.get("/about", (req, res) => {
  res.render("about/about.html");
});
router.get("/games", (req, res) => {
  res.render("about/games.html");
});
router.get("/contact", (req, res) => {
  res.render("about/contact.html");
});
router.get("/blog", (req, res) => {
  res.render("about/blog.html");
});
router.get("/blog-01", (req, res) => {
  res.render("blog/blog-01.html");
});
router.get("/single-blog", (req, res) => {
  res.render("blog/single-blog.html");
});
router.get("/single-blog-01", (req, res) => {
  res.render("blog/single-blog-01.html");
});
router.get("/single-blog-02", (req, res) => {
  res.render("blog/single-blog-02.html");
});
router.get("/single-blog-03", (req, res) => {
  res.render("blog/single-blog-03.html");
});
router.get("/single-blog-04", (req, res) => {
  res.render("blog/single-blog-04.html");
});
router.get("/single-blog-05", (req, res) => {
  res.render("blog/single-blog-05.html");
});
router.get("/single-blog-06", (req, res) => {
  res.render("blog/single-blog-06.html");
});
router.get("/test", (req, res) => {
  res.render("model/test.html");
});
// router.get("/list-authors", (req, res) => {
//   res.render("list/list-authors.html");
// });
// router.get("/list-videos", (req, res) => {
//   res.render("list/list-videos.html");
// });
// router.get("/single-shop", (req, res) => {
//   res.render("single/single-shop.html");
// });
// router.get("/single-video", (req, res) => {
//   res.render("single/single-video.html");
// });
// router.get("/submit-video", (req, res) => {
//   res.render("single/submit-video.html");
// });

module.exports = router;
