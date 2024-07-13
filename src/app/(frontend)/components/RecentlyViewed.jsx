import LoadingDots from "@/components/loading-dots";
import { get } from "@/utils/api";
import { truncate } from "@/utils/helper";
import { Avatar } from "@material-tailwind/react";
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
    <div className="p-4 border border-secondary-400 rounded-sm">
      <div className="flex flex-col justify-center items-center gap-5">
        {products?.length > 0 ? (
          products.slice(0, 3).map((product, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-center flex-col gap-3 items-center">
                <div>
                  <Avatar
                    src={
                      product?.variations &&
                      product?.variations.length > 0 &&
                      product?.variations[0]?.image[0]?.path
                    }
                    alt="avatar"
                    size="xxl"
                    className="border border-secondary-400"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-0.5">
                  <p>
                    {product?.product_name &&
                      truncate(product?.product_name, 30)}
                  </p>
                  <span className="block text-secondary-100">
                    Dhs 5000 - 8000
                  </span>
                </div>
              </div>
              {index < 2 && <hr className="border-secondary-400 w-full" />}
            </React.Fragment>
          ))
        ) : (
          <LoadingDots size={5} />
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;
