"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Topcategories = ({ categories }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          className=" py-[15px] mb-[45px] sm:py-10 sm:mb-[70px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-screen-xl mx-auto">
            <h3 className="text-2xl font-playfairdisplay leading-7 font-semibold tracking-wide ml-2 mb-2.5 sm:mb-5">
              Product Categories
            </h3>
            <div className="relative p-2.5 sm:p-0">
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                // spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  540: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    pagination: {
                      clickable: true,
                      element: ".swiper-pagination",
                    },
                    navigation: {
                      nextEl: ".swiper-category-next",
                      prevEl: ".swiper-category-prev",
                    },
                  },
                }}
              >
                {categories.map((category, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="border w-full sm:w-60 sm:rounded-none rounded-[5px] p-[15px] hover:shadow-xl hover:shadow-gray-300"
                      >
                        <Link
                          href={`shop/?category=${category.name}`}
                          className="relative"
                        >
                          <h3 className="font-emirates text-lg font-normal pb-[15.44px] absolute bottom-0 left-1/2 transform -translate-x-1/2  text-center w-full ">
                            {category.name}
                          </h3>
                          <Image
                            src="/assets/images/category.png"
                            // layout="responsive"
                            height={100}
                            width={100}
                            className="sm:h-full h-[342px] w-full sm:rounded-none rounded-[5px] "
                            alt={category.name}
                          />
                        </Link>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <button className="hidden sm:swiper-category-prev absolute -translate-y-1/2 top-1/2 cursor-pointer z-[15] sm:flex justify-center items-center -left-16 rounded-full border h-[35px] w-[35px] border-gray-300">
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
              <button className="hidden sm:swiper-category-next absolute -translate-y-1/2 top-1/2 cursor-pointer z-[15] sm:flex justify-center items-center -right-16 rounded-full border h-[35px] w-[35px] border-gray-300">
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
              <div className="swiper-pagination flex flex-wrap justify-center w-full items-center gap-1 sm:gap-[7px] mt-[30px] sm:mt-[37px]"></div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Topcategories;
