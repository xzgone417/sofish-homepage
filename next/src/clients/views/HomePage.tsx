"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowWidth from "@/hooks/useWindowWidth";
import useDeviceOS from "@/hooks/useDeviceOS";
export default function HomePage(props: any) {
  const { data } = props;
  const [homeBg, setHomeBg] = useState(() => {
    return data.records.filter((ele: any) => ele.isHome == 1);
  });

  const windowWidth = useWindowWidth();
  const deviceOS = useDeviceOS();
  const [sliderCurrent, setSliderCurrent] = useState(0);
  let sliderBgRef = useRef(null) as any;

  let slickBgSettings = {
    dots: false, //是否显示小圆点索引
    autoplay: true, //是否自动播放
    autoplaySpeed: 5000, //自动播放的时间
    pauseOnHover: false,
    infinite: true, //是否无限循环
    fade: windowWidth > 768 ? true : false, //是否采用淡入淡出的效果
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: any, next: number) => {
      setSliderCurrent(next);
    },
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const toSelectSliderBg = (_index: number) => {
    sliderBgRef.slickGoTo(_index);
  };
  return (
    <>
      <main className="home-site">
        <section className="home-bg-section">
          <Slider
            {...slickBgSettings}
            lazyLoad="progressive"
            ref={(slider) => {
              sliderBgRef = slider;
            }}
          >
            {homeBg.map((item: any, index: number) => (
              <div className="home-bg-slider" key={item.name + index}>
                <Link
                  href={
                    deviceOS.name === "ios" && item.apple ? item.apple : item.link
                  }
                  target="_blank"
                >
                  <div
                    className="home-bg-container"
                    style={
                      windowWidth > 768
                        ? {
                            backgroundImage: `url(${item.bgHome})`,
                            height: (windowWidth * 975) / 1920 + "px",
                          }
                        : { backgroundImage: `url(${item.mbHome})` }
                    }
                  >
                    <div className="logo-btns">
                      <Image
                        src={item.logo}
                        alt="SOFISH"
                        className="home-bg-logo"
                        width={item.logoWidth}
                        height={item.logoHeight}
                      ></Image>
                      <div className="logo-name"></div>
                      <button className="home-bg-btn">More</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

          <div className="home-dot-list">
            {homeBg.map((item: any, index: number) => (
              <div
                className="home-dot-div"
                key={item?.name + index}
                style={{
                  backgroundColor: sliderCurrent === index ? "red" : "#fff",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toSelectSliderBg(index);
                }}
              ></div>
            ))}
          </div>
          <section className="overlay-section">
            <Link
              href={
                deviceOS.name === "ios" && homeBg[sliderCurrent].apple
                  ? homeBg[sliderCurrent].apple
                  : homeBg[sliderCurrent].link
              }
              target="_blank"
              className="link-overlay"
            >
              <div className="home-element-list">
                {homeBg.map((item: any, index: number) => (
                  <div
                    className="home-element-div"
                    key={item?.name + index}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toSelectSliderBg(index);
                    }}
                  >
                    <div
                      className="home-element-bg"
                      style={{
                        // opacity: sliderCurrent === index ? 1 : 0.7,
                        filter:
                          sliderCurrent === index
                            ? "blur(0) opacity(100%)"
                            : "blur(0.5px) opacity(70%)",
                        backgroundImage: `url(${item.icon})`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toSelectSliderBg(index);
                      }}
                    ></div>
                    <div className="home-element-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </Link>
          </section>
        </section>
        <section className="occupy-section"></section>
        <section className="home-games-section">
          <h2 className="home-games-title">Games</h2>
          <div className="home-games-list">
            {homeBg.map((item: any, index: number) => (
              <div className="home-game-div" key={item?.name + index}>
                <Link
                  href={
                    deviceOS.name === "ios" && item.apple ? item.apple : item.link
                  }
                  target="_blank"
                >
                  <div className="game-logo-container">
                    <Image
                      src={item.icon}
                      alt="SOFISH"
                      className="game-logo"
                      fill
                      sizes="(max-width: 768px) 100vw,100vw"
                    ></Image>
                  </div>

                  <span className="game-name">{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
