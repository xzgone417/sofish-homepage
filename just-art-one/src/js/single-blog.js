import "$css/single-blog.less";

// 等待页面加载完成
$(function () {
  // 获取需要检测的元素
  $("#facebook-link").on("click", function () {
    console.log("fb");
    window.open(
      "http://www.facebook.com/sharer.php?u=" +
        encodeURIComponent(window.location.href) +
        "&t=" +
        encodeURIComponent(document.title)
      //   "newWindow",
      //   "width=80, height=400",
      //   "center"
    );
    return false;
  });
  $("#twitter-link").on("click", function () {
    // let metaArr = [
    //   "twitter:url",
    //   "http://java.chendahai.cn",
    //   "twitter:site",
    //   "http://java.chendahai.cn",
    //   "twitter:title",
    //   "this is title",
    //   "twitter:description",
    //   "this is desc",
    //   "twitter:card",
    //   "summary_large_image",
    //   "twitter:image",
    //   "http://gg.chendahai.cn/static/image/pkq.jpg",
    // ];
    let metaParams = metaArr.toString();
    // 需要encode两次 因为浏览器会自动decode一次，另一次是服务端会decode
    metaParams = encodeURIComponent(encodeURIComponent(metaParams));
    window.open(
      `https://twitter.com/share?text=${
        document.title
      }&url=${encodeURIComponent(window.location.href)}`
    );
    return false;
  });
  $("#google-link").on("click", function () {
    console.log("fb");
    return false;
  });
});
