"use client";
import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../shop/compos/ProductCard";
import "swiper/css";
import ReactSelect from "react-select";
import { theme } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Autoplay, Grid } from "swiper/modules";

const Trending = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);

  const getCategories = async () => {
    try {
      const repsonse = await get("/api/category");
      setCategories(repsonse?.data?.categories);
    } catch (error) {
      setCategories([]);
      console.log(error);
    }
  };

  const options =
    categories?.length > 0
      ? categories?.map((category) => ({
          value: category.category_id,
          label: category.name,
        }))
      : [];

  useEffect(() => {
    const filteredbyLabel = products.filter(
      (product) => product.labels && product.labels.includes("Trending")
    );

    if (selectedCategory.length === 0) {
      setFilterProducts(filteredbyLabel);
    } else {
      setFilterProducts(
        filteredbyLabel.filter((product) => {
          return selectedCategory.includes(product.categoryId);
        })
      );
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    // getProducts();
    getCategories();
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.section
        className="pb-[2as0px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-playfairdisplay font-semibold">
                Trending Now
              </h3>
              <div className="hidden sm:block min-w-[176px]">
                <ReactSelect
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
                  isMulti
                  options={options}
                  style={{
                    menu: (provided) => ({
                      control: (provided, state) => ({
                        ...provided,
                        width: 300,
                      }),
                      ...provided,
                      padding: ".7rem",
                      zIndex: 9999,
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      zIndex: 9999, // Ensure this is high enough to be above the Swiper slider
                    }),
                  }}
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
              {filterProducts?.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Grid]}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={2}
                  spaceBetween={20}
                  grid={{ rows: 3, fill: "row" }}
                  breakpoints={{
                    540: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                      grid: { rows: 1, fill: "row" },
                    },
                    800: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                      grid: { rows: 1, fill: "row" },
                    },
                    1050: {
                      slidesPerView: 4,
                      spaceBetween: 15,
                      grid: { rows: 1, fill: "row" },
                    },
                  }}
                >
                  {filterProducts?.map((product, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <motion.div
                          key={product.product_id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <h4>No Products</h4>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Trending;
