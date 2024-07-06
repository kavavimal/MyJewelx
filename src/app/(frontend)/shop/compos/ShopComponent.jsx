"use client";

import { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import ProductCard from "./ProductCard";
import { searchProducts } from "@/actions/product";
import LoadingDots from "@/components/loading-dots";

const ShopComponent = ({ products, categories }) => {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState({});

  const updateProducts = async () => {
    setLoading(true);
    const response = await searchProducts(selectedFilters);
    setFilteredProducts(response);
    setLoading(false);
  };

  useEffect(() => {
    updateProducts();
  }, [selectedFilters]);

  console.log(selectedFilters);
  return (
    <section className="container">
      <div className="flex items-start gap-5">
        <div className="w-3/12">
          <FilterProduct
            categories={categories}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className="flex-1 grid grid-cols-4">
          {loading ? (
            <LoadingDots />
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopComponent;
