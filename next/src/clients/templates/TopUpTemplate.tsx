"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import TopUpPage from "@/clients/views/TopUpPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { sdkInitConfig } from "@/utils/sofish-init";
import useDeviceOS from "@/hooks/useDeviceOS";
import useUniqueString from "@/hooks/useUniqueString";
import "@/styles/top-up.scss";
import "@/styles/part/form-container.scss";
export default function TopUpTemplate({ data }: any) {
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
  const clientData = {
    bgImg: {
      src: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/top-up-bg.png",
      mbSrc: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/mb-top-up-bg.png",
    },
  };
  return (
    <>
      <Header routeName={"/top-up"}></Header>
      <TopUpPage
        data={data}
        requestConfig={requestConfig}
        clientData={clientData}
      ></TopUpPage>
      <Footer routeName={"/top-up"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
