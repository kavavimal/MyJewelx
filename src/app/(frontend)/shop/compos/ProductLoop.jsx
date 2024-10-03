"use client";
import { useShopStore } from "@/contexts/shopStore";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import LoadingDots from "@/app/components/LoadingDots";

export default function ProductLoop({ products }) {
  const filterdProducts = useShopStore((store) => store.products);
  const loading = useShopStore((store) => store.loading);
  const setProducts = useShopStore((store) => store.setProducts);
  console.log(filterdProducts);
  useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    <>
      {filterdProducts.length > 0 ? (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            <div className="w-full min-h-80 flex items-center justify-center col-span-4">
              <LoadingDots size={10} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filterdProducts.map((product, index) => (
                <motion.div
                  key={product.product_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <ProductCard key={product.product_id} product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      ) : (
        <p>No Products found</p>
      )}
    </>
  );
}
