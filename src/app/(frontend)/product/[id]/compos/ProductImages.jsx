"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";

export default function ProductImages({ variation }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active index

  return (
    <div className="w-full sm:w-full md:w-1/2 xl:w-[630px]">
      <div className="slider-container flex flex-col gap-2.5 sm:gap-5">
        {variation?.image && variation?.image.length > 0 && (
          <>
            <div>
              <Swiper
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Update active index
              >
                {variation?.image?.map((image, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      className="sm:!h-[607px] !h-[380px] border w-full  border-blueGray-300 bg-[#FFFDF8] !flex !items-center !flex-col !justify-center"
                    >
                      <Image
                        className="h-[70%] w-[70%] sm:h-[450px] sm:w-[450px] object-cover"
                        key={index}
                        src={image.path}
                        alt="Gallery Image"
                        width={250}
                        height={250}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={20}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                breakpoints={{
                  720: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1020: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {variation?.image &&
                  variation?.image.length > 0 &&
                  variation?.image?.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          className={`border h-[92px] sm:h-[142px] w-full object-cover transition-all border-blueGray-300  ${
                            activeIndex === index
                              ? "border-primary-200 opacity-100"
                              : "border-blueGray-300 opacity-70"
                          }`}
                          key={index}
                          src={image.path}
                          alt="Gallery Image"
                          width={142}
                          height={142}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
