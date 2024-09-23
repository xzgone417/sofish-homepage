"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { message } from "antd";
import useAccountInfo from "@/hooks/useAccountInfo";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";

export default function TopUpPage(props: any) {
  const { bgImg } = props.clientData;
  const gameList = props.data.records || [];

  const windowWidth = useWindowWidth();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <main className="top-up-site">
        <section
          className="top-up-bg-section"
          style={
            windowWidth > 768
              ? { backgroundImage: `url(${bgImg.src})` }
              : { backgroundImage: `url(${bgImg.mbSrc})` }
          }
        ></section>
        <section className="top-up-games-section">
          <div className="top-up-games-title-container">
            <em className="top-up-games-title">Hot Game</em>
            <i className="top-up-games-title-desc">Please select the game you want to top up</i>
          </div>

          <div className="top-up-games-container">
            {gameList
              .filter((ele: any, _inx: number) => ele.isPay > 0)
              .map((item: any, index: number) => (
                <Link
                  className="top-up-game"
                  key={item.name}
                  href={`/top-up/${item.appID}`}
                >
                  <Image
                    src={item.icon}
                    alt=" "
                    className="game-logo-img"
                    width={200}
                    height={200}
                  ></Image>
                  <span className="game-name">{item.name}</span>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
