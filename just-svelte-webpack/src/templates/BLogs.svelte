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
      moduleFiles = require.context("$json/zh-CN/blogs", false, /\.json$/);
    } else {
      moduleFiles = require.context("$json/view/blogs", false, /\.json$/);
    }
    // 通过 require.context 动态加载对应的 JSON 文件
    pageData = moduleFiles(`./${fileName}.json`);
    setupI18n({ lang: nowLang, name: `blogs/${fileName}` });
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
  // on:click={() => {
  //       yet("zh-CN");
  //     }}
  //     tabindex="0"
  //     on:keydown={(key) => {
  //       console.log("🚀XZG ~ key:", key);
  //       if ((key = "enter")) {
  //         yet("en");
  //       }
  //     }}
  //     role="button"
</script>

<div id="main-content">
  <div class="page-title">
    <div class="main-top">
      <div class="overlay-top-header"></div>
      <div class="content container">
        <h1>
          {$t("title.top")}
        </h1>
        <div class="wrap-breadcrumb">
          <ul class="breadcrumbs">
            <li>
              <a href="./index.html">
                {$t("title.left")}
              </a>
            </li>
            <li>
              <span class="breadcrum-icon">/</span>
              {$t("title.right")}
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
            <div class="blog-list thim-1-col vblog-layout-1">
              {#each pageData.blog_list as item, index}
                <article class="item-blog image-item">
                  <div class="media-item">
                    <div class="pic">
                      <a href={item.link}><img src={item.img} alt="IMG" /></a>
                    </div>
                    <div class="date">
                      <span class="number">{getDay(item.date)}</span>
                      {monthFormat(item.date)}
                    </div>
                  </div>
                  <div class="text-item">
                    <h4 class="title">
                      <a href={item.link}>
                        {item.title}
                      </a>
                    </h4>
                    <div class="content">{item.desc}</div>
                    <a
                      href={item.link}
                      class="btn-learnmore btn-small shape-round"
                    >
                      learn more
                    </a>
                  </div>
                </article>
              {/each}
            </div>

            <ul class="loop-pagination">
              {#each pageData.pagination.blog_numbers as item, index}
                {#if pageData.pagination.current == item.num}
                  <li>
                    <a href={item.link} class="page-numbers current">
                      {item.num}
                    </a>
                  </li>{:else}
                  <li>
                    <a href={item.link} class="page-numbers">
                      {item.num}
                    </a>
                  </li>{/if}
              {/each}
              <li>
                <a
                  href={pageData.pagination.next_link}
                  class="page-numbers next"
                >
                  Next
                  <i class="ion ion-ios-arrow-thin-right"></i>
                </a>
              </li>
            </ul>
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
