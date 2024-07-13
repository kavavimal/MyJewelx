"use client";
import React from "react";
import ProductCard from "../shop/compos/ProductCard";
import RecentlyViewed from "./RecentlyViewed";
import PopularTags from "./PopularTags";

const PopularProducts = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex container gap-5">
        <div className="w-3/12">
          <h3 className="text-lg font-playfairdisplay font-semibold tracking-wide">
            Recently Viewed
          </h3>
          <div className="mt-5 mb-3">
            <RecentlyViewed />
          </div>
          <div>
            <h3 className="text-lg font-playfairdisplay font-semibold tracking-wide">
              Popular tags
            </h3>
            <div className="mt-3">
              <PopularTags />
            </div>
          </div>
        </div>
        <div className="w-9/12">
          <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide">
            Popular Products
          </h3>
          <div className="mt-4">
            <div className="flex-1 grid grid-cols-4 gap-5">
              {products.slice(0, 12).map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
