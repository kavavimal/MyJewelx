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
            >
              {images?.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      className="border h-[280px] w-full object-cover border-blueGray-300"
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
                      className="border h-[64px] w-[80px] object-cover border-blueGray-300"
                      key={index}
                      src={image.path}
                      alt="Gallery Image"
                      width={20}
                      height={50}
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
