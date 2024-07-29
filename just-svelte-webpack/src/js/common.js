import "$css/common.less";
import "$css/section.less";
import "$css/dialog.less";

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
      // $("#bp-popup-login #loginform").on("submit", function (event) {
      //   var elem = $("#bp-popup-login"),
      //     input_username = elem.find("#bp_login_name").val(),
      //     input_password = elem.find("#bp_login_pass").val();
      //   if (input_username === "" || input_password === "") {
      //     return;
      //   }
      //   elem.addClass("loading");
      //   elem.find(".message").slideDown().remove();
      //   // var data = {
      //   //   action: "builderpress_login_ajax",
      //   //   username: input_username,
      //   //   password: input_password,
      //   //   remember: elem.find("#rememberme").val(),
      //   // };
      //   // $.post(ajaxurl, data, function (res) {
      //   //   try {
      //   //     var response = JSON.parse(res);
      //   //     elem.find(".login-popup .inner-login").append(response.message);
      //   //     if (response.code === "1") {
      //   //       location.reload();
      //   //     }
      //   //     elem.removeClass("loading");
      //   //   } catch (e) {
      //   //     return false;
      //   //   }
      //   // });
      //   event.preventDefault();
      //   return false;
      // });
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
    loading_complete: function () {
      $("#wifi-loader").fadeOut(300, function () {
        $("#wifi-loader").hide();
      });
      $("#wifi-loader-overlay").fadeOut(300, function () {
        $("#wifi-loader-overlay").hide();
      });
    },
  };
  $(function () {
    mountedMethods.ready();
    mountedMethods.loading_complete();
  });
})(jQuery);
