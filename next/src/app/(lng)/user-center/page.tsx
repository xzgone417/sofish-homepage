// import { permanentRedirect } from "next/navigation";
// // import { Trans } from "react-i18next/TransWithoutContext";
import { Suspense, useState } from "react";
// import { languages, fallbackLng } from "@/i18n/settings";
// import { useTranslation } from "@/i18n";
import UserCenterTemplate from "@/clients/templates/UserCenterTemplate";
import Loading from "@/app/(lng)/loading";

import { urlencodedFetch } from "@/utils/fetchRequest";
async function getPageData() {
  const res = await urlencodedFetch(
    {
      url: "/officialweb/sfwebgamelist/search",
    },
    {
      currentPage: 1,
      pageSize: 100,
      gametype: 1,
    }
  );
  if (res.code === 0) {
    return res.data;
  } else {
    return false;
  }
}

export default async function UserCenter({ params }: { params: any }) {
  // if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // const { t } = await useTranslation(lng);
  const toGetData = getPageData();

  const [data] = await Promise.all([toGetData]);
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <UserCenterTemplate data={data}></UserCenterTemplate>
      </Suspense>
    </>
  );
}
