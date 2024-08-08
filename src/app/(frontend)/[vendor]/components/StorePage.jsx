"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Rating,
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

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const repsonse = await get("/api/product");
    setProducts(repsonse?.data?.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <section className="bg-gradient-to-br from-[#C7D9ED] to-[#E5DBDC] relative">
        <Image
          src={"/assets/images/file.png"}
          height={650}
          width={1200}
          alt=""
          className="h-full object-cover"
        />
        <div className="absolute top-[50%] right-20 -translate-y-1/2 w-[413px]">
          <div className="flex flex-col gap-5">
            <div className="flex justify-center items-center">
              <Image
                src={"/assets/images/storelogo.jpg"}
                height={70}
                width={70}
                alt=""
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7514 10.0247V8.33301C13.7514 6.67541 14.4099 5.08569 15.582 3.91359C16.7541 2.74149 18.3438 2.08301 20.0014 2.08301C21.659 2.08301 23.2488 2.74149 24.4209 3.91359C25.593 5.08569 26.2514 6.67541 26.2514 8.33301V10.0247C28.3964 10.0897 29.7098 10.3197 30.7114 11.1513C32.0998 12.3047 32.4664 14.2547 33.1981 18.1563L34.4481 24.823C35.4764 30.3097 35.9898 33.053 34.4914 34.8597C32.9914 36.6663 30.1998 36.6663 24.6181 36.6663H15.3848C9.80144 36.6663 7.01144 36.6663 5.51144 34.8597C4.01144 33.053 4.52811 30.3097 5.55478 24.823L6.80478 18.1563C7.53811 14.2563 7.90311 12.3047 9.29144 11.1513C10.2931 10.3197 11.6064 10.0897 13.7514 10.0247ZM16.2514 8.33301C16.2514 7.33845 16.6465 6.38462 17.3498 5.68136C18.0531 4.9781 19.0069 4.58301 20.0014 4.58301C20.996 4.58301 21.9498 4.9781 22.6531 5.68136C23.3564 6.38462 23.7514 7.33845 23.7514 8.33301V9.99967H16.2514V8.33301Z"
                  fill="#F0AE11"
                />
              </svg>
            </div>
            <hr className="h-px bg-primary-200 border-0 mb-[15.5px]" />
            <div>
              <p className="mb-2.5 text-blueGray-500 text-[30px] text-center">
                500+
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
                300+
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
                1200
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
                300+
              </p>
              <p className="text-secondary-100 text-base text-center">
                Store Likes
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container">
          <h3 className="text-center text-blueGray-500 text-[34px] font-semibold font-playfairdisplay mb-[50px]">
            Wide Range of Categories
          </h3>
          <div className="flex items-start gap-[69px]">
            <div className="flex-1">
              <h3 className="text-[22px] font-normal mb-2.5">
                Explore Our Categories
              </h3>
              <p className="text-base text-secondary-200 mb-[15px]">
                Explore our exquisite collections and find the perfect piece for
                every occasion.
              </p>
              <div>
                <ul className="flex flex-col gap-[15.2px] mb-[13.9px]">
                  <li className="text-base text-blueGray-500">Anklets</li>
                  <li className="text-base text-blueGray-500">Bracelets</li>
                  <li className="text-base text-blueGray-500">Brooches</li>
                  <li className="text-base text-blueGray-500">Chains</li>
                  <li className="text-base text-blueGray-500">Charms</li>
                  <li className="text-base text-blueGray-500">Earrings</li>
                  <li className="text-base text-blueGray-500">Mangalsutra</li>
                </ul>
                <button className="text-primary-200">View more</button>
              </div>
            </div>
            <div className="w-[920px] pt-[30px] pb-5 px-[30px] border border-blueGray-300 relative">
              <Swiper
                className="mb-5"
                slidesPerView={3}
                spaceBetween={25}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {[1, 2].map((_, index) => (
                  <React.Fragment key={index}>
                    <SwiperSlide>
                      <Image
                        src={"/assets/images/Illustration13.jpg"}
                        height={350}
                        width={270}
                        alt=""
                        className="h-[350px] w-[270px] object-cover"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/assets/images/Illustration14.png"}
                        height={350}
                        width={270}
                        alt=""
                        className="h-[350px] w-[270px] object-cover"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/assets/images/Illustration15.jpg"}
                        height={350}
                        width={270}
                        alt=""
                        className="h-[350px] w-[270px] object-cover"
                      />
                    </SwiperSlide>
                  </React.Fragment>
                ))}
              </Swiper>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </section>
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
                    Jewelry Replacement{" "}
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
      <section className="bg-white pt-20 pb-[60px]">
        <div className="container">
          <h3 className="text-[34px] font-playfairdisplay text-blueGray-500 font-semibold text-center mb-[50px]">
            Customer Reviews
          </h3>
          <div>
            <div className="relative flex w-full max-w-[473px] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
              <div className="relative flex items-start gap-[30px] pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <Rating value={4} readonly />
                    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      Tania Andrew
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                      United Arab Emirates
                    </p>
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
