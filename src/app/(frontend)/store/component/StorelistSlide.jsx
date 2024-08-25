"use client";

import React from "react";
import { Carousel, Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function StorelistSlide({ promolist }) {
  return (
    <div className="">
      <Carousel className="rounded h-full">
        {promolist.length > 0 &&
          promolist.map((promo, index) => {
            return (
              <div className="relative h-full" key={index}>
                <img
                  src={promo.ads_img_url}
                  alt="image 2"
                  className="!min-h-[350px] w-full object-cover"
                />
                <div className="absolute inset-0 grid items-center">
                  <div className="w-2/3 pl-24">
                    <Typography
                      variant="h1"
                      color="black"
                      className="mb-4 text-3xl font-playfairdisplay"
                    >
                      {promo.ads_title}
                    </Typography>
                    <Typography
                      variant="lead"
                      className="mb-6 opacity-80 text-secondary-200 font-emirates"
                    >
                      {promo.ads_title}
                    </Typography>
                    <div className="flex gap-2">
                      <Link
                        size="lg"
                        color="white"
                        className="middle none rounded border border-primary-200 bg-primary-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-200/10 transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-transparent hover:border-primary-200 hover:text-primary-200"
                        href={promo.ads_title}
                      >
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}
