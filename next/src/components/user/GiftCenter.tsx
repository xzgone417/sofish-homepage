"use client";
import "@/styles/components/gift.scss";
import { futimesSync } from "fs";
import { use } from "i18next";
import { Suspense, useState } from "react";
import Image from "next/image";
import { signFetch, urlencodedFetch } from "@/utils/fetchRequest";
import LoadingWrapper from "../LoadingWrapper";
import useAccountInfo from "@/hooks/useAccountInfo";
import Pagination from "../Pagination";

export default function GiftCenter(props: any) {
  let { data } = props;
  const { accountInfo } = useAccountInfo();
  const [giftList, setGiftList] = useState([]) as any[];
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentGame, setCurrentGame] = useState({}) as any;
  const [checkedGame, setCheckedGame] = useState("");
  const checkTheGame = async (params: any, fun_page?: number) => {
    setIsLoading(true);
    if (!fun_page) {
      setCurrentGame(params);
    }
    const res = await urlencodedFetch(
      { url: "/officialweb/sfwebgift/search" },
      {
        currentPage: fun_page || currentPage,
        pageSize: 10,
        appID: params.appID,
        uid: accountInfo?.uid,
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
      setGiftList(res.data?.records);
      setTotalPages(Math.ceil(res.data.total / 10));
      setIsLoading(false);
      if (!fun_page) {
        setCheckedGame(params.name);
      }
    } else {
      setIsLoading(false);
    }
  };
  const receiveGift = async (params: any, index: number) => {
    const res = await signFetch(
      {
        headers: props.requestConfig,
        domain: "https://sf-api-manager.sofishgame.com",
        url: "/officialweb/sfwebgiftcode/code",
      },
      {
        appID: params.appID,
        uid: accountInfo?.uid,
        giftID: params.id,
      },
      {
        messageApi: props.messageApi,
        content: "Receive Failure",
      }
    );
    if (res.code === 0) {
      let onceGiftList = [...giftList];
      onceGiftList[index].giftStatus = 1;
      setGiftList(onceGiftList);
      props.messageApi.open({ type: "success", content: "Receive Success" });
    }
  };
  const handlePageChange = (fun_page: number) => {
    setCurrentPage(fun_page);
    checkTheGame(currentGame, fun_page);
  };
  return (
    <>
      <div className="gift-center-container">
        <div className="gift-center-title">
          <p>
            <span
              className="center-title"
              onClick={() => {
                setCheckedGame("");
              }}
            >
              Pack Center
            </span>
            <span className="separation">/</span>
            <span className="game-title">
              {checkedGame ? checkedGame : "Please select your game"}
            </span>
          </p>
        </div>
        <LoadingWrapper
          isLoading={isLoading}
          isEmpty={Boolean(checkedGame) && giftList?.length < 1}
          emptyDesc="No Gift"
        >
          {checkedGame ? (
            <ul className="my-gift-container" style={{ height: "86%" }}>
              {giftList.map((item: any, index: number) => (
                <li className="my-gift-li" key={item.giftName + index}>
                  <Image
                    src={item.iconUrl}
                    alt=" "
                    className="gift-avatar"
                    width={92}
                    height={92}
                  ></Image>
                  <div className="gift-info">
                    <p className="gift-name">{item.gameName}</p>
                    <p className="gift-code">{item.giftName}</p>
                  </div>
                  <div className="copy-btn-div">
                    {item.giftStatus ? (
                      <button className="copied-btn">Claimed</button>
                    ) : (
                      <button
                        className="copy-btn"
                        onClick={() => {
                          receiveGift(item, index);
                        }}
                      >
                        Receive
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="game-gift-ul">
              {data.records
                .filter((ele: any, _inx: number) => ele.isGift > 0)
                .map((item: any, index: number) => (
                  <li
                    className="game-gift-li"
                    key={item.name + index}
                    onClick={() => {
                      checkTheGame(item);
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt=" "
                      className="game-avatar"
                      width={92}
                      height={92}
                    ></Image>
                    <p>{item.name}</p>
                  </li>
                ))}
            </ul>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </LoadingWrapper>
      </div>
    </>
  );
}
