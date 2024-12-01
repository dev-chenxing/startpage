import React from "react";
import { useState } from "react";

export default function CookiesBanner() {
  const [cookiesBannerHidden, hideCookiesBanner] = useState(false);
  function onClick() {
    hideCookiesBanner(true);
  }
  return (
    <>
      {cookiesBannerHidden ? null : (
        <>
          <div
            id="cookies-banner-backdrop"
            className="absolute z-20 bg-[rgba(0,0,0,.5)] w-screen h-screen top-0 left-0 transition-opacity"
          ></div>
          <div
            id="cookies-banner"
            className="fixed z-30 w-[540px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-blue text-black p-2"
          >
            <div className="block absolute left-1/2 translate-x-[-50%] z-10 top-0 bg-black py-0 px-5 leading-snug text-white">
              Cookies Settings
            </div>
            <div className="border border-black relative p-[1px] text-center">
              <div className="border border-black pb-4">
                <p className="p-4 pb-2">
                  Our website annoys you with this cookies setting popup for the
                  purposes of lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <div className="flex gap-3 w-fit mx-auto">
                  <button
                    className="bg-yellow px-4 shadow-[6px_6px_0_0_black]"
                    onClick={() => onClick()}
                  >
                    Accept All
                  </button>
                  <button
                    className="bg-white hover:bg-yellow px-4 shadow-[6px_6px_0_0_black]"
                    onClick={() => onClick()}
                  >
                    Reject All
                  </button>
                  <button
                    className="bg-white hover:bg-yellow px-4 shadow-[6px_6px_0_0_black]"
                    onClick={() => onClick()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
