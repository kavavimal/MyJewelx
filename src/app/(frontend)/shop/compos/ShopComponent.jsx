"use client";

import { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import ProductCard from "./ProductCard";
import { searchProducts } from "@/actions/product";
import LoadingDots from "@/components/loading-dots";
import {
  Carousel,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceFilter from "./PriceFilter";
import { useSearchParams } from "next/navigation";

const ShopComponent = ({ products, categories, promolist }) => {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sort, setSort] = useState("");
  const query = useSearchParams().get("q");
  const category = useSearchParams().get("category");

  const filterByPrice = async (min, max) => {
    setLoading(true);
    const response = await searchProducts({
      ...selectedFilters,
      price: { min: min, max: max },
    });
    setFilteredProducts(response);
    setLoading(false);
  };
  const updateProducts = async () => {
    setLoading(true);
    const response = await searchProducts(selectedFilters);
    setFilteredProducts(response);
    setLoading(false);
  };

  useEffect(() => {
    updateProducts();
  }, [selectedFilters]);

  useEffect(() => {
    setSelectedFilters((prev) => ({ ...prev, sort: sort }));
  }, [sort]);

  useEffect(() => {
    if (query) {
      setSelectedFilters((prev) => ({ ...prev, q: query }));
    }
    if (category) {
      setSelectedFilters((prev) => ({ ...prev, category: category }));
    }
  }, []);
  return (
    <section className="container pb-20 pt-5">
      <div className="mb-5">
        <Carousel className="rounded">
          {promolist?.length > 0 &&
            promolist.map((promo, index) => {
              const words = promo.ads_title.split(" ");
              const lastWord = words.pop();
              const initialText = words.join(" ");
              return (
                <div className="relative h-full w-full" key={index}>
                  <img
                    src={promo.ads_img_url}
                    alt="image 2"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-black/25">
                    <Typography
                      variant="h1"
                      color="black"
                      className="text-3xl capitalize font-playfairdisplay"
                    >
                      {initialText}{" "}
                      <span className="text-[#D4180E]">{lastWord}</span>
                    </Typography>
                    <hr className="border-[#D4180E] w-1/5 border-[1.5px]" />
                    <Typography
                      variant="lead"
                      className="capitalize text-black font-emirates"
                    >
                      {promo.ads_title}
                    </Typography>
                    <div>
                      <Link
                        size="lg"
                        color="white"
                        className="bg-primary-200 font-emirates font-bold"
                        href={promo.ads_title}
                      >
                        <Button className="hover:shadow-none">Shop now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </Carousel>
      </div>
      <Breadcrumbs items={[{ link: "/shop", label: "Shop", current: true }]} />
      <div className="flex items-center text-sm before:flex-1 before:border-t after:pr-64 before:border-primary-200 after:border-t after:border-primary-200 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
        <img src="/assets/images/divider.svg" alt="" />
      </div>
      <div className="flex justify-end items-center py-5">
        <div className="w-full">
          <PriceFilter filterByPrice={filterByPrice} />
        </div>
        <div className="flex">
          <Select label="Sort" onChange={(value) => setSort(value)}>
            <Option value="Low to High">Low to High</Option>
            <Option value="High to Low">High to Low</Option>
            <Option value="Ascending">Most Older</Option>
            <Option value="Descending">Most Recent</Option>
          </Select>
        </div>
      </div>
      <div className="flex items-start gap-[11px]">
        <div
          className="w-[224px]"
          style={{
            position: "sticky",
            top: 120,
            left: 0,
          }}
        >
          <FilterProduct
            categories={categories}
            setSelectedFilters={setSelectedFilters}
            query={query}
            category={category}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="flex-1 grid grid-cols-3 gap-5">
            {loading ? (
              <div className="w-full min-h-80 flex items-center justify-center col-span-4">
                <LoadingDots size={10} />
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            )}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </section>
  );
};

export default ShopComponent;
