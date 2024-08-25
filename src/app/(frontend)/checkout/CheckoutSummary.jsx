"use client";
import { printPrice } from "@/utils/helper";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import React, { useState } from "react";
import ButtonComponent from "@/components/frontend/ButtonComponent";
import { useChekcoutStore } from "@/contexts/checkoutStore";
import SubscribeComponent from "./Stripe";
import Paypal from "./Paypal";
import { post } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/contexts/cartStore";
import LoadingDots from "@/components/loading-dots";

export default function CheckoutSummary({ cart, user, showCoupon = false }) {
  const router = useRouter();
  const { cartItems } = cart;
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const { shippingAddress, paymentMethod, errors } = useChekcoutStore(
    (state) => state
  );
  const emptyCart = useCartStore((state) => state.emptyStore);
  const setErrors = useChekcoutStore((state) => state.setError);
  const [loading, setLoading] = useState(false);

  const validatePlaceOrder = () => {
    // validate fields
    let flag = true;
    if (!user) {
      flag = false;
    }
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
    return flag;
  };

  const handlePlaceOrder = async (responseData = null) => {
    if (!user) {
      // Redirect to login if not authenticated
      return;
    }
    if (!validatePlaceOrder()) {
      return;
    }
    setLoading(true);
    const response = await post(`/api/checkout`, {
      userId: user.id,
      shippingAddress: JSON.stringify(shippingAddress),
      // billingAddress: JSON.stringify(billingAddress),
      paymentMethod,
      paymentResponse: responseData !== null ? responseData : "",
    });

    if (response.data && response.data.order && response.data.order.id) {
      emptyCart();
      router.push("/order-details/" + response.data.order.id);
      setLoading(false);
      // Handle successful order placement (e.g., navigate to order confirmation page)
    } else {
      setLoading(false);
      console.error("Error placing order:", data);
      // Handle error
    }
  };

  return (
    <div className="mx-auto max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border border-blueGray-300">
      <div className="space-y-4 bg-white p-3">
        <h3 className="my-2 pb-2 border-b border-blueGray-300 text-2xl">
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

          <dl className="flex items-center justify-between gap-4 border-t border-blueGray-300 pt-2">
            <dt className="text-base font-bold text-gray-900">Sub Total</dt>
            <dd className="text-base font-bold text-gray-900">
              {printPrice(totalAmount)}
            </dd>
          </dl>
        </div>
        {showCoupon === true && (
          <div className="flex items-center gap-[15px] py-2.5 border-t border-b border-blueGray-300">
            <input
              type="text"
              placeholder="coupon code "
              className="border h-full py-1 placeholder:ps-[15px] rounded w-[220px] border-blueGray-300"
            />
            <button
              data-ripple-dark="true"
              className="flex-1 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2.5 px-6 rounded border border-primary-200 text-primary-200 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
            >
              Apply
            </button>
          </div>
        )}
        {paymentMethod === "cod" && (
          <ButtonComponent onClick={() => handlePlaceOrder(JSON.stringify({paymentMethod: 'cod'}))}>
            {/* {loading && <LoadingDots />} */}
            Place Order
          </ButtonComponent>
        )}
        {paymentMethod === "paypal" && (
          <Paypal
            cart={cart}
            amount={totalAmount}
            user={user}
            handlePlaceOrder={handlePlaceOrder}
          />
        )}
        {paymentMethod === "stripe" && (
          <SubscribeComponent
            price={totalAmount}
            validatePlaceOrder={validatePlaceOrder}
            checkoutData={{
              userId: user.id,
              shippingAddress: JSON.stringify(shippingAddress),
              // billingAddress: JSON.stringify(billingAddress),
              paymentMethod,
            }}
            cart={cart}
            description="pay with stripe"
            handlePlaceOrder={handlePlaceOrder}
          />
        )}
      </div>
    </div>
  );
}
