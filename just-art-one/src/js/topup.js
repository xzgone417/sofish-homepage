import "$css/topup.less";
import Topup from "$components/Topup.svelte";
const theTopup = new Topup({
  target: document.getElementById("topup-app"),
});

(function ($) {
  "use strict";
  var mountedMethods = {
    ready: async function () {
      // await this.start_the_server_info();
      // this.open_server_list();
      this.loading_complete();
    },
    //   start_the_server_info: async function () {
    //     await $.ajax({
    //       url: "/api/recommend",
    //       method: "GET",
    //       success: function (response) {
    //         $.each(response.data, function (index, item) {
    //           // 在某元素内部新增列表元素
    //           $(".product-categories").append(
    //             '<li class="cat-item"> <a href="javascript:;">' +
    //               item.id +
    //               '</a> <span class="count">' +
    //               item.desc +
    //               "</span>  </li>"
    //           );
    //         });
    //       },
    //     });
    //   },
    // open_server_list: function (params) {
    //   $("#choose-server-list").on("click", function (params) {
    //     console.log(123);
    //     $("#server-list").toggle();
    //   });
    // },
    loading_complete: function () {
      $("#wifi-loader").hide();
      $(".wifi-loader-overlay").hide();
    },
  };
  $(function () {
    mountedMethods.ready();
  });
})(jQuery);

export default theTopup;
