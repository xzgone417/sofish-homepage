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
    if (nowLang === "zh-CN") {
      moduleFiles = require.context("$json/zh-CN/", false, /\.json$/);
    } else {
      moduleFiles = require.context("$json/view/", false, /\.json$/);
    }
    // 通过 require.context 动态加载对应的 JSON 文件
    pageData = moduleFiles(`./common.json`);
  }
  $: {
    nowLang, getJsonData();
  }
  function toChangeLang(params) {
    localStorage.setItem("site_language", params);
    setupI18n({ lang: params, name: `common` });
  }
</script>

<header class="site-header sticky-header">
  <div class="header-container">
    <div class="the-header-content element-to-stick">
      <div class="left-header-container">
        <div class="header-logo">
          <a href="./index.html">
            <img src="./public/images/logo.png" alt="IMG" />
          </a>
        </div>
      </div>

      <div class="my-container">
        <div class="wrap-content-header">
          <div class="menu-mobile-effect navbar-toggle">
            <div class="text-menu">Menu</div>
            <div class="icon-wrap">
              <i class="ion-navicon"></i>
            </div>
          </div>
          <nav class="main-navigation">
            <ul class="menu-lists">
              <li class="menu-item-has-children">
                <a href="./index.html"> Home </a>
              </li>
              <li class="menu-item-has-children">
                <a href="./games.html"> Games </a>
              </li>
              <li class="menu-item-has-children">
                <a href="./blogs.html"> Blogs </a>
              </li>
              <li class="menu-item-has-children">
                <a href="./topup.html"> TopUp </a>
              </li>
              <li class="menu-item-has-children">
                <a href="./user-center.html"> UserCenter </a>
              </li>
            </ul>
          </nav>
          <div class="container-header-logo">
            <a href="./index.html">
              <img src="./public/images/logo.png" alt="IMG" />
            </a>
          </div>
        </div>
      </div>
      <div class="right-header-container">
        <div class="header-menu-right">
          <div class="login-links">
            <a
              href="#top"
              class="login"
              data-display=".box-login"
              data-toggle="modal"
              data-target="#login-dialogs"
              id="header-login-link"
            >
              <button type="button" class="btn header-menu-login-btn">
                <i class="far fa-user"></i>
                <span class="header-menu-login-span">Login</span>
              </button>
            </a>
          </div>
        </div>
        <div class="change-language-links">
          <div class="dropdown">
            <button
              id="dLabel"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="dropdown-btn btn change-language-btn"
            >
              <i class="fas fa-map-marker-alt"></i>
              <span class="change-language-span">LANGUAGE</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dLabel">
              <a
                href="#top"
                on:click={() => {
                  toChangeLang("en");
                }}
              >
                <li class="dropdown-item-li">English</li></a
              >
              <a
                href="#top"
                on:click={() => {
                  toChangeLang("zh-CN");
                }}
              >
                <li class="dropdown-item-li">简体中文</li></a
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<nav class="mobile-menu-container mobile-effect">
  <div class="inner-menu">
    <ul class="nav navbar-nav">
      <li>
        <a href="./index.html"> Home </a>
      </li>
      <li>
        <a href="./games.html"> Games </a>
      </li>
      <li>
        <a href="./blogs.html"> Blogs </a>
      </li>
    </ul>
    <div class="widget-area">
      <aside class="widget widget_nav_menu">
        <div class="menu-useful-links-container">
          <ul class="menu">
            <li class="menu-item">
              <a href="./games.html">games</a>
            </li>
            <li class="menu-item menu-item-has-children">
              <a href="#top">SERVICES</a>
              <ul class="sub-menu">
                <li class="menu-item">
                  <a href="./blogs.html"> Menu item </a>
                </li>
                <li class="menu-item">
                  <a href="./blogs.html"> Menu item </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <aside class="widget widget_text">
        <div class="textwidget">
          <div class="copyright-text">
            Copyright 2018 Corporate WordPress Theme by ThimPress. <a
              href="#top">ThimPress</a
            >
          </div>
        </div>
      </aside>
    </div>
  </div>
</nav>
