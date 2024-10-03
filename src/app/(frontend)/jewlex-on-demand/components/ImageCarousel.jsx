"use client";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageCarousel({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active index

  return (
    <div className="w-[370px]">
      {images && images.length > 0 && (
        <div className="slider-container flex flex-col">
          <div>
            <Swiper
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs]}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Update active index
            >
              {images?.map((image, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="w-[370px] !h-[280px] bg-[#FFFDF8] !flex !items-center !flex-col !justify-center"
                  >
                    <Image
                      className="h-[250px] w-[250px] object-contain"
                      key={index}
                      src={image.path}
                      alt="Gallery Image"
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="p-2.5">
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
            >
              {images?.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      className={`h-[64px] border transition-all w-[80px] opacity-70 object-cover ${
                        activeIndex === index
                          ? "border-primary-200 !opacity-100"
                          : "border-blueGray-300"
                      }`}
                      key={index}
                      src={image.path}
                      alt="Gallery Image"
                      width={150}
                      height={150}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
