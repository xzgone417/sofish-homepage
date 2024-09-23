"use client";

import { ConfigProvider, Pagination } from "antd";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import useWindowWidth from "@/hooks/useWindowWidth";
export default function GamesPage(props: any) {
  const { data } = props;
  const vrCardList = data.records;
  const windowWidth = useWindowWidth();
  const [videoBtn, setVideoBtn] = useState(false);
  const targetRef = useRef(null) as any;
  const { vrBg, videoObj } = props.clientData;

  return (
    <>
      <main className="games-site">
        <section
          className="vr-bg-section"
          ref={targetRef}
          style={
            windowWidth > 768
              ? { backgroundImage: `url(${vrBg.bg})` }
              : { backgroundImage: `url(${vrBg.mbSrc})` }
          }
        >
          <iframe
            className="video-bg"
            src={windowWidth > 768 ? videoObj.href : videoObj.mb}
            title="YouTube video player"
            allowFullScreen
            allow="autoplay"
          ></iframe>
          {videoBtn && (
            <div className="video-play-group">
              <div className="wrapper">
                <button
                  className="wrapper-btn"
                  onClick={(e) => {
                    setVideoBtn(false);
                  }}
                >
                  <i className="ion ion-play"></i>
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="vr-exhibit-section">
          <section className="vr-exhibit-title">
            <section className="vr-link-title">
              <h6>
                <Link href={"/games"} className="active-title">
                  MOBILE GAME
                </Link>
                <span className="separation">/</span>
                <Link href={"/vr-game"} className="current-title">
                  VR GAME
                </Link>
              </h6>
            </section>
            <h2
              className="vr-desc-title"
              dangerouslySetInnerHTML={{ __html: vrBg.title }}
            ></h2>
            <p className="vr-desc-p">{vrBg.description}</p>
          </section>
          <section
            className="vr-exhibit-content"
            style={{ backgroundImage: `url(${vrBg.cardBg})` }}
          >
            <div className="vr-exhibit-card">
              {vrCardList
                .filter((ele: any) => ele.sort == 0)
                .map((item: any, index: number) => (
                  <Link
                    href={item.apple}
                    target="_blank"
                    key={item.apple + index}
                  >
                    <div className="vr-exhibit-image">
                      <Image
                        src={item.bg}
                        alt=""
                        className="vr-card-logo"
                        fill
                        priority={true}
                        sizes="(max-width: 768px) 100vw,100vw"
                      ></Image>
                    </div>
                    <div className="vr-exhibit-card-content">
                      <div className="vr-exhibit-tag">VR</div>
                      <div className="vr-exhibit-desc">
                        <h5>{item.name}</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        ></p>
                        <div className="vr-exhibit-button-container">
                          <button className="vr-exhibit-btn">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </section>
        <section
          className="vr-list-section"
          style={
            windowWidth > 768
              ? { backgroundImage: `url(${vrBg.listBg})` }
              : { backgroundColor: "#fff" }
          }
        >
          <div className="vr-list-container">
            {vrCardList.map((item: any, index: number) => (
              <div className="vr-card" key={item?.apple + index}>
                <Link href={item.apple} target="_blank">
                  <div className="image-container">
                    <div className="card-img-container">
                      <Image
                        src={windowWidth > 768 ? item.bg : item.mb}
                        alt=""
                        className="card-img"
                        fill
                        sizes="(max-width: 768px) 100vw,100vw"
                      ></Image>
                    </div>
                    <div className="vr-label">VR</div>
                    <div className="vr-label-fff"></div>
                  </div>
                  <div className="card-content">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <div className="button-container">
                      <button className="button">Learn More</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <section className="pagination-section">
            {/* <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    // itemSize: 48,
                  },
                },
              }}
            >
              <Pagination
                align="center"
                defaultCurrent={1}
                total={gameList.length}
                pageSize={12}
                defaultPageSize={12}
                hideOnSinglePage={true}
                onChange={changePagination}
              />
            </ConfigProvider> */}
          </section>
        </section>
      </main>
    </>
  );
}
