"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { signFetch } from "@/utils/fetchRequest";
import "@/styles/components/bind.scss";
import { Tooltip } from "antd";
import useDebounce from "@/hooks/useDebounce";
import { emailRegex } from "@/utils/judge";
export default function BindEmail(props: any) {
  // const { data } = props;
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null) as any;
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
      emailRegex(formValues.email) === 404 ||
      emailRegex(formValues.email) === 500
    ) {
      return setEmailError("email error");
    }
    if (!formValues.code) {
      return setCodeError("code error");
    }
    const res = await signFetch(
      {
        headers: props.requestConfig,
        url: "/usersf/sofishbindemail",
      },
      {
        uid: props.userInfo.uid,
        code: formValues.code,
        email: formValues.email,
      },
      {
        messageApi: props.messageApi,
        content: "Bind Failure",
      }
    );
    if (res.code === 0) {
      props.messageApi.open({
        type: "success",
        content: "Bind Success",
      });
    }
  };
  return (
    <div className="bind-email-container">
      <h5>Email Bind</h5>
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
                placeholder="Confirmation Code"
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
          <div className="form-submit-row">
            <button type="submit" id="bind-submit-btn" className="submit-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
