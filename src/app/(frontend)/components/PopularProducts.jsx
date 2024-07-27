"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../shop/compos/ProductCard";
import RecentlyViewed from "./RecentlyViewed";
import PopularTags from "./PopularTags";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import ReactSelect from "react-select";
import { get } from "@/utils/api";
import { theme } from "@/utils/constants";

const PopularProducts = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  const options =
    categories?.length > 0
      ? categories.map((category) => ({
          value: category.category_id,
          label: category.name,
        }))
      : [];
  const getCategories = async () => {
    try {
      const repsonse = await get("/api/category");
      setCategories(repsonse?.data?.categories);
    } catch (error) {
      setCategories([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCategory.length === 0) {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => {
          return selectedCategory.includes(product.categoryId);
        })
      );
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="py-[53px]">
      <div className="flex items-start container gap-5">
        <div className="w-[320px]">
          <h3 className="mb-2.5 mt-3 text-lg font-playfairdisplay font-semibold tracking-wide">
            Recently Viewed
          </h3>
          <div className="">
            <RecentlyViewed />
          </div>
          <div>
            <div className="pt-[15px] pb-2.5">
              <h3 className="text-lg font-playfairdisplay font-semibold tracking-wide">
                Popular tags
              </h3>
            </div>
            <div>
              <PopularTags />
            </div>
          </div>
        </div>
        <div className="w-[calc(100%-340px)]">
          <div className="mb-3 flex justify-between items-center">
            <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide">
              Popular Products
            </h3>
            <div className="min-w-[176px]">
              <ReactSelect
                isMulti
                options={options}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderWidth: "1px",
                    backgroundColor: "#fff",
                    color: "#222",
                    borderRadius: 4,
                  }),

                  multiValue: (provided, state) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    borderWidth: "1px",
                    borderRadius: "4px",
                    borderColor: "#F0AE11",
                  }),
                }}
                theme={theme}
                value={options.filter((option) =>
                  selectedCategory.includes(option.value)
                )}
                onChange={(options) => {
                  setSelectedCategory(options.map((option) => option.value));
                }}
                menuPortalTarget={
                  typeof window !== "undefined" && document.body
                }
              />
            </div>
          </div>
          <div>
            {filterProducts.length === 0 ? (
              <div className="text-center">
                <p>No products found</p>
              </div>
            ) : (
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Grid, Pagination, Autoplay]}
                grid={{ rows: 2, fill: "row" }}
              >
                {filterProducts.map((product) => (
                  <SwiperSlide key={product.product_id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
