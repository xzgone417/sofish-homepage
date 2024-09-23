"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import HomePage from "@/clients/views/HomePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/home.scss";

export default function HomeTemplate({ data }: any) {
  if (data === false) {
    data = {};
    data.records = [
      {
        name: "Oil Era",
        bgHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/bg/oil.jpg",
        mbHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/mb/oil.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/oil.jpg",
        logo: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/logo/oil.png",
        logoWidth: 400,
        logoHeight: 283,
        link: "https://play.google.com/store/apps/details?id=com.aliensidea.oiltycoon.overseas",
        apple:
          "https://apps.apple.com/sg/app/oil-era-idle-mining-tycoon/id1633194817",
        isHome: 1,
      },
      {
        name: "Adventure City",
        bgHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/bg/town.jpg",
        mbHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/mb/town.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/town.jpg",
        logo: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/logo/town.png",
        logoWidth: 400,
        logoHeight: 231,
        link: "https://play.google.com/store/apps/details?id=com.sofish.adventurecity.android",
        apple:
          "https://apps.apple.com/sg/app/%E5%82%AD%E5%85%B5%E5%B0%8F%E9%8E%AE/id6462054963",
        isHome: 1,
      },
      {
        name: "Rush Lord",
        bgHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/bg/xiu.jpg",
        mbHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/mb/xiu.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/xiu.jpg",
        logo: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/logo/xiu.png",
        logoWidth: 300,
        logoHeight: 124,
        link: "https://play.google.com/store/apps/details?id=com.threekingdoms.towerdefense.pvp",
        apple: "",
        isHome: 1,
      },
      {
        name: "Witch Awakens",
        bgHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/bg/witch.jpg",
        mbHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/mb/witch.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/witch.png",
        logo: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/logo/witch.png",
        logoWidth: 367,
        logoHeight: 208,
        link: "https://play.google.com/store/apps/details?id=com.sofish.ttmn.gp",
        apple: "https://apps.apple.com/sg/app/witch-awakens/id6483943000",
        isHome: 1,
      },
      {
        name: "Block Zone",
        bgHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/bg/block.jpg",
        mbHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/mb/block.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/block.jpg",
        logo: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/logo/block.png",
        logoWidth: 515,
        logoHeight: 296,
        link: "https://play.google.com/store/apps/details?id=com.sohi.block.android",
        apple: "",
        isHome: 1,
      },
      {
        name: "Piano Paper",
        bgHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/bg/paper.jpg",
        mbHome:
          "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/mb/paper.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/paper.png",
        logo: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/logo/paper.png",
        logoWidth: 512,
        logoHeight: 334,
        link: "https://play.google.com/store/apps/details?id=piano.tiles.music.DancingPaperdoll",
        apple: "",
        isHome: 1,
      },
    ];
  }

  return (
    <>
      <Header routeName={"/"}></Header>
      <HomePage data={data}></HomePage>
      <Footer routeName={"/"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
