"use client";
import React from "react";
import ProductCard from "../shop/compos/ProductCard";

const PopularProducts = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex container">
        <div className="w-3/12">
          <h3>Recently Viewed</h3>
        </div>
        <div className="w-9/12">
          <h3 className="text-2xl font-playfairdisplay font-semibold tracking-wide">
            Popular Products
          </h3>
          <div className="mt-4">
            <div className="flex-1 grid grid-cols-4 gap-5">
              {products.slice(0, 8).map((product) => (
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
