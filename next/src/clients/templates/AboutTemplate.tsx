"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import AboutPage from "@/clients/views/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import "@/styles/about.scss";

export default function HomeTemplate({ data }: any) {
  const [descContent, setDescContent] = useState(() => {
    return {
      mbTitle: "Mobile Games",
      mbDesc:
        "Sofish has experienced mobile gaming teams, with products available in over 150 countries and regions, serving tens of millions of users worldwide. In the future, Sofish will continue to innovate in mobile gaming, delivering high-quality games to players across the globe.",
      vrTitle: "VR Games",
      vrDesc:
        "We have top-tier XR game R&D capabilities. Our games have been exhibited at major VR game exhibitions worldwide, and our game <em>Overbeat</em> was featured on the homepage of the Vision Pro App Store.",
    };
  });
  return (
    <>
      <Header  routeName={"/about"}></Header>
      <AboutPage data={data}  descContent={descContent}></AboutPage>
      <Footer  routeName={"/about"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
