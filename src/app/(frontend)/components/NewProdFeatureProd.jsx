"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductCard from "../shop/compos/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import {
  getProductAverageRatings,
  getProductPriceString,
  truncate,
} from "@/utils/helper";
import Engagement from "../shop/compos/Engagement";
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
const NewProdFeatureProd = ({ products }) => {
  return (
    <>
      <section className="py-10">
        <div className="container">
          <div className="flex items-start justify-center gap-5">
            <div className="new-products w-[550px]">
              <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide mb-5">
                New Products
              </h3>
              <div className="relative">
                <Swiper
                  navigation={{
                    nextEl: ".next",
                    prevEl: ".prev",
                  }}
                  loop
                  modules={[Navigation]}
                >
                  {products.slice(0, 5).map((product, index) => {
                    const variation = product?.variations[0];
                    return (
                      <SwiperSlide key={index}>
                        <Card className="realative overflow-hidden font-normal text-left h-[758px]">
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                          >
                            <div className="w-full overflow-hidden bg-[#FFFDF8]">
                              <Link
                                href={`/product/${product?.product_id}`}
                                className="font-normal w-full h-[437px] flex justify-center items-center"
                              >
                                <Image
                                  src={"/assets/images/new.png"}
                                  alt="image for design"
                                  width={450}
                                  height={437}
                                  className="w-full h-auto hover:scale-105 transition-all duration-300"
                                />
                              </Link>
                            </div>
                          </CardHeader>
                          <CardBody className="p-0 py-[19px] px-[15px]">
                            <div className="flex flex-col gap-2">
                              <p className="text-black text-sm">
                                <Link
                                  href={`/product/${product?.product_id}`}
                                  className="font-normal leading-8 text-left text-[22px]"
                                >
                                  {truncate(product?.product_name, 25)}
                                </Link>
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="font-light text-base">
                                  {getProductPriceString(product, variation)}
                                </span>
                                <span className="font-light text-base">
                                  {variation.net_weight} gram
                                </span>
                              </div>
                              <Engagement
                                averateRating={getProductAverageRatings(
                                  product.reviews
                                )}
                                product_id={product.product_id}
                                variation={variation}
                              />
                              {product?.user && (
                                <p className="text-black text-[22px] leading-[30.8px]">
                                  Seller:{" "}
                                  {product?.user?.vendor?.store_name ??
                                    product?.user?.firstName +
                                      " " +
                                      product?.user?.lastName}
                                </p>
                              )}

                              <div
                                className="mt-.5"
                                dangerouslySetInnerHTML={{
                                  __html: truncate(variation?.description, 480),
                                }}
                              />
                            </div>
                          </CardBody>
                        </Card>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <button className="prev absolute -translate-y-1/3 top-1/3 cursor-pointer z-[15] flex justify-center items-center left-[30px] rounded-full border h-[35px] w-[35px] bg-[#F9F2E1]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.19922 8.00078L10.3992 15.2008L11.5192 14.0008L5.59922 8.00078L11.5192 2.00078L10.3992 0.800781L3.19922 8.00078Z"
                      fill="#1A1A1A"
                    />
                  </svg>
                </button>
                <button className="next absolute -translate-y-1/3 top-1/3 cursor-pointer z-[15] flex justify-center items-center right-[30px] rounded-full border h-[35px] w-[35px] bg-[#F9F2E1]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.60047 0.800781L4.48047 2.00078L10.4005 8.00078L4.48047 14.0008L5.60047 15.2008L12.8005 8.00078L5.60047 0.800781Z"
                      fill="#1A1A1A"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="feature-products w-[calc(100%-570px)]">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide">
                  Feature Products
                </h3>
                <div>
                  <Link href="/shop">
                    <Button variant="outlined">View All</Button>
                  </Link>
                </div>
              </div>
              <div>
                <Swiper
                  slidesPerView={2}
                  spaceBetween={20}
                  modules={[Grid, Pagination]}
                  grid={{ rows: 2, fill: "row" }}
                >
                  {products.map((product) => {
                    const variation = product?.variations[0];
                    return (
                      <SwiperSlide key={product.product_id}>
                        <Card className="overflow-hidden font-normal text-left">
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                          >
                            <div className="w-auto overflow-hidden">
                              <Link
                                href={`/product/${product?.product_id}`}
                                className="font-normal text-left w-full"
                              >
                                <Image
                                  src={
                                    product?.variations &&
                                    product?.variations.length > 0 &&
                                    product?.variations[0]?.image[0]?.path
                                      ? product?.variations[0]?.image[0]?.path
                                      : "/assets/images/image.png"
                                  }
                                  alt="image for design"
                                  width={256}
                                  height={268}
                                  className="w-full h-[268px] hover:scale-105 transition-all duration-300"
                                />
                              </Link>
                            </div>
                          </CardHeader>
                          <CardBody className="p-0 pb-[3px] pt-2.5 px-[13px]">
                            <div className="flex flex-col gap-1">
                              <p className="text-black text-sm">
                                <Link
                                  href={`/product/${product?.product_id}`}
                                  className="font-normal text-left"
                                >
                                  {truncate(product?.product_name, 25)}
                                </Link>
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="font-light text-xs leading-[18px]">
                                  {getProductPriceString(product, variation)}
                                </span>
                                <span className="font-light text-xs">
                                  {variation.net_weight} gram
                                </span>
                              </div>
                              <div className="leading-6">
                                <Engagement
                                  averateRating={getProductAverageRatings(
                                    product.reviews
                                  )}
                                  product_id={product.product_id}
                                  variation={variation}
                                />
                              </div>
                              {product?.user && (
                                <p className="text-black text-sm">
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
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewProdFeatureProd;
