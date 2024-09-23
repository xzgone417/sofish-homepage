"use client";

import { Input } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import useWindowWidth from "@/hooks/useWindowWidth";

function ContactPage(props: any) {
  const { data } = props;
  const windowWidth = useWindowWidth();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(null);

  const formRef = useRef<HTMLFormElement>(null) as any;
  useEffect(() => {
    let ignore = false;
    if (shouldFetch) {
      const formData = new FormData(formRef.current);
      const formValues = Object.fromEntries(formData.entries());
      const paramsSting = (params: any) => {
        const sortedParams = Object.keys(params)
          .sort()
          .reduce((result: any, key) => {
            result[key] = params[key];
            return result;
          }, {});

        const paramString = Object.keys(sortedParams)
          .map((key) => `${key}=${sortedParams[key]}`)
          .join("&");
        return paramString;
      };

      if (
        !(formValues.name && formValues.email && formValues.subject && formValues.message)
      ) {
        messageApi.open({
          type: "warning",
          content: "Please fill in all the information",
        });
        setShouldFetch(false);
        return;
      }
      const formElements = formRef.current.elements;
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://sf-api-manager.sofishgame.com/officialweb/sfwebmessage/saveOrUpdate",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
                "Accept-Language": "en",
              },
              body: paramsSting(formValues),
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          if (result.code == 0) {
            messageApi.open({
              type: "success",
              content: "Submit Success",
            });

            for (let element of formElements) {
              if (element.type !== "submit") {
                element.value = "";
              }
            }
          } else {
            messageApi.open({
              type: "error",
              content: "Submit Failure",
            });
          }
        } catch (err: any) {
          messageApi.open({
            type: "error",
            content: "Submit Failure",
          });
        } finally {
          setShouldFetch(false);
        }
      };
      if (!ignore) {
        fetchData();
      }
    }
    return () => {
      ignore = true;
    };
  }, [shouldFetch]);
  const bgContent = {
    bg1: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/a-bg1.png",
    bg2: "https://image.cdn.adventurecity.sofishgame.com/webh5/assets/common/a-bg2.png",
    titleH1: "GAME DETAILS",
    titleDesc:
      "Please fill out the form and let us know about your concerns. We will try our best to provide optimized solutions.",
  };
  return (
    <>
      {contextHolder}
      <main className="contact-site">
        <section
          className="contact-bg-section"
          style={{ backgroundImage: `url(${bgContent.bg1})` }}
        >
          <div className="contact-bg-text">
            <h1>SOFISH</h1>
            <div className="s-games">
              <strong>G</strong>
              <strong>A</strong>
              <strong>M</strong>
              <strong>E</strong>
              <strong>S</strong>
            </div>
          </div>
        </section>
        <section
          className="contact-content"
          style={{ backgroundImage: `url(${bgContent.bg1})` }}
        >
          <section className="contact-content-area">
            <div className="contact-content-text">
              <h2>{bgContent.titleH1}</h2>
              <span>{bgContent.titleDesc}</span>
            </div>
          </section>
          <section className="contact-form-section">
            <form
              id="contact-form"
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                setShouldFetch(true);
                return false;
              }}
            >
              <div className="form-row">
                <div className="contact-label row-p">
                  <p className="label-p">
                    Name <sup>*</sup>
                  </p>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    className="contact-input"
                  />
                </div>
                <div className="contact-label row-p">
                  <p className="label-p">
                    Email <sup>*</sup>
                  </p>
                  <input
                    type="email"
                    name="email"
                    placeholder=""
                    className="contact-input"
                  />
                </div>
              </div>
              <div className="contact-label">
                <p className="label-p">
                  Subject <sup>*</sup>
                </p>
                <input
                  type="text"
                  name="subject"
                  placeholder=""
                  className="contact-input"
                />
              </div>
              <div className="contact-label">
                <p className="label-p">
                  Message <sup>*</sup>
                </p>
                <textarea name="message" placeholder="" rows={10}></textarea>
              </div>
              <div className="contact-submit-label">
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="submit-btn"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </section>
      </main>
    </>
  );
}

export default ContactPage;
