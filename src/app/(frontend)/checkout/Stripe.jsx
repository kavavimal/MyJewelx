"use client";
import { post } from "@/utils/api";
import { Button } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import StripeCard from "./StripeCard";
import {Elements} from '@stripe/react-stripe-js';

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
      image:
        item.productVariation?.image && item.productVariation?.image?.[0]
          ? item.productVariation?.image?.[0]?.path
          : false,
      quantity: item.quantity,
      price: parseFloat(item.price) * item.quantity,
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
        ...checkoutData,
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
      {/* <Button disabled={loading} onClick={createCheckOutSession} fullWidth>
        {loading ? "Processing..." : "Process to Payment"}
      </Button> */}
      <Elements stripe={stripePromise}>
        <StripeCard handlePlaceOrder={handlePlaceOrder} items={items} />
        </Elements>
    </div>
  );
};
export default SubscribeComponent;
