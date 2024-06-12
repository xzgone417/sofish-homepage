/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/number.js":
/*!**************************!*\
  !*** ./src/js/number.js ***!
  \**************************/
/***/ (() => {

eval("function number(domId, num) {\r\n  var counter = document.getElementById(domId);\r\n  var targetNumber = num; // 目标数字\r\n  var duration = 2000; // 动画持续时间（毫秒）\r\n  var interval = 10; // 更新间隔时间（毫秒）\r\n  var step = Math.ceil(targetNumber / (duration / interval));\r\n  var currentNumber = 0;\r\n\r\n  var timer = setInterval(function () {\r\n    if (currentNumber >= targetNumber) {\r\n      clearInterval(timer);\r\n      return;\r\n    }\r\n\r\n    currentNumber += step;\r\n\r\n    // 防止数字超过目标值\r\n    if (currentNumber > targetNumber) {\r\n      currentNumber = targetNumber;\r\n    }\r\n\r\n    counter.innerText = currentNumber; // 更新数字显示\r\n  }, interval);\r\n}\r\n\r\n// $(function () {\r\n//   $(\"#contact1\").on(\"click\", function () {\r\n//     alert(\"sd\");\r\n//     alert($(\"#email\").val());\r\n//     // var email = $(\"#email\").val();\r\n//     // alert(email);\r\n//     // if (email==''){\r\n//     //     alert(\"aaa\")\r\n//     // }\r\n//     // $.ajax({\r\n//     //     url: \"your-url\",\r\n//     //     method: \"POST\",\r\n//     //     data: $(\"form\").serialize(),\r\n//     //     success: function(response) {\r\n//     //         // 处理请求成功的响应\r\n//     //     },\r\n//     //     error: function(jqXHR, textStatus, errorThrown) {\r\n//     //         // 处理请求出错的情况\r\n//     //     }\r\n//     // });\r\n//   });\r\n// });\r\n\n\n//# sourceURL=webpack://sofishgame-homepage/./src/js/number.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/number.js"]();
/******/ 	
/******/ })()
;