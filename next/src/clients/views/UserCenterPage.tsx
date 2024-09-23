"use client";

import Link from "next/link";
import Image from "next/image";
import {
  createContext,
  Suspense,
  use,
  useEffect,
  useMemo,
  useState,
} from "react";
import MyGift from "@/components/user/MyGift";
import GiftCenter from "@/components/user/GiftCenter";
import ChangePassword from "@/components/user/ChangePassword";
import BindEmail from "@/components/user/BindEmail";
import Orders from "@/components/user/Orders";
import LoginContainer from "@/components/user/LoginContainer";
import Register from "@/components/user/Register";
import ResetPassword from "@/components/user/ResetPassword";
import UserCenterMenu from "@/components/user/UserCenterMenu";
import { message } from "antd";
import useAccountInfo from "@/hooks/useAccountInfo";
import useWindowWidth from "@/hooks/useWindowWidth";
import Loading from "@/app/(lng)/loading";
import { isFalsyString } from "@/utils/judge";
import { motion } from "framer-motion";
import { useSharedState } from "@/hooks/useShareState";
export default function UserCenterPage(props: any) {
  let { data, clientData } = props;
  const {
    accountInfo,
    accountInfoList,
    setAccountInfo,
    setAccountInfoList,
    toSetLocalAccountInfo,
    toSetLocalAccountInfoList,
  } = useAccountInfo();
  const windowWidth = useWindowWidth();
  const [sharedData, setSharedData] = useSharedState("sharedData", "");
  const [onlyJump, setOnlyJump] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [menuStatus, setMenuStatus] = useState(1);
  const [loginStatus, setLoginStatus] = useState(-1);
  const [previousMenu, setPreviousMenu] = useState(-1);
  const [loadingStatus, setLoadingStatus] = useState(false) as any;
  const menuList = [
    "My Pack",
    "Pack Center",
    "Recharge Center",
    "Recharge Order",
    "Change Password",
    "Email Bind",
  ];
  const userInfo = useMemo(() => {
    if (loginStatus === 0 && localStorage.getItem("accountInfo")) {
      return JSON.parse(localStorage.getItem("accountInfo")!);
    } else {
      return "";
    }
  }, [loginStatus]);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (isFalsyString(accountInfo)) {
        setLoginStatus(0);
      } else {
        setLoginStatus(1);
      }
      if (sharedData?.target === "order") {
        setMenuStatus(4);
        setSharedData("already");
      } else if (windowWidth <= 768 && !sharedData) {
        setMenuStatus(0);
      } else if (windowWidth > 768 && !sharedData) {
        setMenuStatus(1);
        setPreviousMenu(1);
      }
    }
    return () => {
      ignore = true;
    };
  }, [accountInfo, sharedData, windowWidth, onlyJump]);
  const toLogOut = () => {
    // setAccountInfo({});
    // toSetLocalAccountInfo({});
    setLoginStatus(1);
  };
  const MenuActiveName = (params: any) => {
    let _menuActiveName = "";
    if (params.menuStatus === 0) {
      _menuActiveName = "Please select";
    } else {
      _menuActiveName = menuList[params.menuStatus - 1];
    }

    return <>{_menuActiveName}</>;
  };
  return (
    <>
      {contextHolder}
      <main
        className={
          loginStatus === 0 ? "user-center-site logging" : "user-center-site"
        }
        style={
          windowWidth > 768
            ? { backgroundImage: `url(${clientData.bgImg.src})` }
            : loginStatus === 0
            ? { backgroundImage: `url(${clientData.bgImg.mbSrc})` }
            : { backgroundImage: "#fff" }
        }
      >
        {loginStatus === 0 && (
          <motion.section
            className="user-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <section
              className="left-user-container"
              style={{ backgroundImage: `url(${clientData.bgImg.mbSrc})` }}
            >
              <div className="top-up-div">
                <p>Member Center</p>
                <div className="top-up-btn-div">
                  <Link href={"/top-up"}>
                    <button className="top-up-btn">TOP UP</button>
                  </Link>
                </div>
              </div>
              <UserCenterMenu
                menuList={menuList}
                menuStatus={menuStatus}
                userInfo={userInfo}
                setMenuStatus={setMenuStatus}
                previousMenu={previousMenu}
                setPreviousMenu={setPreviousMenu}
              ></UserCenterMenu>
            </section>
            <section className="right-user-container">
              <div className="mb-center-title">
                <h5 className="mb-center-name">
                  <span
                    className="total-title"
                    onClick={(e) => {
                      setMenuStatus(0);
                    }}
                  >
                    Member Center
                  </span>
                  <span className="separation">/</span>
                  <span className="current-title">
                    <MenuActiveName menuStatus={menuStatus}></MenuActiveName>
                  </span>
                </h5>
                {menuStatus > 0 && (
                  <strong
                    className="back"
                    onClick={() => {
                      setMenuStatus(0);
                    }}
                  >
                    <i className="ion ion-home"></i>
                  </strong>
                )}
                {menuStatus === 0 && (
                  <strong
                    className="back"
                    onClick={() => {
                      toLogOut();
                    }}
                  >
                    <i className="ion ion-log-out"></i>
                  </strong>
                )}
              </div>

              <div className="user-about-div">
                <div className="user-info-div">
                  <Image
                    src={clientData.avatar}
                    alt=" "
                    className="user-info-avatar"
                    width={96}
                    height={96}
                    onClick={() => {
                      if (windowWidth < 769) {
                        setMenuStatus(0);
                      }
                    }}
                  ></Image>
                  <div className="user-info-description">
                    <p className="user-info-vip">VIP</p>
                    <p className="user-info-name">
                      User: <span>{userInfo?.loginName}</span>
                    </p>
                    <p className="user-info-id">
                      uid: <span>{userInfo?.uid}</span>
                    </p>
                  </div>
                  <Link href={"/top-up"} className="top-up-btn-link">
                    TOP UP
                  </Link>
                </div>

                <button
                  className="logout-btn"
                  onClick={() => {
                    toLogOut();
                  }}
                >
                  <span>Log out </span>
                  <i className="ion ion-log-out"></i>
                </button>
              </div>
              <div className="user-content-container">
                {menuStatus === 0 && (
                  <UserCenterMenu
                    menuList={menuList}
                    menuStatus={menuStatus}
                    userInfo={userInfo}
                    setMenuStatus={setMenuStatus}
                    previousMenu={previousMenu}
                    setPreviousMenu={setPreviousMenu}
                  ></UserCenterMenu>
                )}
                {menuStatus === 1 && (
                  <MyGift
                    data={data}
                    messageApi={messageApi}
                    userInfo={userInfo}
                    requestConfig={props.requestConfig}
                  ></MyGift>
                )}
                {menuStatus === 2 && (
                  <GiftCenter
                    data={data}
                    messageApi={messageApi}
                    userInfo={userInfo}
                    requestConfig={props.requestConfig}
                  ></GiftCenter>
                )}
                {menuStatus === 3 && <></>}
                {menuStatus === 4 && (
                  <Orders
                    messageApi={messageApi}
                    userInfo={userInfo}
                    data={data}
                    requestConfig={props.requestConfig}
                  ></Orders>
                )}
                {menuStatus === 5 && (
                  <ChangePassword
                    messageApi={messageApi}
                    userInfo={userInfo}
                    requestConfig={props.requestConfig}
                  ></ChangePassword>
                )}
                {menuStatus === 6 && (
                  <BindEmail
                    messageApi={messageApi}
                    userInfo={userInfo}
                    requestConfig={props.requestConfig}
                  ></BindEmail>
                )}
              </div>
            </section>

            <section className="return-section"></section>
          </motion.section>
        )}

        {loginStatus > 0 && (
          <motion.section
            className="account-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loginStatus === 1 && (
              <LoginContainer
                messageApi={messageApi}
                requestConfig={props.requestConfig}
                setLoginStatus={setLoginStatus}
                fire={props.fire}
              ></LoginContainer>
            )}
            {loginStatus === 2 && (
              <Register
                messageApi={messageApi}
                requestConfig={props.requestConfig}
                setLoginStatus={setLoginStatus}
              ></Register>
            )}
            {loginStatus === 3 && (
              <ResetPassword
                messageApi={messageApi}
                requestConfig={props.requestConfig}
                setLoginStatus={setLoginStatus}
              ></ResetPassword>
            )}
          </motion.section>
        )}

        {loginStatus == -1 && <Loading></Loading>}
      </main>
    </>
  );
}
