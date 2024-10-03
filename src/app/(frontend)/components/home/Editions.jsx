"use client";
import { useEffect, useState } from "react";
import { get } from "@/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../shop/compos/ProductCard";
import "swiper/css";
import ReactSelect from "react-select";
import { theme } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Autoplay, Grid } from "swiper/modules";
import {
  getProductAverageRatings,
  getProductPriceString,
  truncate,
} from "@/utils/helper";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import Engagement from "../../shop/compos/Engagement";

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
    <AnimatePresence mode="wait">
      <motion.section
        className="pt-2.5 sm:py-[50px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-playfairdisplay font-semibold">
                Limited Editions
              </h3>
              <div className="sm:min-w-[176px]">
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
                <Swiper
                  modules={[Autoplay, Grid]}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={1}
                  grid={{
                    rows: 4,
                    fill: "row",
                  }}
                  spaceBetween={15}
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
                    const variation = product ? product.variations[0] : null;
                    const averateRating = getProductAverageRatings(
                      product.reviews
                    );
                    return (
                      <SwiperSlide key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="sm:p-0 pb-[15px]"
                        >
                          {
                            <Card className="overflow-hidden h-[464.33px] sm:h-auto  font-normal text-left">
                              <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="m-0 rounded-none"
                              >
                                <div className="w-full overflow-hidden">
                                  <Link
                                    href={`/product/${product?.product_id}`}
                                    className="font-normal text-left block "
                                  >
                                    <Image
                                      src={
                                        variation?.image[0]?.path
                                          ? product?.variations[0]?.image[0]
                                              ?.path
                                          : "/assets/images/image.png"
                                      }
                                      alt="image for design"
                                      width={350}
                                      height={350}
                                      className="w-full h-full sm:h-[252px] hover:scale-105 transition-all duration-300"
                                    />
                                  </Link>
                                </div>
                              </CardHeader>
                              <CardBody className="p-0 pb-[3px] pt-2.5 px-[13px]">
                                <div className="flex flex-col gap-1.5">
                                  <p className="text-black text-sm">
                                    <Link
                                      href={`/product/${product?.product_id}`}
                                      className="font-normal text-left hover:text-primary-200"
                                    >
                                      {truncate(product?.product_name, 25)}
                                    </Link>
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="font-light text-xs leading-[18px]">
                                      {getProductPriceString(
                                        product,
                                        variation ? variation : 0
                                      )}
                                    </span>
                                    <span className="font-light text-xs">
                                      {variation?.net_weight} gram
                                    </span>
                                  </div>

                                  <Engagement
                                    averateRating={averateRating}
                                    product_id={product.product_id}
                                    likes={
                                      product?.likes ? product.likes.length : ""
                                    }
                                    variation={variation}
                                    product_name={product.product_name}
                                  />

                                  {product?.user && (
                                    <p className="text-black text-sm leading-[23.83px]">
                                      Seller:{" "}
                                      {product?.user?.vendor?.store_name ??
                                        product?.user?.firstName +
                                          " " +
                                          product?.user?.lastName}
                                    </p>
                                  )}
                                </div>
                              </CardBody>
                            </Card>
                          }
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Editions;
