"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Topcategories = ({ categories }) => {
  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-playfairdisplay leading-7 font-semibold tracking-wide mb-5">
            Product Categories
          </h3>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-category-next",
                prevEl: ".swiper-category-prev",
              }}
              spaceBetween={50}
              slidesPerView={5}
            >
              {categories.map((category, index) => {
                return (
                  <SwiperSlide key={index} className="border w-60 p-[15px]">
                    <div className="">
                      <h3 className="font-emirates text-lg font-normal pb-5">
                        {category.name}
                      </h3>
                      <Image
                        src="/assets/images/category.png"
                        layout="responsive"
                        height={100}
                        width={100}
                        className="h-full w-full"
                      />
                    </div>{" "}
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button className="swiper-category-prev absolute -translate-y-1/2 top-1/2 cursor-pointer z-[15] flex justify-center items-center -left-16 rounded-full border h-[35px] w-[35px] border-gray-300">
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
            <button className="swiper-category-next absolute -translate-y-1/2 top-1/2 cursor-pointer z-[15] flex justify-center items-center -right-16 rounded-full border h-[35px] w-[35px] border-gray-300">
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
      </section>
    </>
  );
};

export default Topcategories;
