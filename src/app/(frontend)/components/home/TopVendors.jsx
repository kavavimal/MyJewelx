"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { AnimatePresence, motion } from "framer-motion";

const TopVendors = ({ vendors }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-primary-250 py-10"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="">
              <h2 className="text-2xl font-semibold pb-12 font-playfairdisplay block">
                Our Top Stores
              </h2>
              <div>
                <div className="slider-container">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, Grid]}
                    spaceBetween={50}
                    slidesPerView={3}
                    loop
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    Grid={{
                      rows: 1,
                      fill: "row",
                    }}
                    breakpoints={{
                      540: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        grid: {
                          rows: 1,
                          fill: "row",
                        },
                      },
                      650: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        grid: {
                          rows: 1,
                          fill: "row",
                        },
                      },
                      900: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                        grid: {
                          rows: 1,
                          fill: "row",
                        },
                      },
                    }}
                  >
                    {vendors.map((vendor, index) => {
                      return (
                        <SwiperSlide key={index} className="text-center">
                          <div className="group">
                            <Link
                              href={`/${vendor.firstName} ${vendor.lastName}`}
                            >
                              <div className="relative mx-auto h-[100px] w-[100px] rounded-full overflow-hidden transition-transform transform group-hover:rotate-12">
                                <Image
                                  src={vendor.image?.path}
                                  alt="Vendor Image"
                                  width={100}
                                  height={100}
                                  unoptimized={true}
                                  className="h-full w-full object-cover"
                                  onError={(event) => {
                                    event.target.src =
                                      "/assets/images/vendor1.jpg";
                                    event.target.alt =
                                      "/assets/images/vendor1.jpg";
                                  }}
                                />
                              </div>

                              <p className="py-5 text-base font-semibold transition-colors group-hover:text-primary-500">
                                {vendor?.vendor?.store_name || "Vendor Store"}
                              </p>
                            </Link>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default TopVendors;
