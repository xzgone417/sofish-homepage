// import '../css/index.less';
// 替换为
import "$css/index.less";
// import games from "../json/games.json";
// import template from "../index-template.art";
// document.getElementById("template").innerHTML = template({ games });
// 假设你的数据和模板都在同一个目录下
import data from "../json/games.json";
import { compile } from "art-template";

const template = document.getElementById("template").innerHTML;
const compiledTemplate = compile(template);
const result = compiledTemplate(data);

document.getElementById("app").innerHTML = result;

// const data = require("../json/games.json");
// console.log('🚀XZG ~ data:', data);
// const template = document.getElementById("template").innerHTML;
// const compiledTemplate = require("art-template").compile(template);
// const result = compiledTemplate(data);

// document.getElementById("app").innerHTML = result;
