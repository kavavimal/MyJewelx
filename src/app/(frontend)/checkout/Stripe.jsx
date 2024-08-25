"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCard from "./StripeCard";

const SubscribeComponent = ({
  cart,
  validatePlaceOrder,
  checkoutData,
  price,
  description,
  handlePlaceOrder,
}) => {
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

  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeCard handlePlaceOrder={handlePlaceOrder} items={items} />
      </Elements>
    </div>
  );
};
export default SubscribeComponent;
