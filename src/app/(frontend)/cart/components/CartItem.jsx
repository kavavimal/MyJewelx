"use client";
import { printPrice } from "@/utils/helper";
import Link from "next/link";
import RemoveCartItem from "../../components/RemoveCartItem";
import Quantity from "../../components/Quantity";
import AddToWishlist from "../../components/AddToWishlist";

export default function CartItem({ item, isCart = true, index }) {
  const priceStr = printPrice(item.price) || "";

  // Find the index of the first digit to split the currency symbol and numeric value
  const firstNumericIndex = priceStr.search(/\d/);
  const symbol =
    firstNumericIndex > -1 ? priceStr.slice(0, firstNumericIndex) : "";
  const price =
    firstNumericIndex > -1 ? priceStr.slice(firstNumericIndex) : priceStr;
  return (
    <div
      className={`flex items-start flex-col ${
        index > 0 ? "border-t w-full border-blueGray-300 pt-4 mt-0" : ""
      }  bg-white`}
    >
      <div className={`flex w-full items-start bg-white`}>
        <div className="mr-3 min-w-[90px] w-[150px] h-[150px] ">
          <Link href={`/product/${item?.productVariation?.product_id}`}>
            <img
              className="h-full w-full object-cover border border-gray-400"
              src={item?.productVariation?.image?.[0]?.path}
              alt={item?.productVariation?.product?.product_name}
            />
          </Link>
        </div>

        <div className="flex flex-col gap-0.5 flex-1">
          <div className="flex flex-wrap items-start justify-between">
            <Link
              href={`/product/${item?.productVariation?.product_id}`}
              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
            >
              {item.productVariation?.product?.product_name}
            </Link>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-yellow-600">
                <span className="text-black mr-0.5">{symbol}</span>
                {price}
              </p>
            </div>
          </div>

          <div className="py-0.5">
            {item.productVariation?.variation_name
              .split(",")
              .map((item, index, array) => {
                return (
                  <span
                    key={index}
                    className={`size-sm text-secondary-100 pr-[6px] 
                 ${index !== array.length - 1 && "border-r"}
                border-blueGray-300 text-sm`}
                  >
                    {item}
                  </span>
                );
              })}
          </div>
          <p className="size-sm text-secondary-100  text-sm">
            Seller:{" "}
            {item.productVariation?.product?.user?.firstName +
              " " +
              item.productVariation?.product?.user?.lastName}
          </p>

          <div className="sm:flex hidden w-full flex-1 items-start justify-between">
            <div className="flex items-center justify-between">
              {isCart ? (
                <Quantity cartItem={item} />
              ) : (
                <p className="size-sm text-secondary-100  text-sm">
                  Quantity: {item.quantity}
                </p>
              )}
            </div>
            {isCart && (
              <div className="flex items-center gap-4">
                <span className="pr-3 border-r">
                  <AddToWishlist
                    icon
                    product_id={item.productVariation?.product?.product_id}
                  />
                </span>
                <RemoveCartItem variant="cart" cartItem={item} />
              </div>
            )}
          </div>
        </div>
      </div>{" "}
      <div className="flex mt-[5px] flex-1 w-full flex-wrap sm:hidden items-center sm:items-start justify-between">
        <div className="flex items-center justify-between">
          {isCart ? (
            <Quantity cartItem={item} />
          ) : (
            <p className="size-sm text-secondary-100  text-sm">
              Quantity: {item.quantity}
            </p>
          )}
        </div>
        {isCart && (
          <div className="flex items-center gap-4">
            <span className="pr-3 border-r">
              <AddToWishlist
                icon
                product_id={item.productVariation?.product?.product_id}
              />
            </span>
            <RemoveCartItem variant="cart" cartItem={item} />
          </div>
        )}
      </div>
    </div>
  );
}
