"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { signFetch } from "@/utils/fetchRequest";
import "@/styles/components/login.scss";
import { Tooltip } from "antd";
import useWindowWidth from "@/hooks/useWindowWidth";
import useAccountInfo from "@/hooks/useAccountInfo";
import { lengthRegex } from "@/utils/judge";
export default function Register(props: any) {
  // const { data } = props;
  const windowWidth = useWindowWidth();
  const {
    accountInfo,
    accountInfoList,
    toSetLocalAccountInfo,
    toSetLocalAccountInfoList,
  } = useAccountInfo();
  // const commonMessageApi = useContext("commonMessageApi")
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [agreeState, setAgreeState] = useState(false);
  const [agreementState, setAgreementState] = useState(false);
  const formRef = useRef<HTMLFormElement>(null) as any;
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
        url: "/usersf/sofishregister",
      },
      {
        username: formValues.username,
        password: formValues.password,
        uid: 0,
      },
      {
        messageApi: props.messageApi,
        content: "Send Code Failure",
      }
    );
    if (res.code === 0) {
      toSetLocalAccountInfo(res.data);
      toSetLocalAccountInfoList(res.data);
      props.messageApi.open({
        type: "success",
        content: "Register Success",
      });
      formRef.current.reset();
      props.setLoginStatus(0);
    }
  };
  return (
    <div className="login-container">
      {agreementState ? (
        <>
          <div className="agreement-container">
            <div
              className="leave-container"
              onClick={() => {
                setAgreementState(false);
                setAgreeState(true);
              }}
            >
              <div className="polygon-gray"></div>
              <div className="polygon-red">
                <i className="ion ion-chevron-right"></i> Register
              </div>
            </div>
            <h6>Privacy Agreement and Service Agreement</h6>
            <div className="agreement-content">
              <iframe
                className="agreement-iframe"
                src={"/privacy-policy.html"}
                title="Privacy Agreement and Service Agreement"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </>
      ) : (
        <>
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
          <h5>REGISTER</h5>
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
                </Tooltip>
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  id="bind-submit-btn"
                  className="register-btn"
                >
                  Register
                </button>
              </div>
              <div className="agreement-row">
                <label>
                  <input
                    type="checkbox"
                    name="agreement"
                    value=""
                    checked={agreeState}
                    onChange={(e) => {
                      e.preventDefault();
                      setAgreeState(true);
                    }}
                  />
                  <span className="agree-span">
                    I have read and agree
                    <span
                      className="agreement-span"
                      onClick={() => {
                        setAgreementState(true);
                      }}
                    >
                      《Privacy Agreement and Service Agreement》
                    </span>
                  </span>
                </label>
              </div>
            </form>
          </div>
          <div className="third-login-container"></div>
        </>
      )}
    </div>
  );
}
