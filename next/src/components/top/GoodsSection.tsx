"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { message, Tabs } from "antd";
import useAccountInfo from "@/hooks/useAccountInfo";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import LoadingWrapper from "@/components/LoadingWrapper";
import { motion } from "framer-motion";

export default function GoodsSection(props: any) {
  return (
    <>
      <section className="select-goods-container">
        <div className="top-tag-container">
          <div className="container-tag">
            <span className="tag-index">2</span>
            <span className="tag-title">Select Product</span>
          </div>
          <div className="container-tips">
            Top-up product: After payment, please wait for the product to
            arrive.
            <span
              className="tip-link"
              onClick={() => {
                props.openCustomerService();
              }}
            >
              *If the product is not received or there are any problems, please
              contact the game customer service.
            </span>
          </div>
        </div>
        <div className="select-goods-div">
          <div className="goods-tabs">
            <div className="goods-tab">
              <h5
                onClick={() => {
                  props.toSelectGoodsStatus(0);
                }}
              >
                Voucher Product
              </h5>
              <h5
                onClick={() => {
                  props.toSelectGoodsStatus(1);
                }}
              >
                Large Remittance
              </h5>
            </div>
            <div
              className="goods-line"
              style={
                props.goodsStatus === 0 ? { left: "35%" } : { left: "65%" }
              }
            ></div>
          </div>
          <div className="goods-container">
            <LoadingWrapper
              isLoading={props.isLoading}
              isEmpty={props.goodsList?.length < 1}
              emptyDesc="No Goods"
            >
              {props.goodsList.map((item: any, index: number) => (
                <div
                  className="top-good"
                  key={item.id}
                  style={
                    props.cargo?.id === item.id
                      ? { borderColor: "orangered", borderWidth: "2px" }
                      : {}
                  }
                  onClick={() => {
                    props.toSelectCargo(item);
                  }}
                >
                  <div className="good-info">
                    <Image
                      src={
                        "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/user-png/diamond6.png"
                      }
                      alt=" "
                      className="good-logo"
                      width={200}
                      height={200}
                    ></Image>
                    <div className="good-text">
                      <div className="good-title">{item?.name || "name"}</div>
                      <div className="good-desc">
                        {item?.description || "description"}
                      </div>
                    </div>
                  </div>
                  <div className="good-price-div">
                    <strong className="good-unit">{item.currency}</strong>
                    <strong className="good-price">
                      {(item.price / 100).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </LoadingWrapper>
          </div>
        </div>
      </section>
    </>
  );
}
