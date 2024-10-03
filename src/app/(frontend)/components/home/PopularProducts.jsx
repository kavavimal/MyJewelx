"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../shop/compos/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import ReactSelect from "react-select";
import { get } from "@/utils/api";
import { theme } from "@/utils/constants";
import RecentlyViewed from "./RecentlyViewed";
import PopularTags from "./PopularTags";

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
      const response = await get("/api/category");
      setCategories(response?.data?.categories);
    } catch (error) {
      setCategories([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const filteredbyLabel = products.filter(
      (product) => product.labels && product.labels.includes("Popular")
    );

    if (selectedCategory.length === 0) {
      setFilterProducts(filteredbyLabel);
    } else {
      setFilterProducts(
        filteredbyLabel.filter((product) =>
          selectedCategory.includes(product.categoryId)
        )
      );
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="pt-5 pb-[15px] lg:py-[53px]">
      <div className="flex items-start container gap-5 flex-col-reverse md:flex-row lg:gap-5">
        <div className="w-full md:w-[250px] lg:w-[320px]">
          <h3 className="mt-4 mb-2.5 text-lg font-playfairdisplay font-semibold tracking-wide">
            Recently Viewed
          </h3>
          <RecentlyViewed />
          <div className="mt-5">
            <h3 className="text-lg font-playfairdisplay font-semibold tracking-wide">
              Popular tags
            </h3>
            <PopularTags />
          </div>
        </div>
        <div className="w-full md:w-[calc(100%-250px)] lg:w-[calc(100%-340px)]">
          <div className="mb-4 flex justify-between items-center">
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
              <div className="text-center py-2.5">
                <p>No products found</p>
              </div>
            ) : (
              <Swiper
                slidesPerView={2}
                spaceBetween={15}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Grid, Pagination, Autoplay]}
                grid={{ rows: 2, fill: "row" }}
                breakpoints={{
                  660: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    grid: { rows: 2, fill: "row" },
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: { rows: 2, fill: "row" },
                  },
                }}
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
