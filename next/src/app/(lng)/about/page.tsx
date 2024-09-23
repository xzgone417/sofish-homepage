// import { permanentRedirect } from "next/navigation";
// import { Trans } from "react-i18next/TransWithoutContext";
import { Suspense, useState } from "react";
// import { languages, fallbackLng } from "@/i18n/settings";
// import { useTranslation } from "@/i18n";
import AboutTemplate from "@/clients/templates/AboutTemplate";

import Loading from "@/app/(lng)/loading";

async function getPageData() {
  const res = await fetch(
    "https://fl.sogamecdn.com/officialweb/homepage/data.json"
  );
  if (!res.ok) throw new Error();
  return res.json();
}

export default async function About({
  params
}: {
  params:any
}) {
  // if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // const { t } = await useTranslation(lng);
  // const data = await getPageData();
  const data = {};
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <AboutTemplate  data={data}></AboutTemplate>
      </Suspense>
    </>
  );
}
