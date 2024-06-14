import "$css/thim.less";
import "$css/about.less";
import "$css/contact.less";
(function ($) {
  $(function () {
    thim_startertheme.contact();
  });
  var thim_startertheme = {
    contact: function () {
      $("#contact").on("click", function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var subject = $("#subject").val();
        var msg = $("#msg").val();
        var regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var pregex = /^\d+$/;
        if (name == "") {
          $("#nameerr")
            .attr("style", "color:red")
            .text("Please fill in the name correctly");
          return;
        } else {
          $("#nameerr").text("");
        }
        if (!regex.test(email)) {
          $("#emailerr")
            .attr("style", "color:red")
            .text("Please fill in the email correctly");
          return;
        } else {
          $("#emailerr").text("");
        }
        if (!pregex.test(phone)) {
          $("#phoneerr")
            .attr("style", "color:red")
            .text("Please fill in the phone correctly");
          return;
        } else {
          $("#phoneerr").text("");
        }
        var DataObj = {};
        DataObj.name = name;
        DataObj.email = email;
        DataObj.phone = phone;
        DataObj.subject = subject;
        DataObj.message = msg;
        $.ajax({
          url: "/app/v1/homepage/contact",
          method: "POST",
          contentType: "application/json",
          // dataType: "json",
          data: JSON.stringify(DataObj),
          success: function (response) {
            // 处理请求成功的响应
            alert("提交成功");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // 处理请求出错的情况
          },
        });
      });
    },
  };
})(jQuery);
