"use client";
import React, { useState, useRef, useEffect } from "react";
import "@/styles/part/custom-select.scss";

import useWindowWidth from "@/hooks/useWindowWidth";
import SlideUpPanel from "@/components/SlideUpPanel";
import { color, motion } from "framer-motion";
const CustomSelect = ({
  options,
  onChange,
  defaultValue,
  title = "Please Select",
  label = "label",
  value = "value",
}: any) => {
  const windowWidth = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.[value]
  );
  const dropdownRef = useRef(null) as any;
  useEffect(() => {
    const handleClickDropDownOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current!.contains(event.target)) {
        if (windowWidth > 576) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickDropDownOutside);
    return () => {
      document.removeEventListener("click", handleClickDropDownOutside);
    };
  }, [windowWidth]);
  useEffect(() => {
    setSelectedValue(defaultValue || options[0]?.[value]);
  }, [options, defaultValue]);
  // 选项改变时触发回调函数
  const handleSelectChange = (_value: any) => {
    setSelectedValue(_value);
    setIsOpen(false);
    if (onChange) {
      onChange(_value);
    }
  };

  return (
    <div>
      <div className="custom-select" ref={dropdownRef}>
        <div
          className="custom-selected"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <div className="custom-select-value">
            {selectedValue ? (
              <span>
                {
                  options.find(
                    (item: any) => item?.[value] === selectedValue
                  )?.[label]
                }
              </span>
            ) : (
              <span className="placeholder">{title}</span>
            )}
          </div>
          <div className="custom-select-arrow">&#9662;</div>
        </div>

        {isOpen && windowWidth > 576 && (
          <motion.ul
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.02,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="select-ul"
          >
            {options.map((item: any, index: number) => (
              <motion.li
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 },
                }}
                key={item?.[value] + index}
                className={`select-li ${
                  item?.[value] === selectedValue ? "selected" : ""
                }`}
                onClick={() => handleSelectChange(item?.[value])}
              >
                {item?.[label]}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
      {isOpen && windowWidth <= 576 && (
        <SlideUpPanel
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          title={title}
        >
          <ul className="mb-select-ul">
            {options.map((item: any, index: number) => (
              <li
                key={item?.[value] + index}
                className={`mb-select-li ${
                  item?.[value] === selectedValue ? "selected" : ""
                }`}
                onClick={() => handleSelectChange(item?.[value])}
              >
                {item?.[label]}
              </li>
            ))}
          </ul>
        </SlideUpPanel>
      )}
    </div>
  );
};

export default CustomSelect;
