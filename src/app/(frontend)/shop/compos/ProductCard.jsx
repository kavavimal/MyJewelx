"use client";
import {
  getProductAverageRatings,
  getProductPriceString,
  truncate,
} from "@/utils/helper";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import Engagement from "./Engagement";

const ProductCard = ({ product }) => {
  const variation = product ? product.variations[0] : null;
  const averateRating = getProductAverageRatings(product.reviews);
  // console.log(product);
  return (
    <Card className="overflow-hidden h-[224px] md:h-auto  font-normal text-left">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div className="w-auto overflow-hidden bg-[#fffdf8] md:h-[252px] flex flex-col items-center justify-center">
          <Link
            href={`/product/${product?.product_id}`}
            className="font-normal text-left block "
          >
            <Image
              src={
                variation?.image[0]?.path
                  ? product?.variations[0]?.image[0]?.path
                  : "/assets/images/image.png"
              }
              alt="image for design"
              width={350}
              height={350}
              className="w-[260px] h-[169px] md:h-[250px] hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      </CardHeader>
      <CardBody className="p-0 pb-[3px] pt-2.5 px-[13px]">
        <div className="flex flex-col gap-1.5">
          <p className="text-black text-sm">
            <Link
              href={`/product/${product?.product_id}`}
              className="font-normal text-left hover:text-primary-200"
            >
              {truncate(product?.product_name, 25)}
            </Link>
          </p>
          <div className="flex items-center justify-between">
            <span className="font-light text-xs leading-[18px]">
              {getProductPriceString(product, variation ? variation : 0)}
            </span>
            <span className="font-light text-xs">
              {variation?.net_weight} gram
            </span>
          </div>
          <div className="hidden md:block ">
            <Engagement
              averateRating={averateRating}
              product_id={product.product_id}
              variation={variation}
              product_name={product.product_name}
              likes={product?.likes ? product.likes.length : ""}
              reviews={product?.reviews ? product.reviews.length : ""}
            />
          </div>
          {product?.user && (
            <Link
              href={`/${
                product?.user?.vendor?.store_name ??
                product?.user?.firstName + " " + product?.user?.lastName
              }`}
              className="text-black text-sm leading-[23.83px] hidden md:block hover:text-primary-200"
            >
              {" "}
              Seller:{" "}
              {product?.user?.vendor?.store_name ??
                product?.user?.firstName + " " + product?.user?.lastName}
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
