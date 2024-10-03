"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { AnimatePresence, motion } from "framer-motion";

const Topcategories = ({ categories }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        className=" py-[15px] mb-[15px] sm:py-10 sm:mb-[10px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto ">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-wide ml-2 mb-4 sm:mb-6">
            Product Categories
          </h3>

          <div className="relative p-2.5 sm:p-0 sm:pb-12 pb-12 ">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop
              pagination={{
                dynamicBullets: true,
                clickable: true,
                el: ".swiper-pagination",
              }}
              navigation={{
                nextEl: ".swiper-category-next",
                prevEl: ".swiper-category-prev",
              }}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="border rounded-lg sm:rounded-none p-4 sm:p-6 hover:shadow-lg relative"
                  >
                    <Link href={`shop/?category=${category.name}`}>
                      <h3 className="font-semibold text-center sm:text-left text-lg mb-4">
                        {category.name}
                      </h3>
                      <Image
                        src={
                          category?.image?.path ?? "/assets/images/category.png"
                        }
                        layout="responsive"
                        height={300}
                        width={300}
                        className="rounded-lg w-full !h-[190px] object-conver sm:rounded-none"
                        alt={category.name}
                      />
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="hidden swiper-category-prev absolute -translate-y-1/2 top-1/2 cursor-pointer z-[15] 2  xl:flex justify-center items-center -left-16 rounded-full border h-[35px] w-[35px] border-gray-300">
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
            <button className="hidden swiper-category-next absolute -translate-y-1/2 top-1/2 cursor-pointer z-[15] 2  xl:flex justify-center items-center -right-16 rounded-full border h-[35px] w-[35px] border-gray-300">
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
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Topcategories;
