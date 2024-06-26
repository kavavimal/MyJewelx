import Link from "next/link";
import React from "react";
import ProfileMenu from "../ProfileMenu";
import Image from "next/image";

const MenuLinks = [
  {
    label: (
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.4688 0.375C16.2102 0.375 14.2327 1.34625 13 2.98797C11.7673 1.34625 9.78984 0.375 7.53125 0.375C5.73337 0.377026 4.00971 1.09213 2.73842 2.36342C1.46713 3.63471 0.752026 5.35837 0.75 7.15625C0.75 14.8125 12.102 21.0097 12.5855 21.2656C12.7129 21.3342 12.8553 21.37 13 21.37C13.1447 21.37 13.2871 21.3342 13.4145 21.2656C13.898 21.0097 25.25 14.8125 25.25 7.15625C25.248 5.35837 24.5329 3.63471 23.2616 2.36342C21.9903 1.09213 20.2666 0.377026 18.4688 0.375ZM13 19.4937C11.0028 18.33 2.5 13.0286 2.5 7.15625C2.50174 5.82241 3.03237 4.5437 3.97554 3.60054C4.9187 2.65737 6.19741 2.12674 7.53125 2.125C9.65859 2.125 11.4447 3.25813 12.1906 5.07812C12.2565 5.23861 12.3687 5.37587 12.5128 5.47248C12.6569 5.56908 12.8265 5.62065 13 5.62065C13.1735 5.62065 13.3431 5.56908 13.4872 5.47248C13.6313 5.37587 13.7435 5.23861 13.8094 5.07812C14.5553 3.25484 16.3414 2.125 18.4688 2.125C19.8026 2.12674 21.0813 2.65737 22.0245 3.60054C22.9676 4.5437 23.4983 5.82241 23.5 7.15625C23.5 13.0198 14.995 18.3289 13 19.4937Z"
          fill="#1A1A1A"
        />
      </svg>
    ),
    link: "/",
  },
  {
    label: "Shop",
    link: "/shop",
  },
  {
    label: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.375 0.5C1.14294 0.5 0.920376 0.592187 0.756282 0.756282C0.592187 0.920376 0.5 1.14294 0.5 1.375C0.5 1.60706 0.592187 1.82962 0.756282 1.99372C0.920376 2.15781 1.14294 2.25 1.375 2.25H1.8055C1.9955 2.25033 2.18023 2.31249 2.33177 2.4271C2.48332 2.5417 2.59344 2.70252 2.6455 2.88525L5.421 12.5977C5.57798 13.1459 5.90915 13.628 6.36443 13.9712C6.81971 14.3144 7.37435 14.5 7.9445 14.5H15.9403C16.465 14.5001 16.9777 14.3429 17.4122 14.0488C17.8468 13.7546 18.1831 13.337 18.378 12.8498L20.9575 6.39925C21.0635 6.13382 21.103 5.84646 21.0723 5.56228C21.0416 5.2781 20.9418 5.00575 20.7816 4.76905C20.6214 4.53235 20.4056 4.3385 20.1532 4.20443C19.9008 4.07037 19.6193 4.00018 19.3335 4H4.784L4.32725 2.404C4.17067 1.85585 3.8399 1.37358 3.38495 1.03007C2.92999 0.686562 2.37557 0.500498 1.8055 0.5H1.375ZM7.1045 12.1147L5.2845 5.75H19.3335L16.7522 12.2005C16.6872 12.3627 16.5752 12.5017 16.4304 12.5997C16.2857 12.6976 16.115 12.75 15.9403 12.75H7.9445C7.7545 12.7497 7.56977 12.6875 7.41823 12.5729C7.26668 12.4583 7.15656 12.2975 7.1045 12.1147ZM8.375 21.5C8.71972 21.5 9.06106 21.4321 9.37954 21.3002C9.69802 21.1683 9.9874 20.9749 10.2312 20.7312C10.4749 20.4874 10.6683 20.198 10.8002 19.8795C10.9321 19.5611 11 19.2197 11 18.875C11 18.5303 10.9321 18.1889 10.8002 17.8705C10.6683 17.552 10.4749 17.2626 10.2312 17.0188C9.9874 16.7751 9.69802 16.5817 9.37954 16.4498C9.06106 16.3179 8.71972 16.25 8.375 16.25C7.67881 16.25 7.01113 16.5266 6.51884 17.0188C6.02656 17.5111 5.75 18.1788 5.75 18.875C5.75 19.5712 6.02656 20.2389 6.51884 20.7312C7.01113 21.2234 7.67881 21.5 8.375 21.5ZM8.375 19.75C8.14294 19.75 7.92038 19.6578 7.75628 19.4937C7.59219 19.3296 7.5 19.1071 7.5 18.875C7.5 18.6429 7.59219 18.4204 7.75628 18.2563C7.92038 18.0922 8.14294 18 8.375 18C8.60706 18 8.82962 18.0922 8.99372 18.2563C9.15781 18.4204 9.25 18.6429 9.25 18.875C9.25 19.1071 9.15781 19.3296 8.99372 19.4937C8.82962 19.6578 8.60706 19.75 8.375 19.75ZM15.375 21.5C15.7197 21.5 16.0611 21.4321 16.3795 21.3002C16.698 21.1683 16.9874 20.9749 17.2312 20.7312C17.4749 20.4874 17.6683 20.198 17.8002 19.8795C17.9321 19.5611 18 19.2197 18 18.875C18 18.5303 17.9321 18.1889 17.8002 17.8705C17.6683 17.552 17.4749 17.2626 17.2312 17.0188C16.9874 16.7751 16.698 16.5817 16.3795 16.4498C16.0611 16.3179 15.7197 16.25 15.375 16.25C14.6788 16.25 14.0111 16.5266 13.5188 17.0188C13.0266 17.5111 12.75 18.1788 12.75 18.875C12.75 19.5712 13.0266 20.2389 13.5188 20.7312C14.0111 21.2234 14.6788 21.5 15.375 21.5ZM15.375 19.75C15.1429 19.75 14.9204 19.6578 14.7563 19.4937C14.5922 19.3296 14.5 19.1071 14.5 18.875C14.5 18.6429 14.5922 18.4204 14.7563 18.2563C14.9204 18.0922 15.1429 18 15.375 18C15.6071 18 15.8296 18.0922 15.9937 18.2563C16.1578 18.4204 16.25 18.6429 16.25 18.875C16.25 19.1071 16.1578 19.3296 15.9937 19.4937C15.8296 19.6578 15.6071 19.75 15.375 19.75Z"
          fill="#1A1A1A"
        />
      </svg>
    ),
    link: "/about",
  },
];
export default function FrontendHeader() {
  return (
    <>
      <div className="top-bar bg-black py-2">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <a
                href="mailto:contact@myjewlex.com"
                className="flex items-center gap-2 text-white text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="currentColor"
                    d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z"
                    className="clr-i-solid clr-i-solid-path-1"
                  ></path>
                  <path
                    fill="currentColor"
                    d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z"
                    className="clr-i-solid clr-i-solid-path-2"
                  ></path>
                  <path fill="none" d="M0 0h36v36H0z"></path>
                </svg>{" "}
                contact@myjewlex.com
              </a>
            </div>
            <div>
              <label htmlFor="" className="text-white text-sm">
                Your Dream Jewelry, Realized by my Jewlex
              </label>
            </div>
            <div>
              <a
                href="tel:+917555176153"
                className="flex items-center gap-2 text-white text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                  ></path>
                </svg>{" "}
                +91 755 517 6153
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <div>
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image width={160} height={160} src="/logo.png" alt="logo" />
            </Link>
          </div>
          <div>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row gap- md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <ProfileMenu />
                {MenuLinks.map((link, i) => {
                  return (
                    <li key={"linkmenu" + i}>
                      <Link href={link.link} aria-current="page">
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
