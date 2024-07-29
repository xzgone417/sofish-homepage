<script></script>

<div
  id="login-dialogs"
  class="modal fade"
  tabindex="-1"
  role="dialog"
  aria-labelledby="myModalLabel"
>
  <div class="modal-content login-dialogs-content" role="document">
    <div class="popup-close">
      <i class="fa fa-times"></i>
    </div>
    <!--register  -->
    <div class="login-popup box-register">
      <div class="media-content"></div>
      <div class="inner-login">
        <h3 class="title">
          <span class="current-title">Register</span>
          <span>
            <a href="#top" class="display-box" data-display=".box-login"
              >Login</a
            >
          </span>
        </h3>
        <div class="form-row">
          <div class="wrap-form">
            <div class="form-desc">We will need...</div>
            <form id="registerform">
              <p class="login-username">
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  class="input"
                />
              </p>
              <p class="login-email">
                <input
                  type="email"
                  name="userEmail"
                  placeholder="Email"
                  class="input"
                />
              </p>
              <p class="text-mail">
                We send your registration email to this address.
              </p>
              <p class="button-submit">
                <button
                  type="submit"
                  id="submit-register-form"
                  class="button btn-danger button-large submit-btn"
                  >Register</button
                >
              </p>
              <p class="text-protocol">
                <input type="checkbox" name="protocol" />
                <a
                  href="#top"
                  data-toggle="modal"
                  data-target="#protocol-dialog"
                  >我已閱讀並同意《會員條款及管理規章》</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!--login  -->
    <div class="login-popup box-login">
      <div class="media-content"></div>
      <div class="inner-login">
        <h3 class="title">
          <span>
            <a href="#top" class="display-box" data-display=".box-register"
              >Registration</a
            >
          </span>
          <span class="current-title">Login</span>
        </h3>
        <div class="form-row">
          <div class="wrap-form">
            <div class="form-desc">We will need...</div>
            <form id="loginform">
              <p class="login-username">
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  class="input"
                />
              </p>
              <p class="login-password">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  class="input"
                />
                <i
                  class="far fa-eye-slash popup-password-eye"
                  aria-hidden="true"
                ></i>
              </p>
              <p class="login-remember">
                <label>
                  <input type="checkbox" name="rememberMe" id="rememberMe" /> Remember
                  Me</label
                >
              </p>
              <p class="button-submit">
                <button
                  type="submit"
                  id="submit-login-form"
                  class="button btn-danger button-large submit-btn"
                  >Login</button
                >
              </p>
              <!-- <p class="link-bottom">
                <a href="#top" class="display-box" data-display=".box-lostpass"
                >
            </a>
              </p> -->
            </form>
            <p class="link-bottom">
              <a href="#top" class="display-box" data-display=".box-lostpass">
                Lost your password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- lostpass -->
    <div class="login-popup box-lostpass">
      <div class="login-popup box-lostpass">
        <div class="media-content"></div>
        <div class="inner-login">
          <h3 class="title">
            <span>
              <a href="#top" class="display-box" data-display=".box-register"
                >Registration</a
              >
            </span>
            <span class="current-title"> Reset Password</span>
          </h3>
          <div class="form-row">
            <form name="lostpasswordform" id="lostpasswordform" method="post">
              <p class="description">
                Please enter your username or email address. You will receive a
                link to create a new password via email.
              </p>
              <p class="login-username">
                <input
                  placeholder="请输入您的账号"
                  type="text"
                  name="user_login_lostpass"
                  id="lost-password-account"
                  class="input"
                />
              </p>
              <p class="login-username">
                <input
                  placeholder="请输入您的邮箱"
                  type="text"
                  name="user_login_lostpass"
                  id="lost-password-email"
                  class="input"
                />
              </p>
              <p class="login-username">
                <input
                  placeholder="请输入验证码"
                  type="text"
                  name="user_login_lostpass"
                  id="lost-password-auth-code"
                  class="input"
                />
              </p>
              <p class="login-username">
                <input
                  placeholder="请输入您想修改的密码"
                  type="text"
                  name="user_login_lostpass"
                  id="lost-password-password"
                  class="input"
                />
              </p>
              <p>
                <button
                  type="submit"
                  id="submit-lost-password-form"
                  class="button btn-danger button-large submit-btn"
                  >Reset Password</button
                >
              </p>
              <p class="link-bottom">
                Are you a member?
                <a href="#top" class="display-box" data-display=".box-login">
                  Sign in now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--  -->
<!-- 模态框2 -->
<div id="protocol-dialog" class="modal fade" role="dialog">
  <div class="modal-dialog protocol-modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button
        >
        <h4 class="modal-title">會員條款及規則制度</h4>
      </div>
      <div class="modal-body">
        <p>Modal 2 Content</p>
      </div>
    </div>
  </div>
</div>
