"use client";
import ProductCard from "@/app/(frontend)/shop/compos/ProductCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const RelatedProduct = ({ product }) => {
  const relatedProducts = product?.product?.relatedProducts;
  return (
    <section>
      <div className="container">
        <div>
          <div className="mb-5">
            <h3 className="text-2xl font-playfairdisplay font-semibold">
              Related Products
            </h3>
          </div>
          <div className="overflow-hidden">
            {relatedProducts?.length > 0 && (
              <Swiper slidesPerView={4} spaceBetween={20}>
                {relatedProducts?.map(({ product }, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
