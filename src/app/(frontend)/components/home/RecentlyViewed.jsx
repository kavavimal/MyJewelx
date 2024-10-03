import { get } from "@/utils/api";
import { getProductPriceString, truncate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const repsonse = await get("/api/product");
      setProducts(repsonse?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full px-[15px] pb-[15px] border border-secondary-400 rounded-sm">
      <div className="flex flex-col justify-center items-center">
        {products?.length > 0 ? (
          products.slice(0, 4).map((product, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-full flex justify-start items-center pt-[15px] ${
                  index < 3 ? "pb-[15px] border-b border-secondary-400" : ""
                }`}
              >
                <Link href={`/product/${product?.product_id}`}>
                  <Image
                    src={
                      product?.variations &&
                      product?.variations.length > 0 &&
                      product?.variations[0]?.image[0]?.path
                    }
                    alt="avatar"
                    width={65}
                    height={65}
                    className="w-[65px] h-[65px] border border-secondary-400 rounded"
                  />
                </Link>
                <div className="flex flex-col ms-2.5 text-start justify-center items-start gap-0.5">
                  <Link
                    href={`/product/${product?.product_id}`}
                    className="text-sm font-normal leading-[23.87px] hover:text-primary-200"
                  >
                    {product?.product_name &&
                      truncate(product?.product_name, 30)}
                  </Link>
                  <span className="block text-secondary-100 text-xs leading-[18px]">
                    {getProductPriceString(
                      product,
                      product?.variation ? product?.variation[0] : 0
                    )}
                  </span>
                </div>
                {/* {index < 2 && <hr className="border-secondary-400 w-full" />} */}
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No products</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;
