"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session, status } = useSession();
  return (
    <header className="shadow p-3 bg-[#ffffff] rounded-lg border border-[#cfd8dc]">
      <div className="rounded-lg">
        <div className="text-center">
          <h2 className="">
            Design & Developed By {""}
            <Link
              className="text-[#f0ae11]"
              href="https://infinitysoftech.co/"
              target="_blank"
            >
              Infinity Softech
            </Link>
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Footer;
