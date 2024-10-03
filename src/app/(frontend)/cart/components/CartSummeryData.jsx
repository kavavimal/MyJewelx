"use client";
import React, { useState } from "react";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import Link from "next/link";
import { printPrice } from "@/utils/helper";
import CartSummary from "../../components/CartSummary";

const CartSummaryData = ({ cart, isCheckout = false, showCoupon = false }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { cartItems } = cart;

  let totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  let totalVat = 0;

  cartItems.forEach((items) => {
    if (items?.productVariation?.other_charges) {
      const other_charges = JSON.parse(items?.productVariation?.other_charges);
      const vat = other_charges.find((item) => item.charge_type === "vat/tax");
      if (vat) {
        totalVat += Number(vat?.tax || 0) * Number(items?.quantity || 0);
      }
    }
  });

  let totalShippingCharge = 0;
  cartItems.forEach((items) => {
    totalShippingCharge += Number(items?.productVariation?.shipping_charge);
    //  * Number(items?.quantity || 0);
  });

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div>
      <div className="sm:flex hidden">
        <CartSummary cart={cart} />
      </div>
      <div className="block sm:hidden">
        <Drawer
          placement="bottom"
          open={true}
          onClose={() => {}}
          className={`fixed bottom-0 overflow-auto z-[99] w-full bg-white rounded-t-[40px] shadow-2xl shadow-gray-600 ${
            isAccordionOpen ? "!max-h-[285px]" : "!max-h-[140px]"
          }`}
          overlayProps={{
            backdropBlur: false,
            className:
              "bg-transparent bg-opacity-100 backdrop-blur-none pointer-events-none",
          }}
        >
          <div className="flex-1 flex flex-col gap-5">
            <div className="space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 bg-white p-3">
                <div
                  className="flex items-center border-b border-blueGray-300 justify-between cursor-pointer"
                  onClick={toggleAccordion}
                >
                  <h3 className="my-2 pb-2  text-2xl">Order summary</h3>
                  <IconButton
                    variant="text"
                    ripple={false}
                    size="sm"
                    className="text-gray-600 active:bg-transparent focus:bg-transparent hover:bg-transparent"
                  >
                    {isAccordionOpen ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.93947 7.99997L0.718971 1.78097C0.649239 1.71124 0.593925 1.62846 0.556186 1.53735C0.518447 1.44624 0.499023 1.34859 0.499023 1.24997C0.499023 1.15135 0.518447 1.0537 0.556186 0.962596C0.593925 0.871487 0.649239 0.788703 0.718971 0.718971C0.788703 0.649239 0.871487 0.593925 0.962596 0.556186C1.0537 0.518447 1.15135 0.499023 1.24997 0.499023C1.34859 0.499023 1.44624 0.518447 1.53735 0.556186C1.62846 0.593925 1.71124 0.649239 1.78097 0.718971L7.99997 6.93947L14.219 0.718971C14.3598 0.578141 14.5508 0.499023 14.75 0.499023C14.9491 0.499023 15.1401 0.578141 15.281 0.718971C15.4218 0.859801 15.5009 1.05081 15.5009 1.24997C15.5009 1.44913 15.4218 1.64014 15.281 1.78097L9.06047 7.99997L15.281 14.219C15.4218 14.3598 15.5009 14.5508 15.5009 14.75C15.5009 14.9491 15.4218 15.1401 15.281 15.281C15.1401 15.4218 14.9491 15.5009 14.75 15.5009C14.5508 15.5009 14.3598 15.4218 14.219 15.281L7.99997 9.06047L1.78097 15.281C1.64014 15.4218 1.44913 15.5009 1.24997 15.5009C1.05081 15.5009 0.859801 15.4218 0.718971 15.281C0.578141 15.1401 0.499023 14.9491 0.499023 14.75C0.499023 14.5508 0.578141 14.3598 0.718971 14.219L6.93947 7.99997Z"
                          fill="#010101"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.29318 0.293031C6.48071 0.10556 6.73502 0.000244141 7.00018 0.000244141C7.26534 0.000244141 7.51965 0.10556 7.70718 0.293031L13.3642 5.95003C13.5463 6.13863 13.6471 6.39124 13.6449 6.65343C13.6426 6.91563 13.5374 7.16644 13.352 7.35185C13.1666 7.53726 12.9158 7.64243 12.6536 7.6447C12.3914 7.64698 12.1388 7.54619 11.9502 7.36403L7.00018 2.41403L2.05018 7.36403C1.86158 7.54619 1.60898 7.64698 1.34678 7.6447C1.08458 7.64243 0.83377 7.53726 0.648362 7.35185C0.462954 7.16644 0.357785 6.91563 0.355507 6.65343C0.353228 6.39124 0.454022 6.13863 0.636181 5.95003L6.29318 0.293031Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                    )}
                  </IconButton>
                </div>
                {isAccordionOpen && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-900">
                          Cost Type
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          Amount {CURRENCY_SYMBOL}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Price ({cartItems.length} Product Selected)
                        </dt>
                        <dd className="text-base font-medium text-gray-500">
                          {printPrice(
                            totalAmount - totalVat - totalShippingCharge
                          )}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Shipping Charge
                        </dt>
                        <dd className="text-base font-medium text-gray-500">
                          {printPrice(totalShippingCharge)}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Subtotal
                        </dt>
                        <dd className="text-base font-medium text-gray-500">
                          {printPrice(totalAmount - totalVat)}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          VAT 5%
                        </dt>
                        <dd className="text-base font-medium text-gray-500">
                          {printPrice(totalVat)}
                        </dd>
                      </dl>
                      {showCoupon === true && (
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500">
                            Coupon discount
                          </dt>
                          <dd className="text-base font-medium text-gray-500">
                            -0.00
                          </dd>
                        </dl>
                      )}
                      <dl className="flex items-center justify-between gap-4 border-b border-gray-200 pb-2">
                        <dt className="text-base font-bold text-gray-900">
                          Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900">
                          {printPrice(totalAmount)}
                        </dd>
                      </dl>{" "}
                    </div>
                  </div>
                )}
                {showCoupon === true && (
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      placeholder="coupon code"
                      className="border"
                    />
                    <button className="block w-full border-top text-center text-[#F0AE11] bg-white border-l-0 py-2 px-4 border-[#F0AE11] focus:outline-none hover:bg-yellow-600 hover:text-white rounded">
                      Apply
                    </button>
                  </div>
                )}
                {isCheckout === true ? (
                  <Button fullWidth>Place Order</Button>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="w-1/2">{printPrice(totalAmount)}</div>
                    <Link
                      href="/checkout"
                      data-ripple-light="true"
                      className="block w-1/2 middle none rounded bg-primary-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-200/10 transition-all hover:shadow-lg hover:primary-200/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Continue
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default CartSummaryData;
