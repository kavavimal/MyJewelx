"use client";
import { useShopStore } from "@/contexts/shopStore";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingDots from "@/components/loading-dots";

export default function ProductLoop({ products }) {
  const filterdProducts = useShopStore((store) => store.products);
  const loading = useShopStore((store) => store.loading);
  const setProducts = useShopStore((store) => store.setProducts);
  useEffect(() => {
    setProducts(products);
  }, [products]);
  return (
    <>
      {filterdProducts.length > 0 ? (
        <div className="flex-1 grid grid-cols-4 gap-5">
          {loading ? (
            <LoadingDots />
          ) : (
            filterdProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          )}
        </div>
      ) : (
        <p>No Products found</p>
      )}
    </>
  );
}