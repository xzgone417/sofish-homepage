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
      moduleFiles = require.context("$json/zh-CN", false, /\.json$/);
    } else {
      moduleFiles = require.context("$json/view", false, /\.json$/);
    }
    // 通过 require.context 动态加载对应的 JSON 文件
    pageData = moduleFiles(`./index.json`);
    setupI18n({ lang: nowLang, name: `index` });
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

<div id="main-content" style="background: #1e1e1e;">
  <div class="thim-banner_home-1">
    <div class="overlay-area"></div>
    <div class="container">
      <div class="bp-element bp-element-st-list-videos vblog-layout-1">
        <div class="wrap-element">
          <div class="feature-item">
            <div class="row">
              <div class="col-lg-9">
                <div class="video">
                  <img src={pageData.home_game.img} alt="IMG" />
                  <div class="overlay"></div>
                  <div class="meta-info">
                    <div class="imdb">
                      <span class="value">{pageData.home_game.score}</span>
                    </div>
                  </div>
                  <a
                    href={pageData.home_game.video_link}
                    class="btn-play popup-youtube"
                  >
                  </a>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="text">
                  <h4 class="title">
                    <a href={pageData.home_game.gp_link} target="_blank">
                      {pageData.home_game.title}
                    </a>
                  </h4>
                  <div class="info"></div>
                  <div class="description">
                    {pageData.home_game.desc}
                  </div>
                  <a
                    href={pageData.home_game.link}
                    class="btn-readmore btn-normal shape-round"
                    target="_blank"
                  >
                    read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bp-element bp-element-st-list-videos vblog-layout-1-1">
        <div class="wrap-element">
          <div class="normal-items">
            <div class="row">
              {#each pageData.game_list as item, index}
                <div class="col-sm-6 col-lg-3">
                  <div class="item">
                    <div class="pic">
                      <a href={item.gp_link} target="_blank"
                        ><img src={item.img} alt="IMG" /></a
                      >
                      <div class="label">
                        {item.tag}
                      </div>
                      <div class="btn-play">
                        <div class="btn-gplay">
                          <a href={item.gp_link} target="_blank"
                            ><img
                              class="a-btn-gplay"
                              src="./public/images/store-button-google-play.svg"
                              alt=""
                            /></a
                          >
                        </div>
                        <div class="btn-aplay">
                          <a
                            href="#top"
                            aria-disabled="true"
                            target="_blank"
                            ><img
                              class="a-btn-aplay"
                              src="./public/images/store-button-app-store.svg"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <h4 class="title">
                      <a href={item.gp_link} target="_blank">
                        {item.title}
                      </a>
                    </h4>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="thim-news-feed_home-1" id="news-feed">
    <div class="container">
      <div class="bp-element bp-element-posts vblog-layout-slider-3">
        <div class="wrap-element">
          <div class="heading-post">
            <h3 class="title">News Feed</h3>
            <div class="description">
              It is a long established fact that a reader
            </div>
          </div>
          <div class="list-posts">
            <div
              class="slide-posts js-call-slick-col"
              data-slidesToShow="1"
              data-slidesToScroll="1"
              data-infinite="1"
              data-autoplay="1"
              data-autoplaySpeed="5000"
              data-responsive="[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]"
            >
              <div class="wrap-arrow-slick">
                <div class="arow-slick prev-slick">
                  <i class="ion ion-ios-arrow-left"></i>
                </div>
                <div class="arow-slick next-slick">
                  <i class="ion ion-ios-arrow-right"></i>
                </div>
              </div>
              <div class="slide-slick">
                {#each pageData.news_feed.top as element, key}
                  <div class="item-slick">
                    <div class="post-item">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="feature-item">
                            <a href={element.link}
                              ><img src={element.img} alt="IMG" /></a
                            >
                            <div class="overlay"></div>
                            <div class="content">
                              <h4 class="title">
                                <a href={element.link}>
                                  {element.desc}
                                </a>
                              </h4>
                              <div class="info">
                                <span class="item-info">{element.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          {#each pageData.news_feed.item[key] as item, index}
                            <div class="item">
                              <div class="pic">
                                <a href={item.link}
                                  ><img src={item.img} alt="IMG" /></a
                                >
                              </div>
                              <div class="text">
                                <div class="info">
                                  {item.date}
                                </div>
                                <h4 class="title">
                                  <a href={item.link} title={item.tip_title}>
                                    {item.title}</a
                                  >
                                </h4>
                                <div class="description" title={item.tip_desc}>
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          {/each}
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
