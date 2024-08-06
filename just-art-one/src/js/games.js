import "$css/games.less";
import ServersDialog from "$components/ServersDialog.svelte";
var switchServerDialog = false;
var theServersDialog = new ServersDialog({
  target: document.getElementById("app-servers-dialog"),
  props: {
    switchServerDialog: switchServerDialog,
  },
});
(function ($) {
  "use strict";
  var mountedMethods = {
    ready: async function () {
      await this.start_the_server_info();
      this.loading_complete();
      this.open_servers_dialog();
    },
    start_the_server_info: async function () {
      // await $.ajax({
      //   url: "/api/recommend",
      //   method: "GET",
      //   success: function (response) {
      //     $.each(response.data, function (index, item) {
      //       // 在某元素内部新增列表元素
      //       $(".product-categories").append(
      //         '<li class="cat-item"> <a href="javascript:;">' +
      //           item.id +
      //           '</a> <span class="count">' +
      //           item.desc +
      //           "</span>  </li>"
      //       );
      //     });
      //   },
      // });
    },
    open_servers_dialog: function (params) {
      $("#open-servers-dialog").on("click", function (event) {
        event.preventDefault();
        switchServerDialog = true;
        theServersDialog.$set({ switchServerDialog: switchServerDialog });
      });
    },
    loading_complete: function () {
      $("#wifi-loader").hide();
      $(".wifi-loader-overlay").hide();
    },
  };
  $(function () {
    mountedMethods.ready();
  });
})(jQuery);
