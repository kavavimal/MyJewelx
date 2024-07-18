"use client";
import { useShopStore } from "@/contexts/shopStore";
import { Option, Select } from "@material-tailwind/react";
import PriceFilter from "./PriceFilter";
export default function ShopTopComponent() {
  const selectedFilters = useShopStore((store) => store.filters);
  const setSelectedFilters = useShopStore((store) => store.setFilters);

  const handleChangeSort = (value) => {
    setSelectedFilters({ ...selectedFilters, sort: value });
  };
  const filterByPrice = async (min, max) => {
    setSelectedFilters({ ...selectedFilters, price: { min: min, max: max } });
  };
  return (
    <div className="flex justify-end items-center">
      <div className="w-full">
        <PriceFilter filterByPrice={filterByPrice} />
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
  );
}
