// import '../css/index.less';
// 替换为
import "$css/index.less";
// import games from "../json/games.json";
// import template from "../index-template.art";
// document.getElementById("template").innerHTML = template({ games });
(function ($) {
  "use strict";
  var mountedMethods = {
    ready: function () {
      this.scroll_window();
      this.magnific_popup_video();
    },
    scroll_window: function (params) {
      const targetElement = $("#news-feed");
      let hasBeenTriggered = false;
      $(window).on("scroll", function () {
        // 获取元素相对于视口的位置信息
        const elementTop = targetElement.offset().top;
        const elementBottom = elementTop + targetElement.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        // 判断元素是否完全进入视口且事件尚未触发过
        if (
          elementTop >= viewportTop &&
          elementBottom <= viewportBottom &&
          !hasBeenTriggered
        ) {
          // 元素完全进入视口，执行你的逻辑
          $(".slide-slick").slick("slickNext");
          hasBeenTriggered = true;
        }
      });
    },
    magnific_popup_video: function () {
      try {
        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
          disableOn: 700,
          type: "iframe",
          iframe: {
            patterns: {
              youtube: {
                index: "youtube.com/",
                id: function (url) {
                  var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                  if (!m || !m[1]) return null;
                  return m[1];
                },
                src: "https://www.youtube.com/embed/%id%?autoplay=1",
              },
            },
          },
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      } catch (er) {
        console.error(er);
      }
    },
  };
  $(function () {
    mountedMethods.ready();
  });
})(jQuery);
