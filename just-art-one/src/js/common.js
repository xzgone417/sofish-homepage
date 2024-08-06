import "$css/common.less";
import "$css/section.less";
import "$css/dialog.less";
import {
  t,
  locale,
  setupI18n,
  getLocaleFromNavigator,
} from "../service/i18n.js";
(function ($) {
  "use strict";
  var mountedMethods = {
    ready: function () {
      this.to_open_login_popup_link();
      this.login_popup_switch();
      this.to_login_popup_close();
      this.submit_register_form();
      this.submit_login_form();
      this.submit_lost_password_form();
      this.to_change_language();
      // this.loading_timing();
    },
    to_open_login_popup_link: function (params) {
      $("#header-login-link").on("click", function (e) {
        e.preventDefault();
        var classBox = $(this).attr("data-display");
        $(".login-popup" + classBox)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    },
    to_login_popup_close: function (params) {
      $(".popup-close").on("click", function (e) {
        $("#login-dialogs").modal("hide");
      });
    },
    login_popup_switch: function () {
      $(".login-popup").on("click", ".display-box", function (e) {
        e.preventDefault();
        var classBox = $(this).attr("data-display");
        $(".login-popup" + classBox)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    },
    submit_register_form: function (params) {
      $("#registerform").on("submit", function (event) {
        event.preventDefault();
        var input_username = $(this).find("input[name=userName]").val();
        var input_email = $(this).find("input[name=userEmail]").val();
        const yet = { userName: input_username, userEmail: input_email };
        console.log(yet);
      });
    },
    submit_login_form: function (params) {
      $("#loginform").on("submit", function (event) {
        event.preventDefault();
        var input_username = $(this).find("input[name='userName']").val();
        var input_password = $(this).find("input[name='password']").val();
        var rememberMe = $(this)
          .find("input[name='rememberMe']")
          .prop("checked");
        const yet = {
          userName: input_username,
          password: input_password,
          rememberMe: rememberMe,
        };
        console.log(yet);
      });
      $("#loginform .popup-password-eye").on("click", function (event) {
        var passwordInput = $("#loginform").find("input[name='password']");
        if (passwordInput.attr("type") === "password") {
          passwordInput.attr("type", "text");
          $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        } else {
          passwordInput.attr("type", "password");
          $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        }
      });
    },
    submit_lost_password_form: function (params) {
      $("#lostpasswordform").on("submit", function (event) {
        event.preventDefault();
      });
    },
    to_change_language: function () {
      $("#chang-language-en").on("click", function (event) {
        event.preventDefault();
        localStorage.setItem("site_language", "en");
        setupI18n({ lang: "en", name: `common` });
        let pathName = window.location.pathname;
        if (pathName === "/" || !pathName) {
          pathName = "index.html";
        }
        let filePathName = pathName.substring(pathName.lastIndexOf("/") + 1); // 得到 "index.html"
        let roadName = filePathName.substring(0, filePathName.lastIndexOf(".")); // 得到 "index"
        if (roadName.includes("-zhCN")) {
          const newRoadName = roadName.replace(/-zhCN/, "");
          window.open(`./${newRoadName}.html`, "_self");
        } else if (roadName.includes("-zhTW")) {
          const newRoadName = roadName.replace(/-zhTW/, "");
          window.open(`./${newRoadName}.html`, "_self");
        } else {
          // window.open(`./${roadName}.html`, "_self");
        }
      });
      $("#chang-language-zhCN").on("click", function (event) {
        event.preventDefault();
        localStorage.setItem("site_language", "zh-CN");
        setupI18n({ lang: "zh-CN", name: `common` });
        let pathName = window.location.pathname;
        if (pathName === "/" || !pathName) {
          pathName = "index.html";
        }
        let filePathName = pathName.substring(pathName.lastIndexOf("/") + 1); // 得到 "index.html"
        let roadName = filePathName.substring(0, filePathName.lastIndexOf(".")); // 得到 "index"
        if (roadName.includes("-zhCN")) {
          console.log(window.location.pathname, "pp");
        } else if (roadName.includes("-zhTW")) {
          const newRoadName = roadName.replace(/-zhTW/, "");
          window.open(`./${newRoadName}-zhCN.html`, "_self");
        } else {
          window.open(`./${roadName}-zhCN.html`, "_self");
        }
      });
    },
    loading_complete: function () {
      $("#wifi-loader").fadeOut(300, function () {
        $("#wifi-loader").hide();
      });
      $(".wifi-loader-overlay").fadeOut(300, function () {
        $(".wifi-loader-overlay").hide();
      });
    },
    // loading_timing: function () {
    //   $("#wifi-loader").fadeOut(300, function () {
    //     $("#wifi-loader").show();
    //   });
    //   $(".wifi-loader-overlay").fadeOut(300, function () {
    //     $(".wifi-loader-overlay").show();
    //   });
    // },
  };
  $(function () {
    mountedMethods.ready();
    mountedMethods.loading_complete();
  });
})(jQuery);
