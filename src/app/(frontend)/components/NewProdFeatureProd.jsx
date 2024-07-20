"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductCard from "../shop/compos/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
const NewProdFeatureProd = ({ products }) => {
  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-6">
            <div className="new-products w-3/12">
              <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide">
                New Products
              </h3>
              {products.slice(0, 1).map((product, index) => {
                return (
                  <div key={index}>
                    <ProductCard key={product.product_id} product={product} />
                  </div>
                );
              })}
            </div>
            <div className="feature-products w-9/12">
              <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide">
                Feature Products
              </h3>
              <div>
                {/* {products.slice(0, 8).map((product, index) => {
                  return (
                    <ProductCard key={product.product_id} product={product} />
                  );
                })} */}
                <Swiper
                  slidesPerView={4}
                  spaceBetween={20}
                  modules={[Grid, Pagination]}
                  grid={{ rows: 2, fill: "row" }}
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.product_id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewProdFeatureProd;
