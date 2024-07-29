<script>
  import {
    t,
    locale,
    setupI18n,
    getLocaleFromNavigator,
  } from "../service/i18n";

  let moduleFiles = {};
  let pageData = {};
  let nowLang = localStorage.getItem("site_language");
  function getJsonData() {
    if (!nowLang) {
      nowLang = getLocaleFromNavigator();
    }
    // 获取当前页面的完整 URL
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    const lastPart = parts[parts.length - 1];
    const fileName = lastPart.split(".")[0];
    if (nowLang === "zh-CN") {
      moduleFiles = require.context("$json/zh-CN", false, /\.json$/);
    } else {
      moduleFiles = require.context("$json/view", false, /\.json$/);
    }
    // 通过 require.context 动态加载对应的 JSON 文件
    pageData = moduleFiles(`./${fileName}.json`);
    setupI18n({ lang: nowLang, name: `${fileName}` });
    console.log(nowLang);
  }
  $: {
    nowLang, getJsonData();
  }
</script>

<main class="new-content">
  <div class="container">
    <div class="page-header">
      <span>当前位置：</span>
      <a href="./index.html">首页</a>
      <i class="ion ion-chevron-right"></i>
      <a href="#top">{$t("hello")}</a>
    </div>
    <div class="row">
      <!--  -->
      <div class="col-lg-3 col-sm-6 topup-dropdown">
        <div class="dropdown">
          <button
            id="dLabel"
            class="dropdown-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            请选择游戏
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dLabel">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 topup-dropdown">
        <div class="dropdown">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
            id="choose-server-list"
          >
            请选择服务器
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 topup-dropdown">
        <div class="dropdown">
          <button type="button" aria-haspopup="true" aria-expanded="false">
            请选择角色
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div class="col-lg-3 col-sm-6 topup-dropdown">
        <div class="dropdown">
          您的地区:
          <button type="button" aria-haspopup="true" aria-expanded="false">
            请选择地区
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row" id="server-list">
      <!--请选择服务器  -->
      <ul class="nav nav-pills nav-stacked col-sm-3">
        <li role="presentation" class="active"><a href="#top">Home</a></li>
        <li role="presentation"><a href="#top">Profile</a></li>
        <li role="presentation"><a href="#top">Messages</a></li>
      </ul>
      <div class="col-sm-9 server-name-group">
        <div class="server-name-btn">1</div>
        <div class="server-name-btn">2</div>
        <div class="server-name-btn">3</div>
        <div class="server-name-btn">4</div>
        <div class="server-name-btn">5</div>
        <div class="server-name-btn">1</div>
        <div class="server-name-btn">2</div>
        <div class="server-name-btn">3</div>
        <div class="server-name-btn">4</div>
        <div class="server-name-btn">5</div>
      </div>
    </div>
    <div class="halving-line"></div>
    <div class="row">
      <div class="page-header">储值类型：</div>
      <div class="topup-pathway-group">
        <div class="topup-pathway-btn"></div>
      </div>
    </div>
    <div class="halving-line"></div>
    <div class="row">
      <div class="col-sm-8 server-name-group">
        <div class="amount-title"></div>
        <div class="amount-group">
          <div class="amount-btn">1</div>
          <div class="amount-btn">2</div>
          <div class="amount-btn">3</div>
          <div class="amount-btn">4</div>
          <div class="amount-btn">5</div>
          <div class="amount-btn">1</div>
          <div class="amount-btn">2</div>
          <div class="amount-btn">3</div>
          <div class="amount-btn">4</div>
          <div class="amount-btn">5</div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="amount-notice-title"></div>
        <div class="amount-notice"></div>
        <div class="amount-btn"></div>
      </div>
    </div>
  </div>
</main>
