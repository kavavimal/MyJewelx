"use client";
import { useChekcoutStore } from "@/contexts/checkoutStore";
import { post } from "@/utils/api";
import { useEffect, useState } from "react";
import ShippingAddress from "./ShippingAddress";

import { showToast } from "@/utils/helper";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Checkbox,
} from "@material-tailwind/react";
import { AddressType } from "@prisma/client";

export default function Checkout({ user, addresses }) {
  const { paymentMethod, errors } = useChekcoutStore((state) => state);
  const setShippingAddress = useChekcoutStore(
    (state) => state.setShippingAddress
  );
  const setPaymentMethod = useChekcoutStore((state) => state.setPaymentMethod);
  const [shippingAddress, updateShippingAddress] = useState(addresses || "");
  const handlePaymentMethodChange = (newVal) => {
    console.log("update payment", newVal);
    setPaymentMethod(newVal);
  };

  const saveShippingAddressToUser = async (address) => {
    const addressRes = await post("/api/addresses/add", {
      type: AddressType.SHIPPING,
      firstName: address.firstName ? address.firstName : " ",
      lastName: address.lastName ? address.lastName : " ",
      street: address.street ? address.street : " ",
      city: address.city ? address.city : " ",
      state: address.state ? address.state : " ",
      zipCode: address.zipCode ? address.zipCode : " ",
      country: address.country ? address.country : " ",
      phone: address.phone ? address.phone : " ",
      email: address.email ? address.email : " ",
    });
    updateShippingAddress(addressRes.data?.address);
    showToast({ message: "Address Saved created successfully" });
  };

  useEffect(() => {
    setShippingAddress(shippingAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddress]);

  return (
    <div className="mb-5">
      <div className="">
        <ShippingAddress
          updateShippingAddress={saveShippingAddressToUser}
          shippingAddress={shippingAddress}
        />
        {errors && errors.shipping && errors.shipping !== "" && (
          <p className="text-red-400">{errors.shipping}</p>
        )}
      </div>
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="space-y-4 border border-blueGray-300 p-4">
          <Accordion
            open={paymentMethod === "cod"}
            onClick={() => {
              handlePaymentMethodChange("cod");
            }}
            className={`mb-2 rounded border border-blueGray-300 px-[15px] pt-[13px] pb-[13px] ${
              paymentMethod === "cod" ? "bg-[#FFFCF5]" : "bg-white"
            }`}
          >
            <AccordionHeader className="border-b-0 p-0">
              {/* <label className="flex items-center space-x-3 p-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  className="form-radio h-5 w-5 accent-primary-200 outline-offset-0"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => {
                    console.log("e change", e.target.checked);
                    e.target.checked
                      ? handlePaymentMethodChange(e.target.value)
                      : "";
                  }}
                />
                <span
                  className={`${
                    paymentMethod === "cod"
                      ? "text-primary-200"
                      : "text-blueGray-500"
                  } text-sm`}
                >
                  Cash On Delivery
                </span>
              </label> */}

              <Checkbox
                value={"cod"}
                checked={paymentMethod === "cod"}
                onChange={(e) => {
                  console.log("e change", e.target.checked);
                  e.target.checked
                    ? handlePaymentMethodChange(e.target.value)
                    : "";
                }}
                className="rounded-full"
                label="Cash On Delivery"
                labelProps={{
                  className: "text-sm",
                }}
              />
            </AccordionHeader>
            <AccordionBody
              className={`border-t border-blueGray-400 ${
                paymentMethod === "cod" ? "bg-[#FFFCF5]" : "bg-white"
              } mt-[9px]`}
            >
              Pay Cash or delivery
            </AccordionBody>
          </Accordion>
          <Accordion
            open={paymentMethod === "stripe"}
            onClick={() => handlePaymentMethodChange("stripe")}
            className={`mb-2 rounded border border-blueGray-300 px-[15px] pt-[13px] pb-[13px] ${
              paymentMethod === "stripe" ? "bg-[#FFFCF5]" : "bg-white"
            }`}
          >
            <AccordionHeader className="border-b-0 p-0">
              <Checkbox
                value={"stripe"}
                checked={paymentMethod === "stripe"}
                onChange={(e) => {
                  console.log("e change", e.target.checked);

                  e.target.checked
                    ? handlePaymentMethodChange(e.target.value)
                    : "";
                }}
                className="rounded-full"
                label="Stripe"
                labelProps={{
                  className: "text-sm",
                }}
              />
              {/* <label className="flex items-center space-x-3 p-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  className="form-radio h-5 w-5 accent-primary-200 outline-offset-0"
                  
                />
                <span
                  className={`${
                    paymentMethod === "stripe"
                      ? "text-primary-200"
                      : "text-blueGray-500"
                  } text-sm`}
                >
                  Stripe
                </span>
              </label> */}
            </AccordionHeader>
            <AccordionBody
              className={`border-t border-blueGray-400 ${
                paymentMethod === "stripe" ? "bg-[#FFFCF5]" : "bg-white"
              } mt-[9px]`}
            >
              Pay securely using your Visa, MasterCard, Discover, and American
              Express credit or debit cards. Our secure payment gateway ensures
              your personal and financial information is protected, allowing you
              to shop with confidence.
            </AccordionBody>
          </Accordion>
          <Accordion
            open={paymentMethod === "paypal"}
            onClick={() => handlePaymentMethodChange("paypal")}
            className={`mb-2 rounded border border-blueGray-300 px-[15px] pt-[13px] pb-[13px] ${
              paymentMethod === "paypal" ? "bg-[#FFFCF5]" : "bg-white"
            }`}
          >
            <AccordionHeader className="border-b-0 p-0">
              <Checkbox
                value={"paypal"}
                checked={paymentMethod === "paypal"}
                onChange={(e) => {
                  console.log("e change", e.target.value);

                  e.target.checked
                    ? handlePaymentMethodChange(e.target.value)
                    : "";
                }}
                className="rounded-full"
                label="Paypal"
                labelProps={{
                  className: "text-sm",
                }}
              />
              {/* <label className="flex items-center space-x-3 p-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  className="form-radio h-5 w-5 accent-primary-200 outline-offset-0"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => {
                    console.log("e change", e.target.value);

                    e.target.checked
                      ? handlePaymentMethodChange(e.target.value)
                      : "";
                  }}
                />
                <span
                  className={`${
                    paymentMethod === "paypal"
                      ? "text-primary-200"
                      : "text-blueGray-500"
                  } text-sm`}
                >
                  PayPal
                </span>
              </label> */}
            </AccordionHeader>
            <AccordionBody
              className={`border-t border-blueGray-400 ${
                paymentMethod === "paypal" ? "bg-[#FFFCF5]" : "bg-white"
              } mt-[9px]`}
            >
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
