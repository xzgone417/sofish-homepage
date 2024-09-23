"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import ContactPage from "@/clients/views/ContactPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import "@/styles/contact.scss";

export default function HomeTemplate({ data }: any) {
  return (
    <>
      <Header  routeName={"/contact"}></Header>
      <ContactPage data={data} ></ContactPage>
      <Footer  routeName={"/contact"}></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
