"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Carousel,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";

const Hero = ({ categories, homeSlide, promolist, vendors }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-primary-250 sm:pt-[21px] pb-[26px] lg:pb-[50px]"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col sm:flex-col md:flex-row items-start justify-between md:gap-5">
              <div className="hidden lg:block sm:w-[220px] ">
                <div className="border border-primary-200 rounded-sm relative">
                  <div className="flex items-center gap-2 py-[6.8px] border-b px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                      ></path>
                    </svg>{" "}
                    <span className="text-[14px]">All Categories</span>
                  </div>
                  {categories &&
                    categories.length > 0 &&
                    categories
                      .filter((category) => category.parent_id === null)
                      .slice(0, isShowMore ? categories.length : 9)
                      .map((category, index) => {
                        const id = category.category_id;
                        return (
                          <React.Fragment key={index}>
                            <Menu
                              placement="right"
                              allowHover
                              offset={{
                                mainAxis: 21,
                                crossAxis:
                                  index === 0
                                    ? 137
                                    : index === 1
                                    ? 103
                                    : index === 2
                                    ? 68
                                    : index === 3
                                    ? 35
                                    : index === 4
                                    ? 0
                                    : index === 5
                                    ? -35
                                    : index === 6
                                    ? -68
                                    : index === 7
                                    ? -103
                                    : index === 8
                                    ? -139
                                    : 0,
                                alignmentAxis: 0,
                              }}
                              dismiss={{
                                itemPress: false,
                              }}
                            >
                              <MenuHandler>
                                <Link
                                  href={`/shop/?category=${category.name}`}
                                  key={index}
                                  className="flex text-secondary-100 hover:text-black items-center gap-2 hover:border-s-[3px] hover:border-s-primary-200 px-4 py-[6.8px] bg-white border-b cursor-pointer hover:bg-primary-300 transition-all outline-none active:outline-none visited:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                                    ></path>
                                  </svg>
                                  <span className="text-[14px]">
                                    {category.name}
                                  </span>
                                </Link>
                              </MenuHandler>
                              <MenuList className="bg-white p-4 h-[400px] w-[800px] rounded-sm">
                                <div className="grid grid-cols-2 gap-x-48 gap-y-3 outline-none hover:outline-none">
                                  <div className="w-[309px]">
                                    <div className="relative mb-4">
                                      <h3 className="text-lg text-black pb-4 border-b border-[#E6E6E6]">
                                        {category.name}
                                      </h3>
                                      <div className="border border-primary-200 absolute bottom-[0.08px] min-w-16 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center flex-wrap gap-x-[88px] gap-y-3">
                                      {categories
                                        .filter(
                                          (subcategory) =>
                                            subcategory.parent_id === id
                                        )
                                        .map((subcategory, i) => {
                                          return (
                                            <Link
                                              href={`/shop/?category=${subcategory.name}`}
                                              className="text-base hover:text-black"
                                              key={i}
                                            >
                                              {subcategory.name}
                                            </Link>
                                          );
                                        })}
                                    </div>
                                  </div>
                                  <div className="w-[257px]">
                                    <div className="relative mb-4">
                                      <h3 className="text-lg text-black pb-4 border-b border-[#E6E6E6]">
                                        Collection
                                      </h3>
                                      <div className="border border-primary-200 absolute bottom-[0.08px] min-w-16 rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Link
                                        href="/"
                                        className="text-base hover:text-black"
                                      >
                                        Featured Products
                                      </Link>
                                      <Link
                                        href="/"
                                        className="text-base hover:text-black"
                                      >
                                        Popular Products
                                      </Link>
                                      <Link
                                        href="/"
                                        className="text-base hover:text-black"
                                      >
                                        New Products
                                      </Link>
                                      <Link
                                        href="/"
                                        className="text-base hover:text-black"
                                      >
                                        Best Selling Product
                                      </Link>
                                      <Link
                                        href="/"
                                        className="text-base hover:text-black"
                                      >
                                        Eyeglass chain
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="col-span-2">
                                    <div className="relative mb-4">
                                      <h3 className="text-lg text-black pb-4 border-b border-[#E6E6E6]">
                                        Popular Stores
                                      </h3>
                                      <div className="border border-primary-200 absolute bottom-[0.08px] min-w-16 rounded-full"></div>
                                    </div>
                                    <div className="flex gap-[30px]">
                                      {vendors
                                        .slice(0, 4)
                                        .map((list, index) => {
                                          return (
                                            <Link
                                              key={index}
                                              href={`/${
                                                list.firstName +
                                                " " +
                                                list.lastName
                                              }`}
                                              className="bg-clip-border overflow-hidden rounded-sm hover:shadow-lg hover:shadow-gray-500"
                                            >
                                              <Image
                                                src={
                                                  list.image?.path ??
                                                  "/assets/images/vendor1.jpg"
                                                }
                                                height={100}
                                                width={100}
                                                className="w-20 h-20"
                                                alt=""
                                              />
                                            </Link>
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              </MenuList>
                            </Menu>
                          </React.Fragment>
                        );
                      })}
                  <button
                    onClick={() => setIsShowMore(!isShowMore)}
                    className="w-full text-[14px] flex text-secondary-100 items-center gap-2 hover:border-s-[3px] hover:border-s-primary-200 px-4 py-[6.8px] bg-white border-b cursor-pointer hover:bg-primary-300 transition-all outline-none active:outline-none visited:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                      ></path>
                    </svg>

                    {isShowMore ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
              <div className="max-w-full w-full sm:w-[800px]">
                <Carousel
                  autoplay
                  loop
                  autoplayDelay={5000}
                  className="rounded-sm"
                  nextArrow={({ loop, handleNext, lastIndex }) => (
                    <button
                      onClick={handleNext}
                      disabled={!loop && lastIndex}
                      className="!absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
                    >
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.4" filter="url(#filter0_b_510_3447)">
                          <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                        </g>
                        <path
                          d="M15.6005 9.7998L14.4805 10.9998L20.4005 16.9998L14.4805 22.9998L15.6005 24.1998L22.8005 16.9998L15.6005 9.7998Z"
                          fill="#010101"
                        />
                        <defs>
                          <filter
                            id="filter0_b_510_3447"
                            x="-100"
                            y="-100"
                            width="235"
                            height="235"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feGaussianBlur
                              in="BackgroundImageFix"
                              stdDeviation="50"
                            />
                            <feComposite
                              in2="SourceAlpha"
                              operator="in"
                              result="effect1_backgroundBlur_510_3447"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_backgroundBlur_510_3447"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </button>
                  )}
                  prevArrow={({ loop, handlePrev, firstIndex }) => {
                    return (
                      <button
                        onClick={handlePrev}
                        disabled={!loop && firstIndex}
                        className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
                      >
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.4" filter="url(#filter0_b_510_3444)">
                            <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                          </g>
                          <path
                            d="M13.1992 16.9998L20.3992 24.1998L21.5192 22.9998L15.5992 16.9998L21.5192 10.9998L20.3992 9.7998L13.1992 16.9998Z"
                            fill="#010101"
                          />
                          <defs>
                            <filter
                              id="filter0_b_510_3444"
                              x="-100"
                              y="-100"
                              width="235"
                              height="235"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feGaussianBlur
                                in="BackgroundImageFix"
                                stdDeviation="50"
                              />
                              <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect1_backgroundBlur_510_3444"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_backgroundBlur_510_3444"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </button>
                    );
                  }}
                  navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-[10px] sm:bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                      {new Array(length).fill("").map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            activeIndex === i
                              ? "text-primary-200"
                              : "text-white"
                          } cursor-pointer`}
                          onClick={() => setActiveIndex(i)}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 h-2"
                          >
                            <circle
                              opacity="0.4"
                              cx="4"
                              cy="4"
                              r="4"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      ))}
                    </div>
                  )}
                >
                  {homeSlide.map((slide, index) => {
                    return (
                      <div
                        className="relative h-[465px] sm:h-[393px]"
                        key={index}
                      >
                        <img
                          src={slide.image_url}
                          alt="slider hero 2"
                          className="h-[465px] sm:h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end sm:justify-normal bottom-[33px] sm:top-0 sm:m-0 sm:grid sm:items-center">
                          <div className="sm:w-2/3 sm:pl-24">
                            <Typography
                              variant="h1"
                              color="black"
                              className="text-[24px] text-center sm:text-left mb-[15px] leading-[28.8px]  sm:mb-4 sm:text-3xl font-playfairdisplay"
                            >
                              {slide.title}
                            </Typography>
                            <Typography
                              variant="lead"
                              className="text-[14px] text-center sm:text-left leading-[23.83px] mb-[15px] sm:text-[16px] sm:leading-[22.4px] sm:mb-[29px] sm:opacity-80 text-secondary-200 font-emirates"
                            >
                              {slide.description}
                            </Typography>
                            <div className="flex gap-2 items-center justify-center sm:justify-start sm:items-start">
                              <Link
                                size="lg"
                                color="white"
                                className="normal-case rounded-[4px] border border-transparent bg-transparent font-emirates font-bold"
                                href={slide.link_url}
                              >
                                <Button className="rounded-md border shadow-none hover:shadow-none border-primary-200 bg-primary-200 hover:bg-transparent hover:text-primary-200 hover:border-primary-200 ">
                                  Shop now
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className="w-full md:w-[220px]">
                <div className="flex md:flex-col sm:flex-row p-2.5 md:p-0 gap-2.5 md:gap-5">
                  {promolist.slice(0, 2).map((promo, index) => {
                    return (
                      <div className="relative rounded-sm  sm:p-0" key={index}>
                        <Image
                          src={promo.ads_img_url}
                          width={100}
                          height={100}
                          className="max-w-full w-[300px] h-[130px] md:max-w-[199px] sm:w-[350px] sm:max-w-full sm:h-[185px] object-cover"
                          alt={`slider Promo ${index}`}
                        />
                        <div className="absolute sm:top-6 top-[84px] left-6">
                          <p className="text-base font-playfairdisplay font-semibold w-4/5 hidden sm:block ">
                            {promo.ads_title}
                          </p>
                          <Link
                            href={promo.ads_link}
                            className="text-[15px] font-medium font-playfairdisplay sm:font-emirates sm:text-xs sm:py-1 sm:px-2 inline-block underline sm:no-underline sm:border sm:border-black rounded sm:font-bold mt-0 sm:mt-2.5  sm:hover:bg-black sm:hover:text-white "
                          >
                            Shop now
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Hero;
