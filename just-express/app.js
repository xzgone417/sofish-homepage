const express = require("express");
const router = require("./router");
const path = require("path");
const bodyParser = require("body-parser");
// const https = require("https");
// const http = require("http");
// const expressSession = require("express-session")
//
const app = express();

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.engine("html", require("express-art-template"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// 这里引用router文件夹下的js文件，
app.use(router);

// 最低优先级，页面不存在
app.all("*", function (req, res) {
  res.redirect("/index");
});
// 错误处理中间件
app.use((err, req, res, next) => {
  res.json({
    code: 2002,
    message: err.message,
  });
});

// template.defaults.minimize = true;
// app.listen(3000, () => {
//   console.log("http://localhost:3000");
// });

app.listen(3077, () => {
  console.log("http://localhost:3077");
});
// http.createServer(app).listen(3011);
// https.createServer(app).listen(3013);
