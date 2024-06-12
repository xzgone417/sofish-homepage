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

/***/ "./src/js/contact.js":
/*!***************************!*\
  !*** ./src/js/contact.js ***!
  \***************************/
/***/ (() => {

eval("(function ($) {\r\n    $(function () {\r\n      thim_startertheme.contact();\r\n    });\r\n    // $(\"#contact\").click(function(){\r\n    //     thim_startertheme.contact();\r\n    // });\r\n    // $(window).load(function () {\r\n    //     thim_startertheme.load();\r\n    // });\r\n    var thim_startertheme = {\r\n      contact: function () {\r\n        $(\"#contact\").on(\"click\", function () {\r\n          var name = $(\"#name\").val();\r\n          var email = $(\"#email\").val();\r\n          var phone = $(\"#phone\").val();\r\n          var subject = $(\"#subject\").val();\r\n          var msg = $(\"#msg\").val();\r\n          var regex = /^[\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\r\n          var pregex = /^\\d+$/;\r\n          if (name == \"\") {\r\n            $(\"#nameerr\")\r\n              .attr(\"style\", \"color:red\")\r\n              .text(\"Please fill in the name correctly\");\r\n            return;\r\n          } else {\r\n            $(\"#nameerr\").text(\"\");\r\n          }\r\n          if (!regex.test(email)) {\r\n            $(\"#emailerr\")\r\n              .attr(\"style\", \"color:red\")\r\n              .text(\"Please fill in the email correctly\");\r\n            return;\r\n          } else {\r\n            $(\"#emailerr\").text(\"\");\r\n          }\r\n          if (!pregex.test(phone)) {\r\n            $(\"#phoneerr\")\r\n              .attr(\"style\", \"color:red\")\r\n              .text(\"Please fill in the phone correctly\");\r\n            return;\r\n          } else {\r\n            $(\"#phoneerr\").text(\"\");\r\n          }\r\n          var DataObj = {};\r\n          DataObj.name = name;\r\n          DataObj.email = email;\r\n          DataObj.phone = phone;\r\n          DataObj.subject = subject;\r\n          DataObj.message = msg;\r\n          // console.log(\"sdfsdfsd\")\r\n          // console.log(DataObj)\r\n          // console.log(JSON.stringify(DataObj))\r\n          $.ajax({\r\n            url: \"/app/v1/homepage/contact\",\r\n            method: \"POST\",\r\n            contentType: \"application/json\",\r\n            // dataType: \"json\",\r\n            data: JSON.stringify(DataObj),\r\n            success: function (response) {\r\n              // 处理请求成功的响应\r\n              alert(\"提交成功\");\r\n            },\r\n            error: function (jqXHR, textStatus, errorThrown) {\r\n              // 处理请求出错的情况\r\n            },\r\n          });\r\n        });\r\n      },\r\n    };\r\n  })(jQuery);\r\n  \n\n//# sourceURL=webpack://sofishgame-homepage/./src/js/contact.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/contact.js"]();
/******/ 	
/******/ })()
;