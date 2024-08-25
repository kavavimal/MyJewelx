"use client";
import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import StoreCard from "./StoreCard";

export default function StoreVendorPage({ vendors }) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Input type="search" label="Search Store" className="w-[333px]" />
        </div>
        <div>
          <Select label="Sort By">
            <Option>Most Recent</Option>
          </Select>
        </div>
      </div>
      <div className="grid gap-x-5 gap-y-[39px] grid-cols-3">
        {vendors.length > 0 &&
          vendors.map((list, index) => {
            return <StoreCard key={index} list={list} />;
          })}
      </div>
    </>
  );
}
