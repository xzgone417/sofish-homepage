"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import "@/styles/components/footer.scss";
function Footer(props: any) {
  return (
    <>
      <footer className="site-footer">
        <nav className="footer-menu-navigation">
          <Link href="/" className="footer-logo">
            <Image
              src="https://image.cdn.adventurecity.sofishgame.com/webh5/assets/logo.png"
              alt="SOFISH"
              className="footer-logo-img"
              width={190}
              height={44}
            ></Image>
          </Link>
          <Link
            href="/terms-of-service.html"
            className="footer-menu-link"
            target="_blank"
          >
            <span>Terms of Service</span>
          </Link>
          <Link
            href="/privacy-policy.html"
            className="footer-menu-link"
            target="_blank"
          >
            <span>Privacy Policy</span>
          </Link>
          <Link
            href="mailto:support@sofish.com"
            className="footer-menu-link"
            target="_blank"
          >
            <span>Support</span>
          </Link>
          <Link href="/contact" className="footer-menu-link">
            <span>Contacts</span>
          </Link>
          {/* <span className="footer-menu-link">
            <Link
              href={`/en${props.routeName}`}
              className={
                props.lng == "en"
                  ? "clang-link clang-link-active"
                  : "clang-link"
              }
            >
              <span>EN</span>
            </Link>
            <span className="separation">/</span>
            <Link
              href={`/zh-CN${props.routeName}`}
              className={
                props.lng == "zh-CN"
                  ? "clang-link clang-link-active"
                  : "clang-link"
              }
            >
              <span>中文</span>
            </Link>
          </span> */}
          <Link href="/" className="mobile-footer-logo">
          <Image
            src="https://image.cdn.adventurecity.sofishgame.com/webh5/assets/logo.png"
            alt="SOFISH"
            className="mobile-footer-logo-img"
            width={158}
            height={36}
          ></Image>
          </Link>
        </nav>

        <section className="footer-desc">
          @2024 SOFISH All Rights Reserved
        </section>
      </footer>
    </>
  );
}

export default Footer;
