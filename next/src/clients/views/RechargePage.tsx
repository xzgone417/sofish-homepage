"use client";

import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { message, Modal, Tabs } from "antd";
import { useRouter } from "next/navigation";
import useAccountInfo from "@/hooks/useAccountInfo";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import LoadingWrapper from "@/components/LoadingWrapper";
import GameSection from "@/components/top/GameSection";
import GoodsSection from "@/components/top/GoodsSection";
import PaymentSection from "@/components/top/PaymentSection";
import { motion } from "framer-motion";
import { signFetch, urlencodedFetch } from "@/utils/fetchRequest";
import { isFalsyString } from "@/utils/judge";
import { deduplicateById } from "@/utils/dispose";
import useDeviceOS from "@/hooks/useDeviceOS";
import { Base64 } from "js-base64";
import { useSharedState } from "@/hooks/useShareState";

// import { RequestConfigContext } from "../templates/RechargeTemplate";
export default function TopGamePage(props: any) {
  const router = useRouter();
  // const configData = useContext(RequestConfigContext);
  const [sharedData, setSharedData] = useSharedState("sharedData", "");
  const { confirm: confirmModal } = Modal;
  const { bgImg } = props.clientData;
  const gameList = props.gameList || [];
  const { accountInfo } = useAccountInfo();
  const windowWidth = useWindowWidth();
  const deviceOS = useDeviceOS();
  const [messageApi, contextHolder] = message.useMessage();
  const [goodsStatus, setGoodsStatus] = useState(0);
  const [theGame, setTheGame] = useState(
    gameList.find((item: any) => item.appID == props.appID)
  ) as any;
  const [theServer, setTheServer] = useState({}) as any;
  const [theRole, setTheRole] = useState({}) as any;
  const [serverList, setServerList] = useState([]) as any;
  const [roleList, setRoleList] = useState([]) as any;
  const [cargo, setCargo] = useState({}) as any;
  const [payWayList, setPayWayList] = useState([
    {
      name: "payerMax",
      id: 1,
      icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/payerMax.png",
    },
  ]) as any[];
  const [payWay, setPayWay] = useState(payWayList[0]);
  const [isMorePayWay, setIsMorePayWay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [areaList, setAreaList] = useState([
    { name: "TW", currencyCode: "TWD", isTab: true },
    { name: "HK", currencyCode: "HKD", isTab: false },
    { name: "SG", currencyCode: "SG", isTab: false },
    { name: "ID", currencyCode: "ID", isTab: false },
    { name: "PH", currencyCode: "PH", isTab: false },
    { name: "MY", currencyCode: "MY", isTab: false },
    { name: "TH", currencyCode: "TH", isTab: false },
    { name: "VN", currencyCode: "VND", isTab: false },
    { name: "US", currencyCode: "MGUSD", isTab: false },
    { name: "CA", currencyCode: "CAD", isTab: false },
    { name: "AU", currencyCode: "AUD", isTab: false },
    { name: "UK", currencyCode: "GBP", isTab: false },
    { name: "FR", currencyCode: "FGEUR", isTab: false },
    { name: "DE", currencyCode: "DGEUR", isTab: false },
  ]) as any[];
  const [area, setArea] = useState(areaList[0]) as any;
  const [goodsList, setGoodsList] = useState([]) as any[];
  const thirdProduct = useMemo(() => {
    return {
      thirdCurrency: cargo?.[`thirdCurrency${area.currencyCode}`],
      thirdPrice: Number(
        (cargo?.[`thirdPrice${area.currencyCode}`] / 100).toFixed(2)
      ),
    };
  }, [area, cargo]);
  const showPayConfirm = () => {
    confirmModal({
      title: "Payment Confirmation",
      icon: <></>,
      content: "Go to the order page to check the top-up result.",
      onOk() {
        setSharedData({ target: "order" });
        router.push("/user-center");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const requestRoleList = async (params: any) => {
    setIsGameLoading(true);
    const res = await signFetch(
      {
        headers: params.requestConfig,
        domain: "https://sf-api-manager.sofishgame.com",
        url: "/officialweb/sfwebgamelist/getRoles",
        secretKey: params.secretKey,
        secretQuery: {
          appID: params.appID,
          uid: params.accountInfo?.uid,
        },
      },
      {
        currentPage: 1,
        pageSize: 100,
        appID: params.appID,
        uid: params.accountInfo?.uid,
      },
      {
        messageApi: messageApi,
        content: "Receive Failure",
      }
    );
    if (res.code === 0) {
      const once_serverList = deduplicateById(res.data, "serverID");
      setServerList(once_serverList);
      setRoleList(res.data);
      setTheServer(once_serverList[0]);
      setTheRole(once_serverList[0]);
      setIsGameLoading(false);
    } else {
      setIsGameLoading(false);
    }
  };
  const requestGoodsList = async (params: any) => {
    setIsLoading(true);
    const res = await urlencodedFetch(
      {
        headers: params.requestConfig,
        domain: "https://sf-api-manager.sofishgame.com",
        url: "/officialweb/thirdproduct/all",
      },
      {
        currentPage: 1,
        pageSize: 100,
        appID: params.appID,
        payType: params.payType,
      },
      {
        messageApi: messageApi,
        content: "Receive Failure",
      }
    );
    if (res.code === 0) {
      setGoodsList(res.data.records);
      if (res.data.records?.length > 0) {
        setCargo(res.data.records[0]);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  const toSelectGame = (params: any) => {
    router.push(`/top-up/${params}`);
  };

  const toSelectServer = (params: any) => {
    const once = serverList.find((item: any) => item.serverID == params);
    setTheServer(once);
    setTheRole(once);
  };
  const toSelectRole = (params: any) => {
    const once = roleList.find((item: any) => item.roleID == params);
    setTheRole(once);
    setTheServer(once);
  };
  const openCustomerService = () => {
    const serviceData = {
      appId: props.appID,
      appLang: "en", //语言编码
      commonBaseUrl: "https://fl.sogamecdn.com/domain/domainUrltest.json", // 接口地址文件json
      imei: props.requestConfig.deviceID, //设备标识
      roleID: theRole.roleID || "", //角色id,未登录时传空
      token: accountInfo.token || "", //登录后的token，,未登录时传空
      uId: accountInfo.uid || "", //用户id,未登录时传空
    };

    // Base64加密
    const base64Data = Base64.encode(JSON.stringify(serviceData));
    window.open(
      "https://customer-h5.sofishgame.com/index.html?encodeStr=" + base64Data,
      "_blank"
    );
  };
  const toSelectGoodsStatus = (params: any) => {
    setGoodsStatus(params);
    if (goodsList?.length > 0) {
      setCargo(goodsList[0]);
    }
  };
  const toSelectCargo = (params: any) => {
    setCargo(params);
  };
  const toSetMorePayWayOr = (params: boolean) => {
    if (!params && area) {
      let onceAreaList = [...areaList];
      let onceNum = onceAreaList.findIndex(
        (item: any) => item.currencyCode == area.currencyCode
      );
      let newSplice = onceAreaList.splice(onceNum, 1);
      onceAreaList.unshift(newSplice[0]);
      setAreaList(onceAreaList);
    }
    setIsMorePayWay(params);
  };
  const toSelectArea = (params: any) => {
    setArea(params);
    setPayWay(payWayList[0]);
  };
  const toSelectPayWay = (params: any) => {
    if (isMorePayWay) {
      toSetMorePayWayOr(false);
    }

    setPayWay(params);
  };
  const postPayInfo = async () => {
    if (!theRole.uidStr) {
      return messageApi.open({
        type: "error",
        content: "No Role",
      });
    } else if (!cargo.price) {
      return messageApi.open({
        type: "error",
        content: "No Goods",
      });
    }
    const newWindow = window.open("", "_blank")!;
    const once_query = {
      appID: props.appID,
      uid: theRole.uidStr,
      channelID: deviceOS.id,
      roleID: theRole.roleID,
      roleName: theRole.roleName,
      serverID: theRole.serverID,
      serverName: theRole.serverName,
      vip: theRole.vip,
      appLang: "en",
      price: cargo.price,
      currency: cargo.currency,
      thirdPrice: thirdProduct.thirdPrice,
      thirdCurrency: thirdProduct.thirdCurrency,
      productID: cargo.localProductID,
      productName: cargo.name || "name",
      productDesc: cargo.description || "description",
      cpOrderID: "1", //游戏自己的订单号
      payNotifyUrl: "1", //游戏服务器的支付通知回调地址
      extra: "1",
      deviceID: props.requestConfig.deviceID,
    };
    const res = await signFetch(
      {
        headers: { ...props.requestConfig },
        secretKey: props.secretKey,
        url: "/thirdorder/create",
      },
      once_query,
      {
        onError: (params?: any) => {
          newWindow.close();
          messageApi.open({
            type: "error",
            content: params?.msg || "Request Failure",
          });
        },
      }
    );
    if (res.code === 0) {
      newWindow.location.href = res.data.redirectUrl;
      showPayConfirm();
    }
  };
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (isFalsyString(accountInfo) && props.secretKey) {
        requestRoleList({
          requestConfig: props.requestConfig,
          appID: props.appID,
          accountInfo: accountInfo,
          secretKey: props.secretKey,
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [props.requestConfig, props.appID, accountInfo, props.secretKey]);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (isFalsyString(accountInfo)) {
        requestGoodsList({
          requestConfig: props.requestConfig,
          appID: props.appID,
          payType: goodsStatus,
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [props.requestConfig, props.appID, accountInfo, goodsStatus]);

  return (
    <>
      {contextHolder}
      <main className="recharge-site">
        <section
          className="recharge-bg-section"
          style={
            windowWidth > 768
              ? { backgroundImage: `url(${bgImg.src})` }
              : { backgroundImage: `url(${bgImg.mbSrc})` }
          }
        ></section>
        <section className="recharge-section">
          <GameSection
            gameList={gameList}
            appID={props.appID}
            theGame={theGame}
            theServer={theServer}
            theRole={theRole}
            serverList={serverList}
            roleList={roleList}
            toSelectGame={toSelectGame}
            toSelectServer={toSelectServer}
            toSelectRole={toSelectRole}
            isGameLoading={isGameLoading}
          ></GameSection>
          <GoodsSection
            goodsStatus={goodsStatus}
            toSelectGoodsStatus={toSelectGoodsStatus}
            isLoading={isLoading}
            goodsList={goodsList}
            cargo={cargo}
            toSelectCargo={toSelectCargo}
            openCustomerService={openCustomerService}
          ></GoodsSection>
          <PaymentSection
            toSetMorePayWayOr={toSetMorePayWayOr}
            isMorePayWay={isMorePayWay}
            payWay={payWay}
            setPayWay={setPayWay}
            areaList={areaList}
            cargo={cargo}
            goodsStatus={goodsStatus}
            windowWidth={windowWidth}
            toSelectArea={toSelectArea}
            toSelectPayWay={toSelectPayWay}
            area={area}
            payWayList={payWayList}
            postPayInfo={postPayInfo}
            thirdProduct={thirdProduct}
            openCustomerService={openCustomerService}
          ></PaymentSection>
          <section className="top-up-protocol">
            1、代金券可用於購買遊戲內商品。在消耗時，按【消耗数量】計入VIP和储值活動。
            <br />
            如:60代金券，可换購遊戲內首储禮包(需點擊想要購買的商品，才会消耗代金券進行購買)
            <br />
            2、【專屬禮包】為限購優惠商品，僅官網可購，建議優先購買獎勵更豐厚。
            <br />
            3、限購商品如超出購買上限，則不再發放商品內容，將補發對應金額代金券和元寶返利。
            <br />
            4、每筆訂單均返利10%元寳，多储多得，無数量限制。
            <br />
            5、當付款金額大於商品價格時，多支付的金额，將自换算為代金券發放。
            <br />
            如:購買50.99代金券，實際支付54.99，多支付的54.00，將换算發放240代金券+24元寶返利。
            <br />
            ★由於匯率波動，部分储值檔位展示元寶数目，與遊戲實際發放元寶有【1元寶】的誤差，實際發放元寶數目以遊戲內為準。
            <br />
            ★如您對以上儲值规则有任何的疑問，歡迎擊我們的FB在線客服為您解答到。
            <br />
          </section>
        </section>
      </main>
    </>
  );
}
