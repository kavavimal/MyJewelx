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
  const variation = product?.variations[0];
  const averateRating = getProductAverageRatings(product.reviews);
  return (
    <Card className="overflow-hidden font-normal leading-[18.34px] text-left">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div className="w-auto overflow-hidden">
          <Link
            href={`/product/${product?.product_id}`}
            className="font-normal leading-[18.34px] text-left"
          >
            <Image
              src={
                product?.variations &&
                product?.variations.length > 0 &&
                product?.variations[0]?.image[0]?.path
                  ? product?.variations[0]?.image[0]?.path
                  : "/assets/images/image.png"
              }
              alt="image for design"
              width={245}
              height={192}
              className="max-w-[245px] max-h-[192px] hover:scale-110 transition-all duration-300"
            />
          </Link>
        </div>
      </CardHeader>
      <CardBody className="p-0 pb-[3px] pt-2.5 px-[13px]">
        <div className="flex flex-col gap-1.5">
          <p className="text-black text-sm">
            <Link
              href={`/product/${product?.product_id}`}
              className="font-normal leading-[18.34px] text-left"
            >
              {truncate(product?.product_name, 25)}
            </Link>
          </p>
          <div className="flex items-center justify-between">
            <span className="font-light text-xs leading-[18px]">
              {getProductPriceString(product, variation)}
            </span>
            <span className="font-light text-xs">
              {variation.net_weight} gram
            </span>
          </div>
          <Engagement
            averateRating={averateRating}
            product_id={product.product_id}
            variation={variation}
          />
          {product?.user && (
            <p lassName="text-black text-sm leading-[23.83px]">
              Seller: {product?.user?.firstName + " " + product?.user?.lastName}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
