"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Grid } from "swiper/modules";

const Ads = ({ ads }) => {
  return (
    <section className="py-10">
      <div className="max-w-screen-xl p-0 mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grid={{ rows: 1, fill: "row" }}
          breakpoints={{
            540: {
              slidesPerView: 2,
              spaceBetween: 15,
              grid: { rows: 1, fill: "row" },
            },
          }}
          modules={[Pagination, Autoplay, Grid]}
        >
          {ads.map((adslist, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <Image
                  src={adslist.ads_img_url}
                  height={230}
                  width={630}
                  className="h-[230px] w-full"
                  alt={adslist.ads_desc}
                />
                <div className="absolute left-[30px] top-[45px] translate-x-0 translate-y-[40%]">
                  <h3 className="font-playfairdisplay font-semibold text-2xl">
                    {adslist.ads_desc}
                  </h3>
                  <Link
                    href={adslist.ads_link}
                    className="text-xs py-2 px-3.5 inline-block border border-black rounded font-bold mt-[15px] hover:bg-black hover:text-white"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Ads;
