"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import GamesPage from "@/clients/views/GamesPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import "@/styles/games.scss";

export default function GamesTemplate({ data }: any) {
  if (data === false) {
    data = {};
    data.records = [
      {
        name: "Oil Era",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/oil.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/oil.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/oil.jpg",
        link: "https://play.google.com/store/apps/details?id=com.aliensidea.oiltycoon.overseas",
        apple:
          "https://apps.apple.com/sg/app/oil-era-idle-mining-tycoon/id1633194817",
      },
      {
        name: "Adventure City",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/town.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/town.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/town.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sofish.adventurecity.android",
        apple:
          "https://apps.apple.com/sg/app/%E5%82%AD%E5%85%B5%E5%B0%8F%E9%8E%AE/id6462054963",
      },
      {
        name: "Rush Lord",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/xiu.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/xiu.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/xiu.jpg",
        link: "https://play.google.com/store/apps/details?id=com.threekingdoms.towerdefense.pvp",
        apple: "",
      },
      {
        name: "Witch Awakens",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/witch.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/witch.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/witch.png",
        link: "https://play.google.com/store/apps/details?id=com.sofish.ttmn.gp",
        apple: "https://apps.apple.com/sg/app/witch-awakens/id6483943000",
      },
      {
        name: "Paws Go!",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/pawpack.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/pawpack.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/pawpack.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sofish.wptxj.gp",
        apple: "",
      },
      {
        name: "My Island",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/island.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/island.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/island.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sofish.myisland",
        apple:
          "https://apps.apple.com/sg/app/my-island-beach-resort/id6449279342",
      },
      {
        name: "Ever Legend",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/knight.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/knight.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/knight.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sofish.anr.brawlknight",
        apple:
          "https://apps.apple.com/us/app/ever-legend-idle-rpg/id6463859555",
      },
      {
        name: "Gems Boom",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/gem.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/gem.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/gem.png",
        link: "https://play.google.com/store/apps/details?id=com.sofish.bsyj.gp",
        apple: "",
      },
      {
        name: "Ludo Land",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/ludo.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/ludo.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/ludo.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sofish.ludoland",
        apple:
          "https://apps.apple.com/sg/app/ludo-land-dice-board-game/id6446826235",
      },
      {
        name: "Gummies Champs",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/champs.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/champs.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/champs.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sofish.party.android",
        apple: "",
      },
      {
        name: "Block Zone",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/block.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/block.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/block.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sohi.block.android",
        apple: "",
      },
      {
        name: "Screw Snap",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/screw.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/screw.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/screw.jpg",
        link: "https://play.google.com/store/apps/details?id=com.sohi.screw.gp",
        apple: "",
      },
      {
        name: "Piano Paper",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/paper.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/paper.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/paper.png",
        link: "https://play.google.com/store/apps/details?id=piano.tiles.music.DancingPaperdoll",
        apple: "",
      },
      {
        name: "Dancing Girls",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/girls.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/girls.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/girls.jpg",
        link: "https://play.google.com/store/apps/details?id=piano.musicgames.EDM.DancingGirls",
        apple: "",
      },
      {
        name: "Slash Dash",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/slash.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/slash.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/slash.jpg",
        link: "https://play.google.com/store/apps/details?id=beat.Slash.Musicgame.EDM",
        apple: "",
      },
      {
        name: "Fantasy Piano",
        bg: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/bg/piano.jpg",
        mb: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/games/mb/piano.jpg",
        icon: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/home/icon/piano.jpg",
        link: "https://play.google.com/store/apps/details?id=piano.music.fantasy.tiles",
        apple: "",
      },
    ];
  }
  const clientData = {
    bgImg: {
      src: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/g-bg.jpg",
      mbSrc:
        "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/mb-g-bg.jpg",
    },
  };

  return (
    <>
      <Header  routeName={"/games"}></Header>
      <GamesPage clientData={clientData} data={data} ></GamesPage>
      <Footer  routeName={"/games"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
