import FrontendHeader from "@/components/frontend/common/Header";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <FrontendHeader />
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="m-auto place-self-center lg:col-span-7 px-2">
          <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Page Not Found
          </h2>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            The Route you are looking for is not found please Check link on top
            or contact us
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </>
  );
}
