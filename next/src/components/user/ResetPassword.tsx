"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { signFetch } from "@/utils/fetchRequest";
import "@/styles/components/login.scss";
import { Tooltip } from "antd";
import useAccountInfo from "@/hooks/useAccountInfo";
import useDebounce from "@/hooks/useDebounce";
import { emailRegex, lengthRegex } from "@/utils/judge";

export default function ResetPassword(props: any) {
  // const { data } = props;
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null) as any;

  // 通过 useCallback 包装更新函数，以避免每次渲染都重新创建
  const handleSendCode = useCallback(async (e: any) => {
    e.preventDefault();
    if (!disabled) {
      if (
        emailRegex(formRef.current.email.value) === 404 ||
        emailRegex(formRef.current.email.value) === 500
      ) {
        return setEmailError("email error");
      }
      setDisabled(true);
      setSeconds(60);
      const res = await signFetch(
        {
          headers: props.requestConfig,
          url: "/user/emailCode",
        },
        {
          email: formRef.current.email.value,
          validType: 0,
        },
        {
          messageApi: props.messageApi,
          content: "Send Code Failure",
        }
      );

      if (res.code === 0) {
        props.messageApi.open({
          type: "success",
          content: "Send Success",
        });
      }
    }
  }, []);

  // 创建去抖后的函数，延迟500毫秒
  const debounceSendCode = useDebounce(handleSendCode, 300);
  useEffect(() => {
    if (seconds > 0 && disabled) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (seconds === 0) {
      setDisabled(false);
    }
  }, [seconds, disabled]);
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
    if (!formValues.code) {
      return setCodeError("code error");
    }
    const res = await signFetch(
      {
        headers: props.requestConfig,
        url: "/usersf/sofishresertpassword",
      },
      {
        username: formValues.username,
        password: formValues.password,
        code: formValues.code,
      },
      {
        messageApi: props.messageApi,
        content: "Send Code Failure",
      }
    );
    if (res.code === 0) {
      props.messageApi.open({
        type: "success",
        content: "Reset Password Success",
      });
      formRef.current.reset();
      props.setLoginStatus(1);
    }
  };
  return (
    <div className="login-container">
      <div
        className="leave-container"
        onClick={() => {
          props.setLoginStatus(1);
        }}
      >
        <div className="polygon-gray"></div>
        <div className="polygon-red">
          <i className="ion ion-chevron-right"></i> Login
        </div>
      </div>
      <h5>RESET PASSWORD</h5>
      <p className="form-description">
        Please enter your account or email address. You will create a new
        password
      </p>
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
                placeholder="Please enter your account (6-20)"
                className={
                  Boolean(usernameError) ? "the-input error" : "the-input"
                }
                onFocus={() => {
                  setUsernameError("");
                }}
              />
            </Tooltip>
          </div>
          <div className="form-row">
            <Tooltip
              title={emailError}
              color="red"
              placement="bottomLeft"
              open={Boolean(emailError)}
            >
              <input
                type="email"
                name="email"
                placeholder="Please enter your email"
                className={
                  Boolean(emailError) ? "the-input error" : "the-input"
                }
                onFocus={() => {
                  setEmailError("");
                }}
              />
            </Tooltip>
          </div>
          <div className="form-row">
            <Tooltip
              title={codeError}
              color="red"
              placement="bottomLeft"
              open={Boolean(codeError)}
            >
              <input
                type="text"
                name="code"
                placeholder="Enter confirmation code"
                className={Boolean(codeError) ? "the-input error" : "the-input"}
                onFocus={() => {
                  setCodeError("");
                }}
              />
            </Tooltip>
            <button
              type="button"
              onClick={debounceSendCode}
              disabled={disabled}
              className="send-verification-code"
              style={
                disabled
                  ? { backgroundColor: "gray" }
                  : { backgroundColor: "#3470f1" }
              }
            >
              {disabled ? `${seconds} s` : "Send"}
            </button>
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
                placeholder="Please enter your password (6-20)"
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

          <div className="form-submit-row">
            <button type="submit" id="bind-submit-btn" className="submit-btn">
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <div className="third-login-container"></div>
    </div>
  );
}
