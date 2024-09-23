"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import VRGamePage from "@/clients/views/VRGamePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import "@/styles/games.scss";

export default function VRGameTemplate({ data }: any) {
  if (data === false) {
    data = {};
    data.records = [
      {
        name: "Beat Slash",
        description:
          "Become the cyber runner, fueled by hyper EDM beats: Wield your light sabers to slash all the beats with rhythm, combine with parkour action movements, and fight your way out in this arcade mania!",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/dash.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/dash.jpg",
        apple:
          "https://apps.apple.com/us/app/beat-slash-dash/id6532603661?platform=vision",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/dash.jpg",
        sort: 0,
      },
      {
        name: "Overbeat",
        description:
          "Dive into Overbeat, a hyper rhythm-based shooter game where relentless waves of targets rush towards you from every angle. Use your dual weapons to blast them into oblivion!",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/overbeat.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/overbeat.jpg",
        apple:
          "https://apps.apple.com/us/app/overbeat/id6499493749?platform=vision",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/overbeat.jpg",
        sort: 1,
      },
      {
        name: "Piano isiv",
        description:
          "By simply tapping in the tiles with rhythm, you can play enchanting piano melodies!",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/about/part/pianoisiv.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/pianoisiv.jpg",
        apple:
          "https://apps.apple.com/us/app/pianoisiv/id6504733677?platform=vision",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/pianoisiv.jpg",
        sort: 2,
      },
    ];
  }
  const clientData = {
    vrBg: {
      bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/vr-bg.jpg",
      mbSrc:
        "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/mb-vr-bg.jpg",
      cardBg:
        "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/vr-bg2.jpg",
      listBg:
        "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/vr-world2.jpg",
      title: "S<span style=color:red>O</span>FISH VR GAME NOW AVAIL ABLE",
      description:
        " Whether it is a blockbuster movie or an emerging independent work. sofish VR provides the best virtual reality gaming experience for the modern gaming industry.",
    },
    videoObj: {
      href: "https://www.youtube.com/embed/AAMnmURW7lo?autoplay=1",
      mb: "https://www.youtube.com/embed/uKc2aBhCVfw?autoplay=1",
    },
  };
  return (
    <>
      <Header routeName={"/vr-game"}></Header>
      <VRGamePage data={data} clientData={clientData}></VRGamePage>
      <Footer routeName={"/vr-game"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
