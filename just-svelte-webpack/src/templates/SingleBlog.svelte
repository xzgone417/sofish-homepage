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
      moduleFiles = require.context("$json/zh-CN/single-blog", false, /\.json$/);
    } else {
      moduleFiles = require.context("$json/view/single-blog", false, /\.json$/);
    }
    // 通过 require.context 动态加载对应的 JSON 文件
    pageData = moduleFiles(`./${fileName}.json`);
    setupI18n({ lang: nowLang, name: `single-blog/${fileName}` });
    console.log(nowLang);
  }
  $: {
    nowLang, getJsonData();
  }
  var dateFormat = function (dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  var monthFormat = function (dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };
  var getDay = function (dateString) {
    const date = new Date(dateString);
    return date.getDate();
  };
</script>

<div class="responsive home-2" id="wrapper-container">
  <div>
    <div id="main-content">
      <div class="page-title">
        <div class="main-top">
          <div class="overlay-top-header"></div>
          <div class="content container">
            <h1>
              {pageData.title.top}
            </h1>
            <div class="wrap-breadcrumb">
              <ul class="breadcrumbs">
                <li>
                  <a href="./index.html">
                    {pageData.title.left}
                  </a>
                </li>
                <li>
                  <span class="breadcrum-icon">/</span>
                  {pageData.title.right}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="site-content sidebar-right">
        <div class="container">
          <div class="row">
            <main class="site-main col-lg-9">
              <div class="wrap-main-content">
                <div class="bl-blog-detail">
                  <div class="head-blog">
                    <h2 class="title-blog-detail">
                      {pageData.single_blog.title}
                    </h2>
                    <div class="info-blog-detail"></div>
                  </div>
                  <div class="media-blog-detail">
                    <div class="pic">
                      <img src={pageData.single_blog.img} alt="IMG" />
                    </div>
                    <div class="date">
                      <span class="number"
                        >{getDay(pageData.single_blog.date)}</span
                      >
                      {monthFormat(pageData.single_blog.date)}
                    </div>
                  </div>
                  <div class="text-blog-detail">
                    <div class="wrap-share-blog sticky-sidebar">
                      <div class="share">
                        <span class="namefield"> Share </span>
                        <span class="socials">
                          <a
                            href="#top"
                            class="item-social"
                            id="facebook-link"
                            title="Share on Facebook"
                            target="_blank"
                          >
                            <i class="ion ion-social-facebook"></i>
                          </a>
                          <a href="#top" class="item-social" id="twitter-link">
                            <i class="ion ion-social-twitter"></i>
                          </a>
                          <a href="#top" class="item-social" id="google-link">
                            <i class="ion ion-social-googleplus"></i>
                          </a>
                        </span>
                      </div>
                    </div>
                    <div class="content-blog">
                      {@html pageData.single_blog.content}

                      <div class="tags">
                        <span class="name-field">Tags:</span>
                        {$t("single_blog.tag")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <div class="widget-area col-sm-9 col-md-8 col-lg-3 sticky-sidebar">
              <aside class="widget widget_thim_layout_builder">
                <div class="bp-element bp-element-posts layout-list-2">
                  <div class="wrap-element">
                    <div class="list-posts">
                      {#each pageData.aside_list as item, index}
                        <div class="post-item1">
                          <div class="pic">
                            <a href={item.link}>
                              <img src={item.img} alt="IMG" />
                            </a>
                          </div>
                          <div class="text">
                            <h4 class="title">
                              <a href={item.link}>
                                {item.title}
                              </a>
                            </h4>
                          </div>
                          <div class="info">
                            {dateFormat(item.date)}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
