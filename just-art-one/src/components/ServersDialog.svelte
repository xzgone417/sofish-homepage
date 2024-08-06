<script>
  import {
    t,
    locale,
    setupI18n,
    getLocaleFromNavigator,
  } from "../service/i18n";
  import { fade } from "svelte/transition";
  export let switchServerDialog = false;
  let moduleFiles = {};
  let pageData = {};
  let dialogCurrent = 0;
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
      moduleFiles = require.context("$json/zhCN", false, /\.json$/);
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

  function dateTimeFormate(timestamp) {
    const date = new Date(Number(timestamp));
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = date
      .toLocaleString(undefined, options)
      .replace(/\//g, "-");
    return formattedDate;
  }
  // function toOpenMoreServers() {
  //   switchServerDialog = true;
  //   const wifiLoaderOverlay = document.getElementById("wifi-loader-overlay");
  //   wifiLoaderOverlay.style.display = "block";
  //   wifiLoaderOverlay.addEventListener("click", toCloseMoreServers);
  // }
  function toCloseMoreServers(params) {
    switchServerDialog = false;
    // const wifiLoaderOverlay = document.getElementById("wifi-loader-overlay");
    // wifiLoaderOverlay.style.display = "none";
    // wifiLoaderOverlay.removeEventListener("click", toCloseMoreServers);
  }
</script>

<!--  -->
{#if switchServerDialog}
  <div class="dialog-container" transition:fade={{ delay: 100, duration: 300 }}>
    <div class="dialog-title">
      <h3 class="title">开服讯息</h3>
      <a
        href="#top"
        on:click|preventDefault={toCloseMoreServers}
        class="close-dialog"><i class="fas fa-times"></i></a
      >
    </div>
    <div class="dialog-content">
      <ul class="dialog-list">
        {#each pageData.server_list[0] as item, index}
          <li class="server-item">
            <a class="left-server server-item-span" href="#top">
              {item.game}
            </a>
            <span class="server-item-span"> {item.name} </span>
            <span class="server-item-span">
              {dateTimeFormate(item.time)}
            </span>
          </li>
        {/each}
      </ul>
      <div class="dialog-pagination">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li>
              <a href="#top" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li><a href="#top">1</a></li>
            <li><a href="#top">2</a></li>
            <li><a href="#top">3</a></li>
            <li><a href="#top">4</a></li>
            <li><a href="#top">5</a></li>
            <li>
              <a href="#top" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
{/if}

<style>
  /* 表单容器样式 */
  .dialog-container {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    min-width: 260px;
    max-width: 1200px;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: start;
    z-index: 100;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
  }
  .dialog-title {
    position: relative;
    text-align: center;
    height: 50px;
    /* line-height: 30px; */
  }
  .close-dialog {
    position: absolute;
    font-size: 30px;
    right: 5%;
    top: 5%;
    /* display: inline-block; */
  }
  .dialog-list {
    margin-top: -5px;
  }
  .dialog-list .server-item {
    font-weight: 300;
    font-size: 12px;
    line-height: 1.5;
    color: #6e6e6e;
    word-break: break-word;
    padding-left: 10px;
    position: relative;
    transition: all 0.2s;
    margin-bottom: 12px;
  }
  .dialog-list .server-item:last-child {
    margin-bottom: 0;
  }
  .dialog-list .server-item .server-item-span {
    display: inline-block;
    width: 30%;
    padding-left: 3%;
  }
  .dialog-list .server-item:hover {
    color: #e40914;
  }
  .dialog-list .server-item:hover:before {
    color: #e40914;
  }
  .dialog-pagination {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 600px) {
    .dialog-container {
      max-width: 90vw;
    }
  }
</style>
