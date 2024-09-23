import React, { useState, useRef, useEffect } from "react";
import "@/styles/part/slide-up-panel.scss"; // 引入样式文件
import useDisableScroll from "@/hooks/useDisableScroll";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
const SlideUpPanel = ({ isOpen, onClose, title, children }: any) => {
  const panelRef = useRef(null) as any;
  const { setShouldDisable } = useDisableScroll();
  useEffect(() => {
    if (isOpen) {
      setShouldDisable(true);
    } else {
      setShouldDisable(false);
    }

    return () => {
      setShouldDisable(false);
    };
  }, [isOpen]);
  return (
    <>
      {createPortal(
        <div
          className="slide-up-overlay"
          onClick={(e) => {
            e.stopPropagation();
            if (panelRef.current && !panelRef.current?.contains(e.target)) {
              onClose();
            }
          }}
        >
          <motion.div
            className="slide-up-panel"
            ref={panelRef}
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ height: 0 }}
            animate={{ height: "50vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="panel-header">
              <h4>{title}</h4>
            </div>
            <div className="panel-body">{children}</div>
          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
};

export default SlideUpPanel;
