"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Topcategories = ({ categories }) => {
  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide mb-5">
            Product Categories
          </h3>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={5}
              navigation
            >
              {categories.map((category, index) => {
                return (
                  <SwiperSlide key={index} className="border p-5">
                    <div className="">
                      <h3 className="font-emirates text-lg font-normal pb-5">
                        {category.name}
                      </h3>
                      <Image
                        src="/assets/images/image.png"
                        layout="responsive"
                        height={100}
                        width={100}
                        className="h-[100%] w-[100%]"
                      />
                    </div>{" "}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Topcategories;
