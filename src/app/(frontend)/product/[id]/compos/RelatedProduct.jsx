"use client";
import ProductCard from "@/app/(frontend)/shop/compos/ProductCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

const RelatedProduct = ({ product }) => {
  const relatedProducts = product?.product?.relatedProducts;
  return (
    relatedProducts &&
    relatedProducts?.length > 0 && (
      <section className="pb-[50px]">
        <div className="container">
          <div>
            <div className="mb-5 flex justify-between items-center">
              <h3 className="text-2xl font-playfairdisplay font-semibold">
                Related Products
              </h3>
              <div>
                <Link href="/shop">
                  <Button variant="outlined">View All</Button>
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <Swiper slidesPerView={4} spaceBetween={20}>
                {relatedProducts?.map(({ product }, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default RelatedProduct;
