"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Rating,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { get } from "@/utils/api";
import Link from "next/link";
import Engagement from "@/app/(frontend)/shop/compos/Engagement";
import {
  getProductAverageRatings,
  getProductPriceString,
  truncate,
} from "@/utils/helper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import "../../../../styles/globals.css";
import StoreProducts from "./StoreProducts";
import CustomerReview from "./CustomerReview";

function Icon({ id, open }) {
  return (
    <>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? " hidden" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          d="M21.5 12.4961H12.5V21.4961H9.5V12.4961H0.5V9.49609H9.5V0.496094H12.5V9.49609H21.5V12.4961Z"
          fill="#F0AE11"
        />
      </svg>
      <svg
        width="22"
        height="4"
        viewBox="0 0 22 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "visible" : "hidden"
        }  h-5 w-5 transition-transform`}
      >
        <path d="M21.5 3.49609H0.5V0.496094H21.5V3.49609Z" fill="#F0AE11" />
      </svg>
    </>
  );
}
const StorePage = ({ vendor, reviews }) => {
  const [open, setOpen] = useState(0);

  console.log(vendor);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const totalOrderItems = vendor.products.reduce((totalItems, product) => {
    const productOrderItems = product.variations.reduce(
      (variationItems, variation) => {
        return variationItems + variation.orderItems.length;
      },
      0
    );
    return totalItems + productOrderItems;
  }, 0);

  const aboutus = [
    {
      heading: "About Us",
      cardImage: "/assets/images/card-bg1.png",
      authorImage: "/assets/images/adnan.png",
    },
    {
      heading: "About Us",
      cardImage: "/assets/images/illustration16.png",
      authorImage: "/assets/images/illustration21.jpg",
    },
    {
      heading: "About Us",
      cardImage: "/assets/images/illustration16.png",
      authorImage: "/assets/images/illustration14.png",
    },
  ];

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const repsonse = await get("/api/product");
    setProducts(repsonse?.data?.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const totalReviews = vendor.products.reduce((total, product) => {
    return total + (product.reviews?.length || 0);
  }, 0);
  return (
    <>
      <section className="bg-gradient-to-br from-[#C7D9ED] to-[#E5DBDC] relative">
        <Image
          src={"/assets/images/file.png"}
          height={650}
          width={1200}
          alt="image for design"
          className="h-full object-cover"
        />
        <div className="absolute top-[50%] right-20 -translate-y-1/2 w-[413px]">
          <div className="flex flex-col gap-5">
            <div className="flex justify-center items-center">
              <Image
                src={"/assets/images/storelogo.jpg"}
                height={70}
                width={70}
                alt="store logo"
                className="rounded-full w-[70px] h-[70px] object-cover border border-gold-50"
              />
            </div>
            <div>
              <h3 className="text-blueGray-500 text-center text-3xl">
                Scintilla Jewelry Store
              </h3>
            </div>
            <div>
              <p className="text-secondary-200 text-center text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
            <div className="flex items-center gap-[15px]">
              <Button>Shop Now</Button>
              <div className="flex-1">
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Search Product"
                  className="border w-full rounded px-[15px] py-[9px] border-secondary-100 placeholder:text-secondary-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary-250 py-10">
        <div className="container flex items-center gap-[70px]">
          <div className="flex flex-col w-[270px]">
            <div className="flex items-center justify-center mb-[15.5px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.7514 10.0247V8.33301C13.7514 6.67541 14.4099 5.08569 15.582 3.91359C16.7541 2.74149 18.3438 2.08301 20.0014 2.08301C21.659 2.08301 23.2488 2.74149 24.4209 3.91359C25.593 5.08569 26.2514 6.67541 26.2514 8.33301V10.0247C28.3964 10.0897 29.7098 10.3197 30.7114 11.1513C32.0998 12.3047 32.4664 14.2547 33.1981 18.1563L34.4481 24.823C35.4764 30.3097 35.9898 33.053 34.4914 34.8597C32.9914 36.6663 30.1998 36.6663 24.6181 36.6663H15.3848C9.80144 36.6663 7.01144 36.6663 5.51144 34.8597C4.01144 33.053 4.52811 30.3097 5.55478 24.823L6.80478 18.1563C7.53811 14.2563 7.90311 12.3047 9.29144 11.1513C10.2931 10.3197 11.6064 10.0897 13.7514 10.0247ZM16.2514 8.33301C16.2514 7.33845 16.6465 6.38462 17.3498 5.68136C18.0531 4.9781 19.0069 4.58301 20.0014 4.58301C20.996 4.58301 21.9498 4.9781 22.6531 5.68136C23.3564 6.38462 23.7514 7.33845 23.7514 8.33301V9.99967H16.2514V8.33301Z"
                  fill="#F0AE11"
                />
              </svg>
            </div>
            <hr className="h-px bg-primary-200 border-0 mb-[15.5px]" />
            <div>
              <p className="mb-2.5 text-blueGray-500 text-[30px] text-center">
                {vendor.products.length < 10
                  ? `0${vendor.products.length}`
                  : vendor.products.length}{" "}
              </p>
              <p className="text-secondary-100 text-base text-center">
                Total Listed Products
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[270px]">
            <div className="flex items-center justify-center mb-[15.5px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.5304 34.3312L33.4879 14.1794C33.2732 12.8909 32.1636 11.9244 30.875 11.9244H27.7252V10.2421C27.7252 6.44803 24.6469 3.33398 20.817 3.33398C16.9871 3.33398 13.9088 6.41223 13.9088 10.2421V11.9244H10.759C9.43463 11.9244 8.32503 12.8909 8.14606 14.1794L5.03202 34.3312C4.78146 35.942 6.03424 37.3737 7.64495 37.3737H33.8817C35.5282 37.3737 36.7451 35.942 36.5304 34.3312ZM17.6672 10.2779C17.6672 8.55985 19.0631 7.1639 20.7812 7.1639C22.4993 7.1639 23.8952 8.55985 23.8952 10.2779V11.9602H17.6672V10.2779ZM27.0451 22.4478L20.7454 29.0696C20.4233 29.3917 20.0295 29.5707 19.5642 29.5707C19.1347 29.5707 18.7052 29.3917 18.383 29.0696L14.5173 24.9891C13.9088 24.3448 13.9446 23.3068 14.5889 22.6983C15.2332 22.0898 16.2712 22.1256 16.8797 22.7699L19.6 25.6334L24.7185 20.2286C25.327 19.5843 26.365 19.5485 27.0093 20.157C27.6536 20.8013 27.6536 21.8035 27.0451 22.4478Z"
                  fill="#F0AE11"
                />
              </svg>
            </div>
            <hr className="h-px bg-primary-200 border-0 mb-[15.5px]" />
            <div>
              <p className="mb-2.5 text-blueGray-500 text-[30px] text-center">
                {totalOrderItems && totalOrderItems > 300
                  ? "300+"
                  : totalOrderItems < 10
                  ? `0${totalOrderItems}`
                  : totalOrderItems}
              </p>
              <p className="text-secondary-100 text-base text-center">
                Sold Products around the Globe
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[270px]">
            <div className="flex items-center justify-center mb-[15.5px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5169 6.66699C11.0294 6.66699 3.33203 12.5027 3.33203 19.7347C3.33203 22.5272 4.51349 25.1408 6.48259 27.2531L3.86906 32.0863C3.51104 32.7307 4.15547 33.411 4.83571 33.1604L11.1368 30.6184C13.822 31.9431 17.0799 32.7307 20.5169 32.7307C30.0044 32.7307 37.7018 26.895 37.7018 19.6631C37.7018 12.4311 30.0044 6.66699 20.5169 6.66699ZM15.0034 19.0544L13.4998 20.4865C13.464 20.5223 13.4282 20.5939 13.4282 20.6655L13.7862 22.8136C13.822 22.9926 13.643 23.1358 13.464 23.0284L11.5307 22.0618C11.4591 22.026 11.3875 22.026 11.3158 22.0618L9.52575 23.0284C9.38255 23.1 9.16774 22.9926 9.20354 22.8136L9.56156 20.7013C9.56156 20.6297 9.56156 20.5581 9.48995 20.5223L7.91467 19.0902C7.80726 18.947 7.87887 18.6964 8.05788 18.6964L10.1702 18.3384C10.2418 18.3384 10.3134 18.2668 10.3134 18.231L11.28 16.2977C11.3516 16.1545 11.6023 16.1545 11.6739 16.2977L12.6405 18.231C12.6763 18.3026 12.7479 18.3384 12.7837 18.3384L14.896 18.6964C15.075 18.7322 15.1466 18.947 15.0034 19.0544ZM24.0255 19.0544L22.5218 20.4865C22.486 20.5223 22.4502 20.5939 22.4502 20.6655L22.8082 22.8136C22.844 22.9926 22.665 23.1358 22.486 23.0284L20.6243 22.0618C20.5527 22.026 20.4811 22.026 20.4095 22.0618L18.5836 23.0284C18.4404 23.1 18.2256 22.9926 18.2614 22.8136L18.6194 20.7013C18.6194 20.6297 18.6194 20.5581 18.5478 20.5223L16.9725 19.0902C16.8293 18.947 16.9009 18.6964 17.0799 18.6964L19.1923 18.3384C19.2639 18.3384 19.3355 18.2668 19.3355 18.231L20.3021 16.2977C20.3737 16.1545 20.6243 16.1545 20.6959 16.2977L21.6626 18.231C21.6984 18.3026 21.77 18.3384 21.8058 18.3384L23.9181 18.6964C24.0971 18.7322 24.1687 18.947 24.0255 19.0544ZM33.0476 19.0544L31.5439 20.4865C31.5081 20.5223 31.4723 20.5939 31.4723 20.6655L31.8303 22.8136C31.8661 22.9926 31.6871 23.1358 31.5081 23.0284L29.5748 22.0618C29.5032 22.026 29.4316 22.026 29.36 22.0618L27.5341 23.0284C27.3909 23.1 27.1761 22.9926 27.2119 22.8136L27.5699 20.7013C27.5699 20.6297 27.5699 20.5581 27.4983 20.5223L25.923 19.0902C25.8514 18.947 25.923 18.6964 26.102 18.6964L28.2143 18.3384C28.2859 18.3384 28.3575 18.2668 28.3575 18.231L29.3242 16.2977C29.3958 16.1545 29.6464 16.1545 29.718 16.2977L30.6847 18.231C30.7205 18.3026 30.7921 18.3384 30.8279 18.3384L32.9402 18.6964C33.1192 18.7322 33.1908 18.947 33.0476 19.0544Z"
                  fill="#F0AE11"
                />
              </svg>
            </div>
            <hr className="h-px bg-primary-200 border-0 mb-[15.5px]" />
            <div>
              <p className="mb-2.5 text-blueGray-500 text-[30px] text-center">
                {totalReviews > 0
                  ? totalReviews < 10
                    ? `0${totalReviews}`
                    : totalReviews
                  : ""}{" "}
              </p>
              <p className="text-secondary-100 text-base text-center">
                Customer reviews
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[270px]">
            <div className="flex items-center justify-center mb-[15.5px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.9987 35.0003H13.332V13.3337L24.9987 1.66699L27.082 3.75033C27.2765 3.94477 27.4365 4.20866 27.562 4.54199C27.6876 4.87533 27.7498 5.19477 27.7487 5.50033V6.08366L25.9154 13.3337H34.9987C35.8876 13.3337 36.6654 13.667 37.332 14.3337C37.9987 15.0003 38.332 15.7781 38.332 16.667V20.0003C38.332 20.1948 38.3115 20.4031 38.2704 20.6253C38.2293 20.8475 38.1665 21.0559 38.082 21.2503L33.082 33.0003C32.832 33.5559 32.4154 34.0281 31.832 34.417C31.2487 34.8059 30.6376 35.0003 29.9987 35.0003ZM9.9987 13.3337V35.0003H3.33203V13.3337H9.9987Z"
                  fill="#F0AE11"
                />
              </svg>
            </div>
            <hr className="h-px bg-primary-200 border-0 mb-[15.5px]" />
            <div>
              <p className="mb-2.5 text-blueGray-500 text-[30px] text-center">
                {vendor.likes.length < 10
                  ? `0${vendor.likes.length}`
                  : vendor.likes.length > 300
                  ? "300+"
                  : vendor.likes.length}
              </p>
              <p className="text-secondary-100 text-base text-center">
                Store Likes
              </p>
            </div>
          </div>
        </div>
      </section>
      <StoreProducts products={vendor.products} />
      <section className="bg-[url('/assets/images/background.png')] bg-no-repeat bg-cover pt-20 pb-[116px]">
        <div className="container">
          <h3 className="text-[34px] text-center font-playfairdisplay font-semibold mb-[50px]">
            Featured Products
          </h3>
          <div className="flex items-start gap-11 mb-[124px]">
            <Swiper
              modules={[Grid]}
              slidesPerView={3}
              spaceBetween={15}
              grid={{ rows: 2, fill: "row" }}
              className="flex-1"
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product.product_id}
                  style={{
                    width: 245,
                  }}
                >
                  <div className="border border-dark-100">
                    <Image
                      src={product?.variations[0]?.image[0].path}
                      height={270}
                      width={245}
                      alt=""
                      className="w-full h-[270px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="w-[476px]">
              <Swiper>
                {products.slice(0, 5).map((product, index) => {
                  const variation = product?.variations[0];
                  return (
                    <SwiperSlide key={index}>
                      <Card className="realative overflow-hidden font-normal text-left h-[555px] border border-dark-100">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="m-0 rounded-none"
                        >
                          <div className="w-full overflow-hidden bg-[#FFFDF8]">
                            <Link
                              href={`/product/${product?.product_id}`}
                              className="font-normal w-full h-[437px] flex justify-center items-center"
                            >
                              <Image
                                src={"/assets/images/new.png"}
                                alt="image for design"
                                width={450}
                                height={437}
                                className="w-full h-auto hover:scale-105 transition-all duration-300"
                              />
                            </Link>
                          </div>
                        </CardHeader>
                        <CardBody className="p-0 py-[19px] px-[15px]">
                          <div className="flex flex-col gap-2">
                            <p className="text-black text-sm">
                              <Link
                                href={`/product/${product?.product_id}`}
                                className="font-normal leading-8 text-left text-xl"
                              >
                                {truncate(product?.product_name, 25)}
                              </Link>
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-light text-base">
                                {getProductPriceString(product, variation)}
                              </span>
                              <span className="font-light text-base">
                                {variation.net_weight} gram
                              </span>
                            </div>
                            <Engagement
                              averateRating={getProductAverageRatings(
                                product.reviews
                              )}
                              product_id={product.product_id}
                              variation={variation}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <h3 className="text-[34px] text-center font-playfairdisplay font-semibold mb-[50px]">
            Best Selling Products
          </h3>
          <div className="flex items-start gap-11">
            <div className="w-[476px]">
              <Swiper>
                {products.slice(0, 5).map((product, index) => {
                  const variation = product?.variations[0];
                  return (
                    <SwiperSlide key={index}>
                      <Card className="realative overflow-hidden font-normal text-left h-[555px] border border-dark-100">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="m-0 rounded-none"
                        >
                          <div className="w-full overflow-hidden bg-[#FFFDF8]">
                            <Link
                              href={`/product/${product?.product_id}`}
                              className="font-normal w-full h-[437px] flex justify-center items-center"
                            >
                              <Image
                                src={"/assets/images/new.png"}
                                alt="image for design"
                                width={450}
                                height={437}
                                className="w-full h-auto hover:scale-105 transition-all duration-300"
                              />
                            </Link>
                          </div>
                        </CardHeader>
                        <CardBody className="p-0 py-[19px] px-[15px]">
                          <div className="flex flex-col gap-2">
                            <p className="text-black text-sm">
                              <Link
                                href={`/product/${product?.product_id}`}
                                className="font-normal leading-8 text-left text-xl"
                              >
                                {truncate(product?.product_name, 25)}
                              </Link>
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-light text-base">
                                {getProductPriceString(product, variation)}
                              </span>
                              <span className="font-light text-base">
                                {variation.net_weight} gram
                              </span>
                            </div>
                            <Engagement
                              averateRating={getProductAverageRatings(
                                product.reviews
                              )}
                              product_id={product.product_id}
                              variation={variation}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <Swiper
              modules={[Grid]}
              slidesPerView={3}
              spaceBetween={15}
              grid={{ rows: 2, fill: "row" }}
              className="flex-1"
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product.product_id}
                  style={{
                    width: 245,
                  }}
                >
                  <div className="border border-dark-100">
                    <Image
                      src={product?.variations[0]?.image[0].path}
                      height={270}
                      width={245}
                      alt=""
                      className="w-full h-[270px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="bg-white pt-[78px] pb-[98px]">
        <div className="container">
          <h3 className="text-[34px] text-center font-playfairdisplay font-semibold mb-[50px]">
            Product Showcase
          </h3>
          <div>
            <div className="grid grid-cols-4 gap-5">
              <div className="grid gap-5">
                <div className="bg-clip-border overflow-hidden rounded-sm">
                  <Image
                    src="/assets/images/Illustration16.png"
                    alt="image for design"
                    width={310}
                    height={300}
                    className="w-[305] h-[272.76] object-cover"
                  />
                </div>
                <div className="bg-clip-border overflow-hidden rounded-sm">
                  <Image
                    src="/assets/images/Illustration17.png"
                    alt="image for design"
                    width={310}
                    height={300}
                    className="w-[305] h-[272.76] object-cover"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-clip-border overflow-hidden rounded-sm">
                  <Image
                    src="/assets/images/Illustration18.png"
                    alt="image for design"
                    width={700}
                    height={600}
                    className="w-[625px] h-[566px] object-cover"
                  />
                </div>
              </div>
              <div className="grid gap-5">
                <div className="bg-clip-border overflow-hidden rounded-sm">
                  <Image
                    src="/assets/images/Illustration19.jpg"
                    alt="image for design"
                    width={310}
                    height={300}
                    className="w-[305] h-[272.76] object-cover"
                  />
                </div>
                <div className="bg-clip-border overflow-hidden rounded-sm">
                  <Image
                    src="/assets/images/Illustration20.jpg"
                    alt="image for design"
                    width={310}
                    height={300}
                    className="w-[305] h-[272.76] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[url('/assets/images/featured-products-bg.jpg')] bg-no-repeat bg-cover h-[651px] overflow-hidden ">
        <div className="overflow-hidden">
          <div className="flex h-[651px] items-center">
            <div className="swiperClass overflow-hidden ml-[-100px] rotate-[14deg]">
              <div className="flex flex-wrap justify-center">
                <Swiper
                  direction="vertical"
                  slidesPerView={2}
                  spaceBetween={10}
                  loop={true}
                  speed={1000}
                  autoplay={{
                    enabled: true,
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="w-1/3 mr-5 h-[541px]"
                >
                  {products
                    .filter((_, index) => index % 3 === 0)
                    .map((product, index) => (
                      <SwiperSlide
                        key={index}
                        className="!w-[335.75px] !h-[265.9px] pb-5 mb-5 mr-5 pr-5"
                      >
                        <Image
                          src={product?.variations[0]?.image[0].path}
                          alt={`Image ${index + 1}`}
                          width={335}
                          height={265}
                          className="border-[5px] border-red-300"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                  direction="vertical"
                  slidesPerView={2}
                  spaceBetween={10}
                  loop={true}
                  speed={1000}
                  autoplay={{
                    enabled: true,
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: true,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="w-1/3 mr-5 h-[540px]"
                >
                  {products
                    .filter((_, index) => index % 3 === 1)
                    .map((product, index) => (
                      <SwiperSlide
                        key={index}
                        className="!w-[335.75px] !h-[265.9px] pb-5 mb-5 mr-5 pr-5 "
                      >
                        <Image
                          src={product?.variations[0]?.image[0].path}
                          alt={`Image ${index + 1}`}
                          width={335}
                          height={265}
                          className="border-[5px] border-red-300"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                  direction="vertical"
                  slidesPerView={2}
                  spaceBetween={10}
                  loop={true}
                  speed={1000}
                  autoplay={{
                    enabled: true,
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="w-1/3 mr-5 h-[541px]"
                >
                  {products
                    .filter((_, index) => index % 3 === 2)
                    .map((product, index) => (
                      <SwiperSlide
                        key={index}
                        className="!w-[335.75px] !h-[265.9px] pb-5 mb-5 mr-5 pr-5 "
                      >
                        <Image
                          src={product?.variations[0]?.image[0].path}
                          alt={`Image ${index + 1}`}
                          width={335}
                          height={265}
                          className="border-[5px] border-red-300"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
            <div className="max-w-[320px] flex flex-col items-center">
              <h2 className="text-[49.11px] leading-[64.2px] font-playfairdisplay text-white text-right ">
                Our Trending Products
              </h2>
            </div>
          </div>
          {/* <Swiper
                modules={[Grid, Autoplay]}
                direction={"vertical"}
                slidesPerView={3}
                slidesPerGroup={3}
                autoplay={{
                  enabled: true,
                  delay: 0,
                  disableOnInteraction: false,
                }}
                spaceBetween={10}
                grid={{ rows: 2, fill: "row" }}
                className="h-[540px] overflow-hidden"
              >
                {products.map((product) => (
                  <SwiperSlide
                    key={product.product_id}
                    className="!w-[335.75px] !h-[265.9px] border-[5px] border-red-300 overflow-hidden mr-5 mb-5"
                  >
                    <Image
                      src={product?.variations[0]?.image[0].path}
                      height={270}
                      width={245}
                      alt=""
                      className="w-[335.75px] !h-[265.9px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper> */}
          {/* <div className="flex items-center overflow-hidden">
            <div className="flex items-center rotate-[14deg] ml-[-100px] h-[651px] overflow-hidden">
              <Swiper
                modules={[Autoplay, Grid]}
                autoplay={{
                  enabled: true,
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                slidesPerView={3}
                spaceBetween={20}
                grid={{ rows: 2, fill: "row" }}
                className="flex-1 overflow-hidden"
              >
                {products.map((product) => (
                  <SwiperSlide
                    key={product.product_id}
                    className="w-[335.75px] border-[5px] border-red-300  overflow-hidden"
                  >
                    <Image
                      src={product?.variations[0]?.image[0].path}
                      height={270}
                      width={245}
                      alt=""
                      className="!w-full !h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div>
              <h2 className="text-[49.11px] font-playfairdisplay w-[320px] leading-[44.2px] text-right text-white font-semibold ml-6 ">
                Our Trending Products
              </h2>
            </div>
          </div> */}
        </div>
      </section>
      <section className="pt-[81px] pb-[120px]">
        <div className="container">
          <h3 className="text-[34px] text-center font-playfairdisplay text-blueGray-500 font-semibold mb-[50px]">
            Our Designs
          </h3>
          <div className="relative">
            <Swiper
              modules={[Grid, Pagination]}
              pagination={{ clickable: true, el: ".design-pagination" }}
              slidesPerView={4}
              spaceBetween={20}
              grid={{ rows: 2, fill: "row" }}
            >
              {[
                "/assets/images/Illustration21.jpg",
                "/assets/images/Illustration23.jpg",
                "/assets/images/Illustration24.jpg",
                "/assets/images/Illustration25.jpg",
                "/assets/images/Illustration26.jpg",
                "/assets/images/Illustration27.jpg",
                "/assets/images/Illustration28.png",
                "/assets/images/Illustration29.jpg",
                "/assets/images/Illustration21.jpg",
                "/assets/images/Illustration23.jpg",
              ].map((path, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <Image
                      src={path}
                      alt="image for design"
                      width={350}
                      height={300}
                      className="w-[305px] h-[210px] object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="design-pagination flex justify-center items-center gap-[7px] mt-[30px]"></div>
          </div>
        </div>
      </section>
      <section className="bg-primary-250">
        <div className="container flex justify-between items-center gap-[146px]">
          <div className="w-[480px]">
            <div>
              <h3 className="text-[34px] font-playfairdisplay text-blueGray-500 font-semibold mb-[30px]">
                Explore the Trending products crafted by Scintilla
              </h3>
              <p className="text-lg font-light text-blueGray-700 mb-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <ul className="grid grid-cols-2 items-center gap-x-[78px] gap-y-[30px]">
                <li className="flex gap-2 place-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5L8 4.9L9.6 2.5H14.4L16 4.9L12 10.5ZM15.5 7.3L14.3 9C16.5 9.9 18 12 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 12 7.5 9.9 9.7 9L8.5 7.3C5.8 8.6 4 11.3 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 11.3 18.2 8.6 15.5 7.3Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <span className="text-secondary-100">
                    Custom design products
                  </span>
                </li>
                <li className="flex gap-2 place-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5L8 4.9L9.6 2.5H14.4L16 4.9L12 10.5ZM15.5 7.3L14.3 9C16.5 9.9 18 12 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 12 7.5 9.9 9.7 9L8.5 7.3C5.8 8.6 4 11.3 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 11.3 18.2 8.6 15.5 7.3Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <span className="text-secondary-100">Product on demand</span>
                </li>
                <li className="flex gap-2 place-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5L8 4.9L9.6 2.5H14.4L16 4.9L12 10.5ZM15.5 7.3L14.3 9C16.5 9.9 18 12 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 12 7.5 9.9 9.7 9L8.5 7.3C5.8 8.6 4 11.3 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 11.3 18.2 8.6 15.5 7.3Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <span className="text-secondary-100">Jewelry Repair</span>
                </li>
                <li className="flex gap-2 place-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5L8 4.9L9.6 2.5H14.4L16 4.9L12 10.5ZM15.5 7.3L14.3 9C16.5 9.9 18 12 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 12 7.5 9.9 9.7 9L8.5 7.3C5.8 8.6 4 11.3 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 11.3 18.2 8.6 15.5 7.3Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <span className="text-secondary-100">
                    Jewelry Replacement
                  </span>
                </li>
                <li className="flex gap-2 place-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5L8 4.9L9.6 2.5H14.4L16 4.9L12 10.5ZM15.5 7.3L14.3 9C16.5 9.9 18 12 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 12 7.5 9.9 9.7 9L8.5 7.3C5.8 8.6 4 11.3 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 11.3 18.2 8.6 15.5 7.3Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <span className="text-secondary-100">100% Gold Plated</span>
                </li>
                <li className="flex gap-2 place-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5L8 4.9L9.6 2.5H14.4L16 4.9L12 10.5ZM15.5 7.3L14.3 9C16.5 9.9 18 12 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 12 7.5 9.9 9.7 9L8.5 7.3C5.8 8.6 4 11.3 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 11.3 18.2 8.6 15.5 7.3Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <span className="text-secondary-100">Free Delivery</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-5 items-start">
              <div className="grid gap-5">
                <div>
                  <Image
                    src={"/assets/images/Illustration30.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration31.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration32.png"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
              </div>
              <div className="grid gap-5">
                <div>
                  <Image
                    src={"/assets/images/Illustration33.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[131px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration34.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration35.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration36.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[131px] object-cover"
                  />
                </div>
              </div>
              <div className="grid gap-5">
                <div>
                  <Image
                    src={"/assets/images/Illustration37.png"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration38.jpg"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/images/Illustration39.png"}
                    height={232}
                    width={200}
                    className="w-full h-[232px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CustomerReview vendor={vendor} reviews={reviews} />
      <section className="bg-blueGray-400">
        <div className="container  ">
          <div className="relative">
            <Swiper
              className="mb-[50px]"
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 50000,
                disableOnInteraction: false,
              }}
              loop
              navigation={{
                nextEl: ".swiper-aboutus-next",
                prevEl: ".swiper-aboutus-prev",
              }}
              spaceBetween={126}
              slidesPerView={1}
            >
              {aboutus.map((aboutUs, index) => (
                <SwiperSlide key={index}>
                  <div className="pt-[60px] pb-[61px] pl-[110px] pr-[227px] relative">
                    <Card className="w-full max-w-[1053px] h-[429px] rounded-[20px] flex-row">
                      <CardBody className="overflow-y-scroll mt-[30px] mb-[51px] ml-[30px] mr-[13px] custom-scrollbar !p-0">
                        <h2 className="text-[34px] font-playfairdisplay leading-[30.6px] text-blueGray-500 pb-[30px]">
                          {aboutUs.heading}
                        </h2>
                        <div className="pr-[10px]">
                          {/* {slide.text}
                        <div dangerouslySetInnerHTML={{ __html: slide.text }} /> */}
                          <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                            Welcome to myJewlex, your premier online jewelry
                            marketplace where elegance meets authenticity. At
                            myJewlex, we are dedicated to connecting discerning
                            customers with a curated selection of exquisite
                            jewelry from trusted stores and skilled craftsmen
                            around the world. myJewlex platform is designed to
                            offer a seamless shopping experience, ensuring every
                            piece of jewelry meets the highest standards of
                            quality and craftsmanship. Discover the Beauty with
                            us as we redefine the jewelry shopping experience.
                          </p>
                          <h3 className="text-[22px] text-secondary-100 font-bold leading-[30.8px]">
                            Our Mission
                          </h3>
                          <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                            Our mission is to revolutionize the jewelry shopping
                            experience by providing a trustworthy and
                            transparent platform. We strive to offer a diverse
                            range of jewelry Our mission is to revolutionize the
                            jewelry shopping experience by providing a
                            trustworthy and transparent platform. We strive to
                            offer a diverse range of jewelryOur mission is to
                            revolutionize the jewelry shopping experience by
                            providing a trustworthy and transparent platform. We
                            strive to offer a diverse range of jewelry
                          </p>
                          <h3 className="text-[22px] text-secondary-100 font-bold leading-[30.8px]">
                            Our Mission
                          </h3>
                          <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                            Our mission is to revolutionize the jewelry shopping
                            experience by providing a trustworthy and
                            transparent platform. We strive to offer a diverse
                            range of jewelry Our mission is to revolutionize the
                            jewelry shopping experience by providing a
                            trustworthy and transparent platform. We strive to
                            offer a diverse range of jewelryOur mission is to
                            revolutionize the jewelry shopping experience by
                            providing a trustworthy and transparent platform. We
                            strive to offer a diverse range of jewelry
                          </p>
                          <h3 className="text-[22px] text-secondary-100 font-bold leading-[30.8px]">
                            Our Mission
                          </h3>
                          <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                            Our mission is to revolutionize the jewelry shopping
                            experience by providing a trustworthy and
                            transparent platform. We strive to offer a diverse
                            range of jewelry Our mission is to revolutionize the
                            jewelry shopping experience
                          </p>
                        </div>
                      </CardBody>
                      <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-[284px] shrink-0 rounded-tr-[20px] rounded-br-[20px]"
                      >
                        <Image
                          src={aboutUs.cardImage}
                          alt="cardHeader"
                          width={284}
                          height={429}
                          className="w-[284px] h-[429px] object-cover rounded-tr-[20px] rounded-br-[20px] "
                        />
                      </CardHeader>
                    </Card>
                    <Image
                      src={aboutUs.authorImage}
                      alt="adnan"
                      width={300}
                      height={300}
                      className="absolute h-[357.1px] w-[283.97px] right-[110px] top-[79px] rounded-[20px] object-cover shadow-lg shadow-offset-[-9.96px_13.28px] bg-gray-100"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-aboutus-prev absolute border right-[170px] bottom-[65px] cursor-pointer z-[15] flex justify-center items-center  rounded-l-full h-[40px] w-[46px] border-primary-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.19922 8.00078L10.3992 15.2008L11.5192 14.0008L5.59922 8.00078L11.5192 2.00078L10.3992 0.800781L3.19922 8.00078Z"
                  fill="#F0AE11"
                />
              </svg>
            </button>
            <button className="swiper-aboutus-next absolute border right-[110px] bottom-[65px] cursor-pointer z-[15] flex justify-center items-center rounded-r-full h-[40px] w-[46px] border-primary-200 ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.60047 0.800781L4.48047 2.00078L10.4005 8.00078L4.48047 14.0008L5.60047 15.2008L12.8005 8.00078L5.60047 0.800781Z"
                  fill="#F0AE11"
                />
              </svg>
            </button>
            {/* <div className="pt-[60px] pb-[61px] pl-[110px] pr-[227px] relative">
            <Card className="w-full max-w-[1053px] h-[429px] rounded-[20px] flex-row">
              <CardBody className="overflow-y-scroll mt-[30px] mb-[51px] ml-[30px] mr-[13px] custom-scrollbar !p-0">
                <h2 className="text-[34px] font-playfairdisplay leading-[30.6px] text-blueGray-500 pb-[30px]">
                  About us
                </h2>
                <div className="pr-[10px]">
                  <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                    Welcome to myJewlex, your premier online jewelry marketplace
                    where elegance meets authenticity. At myJewlex, we are
                    dedicated to connecting discerning customers with a curated
                    selection of exquisite jewelry from trusted stores and
                    skilled craftsmen around the world. myJewlex platform is
                    designed to offer a seamless shopping experience, ensuring
                    every piece of jewelry meets the highest standards of
                    quality and craftsmanship. Discover the Beauty with us as we
                    redefine the jewelry shopping experience.
                  </p>
                  <h3 className="text-[22px] text-secondary-100 font-bold leading-[30.8px]">
                    Our Mission
                  </h3>
                  <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                    Our mission is to revolutionize the jewelry shopping
                    experience by providing a trustworthy and transparent
                    platform. We strive to offer a diverse range of jewelry Our
                    mission is to revolutionize the jewelry shopping experience
                    by providing a trustworthy and transparent platform. We
                    strive to offer a diverse range of jewelryOur mission is to
                    revolutionize the jewelry shopping experience by providing a
                    trustworthy and transparent platform. We strive to offer a
                    diverse range of jewelry
                  </p>
                  <h3 className="text-[22px] text-secondary-100 font-bold leading-[30.8px]">
                    Our Mission
                  </h3>
                  <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                    Our mission is to revolutionize the jewelry shopping
                    experience by providing a trustworthy and transparent
                    platform. We strive to offer a diverse range of jewelry Our
                    mission is to revolutionize the jewelry shopping experience
                    by providing a trustworthy and transparent platform. We
                    strive to offer a diverse range of jewelryOur mission is to
                    revolutionize the jewelry shopping experience by providing a
                    trustworthy and transparent platform. We strive to offer a
                    diverse range of jewelry
                  </p>
                  <h3 className="text-[22px] text-secondary-100 font-bold leading-[30.8px]">
                    Our Mission
                  </h3>
                  <p className="text-[20px] font-emirates leading-[28px] text-secondary-100">
                    Our mission is to revolutionize the jewelry shopping
                    experience by providing a trustworthy and transparent
                    platform. We strive to offer a diverse range of jewelry Our
                    mission is to revolutionize the jewelry shopping experience
                  </p>
                </div>
              </CardBody>
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-[284px] shrink-0 rounded-tr-[20px] rounded-br-[20px]"
              >
                <Image
                  src={"/assets/images/card-bg1.png"}
                  alt="lyft"
                  width={284}
                  height={429}
                  className="w-[284px] h-[429px] object-cover rounded-tr-[20px] rounded-br-[20px]"
                />
              </CardHeader>
            </Card>
            <Image
              src={`/assets/images/adnan.png`}
              alt="adnan"
              width={300}
              height={300}
              className="absolute h-[357.1px] w-[283.97px] right-[110px] top-[79px] rounded-[20px] object-cover"
            />
          </div> */}
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container">
          <h2 className="text-center text-[40px] font-playfairdisplay text-black pb-[30px]">
            Frequently Asked Questions
          </h2>
          <div>
            <Accordion
              className="mb-2 
                   border border-blueGray-300 border-l-0 border-r-0 border-t-0 "
              open={open === 1}
              icon={<Icon id={1} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="text-[20px] text-blueGray-500 leading-[26.2px] font-emirates font-normal border-b-0 transition-colors !p-0 !py-[30px] "
              >
                What materials are your jewelry pieces made of?
              </AccordionHeader>
              <AccordionBody className="text-[16px] text-secondary-100 leading-[27.23px] font-emirates max-w-[811px] !p-0 !pb-6">
                Our jewelry pieces are crafted from a variety of high-quality
                materials, including gold, silver, platinum, and a range of
                precious and semi-precious gemstones such as diamonds,
                sapphires, emeralds, and rubies.
              </AccordionBody>
            </Accordion>
            <Accordion
              className="mb-2 
                   border border-blueGray-300 border-l-0 border-r-0 border-t-0 "
              open={open === 2}
              icon={<Icon id={2} open={open} />}
            >
              <AccordionHeader
                className="text-[20px] text-blueGray-500 leading-[26.2px] font-emirates font-normal border-b-0 transition-colors !p-0 !py-[30px]"
                onClick={() => handleOpen(2)}
              >
                Do you offer custom jewelry design services?
              </AccordionHeader>
              <AccordionBody className="text-[16px] text-secondary-100 leading-[27.23px] font-emirates max-w-[811px] !p-0 !pb-6">
                Our jewelry pieces are crafted from a variety of high-quality
                materials, including gold, silver, platinum, and a range of
                precious and semi-precious gemstones such as diamonds,
                sapphires, emeralds, and rubies.
              </AccordionBody>
            </Accordion>
            <Accordion
              className="mb-2 
                   border border-blueGray-300 border-l-0 border-r-0 border-t-0 "
              open={open === 3}
              icon={<Icon id={3} open={open} />}
            >
              <AccordionHeader
                className="text-[20px] text-blueGray-500 leading-[26.2px] font-emirates font-normal border-b-0 transition-colors !p-0 !py-[30px]"
                onClick={() => handleOpen(3)}
              >
                What is your return policy?
              </AccordionHeader>
              <AccordionBody className="text-[16px] text-secondary-100 leading-[27.23px] font-emirates max-w-[811px] !p-0 !pb-6">
                Our jewelry pieces are crafted from a variety of high-quality
                materials, including gold, silver, platinum, and a range of
                precious and semi-precious gemstones such as diamonds,
                sapphires, emeralds, and rubies.
              </AccordionBody>
            </Accordion>
            <Accordion
              className="mb-2 
                   border border-blueGray-300 border-l-0 border-r-0 border-t-0 "
              open={open === 4}
              icon={<Icon id={4} open={open} />}
            >
              <AccordionHeader
                className="text-[20px] text-blueGray-500 leading-[26.2px] font-emirates font-normal border-b-0 transition-colors !p-0 !py-[30px]"
                onClick={() => handleOpen(4)}
              >
                How do I care for my jewelry?
              </AccordionHeader>
              <AccordionBody className="text-[16px] text-secondary-100 leading-[27.23px] font-emirates max-w-[811px] !p-0 !pb-6">
                Our jewelry pieces are crafted from a variety of high-quality
                materials, including gold, silver, platinum, and a range of
                precious and semi-precious gemstones such as diamonds,
                sapphires, emeralds, and rubies.
              </AccordionBody>
            </Accordion>
            <Accordion
              className="mb-2 
                   border border-blueGray-300 border-l-0 border-r-0 border-t-0 "
              open={open === 5}
              icon={<Icon id={5} open={open} />}
            >
              <AccordionHeader
                className="text-[20px] text-blueGray-500 leading-[26.2px] font-emirates font-normal border-b-0 transition-colors !p-0 !py-[30px]"
                onClick={() => handleOpen(5)}
              >
                Do you offer a warranty on your jewelry?
              </AccordionHeader>
              <AccordionBody className="text-[16px] text-secondary-100 leading-[27.23px] font-emirates max-w-[811px] !p-0 !pb-6">
                Our jewelry pieces are crafted from a variety of high-quality
                materials, including gold, silver, platinum, and a range of
                precious and semi-precious gemstones such as diamonds,
                sapphires, emeralds, and rubies.
              </AccordionBody>
            </Accordion>
            <Accordion
              className="mb-2 
                   border border-blueGray-300 border-l-0 border-r-0 border-t-0 "
              open={open === 6}
              icon={<Icon id={6} open={open} />}
            >
              <AccordionHeader
                className="text-[20px] text-blueGray-500 leading-[26.2px] font-emirates font-normal border-b-0 transition-colors !p-0 !py-[30px]"
                onClick={() => handleOpen(6)}
              >
                How do I determine my ring size?
              </AccordionHeader>
              <AccordionBody className="text-[16px] text-secondary-100 leading-[27.23px] font-emirates max-w-[811px] !p-0 !pb-6">
                Our jewelry pieces are crafted from a variety of high-quality
                materials, including gold, silver, platinum, and a range of
                precious and semi-precious gemstones such as diamonds,
                sapphires, emeralds, and rubies.
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </section>
      <section className="pt-5 pb-[70px]">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="border-2 rounded-[4px] border-primary-200 border-l-0 border-r-0 border-b-0 bg-primary-50 pt-[50px] pl-[50px] pb-[46px] pr-[60px] w-[1100px] max-w-[1100px] ">
              <div className="flex gap-[60px]">
                <div>
                  <Image
                    src={"/assets/images/Illustration40.png"}
                    height={378}
                    width={437}
                    className="w-[437px] h-[378px] object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[32px] leading-[28.8px] pb-[40px] !mt-0 !pt-0 font-playfairdisplay">
                    Quick Contact
                  </h2>
                  <form>
                    <div className="w-[441px] pb-5">
                      <Input
                        type="Name"
                        placeholder="Name"
                        className="!border !h-[36px] !rounded-[4px] !border-blueGray-300 bg-white text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{
                          className:
                            "min-w-[100px] !h-[36px] !min-h-[36px] !max-h-full",
                        }}
                      />
                    </div>
                    <div className="w-[441px] pb-5">
                      <Input
                        type="Email"
                        placeholder="Email Address"
                        className="!border !h-[36px] !rounded-[4px] !border-blueGray-300 bg-white text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{
                          className:
                            "min-w-[100px] !h-[36px] !min-h-[36px] !max-h-full",
                        }}
                      />
                    </div>
                    <div className="w-[441px] pb-5">
                      <Input
                        type="Text"
                        placeholder="Phone"
                        className="!border !h-[36px] !rounded-[4px] !border-blueGray-300 bg-white text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{
                          className:
                            "min-w-[100px] !h-[36px] !min-h-[36px] !max-h-full",
                        }}
                      />
                    </div>
                    <div className="w-[441px] pb-[30px]">
                      <Textarea
                        placeholder="Message..."
                        className="!border !max-h-[75px] !min-h-[100%]  !h-[75px] !rounded-[4px] !border-blueGray-300 bg-white text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                          className: "hidden",
                        }}
                        height="25px"
                        containerProps={{
                          className:
                            "min-w-[100px] !h-[75px] !min-h-[75px] !max-h-full",
                        }}
                        label="Message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="normal-case text-[14px] font-emirates text-dark-50 leading-[16.8px] pt-[11px] pb-[8px] pl-[60px] pr-[59px] !w-[162px] !h-[36px] font-bold"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
              <div className="flex justify-between pt-[79px]">
                <div className="flex">
                  <svg
                    width="18"
                    height="26"
                    viewBox="0 0 18 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-1 h-[30px] w-[30px] mr-[11px]"
                  >
                    <path
                      d="M9 25.5C8.70833 25.5 8.45833 25.4167 8.25 25.25C8.04167 25.0833 7.88542 24.8646 7.78125 24.5938C7.38542 23.4271 6.88542 22.3333 6.28125 21.3125C5.69792 20.2917 4.875 19.0938 3.8125 17.7188C2.75 16.3438 1.88542 15.0312 1.21875 13.7812C0.572917 12.5312 0.25 11.0208 0.25 9.25C0.25 6.8125 1.09375 4.75 2.78125 3.0625C4.48958 1.35417 6.5625 0.5 9 0.5C11.4375 0.5 13.5 1.35417 15.1875 3.0625C16.8958 4.75 17.75 6.8125 17.75 9.25C17.75 11.1458 17.3854 12.7292 16.6562 14C15.9479 15.25 15.125 16.4896 14.1875 17.7188C13.0625 19.2188 12.2083 20.4688 11.625 21.4688C11.0625 22.4479 10.5938 23.4896 10.2188 24.5938C10.1146 24.8854 9.94792 25.1146 9.71875 25.2812C9.51042 25.4271 9.27083 25.5 9 25.5ZM9 21.0312C9.35417 20.3229 9.75 19.625 10.1875 18.9375C10.6458 18.25 11.3125 17.3333 12.1875 16.1875C13.0833 15.0208 13.8125 13.9479 14.375 12.9687C14.9583 11.9687 15.25 10.7292 15.25 9.25C15.25 7.52083 14.6354 6.05208 13.4063 4.84375C12.1979 3.61458 10.7292 3 9 3C7.27083 3 5.79167 3.61458 4.5625 4.84375C3.35417 6.05208 2.75 7.52083 2.75 9.25C2.75 10.7292 3.03125 11.9687 3.59375 12.9687C4.17708 13.9479 4.91667 15.0208 5.8125 16.1875C6.6875 17.3333 7.34375 18.25 7.78125 18.9375C8.23958 19.625 8.64583 20.3229 9 21.0312ZM9 12.375C9.875 12.375 10.6146 12.0729 11.2188 11.4688C11.8229 10.8646 12.125 10.125 12.125 9.25C12.125 8.375 11.8229 7.63542 11.2188 7.03125C10.6146 6.42708 9.875 6.125 9 6.125C8.125 6.125 7.38542 6.42708 6.78125 7.03125C6.17708 7.63542 5.875 8.375 5.875 9.25C5.875 10.125 6.17708 10.8646 6.78125 11.4688C7.38542 12.0729 8.125 12.375 9 12.375Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <div className="max-w-[293px]">
                    <h3 className="text-[20px] leading-7 text-primary-200 pb-[5px] ">
                      Address
                    </h3>
                    <Link
                      href="https://www.google.com/maps/search/Shop+53,Ground+Floor,The+Gold+Center+Building,+Deira+Dubai,+Dubai,+U.A.E"
                      className="text-[16px] leading-[22.4px] text-blueGray-700"
                    >
                      Shop.53, Ground Floor, The Gold Center Building, Deira
                      Dubai, Dubai, U.A.E.
                    </Link>
                  </div>
                </div>
                <div className="flex">
                  <svg
                    width="23"
                    className="mt-[3px] h-[24px] w-[24px] mr-[12px]"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0475 5C15.0242 5.19057 15.9219 5.66826 16.6256 6.37194C17.3292 7.07561 17.8069 7.97326 17.9975 8.95M14.0475 1C16.0768 1.22544 17.9691 2.13417 19.4137 3.57701C20.8584 5.01984 21.7695 6.91101 21.9975 8.94M20.9975 16.92V19.92C20.9986 20.1985 20.9416 20.4742 20.83 20.7293C20.7184 20.9845 20.5548 21.2136 20.3496 21.4019C20.1443 21.5901 19.9021 21.7335 19.6382 21.8227C19.3744 21.9119 19.0949 21.9451 18.8175 21.92C15.7403 21.5856 12.7845 20.5341 10.1875 18.85C7.77132 17.3147 5.72283 15.2662 4.18749 12.85C2.49747 10.2412 1.44573 7.27099 1.11749 4.18C1.0925 3.90347 1.12537 3.62476 1.21399 3.36162C1.30262 3.09849 1.44506 2.85669 1.63226 2.65162C1.81945 2.44655 2.0473 2.28271 2.30128 2.17052C2.55527 2.05833 2.82983 2.00026 3.10749 2H6.10749C6.5928 1.99522 7.06328 2.16708 7.43125 2.48353C7.79922 2.79999 8.03957 3.23945 8.10749 3.72C8.23412 4.68007 8.46894 5.62273 8.80749 6.53C8.94204 6.88792 8.97116 7.27691 8.8914 7.65088C8.81164 8.02485 8.62636 8.36811 8.35749 8.64L7.08749 9.91C8.51105 12.4135 10.5839 14.4864 13.0875 15.91L14.3575 14.64C14.6294 14.3711 14.9726 14.1858 15.3466 14.1061C15.7206 14.0263 16.1096 14.0555 16.4675 14.19C17.3748 14.5286 18.3174 14.7634 19.2775 14.89C19.7633 14.9585 20.2069 15.2032 20.524 15.5775C20.8412 15.9518 21.0097 16.4296 20.9975 16.92Z"
                      stroke="#F0AE11"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="max-w-[293px]">
                    <h3 className="text-[20px] leading-7 text-primary-200 pb-[5px] ">
                      Phone
                    </h3>
                    <div className="flex flex-col">
                      <Link
                        href="tel:+97123555478"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        +97 123 5555 478
                      </Link>
                      <Link
                        href="tel:+97123555478"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        +97 123 5555 478
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <svg
                    width="20"
                    className="mt-[3px] h-[22px] w-[22px] mr-[15px]"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.556 0.666016H1.44488C1.12073 0.666016 0.809848 0.794785 0.580637 1.024C0.351426 1.25321 0.222656 1.56408 0.222656 1.88824V14.1105C0.222656 14.4346 0.351426 14.7455 0.580637 14.9747C0.809848 15.2039 1.12073 15.3327 1.44488 15.3327H18.556C18.8801 15.3327 19.191 15.2039 19.4202 14.9747C19.6494 14.7455 19.7782 14.4346 19.7782 14.1105V1.88824C19.7782 1.56408 19.6494 1.25321 19.4202 1.024C19.191 0.794785 18.8801 0.666016 18.556 0.666016ZM17.6149 14.1105H2.45932L6.7371 9.68602L5.8571 8.83657L1.44488 13.4016V2.81713L9.04099 10.3766C9.26999 10.6042 9.57976 10.732 9.90266 10.732C10.2256 10.732 10.5353 10.6042 10.7643 10.3766L18.556 2.62768V13.3221L14.0582 8.82435L13.1965 9.68602L17.6149 14.1105ZM2.24543 1.88824H17.566L9.90266 9.50879L2.24543 1.88824Z"
                      fill="#F0AE11"
                    />
                  </svg>

                  <div className="max-w-[293px]">
                    <h3 className="text-[20px] leading-7 text-primary-200 pb-[5px] ">
                      Email
                    </h3>
                    <div className="flex flex-col">
                      <Link
                        href="mailto:info@scintillastore.com"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        Info@scintillastore.com
                      </Link>
                      <Link
                        href="mailto:info@scintillastore.com"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        Info@scintillastore.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StorePage;
