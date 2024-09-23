"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import UserCenterPage from "@/clients/views/UserCenterPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { sdkInitConfig } from "@/utils/sofish-init";
import useDeviceOS from "@/hooks/useDeviceOS";
import useUniqueString from "@/hooks/useUniqueString";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import "@/styles/user-center.scss";
import "@/styles/part/form-container.scss";

export default function UserCenterTemplate({ data }: any) {
  const deviceOS = useDeviceOS();
  const uniqueString = useUniqueString();

  const requestConfig = useMemo(() => {
    return {
      appID: sdkInitConfig.appID,
      appVersion: sdkInitConfig.appVersion,
      sdkVersion: sdkInitConfig.sdkVersion,
      platformId: deviceOS.id,
      deviceID: uniqueString,
    };
  }, [uniqueString]);
  const [fireAuth, setFireAuth] = useState({}) as any;
  const [fireProvider, setFireProvider] = useState({}) as any;
  const clientData = {
    bgImg: {
      src: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/uc-bg.png",
      mbSrc: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/mb-uc-bg.png",
    },
    avatar: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/avatar.png",
  };
  useEffect(() => {
    var fbWindow: any = window;
    fbWindow.fbAsyncInit = function () {
      FB.init({
        appId: sdkInitConfig.facebookClientId,
        xfbml: true,
        version: "v19.0",
      });
    };
    initializeApp(sdkInitConfig.firebaseConfig);
    setFireAuth(getAuth());
    setFireProvider(new GoogleAuthProvider());
    window.onload = function () {
      AppleID.auth.init({
        clientId: sdkInitConfig.iosClientId,
        scope: "name email",
        redirectURI: window.location.href || sdkInitConfig.redirectURI,
        usePopup: true,
      });
    };
  }, []);
  return (
    <>
      <Header routeName={"/user-center"}></Header>
      <UserCenterPage
        data={data}
        requestConfig={requestConfig}
        clientData={clientData}
        fire={{ fireAuth: fireAuth, fireProvider: fireProvider }}
      ></UserCenterPage>
      <Footer routeName={"/user-center"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
