"use client";
import { useEffect, useState } from "react";
import { get } from "@/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../shop/compos/ProductCard";
import "swiper/css";
import ReactSelect from "react-select";
import { theme } from "@/utils/constants";

const Editions = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  const getProducts = async () => {
    try {
      const repsonse = await get("/api/product");
      setProducts(repsonse?.data?.products);
      setFilterProducts(repsonse?.data?.products);
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };

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
    if (selectedCategory.length === 0) {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => {
          return selectedCategory.includes(product.categoryId);
        })
      );
    }
  }, [selectedCategory]);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);
  return (
    <section className="py-[50px]">
      <div className="container">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-playfairdisplay font-semibold">
              Limited Editions
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
          <div className="overflow-hidden">
            {filterProducts?.length === 0 ? (
              <h1>No Products</h1>
            ) : (
              <Swiper slidesPerView={4} spaceBetween={20}>
                {filterProducts?.map((product, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editions;
