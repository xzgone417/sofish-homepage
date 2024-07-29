import "$css/games.less";
import Header from "$components/Header.svelte";
import Dialogs from "$components/Dialogs.svelte";
import Footer from "$components/Footer.svelte";
import GamesApp from "$templates/GamesApp.svelte";
new Header({
  target: document.getElementById("app-header"),
});
new Dialogs({
  target: document.getElementById("app-dialogs"),
});
new Footer({
  target: document.getElementById("app-footer"),
});
new GamesApp({
  target: document.getElementById("games-app"),
});
(function ($) {
  "use strict";
  var mountedMethods = {
    ready: async function () {
      // await this.start_the_server_info();
      this.loading_complete();
    },
    start_the_server_info: async function () {
      await $.ajax({
        url: "/api/recommend",
        method: "GET",
        success: function (response) {
          $.each(response.data, function (index, item) {
            // 在某元素内部新增列表元素
            $(".product-categories").append(
              '<li class="cat-item"> <a href="javascript:;">' +
                item.id +
                '</a> <span class="count">' +
                item.desc +
                "</span>  </li>"
            );
          });
        },
      });
    },
    loading_complete: function () {
      $("#wifi-loader").hide();
      $("#wifi-loader-overlay").hide();
    },
  };
  $(function () {
    mountedMethods.ready();
  });
})(jQuery);
