"use client";
import "@/styles/components/gift.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import { urlencodedFetch } from "@/utils/fetchRequest";
import useAccountInfo from "@/hooks/useAccountInfo";
import LoadingWrapper from "../LoadingWrapper";
import { isFalsyString } from "@/utils/judge";
import Pagination from "../Pagination";

export default function MyGift(props: any) {
  const { accountInfo } = useAccountInfo();
  const [copied, setCopied] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [giftList, setGiftList] = useState([]) as any[];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toSearch = async (params: any) => {
    setIsLoading(true);
    const res = await urlencodedFetch(
      { url: "/officialweb/sfwebgiftcode/search" },
      {
        currentPage: params.currentPage,
        pageSize: 8,
        uid: params.accountInfo?.uid,
        appID: params.requestConfig.appID,
      },
      {
        onError: () => {
          props.messageApi.open({
            type: "error",
            content: "Request Error",
          });
        },
      }
    );

    if (res.code === 0) {
      setGiftList(res.data.records);
      setTotalPages(Math.ceil(res.data.total / 8));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handlePageChange = (fun_page: number) => {
    setCurrentPage(fun_page);
  };
  async function copyToClipboard(_text: string, index: number) {
    try {
      await navigator.clipboard.writeText(_text);
      setCopied(index);
      props.messageApi.open({
        type: "success",
        content: "Copy Success",
      });
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (isFalsyString(accountInfo)) {
        toSearch({
          currentPage: currentPage,
          requestConfig: props.requestConfig,
          accountInfo: accountInfo,
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [currentPage, props.requestConfig, accountInfo]);
  return (
    <>
      <ul className="my-gift-container">
        <LoadingWrapper
          isLoading={isLoading}
          isEmpty={giftList?.length < 1}
          emptyDesc="No Gift"
        >
          {giftList.map((item: any, index: number) => (
            <li className="my-gift-li" key={item.giftCode + index}>
              <Image
                src={item.iconUrl}
                alt=" "
                className="gift-avatar"
                width={92}
                height={92}
              ></Image>
              <div className="gift-info">
                <p className="gift-name">
                  {item.gameName}
                  <span className="gift-span">{item.giftName}</span>
                </p>
                <p className="gift-code">Redeem code:{item.giftCode}</p>
              </div>
              <div className="copy-btn-div">
                {copied === index ? (
                  <button className="copied-btn">Copied</button>
                ) : (
                  <button
                    className="copy-btn"
                    onClick={() => {
                      copyToClipboard(item.code, index);
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>
            </li>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </LoadingWrapper>
      </ul>
    </>
  );
}
