"use client";
import { printFormatPrice } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutItem = ({ item, variation, index }) => {
  const variationDataSplit = variation.variation_name?.split(",");
  console.log(variationDataSplit);
  return (
    <div
      className={`flex items-start gap-[15px] ${
        index === 0
          ? "pt-0"
          : "pt-[15px] border-t border-blueGray-300 mt-[15px]"
      }`}
    >
      <div className="w-[100px] bg-clip-border overflow-hidden rounded-sm border border-blueGray-300">
        <Image
          src={"/assets/images/image.png"}
          height={200}
          width={200}
          className="w-full h-[127px] object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        <div className="flex justify-between items-center">
          <h4 className="size-sm">{item.name}</h4>
          <p className="text-base text-blueGray-500">
            AED {printFormatPrice(item.price)}
          </p>
        </div>
        <p className="size-sm text-secondary-100 text-sm">30 Gram</p>
        <div className="py-0.5">
          {variationDataSplit?.map((item, index) => {
            return (
              <span
                key={index}
                className={`size-sm text-secondary-100 pr-[6px] 
                ${index !== variationDataSplit.length - 1 && "border-r"}
                border-blueGray-300 text-sm`}
              >
                {item}
              </span>
            );
          })}
          {/* <span className="size-sm text-secondary-100 pr-[3px] border-r border-blueGray-300 text-sm">
            {variationDataSplit[0]}
          </span>
          <span className="size-sm text-secondary-100 px-[3px] border-r border-blueGray-300 text-sm">
            {variationDataSplit[1]}
          </span>
          <span className="size-sm text-secondary-100 px-[3px] border-r border-blueGray-300 text-sm">
            {variationDataSplit[2]}
          </span> */}
          {/* <span className="size-sm text-secondary-100 px-[3px] border-r border-blueGray-300 text-sm">
            Gender: Female
          </span>
          <span className="size-sm text-secondary-100 ps-[3px] text-sm">
            Made in: India
          </span> */}
        </div>
        <p className="size-sm text-secondary-100  text-sm">
          Seller: Malabar's Gold and Diamonds
        </p>
        <div className="flex justify-between items-center">
          <p className="size-sm text-secondary-100  text-sm">
            Quantity: {item.quantity}
          </p>
          <Link
            className="text-primary-200"
            href={`/product/${variation?.product_id}`}
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
