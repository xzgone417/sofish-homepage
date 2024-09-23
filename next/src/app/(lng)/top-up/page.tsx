// import { permanentRedirect } from "next/navigation";
// // import { Trans } from "react-i18next/TransWithoutContext";
import { Suspense, useState } from "react";
// import { languages, fallbackLng } from "@/i18n/settings";
// import { useTranslation } from "@/i18n";
import TopUpTemplate from "@/clients/templates/TopUpTemplate";
import Loading from "@/app/(lng)/loading";

import { urlencodedFetch } from "@/utils/fetchRequest";
async function getPageData() {
  const once_config = {
    url: "/officialweb/sfwebgamelist/search",
  };
  const once_query = {
    currentPage: 1,
    pageSize: 100,
    gametype: 1,
  };
  const res = await urlencodedFetch(once_config, once_query);
  if (res.code === 0) {
    return res.data;
  } else {
    return false;
  }
}

export default async function TopUp({ params }: { params: any }) {
  // if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // const { t } = await useTranslation(lng);
  const data = await getPageData();
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <TopUpTemplate data={data}></TopUpTemplate>
      </Suspense>
    </>
  );
}
