"use client";

import { productCategory } from "@/utils/constants";
import { Input, Option, Select } from "@material-tailwind/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import ReactSelect from "react-select";
import theme from "@material-tailwind/react/theme";

export default function SearchPODForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const style = {
    control: (provided) => ({
      ...provided,
      borderWidth: "1px",
      borderColor: "#b0bec5",
      backgroundColor: "#fff",
      color: "#222",
      padding: 1,
      borderRadius: 8,
      fontSize: "14px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      borderWidth: "1px",
      borderRadius: "4px",
      borderColor: "#F0AE11",
    }),
  };

  return (
    <>
      <div className="md:block hidden">
        <form className="flex items-center ">
          <div className="md:w-[371px] md:max-w-[146px] lg:max-w-[371px] mr-4 relative">
            <Input
              // className=" rounded-sm "
              containerProps={{ className: "!min-w-0" }}
              type="text"
              label="Search Products"
              name="search"
              value={searchParams.get("filter") || ""}
              onChange={(e) => {
                router.push(
                  pathname + "?" + createQueryString("filter", e.target.value)
                );
              }}
            />
          </div>
          <div className="md:block hidden">
            <ReactSelect
              isClearable={true}
              isMulti={false}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption
                  ? selectedOption.value
                  : ""; // Get value from selected option
                router.push(
                  pathname + "?" + createQueryString("cat", selectedValue)
                );
              }}
              theme={theme}
              styles={style}
              options={productCategory
                .map((cat) => ({
                  value: cat,
                  label: cat,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))} // Sort options alphabetically
              value={
                productCategory
                  .filter((cat) => cat === searchParams.get("cat")) // Match the current selected value
                  .map((cat) => ({ value: cat, label: cat })) ?? []
              }
              name="category"
              placeholder="Filter Category"
            />
          </div>
        </form>
      </div>
      <div className="md:hidden block">
        <div className="relative flex">
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
            // className=" rounded-sm "
            type="text"
            labelProps={{
              className: "hidden",
            }}
            placeholder="Search"
            containerProps={{
              className: "!min-w-0 !max-w-[120px] placeholder:visible",
            }}
            className="disabled:placeholder-shown  !rounded-r-none peer w-full h-full bg-transparent text-blue-gray-700 font-sans placeholder:font-emirates font-normal outline-none 
               disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all 
               border border-blue-gray-200 focus:border-2 focus:border-gray-900 
               placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent 
               text-sm px-3 py-2.5 rounded-sm pl-10 
               placeholder:opacity-100 focus:placeholder:opacity-100
               disabled:placeholder-shown !border-t-blue-gray-200 focus:!border-t-gray-900 "
            name="search"
            value={searchParams.get("filter") || ""}
            onChange={(e) => {
              router.push(
                pathname + "?" + createQueryString("filter", e.target.value)
              );
            }}
          />

          <div>
            <Select
              containerProps={{
                className:
                  "!w-[35px] !max-w-[35px] !border-l-0 !min-w-0 focus:!border-l-2 focus:!border-l-gray-900 active:border-l-2 active:border-l-gray-900 focus:!border-t-2 focus:!border-t-gray-900 ",
              }}
              className="!w-[35px] !max-w-[35px] !border-l-0 !min-w-0 rounded-sm rounded-l-none focus:!border-l-2 focus:!border-l-gray-900 active:border-l-2 active:border-l-gray-900 focus:!border-t-2 focus:!border-t-gray-900 active:border-t-2 active:border-t-gray-900"
              labelProps={{ className: "hidden" }}
              arrow={
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.83301 4.16659H11.1663V5.83325H2.83301V4.16659ZM0.333008 0.833252H13.6663V2.49992H0.333008V0.833252ZM5.33301 7.49992H8.66634V9.16659H5.33301V7.49992Z"
                    fill="#676767"
                  />
                </svg>
              }
              name="category"
              menuProps={{
                className:
                  "!min-w-full !w-[120px] overflow-visible !max-w-[120px]",
              }}
              // label="F"
              value={searchParams.get("cat") || ""}
              onChange={(val) => {
                router.push(pathname + "?" + createQueryString("cat", val));
              }}
            >
              {productCategory.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
