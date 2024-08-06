<script>
  let area = true;
  let theOptions = [0, 1, 2, 3];
  let theVal = 1;
  function to_chooseRole(params) {
    area = !area;
  }
  function chooseServerList(params) {
    console.log(params);
  }
  function toSelectOption(params) {
    console.log(params, "ll");
  }
  function toBuy(params) {
    // const buyButton = document.getElementById("buy-Button");
    // var $btn = buyButton.button("loading");
    // $btn.button("reset");
  }
</script>

<main class="new-content">
  <div class="page-title">
    <div class="main-top">
      <div class="overlay-top-header"></div>
      <div class="content container">
        <h1>GAME MAKES LIFE MORE INTERESTING</h1>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="page-header">
      <span>当前位置：</span>
      <a href="./index.html">首页</a>
      <i class="ion ion-chevron-right"></i>
      <a href="#top">储值中心</a>
    </div>
    <div class="row">
      <!--  -->
      <div class="col-lg-3 col-xs-6 topup-dropdown">
        <div class="select-container">
          <select bind:value={theVal} on:change={toSelectOption}>
            {#each theOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
          <i class="fa fa-angle-down dropdown-icon" aria-hidden="true"></i>
        </div>
        <!-- <div class="dropdown">
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
        </div> -->
      </div>
      <div class="col-lg-3 col-xs-6 topup-dropdown">
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
      <div class="col-lg-3 col-xs-6 topup-dropdown">
        <div class="dropdown">
          <button
            id="cLabel"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            请选择角色
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="cLabel">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>

      <div class="col-lg-3 col-xs-6 topup-dropdown">
        {#if area}
          <div class="dropdown">
            <span>
              您的地区:请选择地区
              <i class="fa fa-angle-down" aria-hidden="true"></i></span
            >
          </div>
        {/if}
      </div>
    </div>
    <div class="row servers-list" id="server-list">
      <!--请选择服务器  -->
      <ul class="nav nav-pills nav-stacked col-sm-2">
        <li role="presentation" class="left-servers-choice active">
          <a href="#top">Home</a>
        </li>
        <li role="presentation" class="left-servers-choice">
          <a
            href="#top"
            on:click|preventDefault={() => {
              chooseServerList(1);
            }}>Profile</a
          >
        </li>
        <li role="presentation" class="left-servers-choice">
          <a
            href="#top"
            on:click|preventDefault={() => {
              chooseServerList(2);
            }}>Messages</a
          >
        </li>
      </ul>
      <div class="col-sm-10 server-name-group">
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
        <div class="topup-pathway-btn">1</div>
        <div class="topup-pathway-btn">2</div>
        <div class="topup-pathway-btn">3</div>
      </div>
    </div>
    <div class="halving-line"></div>
    <div class="row amount-div">
      <div class="page-header">储值金额：</div>
      <div class="col-sm-8 amount-group-div">
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
      <div class="col-sm-4 amount-article">
        <h2 class="amount-notice-title">注意事项</h2>
        <div class="amount-notice">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean euismod
          bibendum laoreet, Proin gravida dolor sitamet lacus accumsan et
          viverra justo commodo. Proinsodales pulvinar sic tempor, Sociis
          natoque penatibus etmagnis dis parturient montes, nascetur ridiculus
          mus. Namfermentum, nulla luctus pharetra vulputate, felis tellus
          mollisorci, sed rhoncus pronin sapien nunc accuan eget.
        </div>
        <div class="amount-btn-div">
          <button
            type="button"
            id="buy-Button"
            data-loading-text="Loading..."
            class="btn btn-danger amount-btn"
            on:click={() => {
              toBuy(1);
            }}
          >
            Loading state
          </button>
        </div>
      </div>
    </div>
  </div>
</main>
