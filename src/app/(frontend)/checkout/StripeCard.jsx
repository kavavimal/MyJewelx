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
      setLoading(false);
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
      setLoading(false);
      addMessage(stripeError.message);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    handlePlaceOrder(
      JSON.stringify({
        paymentIntent: response.data,
        paymentconfirm: paymentIntent,
        paidAmount: parseFloat(paymentIntent.amount) / 100,
      })
    );

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div
            role="status"
            className="flex flex-col items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-primary-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="mt-4 text-white text-center">
              Processing your payment... <br /> Please do not refresh the page.
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
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
