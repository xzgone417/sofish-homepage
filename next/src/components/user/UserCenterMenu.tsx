"use client";
import React, { useState } from "react";
import "@/styles/components/user-menu.scss";
import { useRouter } from "next/navigation";

export default function UserCenterMenu(props: any) {
  const router = useRouter();
  return (
    <>
      <ul className="user-menu-ul">
        {props.menuList.map((item: any, index: number) => (
          <li
            className={
              props.previousMenu === index + 1
                ? "user-menu-li li-active"
                : "user-menu-li"
            }
            key={item}
            onClick={() => {
              if (index === 2) {
                router.push("/top-up");
                return;
              }
              props.setPreviousMenu(index + 1);
              props.setMenuStatus(index + 1);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
