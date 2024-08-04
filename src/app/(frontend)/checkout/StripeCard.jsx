"use client";
import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import StatusMessages, { useMessages } from "./StatusMessages";
import { post } from "@/utils/api";

const StripeCard = ({ handlePlaceOrder, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [messages, addMessage] = useMessages();

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage("Stripe.js has not yet loaded.");
      return;
    }
    setLoading(true);
    const response = await post("/api/stripe/create-payment-intent", {
      paymentMethodType: "card",
      currency: "usd",
      items: JSON.stringify(items),
    });
    if (response?.data?.error && response?.data?.error?.message) {
      addMessage(response.data.error.message);
      return;
    }
    const { clientSecret, billingDetails } = response.data;

    addMessage("Client secret returned");

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        },
      });
    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      addMessage(stripeError.message);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    handlePlaceOrder(JSON.stringify({
      paymentIntent: response.data,
      paymentconfirm: paymentIntent,
      paidAmount: parseFloat(paymentIntent.amount) / 100,
    }));

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    setLoading(false);
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Pay with Stripe Card</label>
        <div className="my-2">
          <CardElement id="card" />
        </div>
        <Button disabled={loading} fullWidth type="submit">
          {loading ? "Loading..." : "Pay"}
        </Button>
      </form>
      <StatusMessages messages={messages} />
    </>
  );
};

export default StripeCard;
