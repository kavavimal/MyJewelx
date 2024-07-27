"use client";
import { post } from "@/utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const SubscribeComponent = ({
  cart,
  validatePlaceOrder,
  checkoutData,
  price,
  description,
  handlePlaceOrder,
}) => {
  const [loading, setLoading] = useState(false);
  const items = cart.cartItems.map((item) => {
    return {
      name: item.productVariation?.product?.product_name,
      description: item.productVariation?.product?.product_name,
      image: item.productVariation?.image && item.productVariation?.image?.[0] ? item.productVariation?.image?.[0]?.path : false,
      quantity: item.quantity,
      price: item.price,
    };
  });
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    if (validatePlaceOrder()) {
      setLoading(true);
      const stripe = await stripePromise;
      const checkoutSession = await post("/api/stripe/checkout", {
        items: JSON.stringify(items),
        ...checkoutData
      });
      console.log("checkoutSession", checkoutSession);
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
      if (result.error) {
        alert(result.error.message);
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        disabled={loading}
        onClick={createCheckOutSession}
        className="bg-yellow-500 hover:bg-yellow-600  block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-yellow-100"
      >
        {loading ? "Processing..." : "Process to Payment"}
      </button>
    </div>
  );
};
export default SubscribeComponent;
