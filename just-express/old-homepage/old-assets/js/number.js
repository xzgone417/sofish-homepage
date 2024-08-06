function number(domId,num){
    var counter = document.getElementById(domId);
    var targetNumber = num; // 目标数字
    var duration = 2000; // 动画持续时间（毫秒）
    var interval = 10; // 更新间隔时间（毫秒）
    var step = Math.ceil(targetNumber / (duration / interval));
    var currentNumber = 0;

    var timer = setInterval(function() {
        if (currentNumber >= targetNumber) {
            clearInterval(timer);
            return;
        }

        currentNumber += step;

        // 防止数字超过目标值
        if (currentNumber > targetNumber) {
            currentNumber = targetNumber;
        }

        counter.innerText = currentNumber; // 更新数字显示
    }, interval);
}


$(document).ready(function (){
    $("#contact1").click(function(){
        alert("sd");
        alert($("#email").val())
        // var email = $("#email").val();
        // alert(email);
        // if (email==''){
        //     alert("aaa")
        // }
        // $.ajax({
        //     url: "your-url",
        //     method: "POST",
        //     data: $("form").serialize(),
        //     success: function(response) {
        //         // 处理请求成功的响应
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         // 处理请求出错的情况
        //     }
        // });
    });
});

