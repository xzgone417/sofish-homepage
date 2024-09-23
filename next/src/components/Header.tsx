"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/components/header.scss";
import useAccountInfo from "@/hooks/useAccountInfo";
import { isFalsyString } from "@/utils/judge";
// import { languages } from "@/i18n/settings";
function Header(props: any) {
  const [clangShow, setClangShow] = useState(false);
  const [mobileMenuShow, setMobileMenuShow] = useState(false);
  const { accountInfo } = useAccountInfo();
  const mobileMenuRef = useRef(null) as any;
  const clangText = useMemo(() => {
    if (props.lng === "zh-CN") {
      return "中";
    } else {
      return "EN";
    }
  }, [props.lng]);
  const routeList = [
    { href: "/", name: "Home", others: [""] },
    { href: "/games", name: "Games", others: ["/vr-game"] },
    { href: "/about", name: "About", others: [""] },
    { href: "/contact", name: "Contact", others: [""] },
    { href: "/user-center", name: "UserCenter", others: [""] },
  ];
  useEffect(() => {
    const handleClickDropDownOutside = (event: any) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current!.contains(event.target)
      ) {
        setMobileMenuShow(false);
      }
    };
    document.addEventListener("click", handleClickDropDownOutside);

    return () => {
      document.removeEventListener("click", handleClickDropDownOutside);
    };
  }, []);
  return (
    <>
      <header className="site-header">
        <section className="site-header-section">
          <div className="mobile-dropdown" ref={mobileMenuRef}>
            <strong
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuShow(!mobileMenuShow);
              }}
            >
              <i className="ion ion-navicon-round"></i>
            </strong>
            <nav
              className={
                mobileMenuShow
                  ? "mobile-menu-navigation nav-active"
                  : "mobile-menu-navigation"
              }
            >
              {routeList.map((item: any, index) => (
                <Link
                  href={item.href}
                  className="mobile-menu-link"
                  key={item?.name + index}
                >
                  <span
                    style={{
                      color:
                        props.routeName === item.href ||
                        item.others?.includes(props.routeName)
                          ? "red"
                          : "#fff",
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="left-header">
            <div className="header-logo">
              <Link href="/">
                <img
                  src="https://image.cdn.adventurecity.sofishgame.com/webh5/assets/logo.png"
                  alt="SOFISH"
                />
              </Link>
            </div>
          </div>
          <div className="mobile-header-logo">
            <Link href="/">
              <img
                src="https://image.cdn.adventurecity.sofishgame.com/webh5/assets/logo.png"
                alt="SOFISH"
              />
            </Link>
          </div>
          <div className="menu-header">
            <nav className="menu-navigation">
              {routeList.map((item: any, index: number) => (
                <Link
                  href={item.href}
                  className="menu-link"
                  key={item.name + index}
                >
                  <span
                    style={{
                      color:
                        props.routeName === item.href ||
                        item.others.includes(props.routeName)
                          ? "red"
                          : "#fff",
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="right-header">
            {isFalsyString(accountInfo) ? (
              <div className="header-account">
                <Link href={"/user-center"} className="user-header-link">
                  <i className="ion ion-android-person"></i>
                  {accountInfo?.loginName}
                </Link>
              </div>
            ) : (
              <>
                {/* <div
              className="change-language-links"
              onClick={(e) => {
                e.stopPropagation();
                setClangShow(!clangShow);
              }}
            >
              <span>
                <i className="ion ion-ios-world-outline clang-world"></i>{" "}
                <span className="clang-lng">{clangText}</span>
                <i className="ion ion-chevron-down clang-down"></i>
              </span>
            </div>

            <div
              className={
                clangShow
                  ? "change-language-list clang-active-list"
                  : "change-language-list"
              }
            >
              <Link
                href={`/en${props.routeName}`}
                className={
                  props.lng == "en"
                    ? "clang-link clang-link-active"
                    : "clang-link"
                }
              >
                <span>English</span>
              </Link>
              <Link
                href={`/zh-CN${props.routeName}`}
                className={
                  props.lng == "zh-CN"
                    ? "clang-link clang-link-active"
                    : "clang-link"
                }
              >
                <span>简体中文</span>
              </Link>
            </div> */}
              </>
            )}
          </div>
        </section>
      </header>
      {/* {(clangShow || mobileMenuShow) && (
        <div
          className="header-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setClangShow(false);
            setMobileMenuShow(false);
          }}
        ></div>
      )} */}
    </>
  );
}

export default Header;
