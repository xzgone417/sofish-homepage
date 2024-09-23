import React from "react";
import "@/styles/part/empty.scss";

interface LoadingWrapperProps {
  isLoading: boolean;
  isEmpty: boolean;
  emptyDesc?: string;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  isEmpty,
  emptyDesc = "No Data",
  children,
}) => {
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <label>Loading...</label>
          <div className="loading"></div>
        </div>
      </div>
    );
  } else if (isEmpty) {
    return (
      <div className="empty-container">
        <div className="empty-center">
          <svg
            className="icon"
            viewBox="0 0 1166 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5926"
            width="128"
            height="128"
          >
            <path
              d="M95.256 773.953c0 72.335 213.23 130.977 476.279 130.977s476.279-58.63 476.279-130.977c0-72.322-213.254-130.976-476.28-130.976S95.257 701.63 95.257 773.953z"
              fill="#EDEDED"
              p-id="5927"
            ></path>
            <path
              d="M197.203 238.116l344.755-72.478v614.96l-320.94-89.029z"
              fill="#CBCBCB"
              p-id="5928"
            ></path>
            <path
              d="M541.97 292.983V165.626l408.945 42.448-339.587 97.328z"
              fill="#A9A9A9"
              p-id="5929"
            ></path>
            <path
              d="M595.813 300.234l-2.072 523.86-403.777-104.567v-326.12l405.85-93.173z m-272.3 174.973c-8.276-1.035-16.563 4.132-17.61 12.42-1.037 8.287 4.13 16.574 12.418 17.598l132.501 23.814c8.287 1.036 16.574-4.144 17.622-12.431 1.036-8.275-4.131-16.563-12.419-17.587l-132.512-23.814z"
              fill="#D6D6D6"
              p-id="5930"
            ></path>
            <path
              d="M593.73 824.082l365.46-126.297V377.892l-365.46-77.658z"
              fill="#DFDFDF"
              p-id="5931"
            ></path>
            <path
              d="M194.084 238.116L84.36 393.406l399.61 79.718 109.747-172.89z"
              fill="#EDEDED"
              p-id="5932"
            ></path>
            <path
              d="M707.62 461.729l348.898-114.914-105.591-139.776-356.138 93.184z"
              fill="#F7F7F7"
              p-id="5933"
            ></path>
            <path
              d="M717.967 558.032l134.596-36.244v93.172l-134.596 43.496z"
              fill="#F6F6F6"
              p-id="5934"
            ></path>
            <path
              d="M736.601 587.014v-6.215l49.688-15.527v6.215l-49.688 15.527z m0 20.706v-6.215l41.4-12.42v6.216l-41.4 12.42z m0 20.706V622.2l69.358-21.742v6.215l-69.358 21.754z"
              fill="#DFDFDF"
              p-id="5935"
            ></path>
            <path
              d="M479.851 17.86c0 9.86 6.954 17.86 15.527 17.86s15.527-8 15.527-17.86S503.939 0 495.378 0c-8.573 0-15.527 8.001-15.527 17.86z m72.478 0c0 9.86 6.954 17.86 15.527 17.86s15.514-8 15.514-17.86S576.417 0 567.856 0c-8.573 0-15.527 8.001-15.527 17.86z m72.466 0c0 9.86 6.953 17.86 15.55 17.86 8.573 0 15.515-8 15.515-17.86S648.906 0 640.357 0c-4.12 0-8.085 1.87-11.002 5.227a19.301 19.301 0 0 0-4.548 12.633z"
              fill="#A9A9A9"
              p-id="5936"
            ></path>
          </svg>
          <div className="empty-desc">{emptyDesc}</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
