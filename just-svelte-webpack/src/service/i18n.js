import {
  dictionary,
  locale,
  _,
  init,
  register,
  getLocaleFromNavigator,
} from "svelte-i18n";
// const fs = require("fs");
// const path = require("path");
init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});

async function setupI18n(params) {
  try {
    register("en", () => import(`../json/view/${params.name}.json`));
    register("zh-CN", () => import(`../json/zh-CN/${params.name}.json`));
  } catch (error) {
    register("en", () => import(`../json/view/common.json`));
    register("zh-CN", () => import(`../json/zh-CN/common.json`));
  }
  // dictionary.set({
  //   en: {
  //     hello: "hello",s
  //   },
  //   zh: {
  //     hello: "你好",
  //   },
  // });
  // localStorage.setItem("site_language", params.lang);
  locale.set(params.lang);
}
export { _ as t, locale, setupI18n, getLocaleFromNavigator };
