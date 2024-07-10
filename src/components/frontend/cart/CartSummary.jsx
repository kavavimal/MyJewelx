import { printPrice } from "@/actions/cart";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import ButtonComponent from "../ButtonComponent";

export default function CartSummary({
  cart,
  isCheckout = false,
  showCoupon = false,
}) {
  const { cartItems } = cart;
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <div className="mx-auto max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border">
      <div className="space-y-4 bg-white p-3">
        <h3 className="my-2 pb-2 border-b border-gray-400 text-2xl">
          Order summary
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-900">Cost Type</dt>
              <dd className="text-base font-medium text-gray-900">
                Amount {CURRENCY_SYMBOL}
              </dd>
            </dl>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Price ({cartItems.length} Product Selected)
              </dt>
              <dd className="text-base font-medium text-gray-500">
                {printPrice(totalAmount)}
              </dd>
            </dl>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">VAT 5%</dt>
              <dd className="text-base font-medium text-gray-500">
                {totalAmount > 0 ? printPrice((totalAmount * 5) / 100) : 0}
              </dd>
            </dl>
            {showCoupon === true && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Coupon discount
                </dt>
                <dd className="text-base font-medium text-gray-500">-0.00</dd>
              </dl>
            )}
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-base font-bold text-gray-900">Sub Total</dt>
            <dd className="text-base font-bold text-gray-900">
              {printPrice(totalAmount)}
            </dd>
          </dl>
        </div>
        {showCoupon === true && (
          <div className="flex items-center justify-start">
            <input type="text" placeholder="coupon code " className="border" />
            <ButtonComponent>Applay</ButtonComponent>
          </div>
        )}
        {isCheckout === true ? (
          <ButtonComponent className="block w-full border-top text-center text-[#F0AE11] bg-white border py-2 px-4 border-[#F0AE11] focus:outline-none hover:bg-yellow-600 hover:text-white rounded">
            Place Order
          </ButtonComponent>
        ) : (
          <Link
            href="/checkout"
            className="block text-center text-[#F0AE11] bg-white border py-2 px-4 border-[#F0AE11] focus:outline-none hover:bg-yellow-600 hover:text-white rounded"
          >
            Continue
          </Link>
        )}
      </div>
    </div>
  );
}
