"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button, Carousel, Typography } from "@material-tailwind/react";

const Ads = ({ promolist }) => {
  return (
    <>
      <div className="mb-5 mt-5">
        <Carousel className="rounded">
          {promolist?.length > 0 &&
            promolist.map((promo, index) => {
              const words = promo.ads_title.split(" ");
              const lastWord = words.pop();
              const initialText = words.join(" ");
              return (
                <div className="relative h-full w-full" key={index}>
                  <img
                    src={promo.ads_img_url}
                    alt="image 2"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-black/25">
                    <Typography
                      variant="h1"
                      color="black"
                      className="text-3xl capitalize font-playfairdisplay"
                    >
                      {initialText}{" "}
                      <span className="text-[#D4180E]">{lastWord}</span>
                    </Typography>
                    <hr className="border-[#D4180E] w-1/5 border-[1.5px]" />
                    <Typography
                      variant="lead"
                      className="capitalize text-black font-emirates"
                    >
                      {promo.ads_title}
                    </Typography>
                    <div>
                      <Link
                        size="lg"
                        color="white"
                        className="bg-primary-200 font-emirates font-bold"
                        href={promo.ads_title}
                      >
                        <Button className="hover:shadow-none">Shop now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </Carousel>
      </div>
    </>
  );
};

export default Ads;
