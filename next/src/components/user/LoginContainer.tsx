"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { signFetch } from "@/utils/fetchRequest";
import "@/styles/components/login.scss";
import { Tooltip } from "antd";
import { sdkInitConfig } from "@/utils/sofish-init";
import useWindowWidth from "@/hooks/useWindowWidth";
import useAccountInfo from "@/hooks/useAccountInfo";
import { isFalsyString, lengthRegex } from "@/utils/judge";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { decodeJwtResponse } from "@/utils/code";
import LoadingProcess from "../LoadingProcess";
import { motion } from "framer-motion";
export default function LoginContainer(props: any) {
  // const { data } = props;
  const windowWidth = useWindowWidth();
  const {
    accountInfo,
    accountInfoList,
    toSetLocalAccountInfo,
    toSetLocalAccountInfoList,
  } = useAccountInfo();
  const [passwordEye, setPasswordEye] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isHistory, setIsHistory] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const rememberRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null) as any;
  const [facebookLoginInfo, setFacebookLoginInfo] = useState({}) as any;
  const [googleLoginInfo, setGoogleLoginInfo] = useState({}) as any;
  const [iosLoginInfo, setIosLoginInfo] = useState({}) as any;

  // useEffect(() => {
  //   var fbWindow: any = window;
  //   fbWindow.fbAsyncInit = function () {
  //     FB.init({
  //       appId: sdkInitConfig.facebookClientId,
  //       xfbml: true,
  //       version: "v19.0",
  //     });
  //   };
  //   initializeApp(sdkInitConfig.firebaseConfig);
  //   setFireAuth(getAuth());
  //   setFireProvider(new GoogleAuthProvider());
  //   window.onload = function () {
  //     AppleID.auth.init({
  //       clientId: sdkInitConfig.iosClientId,
  //       scope: "name email",
  //       redirectURI: window.location.href || sdkInitConfig.redirectURI,
  //       usePopup: true,
  //     });
  //   };
  // }, []);
  const handleSubmit = async () => {
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    if (
      lengthRegex(formValues.username) === 404 ||
      lengthRegex(formValues.username) === 500
    ) {
      return setUsernameError("account error");
    }
    if (
      lengthRegex(formValues.password) === 404 ||
      lengthRegex(formValues.password) === 500
    ) {
      return setPasswordError("password error");
    }
    const res = await signFetch(
      {
        headers: props.requestConfig,
        url: "/usersf/sofishlogin",
      },
      {
        username: formValues.username,
        password: formValues.password,
      },
      {
        messageApi: props.messageApi,
        content: "Login Failure",
      }
    );
    if (res.code === 0) {
      props.messageApi.open({
        type: "success",
        content: "Login Success",
      });
      toSetLocalAccountInfo(res.data);
      toSetLocalAccountInfoList(res.data);
      formRef.current.reset();
      props.setLoginStatus(0);
    }
  };
  const toPlatformLogin = async (
    _accountType: number,
    _accountId: string | number,
    _loginName: null | string,
    _extraData?: any
  ) => {
    let once_query = {
      deviceID: props.requestConfig.deviceID,
      accountType: _accountType,
      accountID: _accountId,
      loginName: props.requestConfig.deviceID?.slice(0, 9) || "User",
      extraData: "",
    } as any;
    if (isFalsyString(_loginName)) {
      once_query.loginName = _loginName;
    }
    if (_accountType === 3 || _accountType === 4 || _accountType === 5) {
      once_query.extraData = _extraData;
    }

    const res = await signFetch(
      {
        headers: props.requestConfig,
        url: "/user/platformLogin",
      },
      once_query,
      {
        messageApi: props.messageApi,
        content: "Login Failure",
      }
    );
    setLoadingState(false);
    if (res.code === 0) {
      props.messageApi.open({
        type: "success",
        content: "Login Success",
      });
      toSetLocalAccountInfo(res.data);
      toSetLocalAccountInfoList(res.data);
      formRef.current.reset();
      props.setLoginStatus(0);
    }
  };
  const iosLogin = async (params?: any) => {
    try {
      setLoadingState(true);
      const iosData = await AppleID.auth.signIn();
      setIosLoginInfo(iosData);
      const responsePayload = decodeJwtResponse(iosData.authorization.id_token);
      toPlatformLogin(
        5,
        responsePayload.sub,
        null,
        iosData.authorization.id_token
      );
    } catch (error: any) {
      setLoadingState(false);
    }
  };
  const googleLogin = async (params?: any) => {
    setLoadingState(true);
    signInWithPopup(props.fire.fireAuth, props.fire.fireProvider)
      .then((result: any) => {
        let credential = GoogleAuthProvider.credentialFromResult(result);
        const _token = credential!.idToken;
        toPlatformLogin(
          3,
          result.user.providerData[0].uid,
          result.user.displayName,
          _token
        );
      })
      .catch((error: any) => {
        setLoadingState(false);
      });
  };
  const facebookLogin = async (params?: any) => {
    FB.login(
      function (res_fb: { authResponse: { accessToken: any } }) {
        setLoadingState(true);
        if (!res_fb.authResponse) {
          setLoadingState(false);
          return;
        }
        setFacebookLoginInfo(res_fb);
        const _access = res_fb.authResponse.accessToken;
        if (res_fb.authResponse) {
          FB.api(
            "/me",
            {
              fields: "id,name,email,picture,token_for_business",
              access_token: _access,
            },
            function (response: any) {
              if (response) {
                toPlatformLogin(
                  4,
                  response.id + "|" + response.token_for_business,
                  response.name,
                  res_fb.authResponse.accessToken
                );
              } else {
                setLoadingState(false);
              }
            }
          );
        } else {
          setLoadingState(false);
        }
      },
      {
        scope: "public_profile,email,user_friends", // 这里指定你需要的权限
      }
    );
  };
  const toHistoryLogin = (params: any) => {
    toSetLocalAccountInfo(params);
    props.setLoginStatus(0);
  };
  return (
    <div className="login-container">
      <div
        className="leave-container"
        onClick={() => {
          props.setLoginStatus(2);
        }}
      >
        <div className="polygon-gray"></div>
        <div className="polygon-red">
          <i className="ion ion-chevron-right"></i> Register
        </div>
      </div>
      <h5>LOGIN</h5>
      <p className="form-description">We will need...</p>
      <div className="form-container">
        <form
          id="bind-form"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            return false;
          }}
        >
          <div className="form-row">
            <Tooltip
              title={usernameError}
              color="red"
              placement="bottomLeft"
              open={Boolean(usernameError)}
            >
              <input
                type="text"
                name="username"
                placeholder="Account"
                className={
                  Boolean(usernameError) ? "the-input error" : "the-input"
                }
                onFocus={() => {
                  setUsernameError("");
                  setIsHistory(false);
                }}
              />
            </Tooltip>
            {accountInfoList.length > 0 && (
              <strong className="history-btn">
                <i
                  className="ion ion-chevron-down"
                  onClick={() => {
                    setIsHistory((ele) => !ele);
                  }}
                ></i>
              </strong>
            )}
            {isHistory && (
              <motion.ul
                variants={{
                  hidden: { opacity: 1 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.02,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                className="history-ul"
              >
                {accountInfoList.map((item: any, index: number) => (
                  <motion.li
                    variants={{
                      hidden: { height: "0px" },
                      show: { height: "3.6em" },
                    }}
                    key={item.uid + index}
                    className={`history-li`}
                    onClick={() => {
                      toHistoryLogin(item);
                    }}
                  >
                    {item.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          <div className="form-row">
            <Tooltip
              title={passwordError}
              color="red"
              placement="bottomLeft"
              open={Boolean(passwordError)}
            >
              <input
                type={passwordEye ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={
                  Boolean(passwordError) ? "the-input error" : "the-input"
                }
                onFocus={() => {
                  setPasswordError("");
                }}
              />
            </Tooltip>
            {passwordEye ? (
              <i
                className="ion ion-eye password-eye"
                onClick={() => {
                  setPasswordEye(false);
                }}
              ></i>
            ) : (
              <i
                className="ion ion-eye-disabled password-eye"
                onClick={() => {
                  setPasswordEye(true);
                }}
              ></i>
            )}
          </div>
          <p className="lost-password">
            <span
              onClick={() => {
                props.setLoginStatus(3);
              }}
            >
              Lost your password ?
            </span>
          </p>
          {/* <div className="checkbox-row">
            <label>
              <input type="checkbox" name="remember" ref={rememberRef} />
              <span>Remember Me</span>
            </label>
          </div> */}
          <div className="form-submit-row">
            <button type="submit" id="bind-submit-btn" className="submit-btn">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="third-login-container">
        <Image
          src={
            "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/apple.png"
          }
          alt=" "
          className="third-login"
          width={221}
          height={58}
          onClick={(e) => {
            e.stopPropagation();
            iosLogin();
          }}
        ></Image>
        <Image
          src={
            "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/google-play.png"
          }
          alt=" "
          className="third-login"
          width={221}
          height={58}
          onClick={(e) => {
            e.stopPropagation();
            googleLogin();
          }}
        ></Image>
        <Image
          src={
            "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/facebook.png"
          }
          alt=" "
          className="third-login"
          width={221}
          height={58}
          onClick={(e) => {
            e.stopPropagation();
            facebookLogin();
          }}
        ></Image>
      </div>
      <LoadingProcess isLoading={loadingState}></LoadingProcess>
    </div>
  );
}
