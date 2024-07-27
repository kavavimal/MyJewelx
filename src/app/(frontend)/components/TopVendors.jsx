"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={5}
                    loop
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                  >
                    {vendors.map((vendor, index) => {
                      return (
                        <SwiperSlide key={index} className="text-center">
                          <div className="">
                            <Link
                              href={`/${vendor.firstName} ${vendor.lastName}`}
                            >
                              <Image
                                src={
                                  vendor.image?.path ??
                                  "/assets/images/vendor1.jpg"
                                }
                                alt="Vendor Images"
                                width={100}
                                height={100}
                                className="mx-auto rounded-full h-[100px] w-[100px]"
                              ></Image>

                              <p className="py-5 text-base font-semibold	">
                                {vendor.firstName + " " + vendor.lastName}
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
