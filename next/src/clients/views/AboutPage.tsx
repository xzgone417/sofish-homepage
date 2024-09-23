"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
import { Image as AntdImage } from "antd";
import { link } from "fs";
import useWindowWidth from "@/hooks/useWindowWidth";
import { motion } from "framer-motion";

function AboutPage(props: any) {
  const { data } = props;
  const windowWidth = useWindowWidth();
  let sliderBgRef = useRef(null) as any;
  const [sliderCurrent, setSliderCurrent] = useState(0);
  const sliderSettings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    focusOnSelect: true,
    nextArrow: <></>,
    prevArrow: <></>,
    customPaging: function (i: any) {
      return <p className="my-slider-dot"></p>;
    },
    beforeChange: (current: any, next: number) => {
      setSliderCurrent(next);
    },
    dots: true,
    dotsClass: "slick-dots my-slick-thumb",
  };
  const bgContent = {
    bg1: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/a-bg1.png",
    bg2: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/a-bg2.jpg",
    titleH1: "We are games",
    titleDesc: "With years of gaming making",
    desc: "With years of gaming making and publishing experience, Century Games grows through strategic M&A, studio investment and publishing.",
  };
  const aboutList = [
    // [
    //   {
    //     bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/dash.jpg",
    //     link: "https://apps.apple.com/us/app/beat-slash-dash/id6532603661?platform=vision",
    //   },
    //   {
    //     bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/mixed.jpg",
    //     link: "https://apps.apple.com/us/app/beat-slash-dash/id6532603661?platform=vision",
    //   },
    //   {
    //     bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/overbeat.jpg",
    //     link: "https://apps.apple.com/us/app/overbeat/id6499493749?platform=vision",
    //   },
    //   {
    //     bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/pianoisiv.jpg",
    //     link: "https://apps.apple.com/us/app/pianoisiv/id6504733677?platform=vision",
    //   },
    // ],
    {
      bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/only/knight.jpg",
      link: "https://apps.apple.com/us/app/beat-slash-dash/id6532603661?platform=vision",
    },
    {
      bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/only/mixed.jpg",
      link: "https://apps.apple.com/us/app/overbeat/id6499493749?platform=vision",
    },
    // [
    //   {
    //     bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/one/pianoisiv.jpg",
    //     link: "https://apps.apple.com/us/app/pianoisiv/id6504733677?platform=vision",
    //   },
    // ],
  ];

  return (
    <>
      <main className="about-site">
        <section
          className="about-bg-section"
          style={{ backgroundImage: `url(${bgContent.bg1})` }}
        >
          <div className="about-bg-text">
            <h2>About us</h2>
          </div>
        </section>
        <section
          className="about-content"
          style={{
            backgroundImage: `url(${bgContent.bg2})`,
          }}
        >
          <section className="about-content-title">
            {/* <h3 className="about-content-title-h2">{bgContent.titleH1}</h3> */}
            {sliderCurrent === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="about-content-title-h2"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.descContent.mbTitle,
                  }}
                ></div>
              </motion.div>
            )}
            {sliderCurrent === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="about-content-title-h2"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.descContent.vrTitle,
                  }}
                ></div>
              </motion.div>
            )}
          </section>
          <section className="mb-about-content-desc">
            {/* <p className="about-content-desc-p">{bgContent.desc}</p> */}
            {sliderCurrent === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="about-content-desc-p"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.descContent.mbDesc,
                  }}
                ></div>
              </motion.div>
            )}
            {sliderCurrent === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="about-content-desc-p"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.descContent.vrDesc,
                  }}
                ></div>
              </motion.div>
            )}
          </section>
          <section className="about-main-content">
            <section className="about-slider-section">
              <Slider
                lazyLoad="progressive"
                {...sliderSettings}
                ref={(slider) => {
                  sliderBgRef = slider;
                }}
              >
                {/* <div className="slider-block">
                  <div className="slider-container">
                    <div className="slider-images">
                      {aboutList[0].map((item) => (
                        <div className="about-img" key={item.bg}>
                          <AntdImage
                            className="about-img-c"
                            src={item.bg}
                            preview={windowWidth > 768 ? false : true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
                <div className="slider-block">
                  <div className="slider-container">
                    <div className="slider-video-div">
                      <AntdImage
                        width="100%"
                        height="100%"
                        className="slider-video"
                        src={aboutList[0].bg}
                        preview={windowWidth > 768 ? false : true}
                      />
                    </div>
                  </div>
                </div>
                <div className="slider-block">
                  <div className="slider-container">
                    <div className="slider-video-div">
                      <AntdImage
                        width="100%"
                        height="100%"
                        className="slider-video"
                        src={aboutList[1].bg}
                        preview={windowWidth > 768 ? false : true}
                      />
                    </div>
                  </div>
                </div>
              </Slider>
            </section>
            <section className="about-content-desc-section">
              {/* <p className="about-content-desc-p">{bgContent.desc}</p> */}
              {sliderCurrent === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="about-content-desc-p"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.descContent.mbDesc,
                    }}
                  ></div>
                </motion.div>
              )}
              {sliderCurrent === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="about-content-desc-p"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.descContent.vrDesc,
                    }}
                  ></div>
                </motion.div>
              )}
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default AboutPage;
