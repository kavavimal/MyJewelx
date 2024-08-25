import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { get } from "@/utils/api";
import { Button } from "@material-tailwind/react";

const StoreProducts = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filteredcategoryid, setFilteredcategoryid] = useState(null);
  const getCategories = async () => {
    const response = await get("/api/category");
    setCategories(response?.data?.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filterProducts = (id) => {
    setFilteredcategoryid(id);
    const filtered = products.filter((product) => product.categoryId === id);
    setFilteredProducts(filtered);
  };

  return (
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
                {categories.length > 0 &&
                  categories
                    .slice(0, showMore ? categories.length : 7)
                    .map((category) => (
                      <li
                        key={category.category_id}
                        className="text-base text-blueGray-500 cursor-pointer"
                      >
                        <Button
                          onClick={() => filterProducts(category.category_id)}
                          className={`w-full text-left shadow-none p-0 m-0 hover:shadow-none bg-transparent hover:text-primary-200 ${
                            filteredcategoryid === category.category_id
                              ? "text-primary-200"
                              : ""
                          }`}
                        >
                          {category.name}
                        </Button>
                      </li>
                    ))}
              </ul>
              <button
                className="text-primary-200"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "View less" : "View more"}
              </button>
            </div>
          </div>
          <div className="w-[920px] pt-[30px] h-[410px] p-5 border border-blueGray-300 relative">
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Image
                      src={product?.variations[0]?.image[0]?.path}
                      height={350}
                      width={270}
                      alt={product.product_name}
                      className="h-[350px] w-[270px] object-cover"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <>
                  <p>No products found</p>
                </>
              )}
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreProducts;
