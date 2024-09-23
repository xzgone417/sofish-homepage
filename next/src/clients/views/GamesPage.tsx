"use client";

import { ConfigProvider, Pagination } from "antd";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import useWindowWidth from "@/hooks/useWindowWidth";
export default function GamesPage(props: any) {
  let { data, clientData } = props;
  const gameList = data.records;
  const windowWidth = useWindowWidth();
  const { bgImg } = clientData;
  const [gameNum, setGameNum] = useState(4);
  const [startAnimate, setStartAnimate] = useState(0);
  const targetRef = useRef(null) as any;
  useEffect(() => {
    if (windowWidth > 768) {
      setGameNum(20);
    }
  }, [windowWidth]);
  const moreGames = () => {
    if (windowWidth > 768) {
      setGameNum(gameNum + 4);
    } else {
      setGameNum(gameNum + 5);
    }
  };
  const scrollToElement = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };
  const changePagination = (_page: any) => {
    scrollToElement();
  };

  return (
    <>
      <main className="games-site">
        <section className="games-bg-section" ref={targetRef}>
          {windowWidth > 768 ? (
            <Image
              src={bgImg.src}
              alt=" "
              className="games-bg-img"
              width={1920}
              height={739}
              style={{
                objectFit: "cover",
              }}
              priority={true}
            ></Image>
          ) : (
            <Image
              src={bgImg.mbSrc}
              alt=" "
              className="games-bg-img"
              width={750}
              height={965}
              style={{
                objectFit: "cover",
              }}
              priority={true}
            ></Image>
          )}
        </section>
        <section className="games-list-section">
          <section className="games-list-title">
            <h6>
              <Link href={"/games"} className="current-title">
                MOBILE GAME
              </Link>
              <span className="separation">/</span>
              <Link href={"/vr-game"} className="active-title">
                VR GAME
              </Link>
            </h6>
          </section>
          <section className="games-list-content">
            {gameList
              .filter((ele: any, _inx: number) => _inx <= gameNum)
              .map((item: any, index: number) => (
                <div
                  className={
                    startAnimate === 1 ? "game-products" : "game-products"
                  }
                  key={item?.name + index}
                  // style={{ backgroundImage: `url(${item.bg})` }}
                >
                  <Image
                    src={item.bg}
                    alt=" "
                    className="game-item-img"
                    width={370}
                    height={590}
                    priority={true}
                  ></Image>
                  <div className="game-hover-div">
                    <div className="game-hover-content">
                      <div className="game-logo">
                        <Image
                          src={item.icon}
                          alt=" "
                          className="game-logo-img"
                          width={120}
                          height={120}
                        ></Image>
                      </div>
                      <span className="game-name">{item.name}</span>
                      <Link
                        className="google-link"
                        href={item.link}
                        target="_blank"
                      >
                        <div className="google-link-container">
                          <Image
                            src="https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/gplay-02.png"
                            alt="SOFISH"
                            className="google-link-img"
                            width={196}
                            height={84}
                          ></Image>
                        </div>
                      </Link>
                      {item.apple && (
                        <Link
                          className="apple-link"
                          href={item.apple}
                          target="_blank"
                        >
                          <div className="apple-link-container">
                            <Image
                              src="https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/aplay-02.png"
                              alt="SOFISH"
                              className="apple-link-img"
                              width={196}
                              height={84}
                            ></Image>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </section>
          <section className="pagination-section">
            {gameNum + 1 < gameList.length && (
              <button
                className="btn-get-more"
                onClick={() => {
                  moreGames();
                }}
              >
                MORE +
              </button>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
