"use client";

import Link from "next/link";
import {
  useState,
  useEffect,
  Suspense,
  useMemo,
  createContext,
  useContext,
} from "react";
import Image from "next/image";
import RechargePage from "@/clients/views/RechargePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { sdkInitConfig } from "@/utils/sofish-init";
import useDeviceOS from "@/hooks/useDeviceOS";
import useUniqueString from "@/hooks/useUniqueString";
import "@/styles/recharge.scss";
import "@/styles/part/form-container.scss";
import { urlencodedFetch } from "@/utils/fetchRequest";
import CryptoJS from "crypto-js";
import { decryptAES } from "@/utils/code";
// import { Modal } from "antd";

export const RequestConfigContext = createContext(null) as any;

export default function TopUpTemplate({ data, appID, secretData }: any) {
  const deviceOS = useDeviceOS();
  const uniqueString = useUniqueString();
  const [secretKey, setSecretKey] = useState("");
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
      src: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/pay-bg.png",
      mbSrc: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/mb-pay-bg.png",
    },
  };
  const gameList = useMemo(() => {
    return data.records?.filter((ele: any, _inx: number) => ele.isPay > 0);
  }, [data]);
  useEffect(() => {
    let ignore = false;
    const toPlain = async () => {
      if (!secretData) {
        return false;
      }
      const plaintext = await decryptAES(
        secretData,
        "SOFISH1234567890SOFISH1234567890",
        "SOFISH1234567890"
      );
      const once_plaint = JSON.parse(plaintext);
      setSecretKey(once_plaint.appKey);
    };
    if (!ignore) {
      toPlain();
    }
    return () => {
      ignore = true;
    };
  }, [secretData]);

  return (
    <>
      <Header routeName={"/top-up"}></Header>
      <RequestConfigContext.Provider value={requestConfig}>
        <RechargePage
          data={data}
          gameList={gameList}
          appID={appID}
          secretKey={secretKey}
          requestConfig={requestConfig}
          clientData={clientData}
        ></RechargePage>
      </RequestConfigContext.Provider>
      <Footer routeName={"/top-up"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
