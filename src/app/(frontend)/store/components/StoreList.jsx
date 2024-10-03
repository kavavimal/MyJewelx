"use client";
import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import StoreCard from "./StoreCard";
import { useState, useEffect } from "react";
import { useVendorStore } from "@/contexts/vendorStore";
import LoadingDots from "@/app/components/LoadingDots";
export default function StoreList({ vendors }) {
  const router = useRouter();
  const [filteredvendors, setFilteredVendors] = useState(vendors);
  const filterdvends = useVendorStore((vendor) => vendor.vendors);
  const loading = useVendorStore((vendor) => vendor.loading);
  const setVendors = useVendorStore((vendor) => vendor.setVendors);

  useEffect(() => {
    setVendors(vendors);
    console.log(vendors);
  }, [vendors]);

  useEffect(() => {
    if (filterdvends) {
      setFilteredVendors(filterdvends);
    } else {
      setFilteredVendors(vendors);
    }
  }, [filterdvends]);

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query) {
      const filtered = filteredvendors.filter((list) => {
        const storeName = list?.vendor?.store_name?.toLowerCase() || "";
        const fullName = `${list?.firstName?.toLowerCase() || ""} ${
          list?.lastName?.toLowerCase() || ""
        }`;
        return storeName.includes(query) || fullName.includes(query);
      });
      setFilteredVendors(filtered);
    } else if (query === "") {
      if (filterdvends) {
        setFilteredVendors(filterdvends);
      } else {
        setFilteredVendors(vendors);
      }
    }
  };

  const handleSortByCreatedAt = (order) => {
    const sorted = [...filteredvendors].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (order === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setFilteredVendors(sorted);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-3 mb-[30px] sm:mb-5">
        <div className="relative w-full sm:w-[333px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1290_18793)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.7255 9.73354C11.5984 8.60819 12.0098 7.19257 11.876 5.77467C11.7422 4.35677 11.0732 3.0431 10.0052 2.10092C8.93719 1.15874 7.55036 0.658828 6.12684 0.702877C4.70332 0.746927 3.35005 1.33163 2.34234 2.33804C1.33375 3.34515 0.747128 4.69895 0.702026 6.12355C0.656924 7.54815 1.15673 8.93634 2.0996 10.0052C3.04246 11.0741 4.35743 11.7433 5.77652 11.8763C7.19561 12.0093 8.61203 11.5963 9.73714 10.7212L9.76724 10.7527L12.7366 13.7228C12.8017 13.7879 12.8789 13.8395 12.9639 13.8747C13.0488 13.9099 13.1399 13.928 13.2319 13.928C13.3239 13.928 13.4149 13.9099 13.4999 13.8747C13.5849 13.8395 13.6621 13.7879 13.7271 13.7228C13.7922 13.6578 13.8438 13.5806 13.879 13.4956C13.9142 13.4106 13.9323 13.3196 13.9323 13.2276C13.9323 13.1356 13.9142 13.0445 13.879 12.9596C13.8438 12.8746 13.7922 12.7974 13.7271 12.7323L10.757 9.76294C10.7468 9.75286 10.7363 9.74305 10.7255 9.73354ZM9.27234 3.32854C9.66756 3.71738 9.98188 4.18062 10.1972 4.69154C10.4125 5.20246 10.5245 5.75095 10.5267 6.30538C10.529 6.8598 10.4215 7.40919 10.2103 7.92185C9.9992 8.4345 9.68866 8.90029 9.29662 9.29233C8.90458 9.68437 8.4388 9.99491 7.92614 10.206C7.41348 10.4172 6.8641 10.5247 6.30967 10.5224C5.75525 10.5202 5.20675 10.4082 4.69583 10.1929C4.18491 9.97759 3.72167 9.66327 3.33284 9.26804C2.55578 8.47823 2.1223 7.41335 2.12681 6.30538C2.13132 5.1974 2.57346 4.13609 3.35692 3.35263C4.14039 2.56917 5.2017 2.12703 6.30967 2.12251C7.41765 2.118 8.48252 2.55149 9.27234 3.32854Z"
                  fill="#676767"
                />
              </g>
              <defs>
                <clipPath id="clip0_1290_18793">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <Input
            onChange={handleSearch}
            type="search"
            label="Search Store"
            labelProps={{
              className: "hidden",
            }}
            placeholder="Search Store"
            containerProps={{
              className: "min-w-0 placeholder:visible",
            }}
            className="disabled:placeholder-shown peer w-full h-full bg-transparent text-blue-gray-700 font-sans placeholder:font-emirates font-normal outline-none 
             disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all 
             border border-blue-gray-200 focus:border-2 focus:border-gray-900 
             placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent 
             text-sm px-3 py-2.5 rounded-[7px] pl-10 
             placeholder:opacity-100 focus:placeholder:opacity-100
             disabled:placeholder-shown !border-t-blue-gray-200 focus:!border-t-gray-900 "
          />
        </div>

        <div className="">
          <Select
            label="Sort By"
            // containerProps={{ className: "!w-full !min-w-0 !max-w-full" }}
          >
            <Option>
              <button
                className="w-full text-start"
                onClick={() => handleSortByCreatedAt("asc")}
              >
                Most Recent
              </button>
            </Option>
            <Option>
              <button
                className="w-full text-start"
                onClick={() => handleSortByCreatedAt("desc")}
              >
                Most Older
              </button>
            </Option>
          </Select>
        </div>
      </div>
      <div className="grid gap-x-5 gap-y-[20px] sm:gap-y-[39px] grid-cols-1 sm:grid-cols-3">
        {!loading &&
          filteredvendors.length > 0 &&
          filteredvendors.map((list, index) => {
            return <StoreCard key={index} list={list} />;
          })}

        {!loading && filteredvendors.length === 0 && (
          <div className="text-start">
            <p className="text-base text-gray-700">No Store Found</p>
          </div>
        )}
      </div>
      {loading && (
        <div className="text-center items-center h-[50vh] w-full flex justify-center flex-col ">
          <LoadingDots size="20" />
        </div>
      )}
    </>
  );
}
