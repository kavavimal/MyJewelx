"use client";
import { useShopStore } from "@/contexts/shopStore";
import { Option, Select } from "@material-tailwind/react";
import { Button, IconButton } from "@material-tailwind/react";
import PriceFilter from "./PriceFilter";
import { Drawer } from "@material-tailwind/react";
import { useState } from "react";
import Image from "next/image";
import FilterProduct from "./FilterProduct";
export default function ShopTopComponent({ max, filterdDatas }) {
  const selectedFilters = useShopStore((store) => store.filters);
  const setSelectedFilters = useShopStore((store) => store.setFilters);
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleChangeSort = (value) => {
    setSelectedFilters({ ...selectedFilters, sort: value });
  };
  // const filterByPrice = async (min, max) => {
  //   setSelectedFilters({ ...selectedFilters, price: { min: min, max: max } });
  // };

  const filterByPrice = async (minval, maxval) => {
    let filters = selectedFilters;
    filters = {
      ...filters,
      price: {
        min: minval,
        max: maxval,
      },
    };
    await setSelectedFilters(filters);
  };
  return (
    <>
      <div className="flex justify-end items-center mb-5">
        <div className="w-full lg:block hidden">
          <PriceFilter filterByPrice={filterByPrice} max={max} />
        </div>
        <div className="lg:hidden block w-full">
          <Button
            onClick={openDrawer}
            className="bg-transparent flex items-center gap-2 shadow-none border font-normal text-[14px] py-2 px-3 border-blueGray-300 text-blueGray-300 normal-case font-emirates"
          >
            Filter{" "}
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.83333 0.75H11.1667C11.3214 0.75 11.4698 0.811458 11.5791 0.920854C11.6885 1.03025 11.75 1.17862 11.75 1.33333V2.2585C11.75 2.4132 11.6885 2.56155 11.5791 2.67092L7.83758 6.41242C7.72818 6.52179 7.6667 6.67014 7.66667 6.82483V10.5028C7.66666 10.5914 7.64645 10.6789 7.60755 10.7586C7.56866 10.8383 7.51211 10.9081 7.44221 10.9626C7.3723 11.0172 7.29088 11.0551 7.20414 11.0734C7.11739 11.0918 7.0276 11.0901 6.94158 11.0686L5.77492 10.7769C5.64877 10.7453 5.53681 10.6725 5.4568 10.57C5.37679 10.4674 5.33334 10.3411 5.33333 10.2111V6.82483C5.3333 6.67014 5.27182 6.52179 5.16242 6.41242L1.42092 2.67092C1.31151 2.56155 1.25003 2.4132 1.25 2.2585V1.33333C1.25 1.17862 1.31146 1.03025 1.42085 0.920854C1.53025 0.811458 1.67862 0.75 1.83333 0.75Z"
                stroke="#CBCBCB"
                strokeWidth="0.875"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div className="flex">
          <Select
            label="Sort"
            value={selectedFilters.sort}
            onChange={(value) => handleChangeSort(value)}
          >
            <Option value="Low to High">Low to High</Option>
            <Option value="High to Low">High to Low</Option>
            <Option value="Ascending">Most Older</Option>
            <Option value="Descending">Most Recent</Option>
          </Select>
        </div>
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4 lg:hidden block overflow-scroll"
        overlayProps={{
          className:
            "fixed inset-0 bg-black bg-opacity-60 backdrop-blur-none pointer-events-auto",
        }}
      >
        <div className="flex flex-col items-start gap-5">
          <div>
            Price:
            <PriceFilter filterByPrice={filterByPrice} max={max} />
          </div>
          <div className="mt-5">
            <FilterProduct filterdDatas={filterdDatas} />
          </div>
        </div>
      </Drawer>
    </>
  );
}
