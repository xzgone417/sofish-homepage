// import { permanentRedirect } from "next/navigation";
import { Suspense, useState } from "react";
// import { languages, fallbackLng } from "@/i18n/settings";
// import { useTranslation } from "@/i18n";
import RechargeTemplate from "@/clients/templates/RechargeTemplate";

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
const requestSecretKey = async (params: any) => {
  const res = await urlencodedFetch(
    {
      domain: "https://sf-api-manager.sofishgame.com",
      url: "/officialweb/sfwebgamelist/searchparams",
    },
    { currentPage: 1, pageSize: 100, appID: params.game }
  );
  if (res.code === 0) {
    return res.data;
  } else {
    return false;
  }
};
export default async function Recharge({ params }: { params: any }) {
  // if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // const { t } = await useTranslation(lng);
  const toGetData = getPageData();
  const toGetRequestSecretKey = requestSecretKey(params);
  const [data, secretData] = await Promise.all([
    toGetData,
    toGetRequestSecretKey,
  ]);
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <RechargeTemplate
          data={data}
          appID={params.game}
          secretData={secretData}
        ></RechargeTemplate>
      </Suspense>
    </>
  );
}
