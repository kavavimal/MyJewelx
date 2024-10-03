"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { Grid, Autoplay } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";
import {
  getProductAverageRatings,
  getProductPriceString,
  truncate,
} from "@/utils/helper";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import Engagement from "@/app/(frontend)/shop/compos/Engagement";
const RelatedProduct = ({ product }) => {
  const relatedProducts = product?.product?.relatedProducts;
  return (
    relatedProducts &&
    relatedProducts?.length > 0 && (
      <section className=" sm:pb-[50px]">
        <div className="container">
          <div>
            <div className="mb-5 flex justify-between items-center">
              <h3 className="text-2xl font-playfairdisplay font-semibold">
                Related Products
              </h3>
              <div>
                <Link href="/shop">
                  <Button variant="outlined">View All</Button>
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <Swiper
                className="sm:mb-0 mb-5 "
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
                spaceBetween={20}
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
                    spaceBetween: 20,
                    grid: { rows: 1, fill: "row" },
                  },
                }}
              >
                {relatedProducts?.map(({ product }) => {
                  const variation = product ? product.variations[0] : null;
                  const averateRating = getProductAverageRatings(
                    product.reviews
                  );
                  return (
                    <SwiperSlide key={product.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="sm:p-0 pb-[10px]"
                      >
                        <Card className="overflow-hidden h-[398px] sm:h-auto  font-normal text-left">
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                          >
                            <div className="w-auto overflow-hidden">
                              <Link
                                href={`/product/${product?.product_id}`}
                                className="font-normal text-left block "
                              >
                                <Image
                                  src={
                                    variation?.image[0]?.path
                                      ? product?.variations[0]?.image[0]?.path
                                      : "/assets/images/image.png"
                                  }
                                  alt="image for design"
                                  width={350}
                                  height={350}
                                  className="w-full h-[333.99px] sm:h-[252px] hover:scale-105 transition-all duration-300"
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
                              <div className="hidden sm:block ">
                                <Engagement
                                  averateRating={averateRating}
                                  product_id={product.product_id}
                                  variation={variation}
                                  product_name={product.product_name}
                                  likes={
                                    product?.likes ? product.likes.length : ""
                                  }
                                  reviews={
                                    product?.reviews
                                      ? product.reviews.length
                                      : ""
                                  }
                                />
                              </div>
                              {product?.user && (
                                <p className="text-black text-sm leading-[23.83px] hidden sm:block">
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
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default RelatedProduct;
