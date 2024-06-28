import Link from "next/link";
import React from "react";
import ProfileMenu from "../ProfileMenu";
import Image from "next/image";
import CartSidebar from "../CartSidebar";

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
      <nav className="container bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between">
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
                <li>
                  <CartSidebar />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
