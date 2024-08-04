"use client";

import { productCategory } from "@/utils/constants";
import { Input, Option, Select } from "@material-tailwind/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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

  return (
    <form className="flex items-center ">
      <div className="w-[371px] max-w-[371px] mr-4 relative">
        <Input
          // className=" rounded-sm "
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
      <div className="w-[156px] max-w-[156px] min-w-[156px]">
        <Select
          // containerProps={{ className: "min-w-[156px]" }}
          // className="w-[156px] max-w-[156px] rounded-sm "
          name="category"
          label="Filer Category"
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
        </Select>
      </div>
    </form>
  );
}
