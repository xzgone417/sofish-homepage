"use client";
import "@/styles/components/orders.scss";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { isFalsyString } from "@/utils/judge";
import { signFetch, urlencodedFetch } from "@/utils/fetchRequest";
import useAccountInfo from "@/hooks/useAccountInfo";
import LoadingWrapper from "../LoadingWrapper";
export default function Orders(props: any) {
  const ordersTitle = [
    { name: "Order number", className: "code-th" },
    { name: "Server", className: "server-th" },
    { name: "Character", className: "role-th" },
    { name: "Amount", className: "charge-th" },
    { name: "", className: "copy-div-th" },
  ];
  const [copied, setCopied] = useState(-1);
  const { accountInfo } = useAccountInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]) as any[];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toSearch = async (params: any) => {
    setIsLoading(true);
    const res = await signFetch(
      {
        headers: params.requestConfig,
        domain: "https://api-server.sogamecdn.com",
        url: "/order/orderList",
      },
      {
        currentPage: params.currentPage,
        pageSize: 10,
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
      setOrderList(res.data.records);
      setTotalPages(Math.ceil(res.data.total / 10));
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
    <div className="orders-container">
      <h5>Recharge Order</h5>
      <ul
        className="orders-li"
        style={{ paddingLeft: "2%", paddingRight: "2%" }}
      >
        {ordersTitle.map((item: any, index: number) => (
          <li
            className={item.className}
            key={item.name}
            style={{ fontSize: "1.2em" }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ul className="orders-td-ul">
        <LoadingWrapper
          isLoading={isLoading}
          isEmpty={orderList?.length < 1}
          emptyDesc="No Order"
        >
          {orderList.map((item: any, index: number) => (
            <li className="orders-li" key={item.id}>
              <div className="code">{item.id}</div>
              <div className="server">{item.serverName}</div>
              <div className="role">{item.roleName}</div>
              <div className="charge">{item.price}</div>
              <div className="copy-div">
                {copied === index ? (
                  <button className="copied-btn">Copied</button>
                ) : (
                  <button
                    className="copy-btn"
                    onClick={() => {
                      copyToClipboard(item.id, index);
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>
            </li>
          ))}
        </LoadingWrapper>
      </ul>
      <div className="orders-pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
