"use client";
import { Button } from "@material-tailwind/react";
import { UserStatus } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function ProfileMenu() {
  const { data: session, status, data } = useSession();
  const [visible, setVisible] = useState(false);
  return (
    <>
      {status === "loading" ? (
        <li>
          <span className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
            Loading...
          </span>
        </li>
      ) : (
        <>
          {session ? (
            <>
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={() => setVisible(!visible)}
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  <span>
                    {session.user?.firstName + session?.user?.lastName}{" "}
                  </span>
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownNavbar"
                  className={`z-10  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                    visible ? "absolute visible" : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {data?.user?.status === UserStatus.ACTIVE && (
                      <li>
                        <Link
                          href="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <Button
                  className="rounded text-primary-200 border-primary-200 font-emirates"
                  variant="text"
                >
                  Login
                </Button>
              </Link>
            </li>
          )}
        </>
      )}
    </>
  );
}
