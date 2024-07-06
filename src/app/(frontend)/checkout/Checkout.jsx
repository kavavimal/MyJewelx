"use client";
import { useCartStore } from "@/contexts/cartStore";
import { useChekcoutStore } from "@/contexts/checkoutStore";
import { post } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import ButtonComponent from "@/components/frontend/ButtonComponent";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cartItems, fetchCart } = useCartStore();
  const totalAmount = useCartStore((state) => state.totalAmount());

  const { setShippingAddress, setBillingAddress, setPaymentMethod } =
    useChekcoutStore((state) => state);
  const [shippingAddress, updateShippingAddress] = useState("");
  const [billingAddress, updateBillingAddress] = useState("");
  const [paymentMethod, updatePaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  const handlePlaceOrder = async () => {
    if (!session) {
      // Redirect to login if not authenticated
      return;
    }

    // validate fields
    let flag = true;
    let errorsN = { ...errors };
    if (!billingAddress) {
      errorsN = { ...errorsN, billing: "Billing Address is required" };
      flag = false;
    } else {
      errorsN = { ...errorsN, billing: "" };
    }
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

    setShippingAddress(shippingAddress);
    setBillingAddress(billingAddress);
    setPaymentMethod(paymentMethod);

    const response = await post(`/api/checkout`, {
      userId: session.user.id,
      shippingAddress: JSON.stringify(shippingAddress),
      billingAddress: JSON.stringify(billingAddress),
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
    <div className="mb-5">
      <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Checkout
      </h2>
      {/* <h2>Shipping Address</h2>
      <input
        type="text"
        value={shippingAddress}
        onChange={(e) => updateShippingAddress(e.target.value)}
      /> */}
      <div className="flex items-start justify-between space-x-2 space-y-2">
        <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
          <BillingAddress
            updateBillingAddress={updateBillingAddress}
            billingAddress={billingAddress}
          />
          {errors && errors.billing && errors.billing !== "" && (
            <p className="text-red-400">{errors.billing}</p>
          )}
        </div>
        <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
          <ShippingAddress
            updateShippingAddress={updateShippingAddress}
            shippingAddress={shippingAddress}
          />
          {errors && errors.shipping && errors.shipping !== "" && (
            <p className="text-red-400">{errors.shipping}</p>
          )}
        </div>
        {/* <input
        type="text"
        value={billingAddress}
        onChange={(e) => updateBillingAddress(e.target.value)}
      /> */}
      </div>
      <div className=" bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              className="form-radio h-5 w-5 text-blue-600"
              onChange={(e) => {
                e.target.checked ? updatePaymentMethod(e.target.value) : "";
              }}
            />
            <span className="text-gray-700">Credit Card</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              className="form-radio h-5 w-5 text-blue-600"
              onChange={(e) => {
                e.target.checked ? updatePaymentMethod(e.target.value) : "";
              }}
            />
            <span className="text-gray-700">PayPal</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              className="form-radio h-5 w-5 text-blue-600"
              onChange={(e) => {
                e.target.checked ? updatePaymentMethod(e.target.value) : "";
              }}
            />
            <span className="text-gray-700">Bank Transfer</span>
          </label>

          {errors && errors.payment && errors.payment !== "" && (
            <p className="text-red-400">{errors.payment}</p>
          )}
        </div>
      </div>
      {/* <input
        type="text"
        value={paymentMethod}
        onChange={(e) => updatePaymentMethod(e.target.value)}
      /> */}

      <div className=" bg-white shadow-lg rounded-lg mt-3 p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.cartItem_id}>
            <p>
              {item.productVariation?.product?.product_name} - ${item.price}
            </p>
          </div>
        ))}
        <h3>Total: ${totalAmount}</h3>
        <ButtonComponent onClick={handlePlaceOrder}>
          Place Order
        </ButtonComponent>
      </div>
    </div>
  );
}
