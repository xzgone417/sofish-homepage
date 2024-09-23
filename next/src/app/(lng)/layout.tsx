import type { Metadata } from "next";
// import { dir } from "i18next";
// import { languages, fallbackLng } from "@/i18n/settings";
// import { useTranslation } from "@/i18n";
import "animate.css";
import "@/styles/fonts/fontawesome-free-5.15.4-web/css/all.min.css";
import "@/styles/fonts/ionicons-2.0.1/css/ionicons.min.css";
import "@/app/globals.css";
import "@/styles/common.scss";
import Script from "next/script";
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }));
// }

export async function generateMetadata({ params }: { params: any }) {
  // if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // const { t } = await useTranslation(lng);
  return {
    metadataBase: new URL("https://www.sofish.com"),
    title: "Sofish Games",
    description: "Sofish Games",
    openGraph: {
      url: "https://www.sofish.com/",
      type: "website",
      title: "Sofish Games",
      description: "Sofish Games",
      images: [
        {
          url: "https://www.sofish.com/favicon.ico",
          width: 32,
          height: 32,
          alt: "SOFISH Icon",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0"
        />
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></Script>
        {/* <cript
          async
          defer
          src="https://accounts.google.com/gsi/client"
        ></script> */}
        <Script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
