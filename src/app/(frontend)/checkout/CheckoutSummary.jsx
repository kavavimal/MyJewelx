"use client";
import { printPrice } from "@/utils/helper";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import React from "react";
import ButtonComponent from "@/components/frontend/ButtonComponent";
import { useChekcoutStore } from "@/contexts/checkoutStore";
import SubscribeComponent from "./Stripe";
import Paypal from "./Paypal";
import { post } from "@/utils/api";

export default function CheckoutSummary({ cart, user, showCoupon = false }) {
  const { cartItems } = cart;
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const { shippingAddress, paymentMethod, errors, setErrors } =
    useChekcoutStore((state) => state);

  const handlePlaceOrder = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      return;
    }

    // validate fields
    let flag = true;
    let errorsN = { ...errors };
    if (!shippingAddress) {
      errorsN = { ...errorsN, shipping: "Shipping Address is required" };
      flag = false;
    } else {
      errorsN = { ...errorsN, shipping: "" };
    }
    if (!paymentMethod) {
      errorsN = { ...errorsN, payment: "Payment Method is required" };
      flag = false;
    } else {
      errorsN = { ...errorsN, payment: "" };
    }
    setErrors(errorsN);
    if (!flag) {
      return;
    }

    const response = await post(`/api/checkout`, {
      userId: session.user.id,
      shippingAddress: JSON.stringify(shippingAddress),
      // billingAddress: JSON.stringify(billingAddress),
      paymentMethod,
    });

    if (response.data && response.data.order && response.data.order.id) {
      router.push("/order-details/" + response.data.order.id);
      // Handle successful order placement (e.g., navigate to order confirmation page)
    } else {
      console.error("Error placing order:", data);
      // Handle error
    }
  };

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
        {paymentMethod === "cod" && (
          <ButtonComponent
            onClick={handlePlaceOrder}
            className="block w-full border-top text-center text-[#F0AE11] bg-white border py-2 px-4 border-[#F0AE11] focus:outline-none hover:bg-yellow-600 hover:text-white rounded"
          >
            Place Order
          </ButtonComponent>
        )}
        {paymentMethod === "paypal" && (
          <Paypal cart={cart} amount={totalAmount} user={user} handlePlaceOrder={handlePlaceOrder} />
        )}
        {paymentMethod === "stripe" && (
          <SubscribeComponent
            price={totalAmount}
            cart={cart}
            description="pay with stripe"
            handlePlaceOrder={handlePlaceOrder}
          />
        )}
      </div>
    </div>
  );
}
