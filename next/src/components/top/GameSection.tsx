"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { message, Tabs } from "antd";
import useAccountInfo from "@/hooks/useAccountInfo";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import LoadingWrapper from "@/components/LoadingWrapper";
import CustomSelect from "@/components/CustomSelect";
import { motion } from "framer-motion";

export default function GameSection(props: any) {
  return (
    <>
      <section className="select-game-container">
        <div className="top-tag-container">
          <div className="container-tag">
            <span className="tag-index">1</span>
            <span className="tag-title">Select Game</span>
          </div>
        </div>

        <div className="select-game-div">
          <LoadingWrapper isLoading={props.isGameLoading} isEmpty={false}>
            <Image
              src={props.theGame.icon}
              alt=" "
              className="game-logo-img"
              width={200}
              height={200}
            ></Image>
            <div className="server-label">
              <span className="label-span"> Game:</span>
              <div className="custom-select-container">
                <CustomSelect
                  options={props.gameList}
                  label="name"
                  value="appID"
                  defaultValue={props.theGame?.appID}
                  onChange={props.toSelectGame}
                  title="Please select your game"
                ></CustomSelect>
              </div>
            </div>

            <div className="server-label">
              <span className="label-span"> Server:</span>
              <div className="custom-select-container">
                <CustomSelect
                  options={props.serverList}
                  label="serverName"
                  value="serverID"
                  defaultValue={props.theServer?.serverID}
                  onChange={props.toSelectServer}
                  title="Please select your server"
                ></CustomSelect>
              </div>
            </div>
            <div className="server-label">
              <span className="label-span"> Character:</span>
              <div className="custom-select-container">
                <CustomSelect
                  options={props.roleList}
                  label="roleName"
                  value="roleID"
                  defaultValue={props.theRole?.roleID}
                  onChange={props.toSelectRole}
                  title="Please select your role"
                ></CustomSelect>
              </div>
            </div>
          </LoadingWrapper>
        </div>
      </section>
    </>
  );
}
