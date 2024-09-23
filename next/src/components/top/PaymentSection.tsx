"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { message, Tabs } from "antd";
import useAccountInfo from "@/hooks/useAccountInfo";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentSection(props: any) {
  const wholesaleText =
    '<div><span style="font-size:16px;color:#E53333;">最新：大額匯款優惠，返利高達10%-20%！</span><br /><span>使用匯款（轉賬）儲值，可以獲得更加豐厚的獎勵喔~</span><br /><span>大大可通過銀行大額匯款（轉賬）服務進行儲值，客服妹妹將在確認您的款項後於一個工作日內為您發放代金券及匯款額外遊戲獎勵~</span><br /><br /><span>【支援付款方式】</span><br /><span style="font-size:16px;color:#E53333;">銀行、PayPal匯款轉賬（非官網儲值）</span><br /><br /></p><p>優惠福利如圖所示內容，歡迎使用匯款服務喔！</p><p><img src="https://assetas.mecheast.com/sgmala/images/20240627/667d3449eabe3.png" alt=""></p><p><br /></p><p>【匯款（轉賬）流程】</p><span>1、私訊專屬客服或粉絲頁小編（</span><a href="https://www.facebook.com/OfficialMonsterHunt" target="_blank"><span style="color:#00D5FF;">點擊前往</span></a><span>）</span><br /><span>2、確認後進行匯款（轉賬）到官方指定帳戶</span><br /><span>3、匯款完畢後提供以下資訊給客服妹妹：</span><br /><span>（遊戲、伺服器、角色名、角色ID、金額、匯款人姓名、電話、email、銀行帳戶後五碼以及相關的匯款轉賬證明電子檔）</span><br /><span>4、客服確認後，將會在24小時之內發放儲值和獎勵</span><br /><br /><span>&nbsp; &nbsp;【匯款（轉賬）具體帳戶資訊】</span><br /><span style="color:#E53333;">聯繫專屬客服或者粉絲頁在線客服</span><span>（</span><a href="https://www.facebook.com/OfficialMonsterHunt" target="_blank"><span style="color:#00D5FF;">點擊前往</span></a><span>）</span><br /><br /><span>【備註】</span><br /><span>1、匯款額度只能按照固定額度進行。</span><br /><span>2、匯款（轉賬）返利贈送的代金券在成功匯款（轉賬）儲值的24小時內發放。</span><br /><span>3、週末的匯款（轉賬）返利統一在週一早上進行發放。</span><br /><br /><span>如您需要匯款服務，請火速與我們客服妹妹取得聯繫吧~</span><br /><span>聯繫粉絲頁在線客服：</span><a href="https://www.facebook.com/OfficialMonsterHunt" target="_blank"><span style="color:#00D5FF;">前往諮詢在線客服</span></a><p></p><p><span><span></span><br /></span> </p></div>';
  const morePaymentRef = useRef(null) as any;
  const toOpenMorePaymentRef = useRef(null) as any;
  useEffect(() => {
    const handleClickMorePayOutside = (event: any) => {
      if (
        morePaymentRef.current &&
        !morePaymentRef.current!.contains(event.target) &&
        !toOpenMorePaymentRef.current!.contains(event.target)
      ) {
        if (props.windowWidth >= 768) {
          props.toSetMorePayWayOr(false);
        }
      }
    };
    document.addEventListener("click", handleClickMorePayOutside);
    return () => {
      document.removeEventListener("click", handleClickMorePayOutside);
    };
  }, [props.windowWidth]);
  return (
    <>
      <section className="select-payment-container">
        <div className="top-tag-container">
          <div className="container-tag">
            <span className="tag-index">3</span>
            <span className="tag-title">Payment Method</span>
          </div>
          {props.goodsStatus === 0 && (
            <div
              className="container-tips more-pay-tips"
              onClick={(e) => {
                props.toSetMorePayWayOr(!props.isMorePayWay);
              }}
              ref={toOpenMorePaymentRef}
              style={{ cursor: "pointer" }}
            >
              More payment methods <i className="ion ion-chevron-right"></i>
            </div>
          )}
        </div>
        {props.goodsStatus > 0 ? (
          <div className="wholesale-container">
            <div
              className="wholesale-content"
              dangerouslySetInnerHTML={{
                __html: wholesaleText,
              }}
            ></div>
            <div className="payment-end">
              <div className="payment-info">
                {props.cargo?.name || "name"}:
                {props.cargo?.description || "description"}
              </div>
              <button
                className="contact-btn"
                onClick={() => {
                  props.openCustomerService();
                }}
              >
                Contact customer service
              </button>
            </div>
          </div>
        ) : (
          <div className="goods-pay-container">
            <div className="payment-tabs">
              {props.isMorePayWay && props.windowWidth <= 768 ? (
                <motion.ul
                  className="more-payment-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {props.areaList.map((item: any, index: number) => (
                    <li
                      key={item.name}
                      className={
                        props.area.currencyCode === item.currencyCode
                          ? "tab-active"
                          : ""
                      }
                      onClick={() => {
                        props.toSelectArea(item);
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <ul className="payment-tab">
                  {props.areaList
                    .filter((ele: any, _inx: number) => _inx < 4)
                    .map((item: any, index: number) => (
                      <li
                        key={item.name}
                        className={
                          props.area.currencyCode === item.currencyCode
                            ? "tab-active"
                            : ""
                        }
                        onClick={() => {
                          props.toSelectArea(item);
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="payment-container">
              {props.payWayList.map((item: any, index: number) => (
                <div
                  className={
                    props.payWay.id == item.id
                      ? "payment-item selected"
                      : "payment-item"
                  }
                  key={item.id}
                  onClick={() => {
                    props.toSelectPayWay(item);
                  }}
                >
                  <Image
                    src={item.icon}
                    alt=" "
                    className="payment-logo"
                    width={230}
                    height={100}
                  ></Image>
                </div>
              ))}
            </div>
            <div className="payment-end">
              <div className="payment-info">
                {props.cargo?.name || "name"}:
                {props.cargo?.description || "description"}
              </div>
              <div
                className="payment-btn-div"
                onClick={() => {
                  props.postPayInfo();
                }}
              >
                <div className="payment-price">
                  <p className="end-price">
                    Total:
                    <span style={{ marginRight: "0.3em" }}>
                      {props.thirdProduct.thirdCurrency}
                    </span>
                    {props.thirdProduct.thirdPrice}
                  </p>
                  <p className="show-price">
                    Equal to:
                    <span style={{ marginRight: "0.3em" }}>
                      {props.cargo.currency}
                    </span>
                    {(props.cargo.price / 100).toFixed(2)}
                  </p>
                </div>
                <button className="payment-btn">Top up</button>
              </div>
            </div>
            {props.isMorePayWay && props.windowWidth > 768 && (
              <motion.div
                className="the-more-payment-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                ref={morePaymentRef}
              >
                <div className="payment-tabs">
                  <ul
                    className="more-payment-tab"
                    style={{ padding: "1%", borderRadius: "10px" }}
                  >
                    {props.areaList.map((item: any, index: number) => (
                      <li
                        key={item.name}
                        className={
                          props.area.currencyCode === item.currencyCode
                            ? "tab-active"
                            : ""
                        }
                        onClick={() => {
                          props.toSelectArea(item);
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="payment-container">
                  {props.payWayList.map((item: any, index: number) => (
                    <div
                      className={
                        props.payWay.id == item.id
                          ? "payment-item selected"
                          : "payment-item"
                      }
                      key={item.id}
                      onClick={() => {
                        props.toSelectPayWay(item);
                      }}
                      style={{ minWidth: "10rem" }}
                    >
                      <Image
                        src={item.icon}
                        alt=" "
                        className="payment-logo"
                        width={200}
                        height={80}
                      ></Image>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
