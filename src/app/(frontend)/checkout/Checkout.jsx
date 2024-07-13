"use client";
import { useCartStore } from "@/contexts/cartStore";
import { useChekcoutStore } from "@/contexts/checkoutStore";
import { post } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShippingAddress from "./ShippingAddress";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

export default function Checkout({ user }) {
  const router = useRouter();
  const { data: session } = useSession();

  const { paymentMethod, errors } = useChekcoutStore((state) => state);
  const setShippingAddress = useChekcoutStore(
    (state) => state.setShippingAddress
  );
  const setPaymentMethod = useChekcoutStore((state) => state.setPaymentMethod);
  const [shippingAddress, updateShippingAddress] = useState("");
  const handlePaymentMethodChange = (newVal) => {
    console.log("update payment", newVal);
    setPaymentMethod(newVal);
  };

  useEffect(() => {
    setShippingAddress(shippingAddress);
  }, [shippingAddress]);

  return (
    <div className="mb-5">
      <div className="">
        <ShippingAddress
          updateShippingAddress={updateShippingAddress}
          shippingAddress={shippingAddress}
        />
        {errors && errors.shipping && errors.shipping !== "" && (
          <p className="text-red-400">{errors.shipping}</p>
        )}
      </div>
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="space-y-4 border p-4">
          <Accordion open={paymentMethod === "cod"}>
            <AccordionHeader className="p-0 border">
              <label className="flex items-center space-x-3 p-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => {
                    console.log("e change", e.target.checked);
                    e.target.checked
                      ? handlePaymentMethodChange(e.target.value)
                      : "";
                  }}
                />
                <span className="text-gray-700">Cash On Delivery</span>
              </label>
            </AccordionHeader>
            <AccordionBody>Pay Cash or delivery</AccordionBody>
          </Accordion>
          <Accordion open={paymentMethod === "stripe"}>
            <AccordionHeader className="p-0 border">
              <label className="flex items-center space-x-3 p-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => {
                    console.log("e change", e.target.checked);

                    e.target.checked
                      ? handlePaymentMethodChange(e.target.value)
                      : "";
                  }}
                />
                <span className="text-gray-700">Stripe</span>
              </label>
            </AccordionHeader>
            <AccordionBody>
              Pay securely using your Visa, MasterCard, Discover, and American
              Express credit or debit cards. Our secure payment gateway ensures
              your personal and financial information is protected, allowing you
              to shop with confidence.
            </AccordionBody>
          </Accordion>
          <Accordion open={paymentMethod === "paypal"}>
            <AccordionHeader className="p-0 border">
              <label className="flex items-center space-x-3 p-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => {
                    console.log("e change", e.target.value);

                    e.target.checked
                      ? handlePaymentMethodChange(e.target.value)
                      : "";
                  }}
                />
                <span className="text-gray-700">PayPal</span>
              </label>
            </AccordionHeader>
            <AccordionBody>
              Pay securely using your Visa, MasterCard, Discover, and American
              Express credit or debit cards. Our secure payment gateway ensures
              your personal and financial information is protected, allowing you
              to shop with confidence.
            </AccordionBody>
          </Accordion>

          {errors && errors.payment && errors.payment !== "" && (
            <p className="text-red-400">{errors.payment}</p>
          )}
        </div>
      </div>
    </div>
  );
}
