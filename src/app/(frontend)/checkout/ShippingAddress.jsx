"use client";
import * as Yup from "yup";

import ButtonComponent from "@/components/frontend/ButtonComponent";
import { showToast } from "@/utils/helper";
import { Formik } from "formik";
import { useState } from "react";

const shippingAddressValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email().required("Email is required"),
  street: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required"),
});

export default function ShippingAddress({
  updateShippingAddress,
  shippingAddress,
}) {
  const [editAddress, setEditAddress] = useState(!shippingAddress);

  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Shipping Information
      </h2>

      {!editAddress ? (
        <div className="border-2 p-4 relative">
          <button
            className="absolute right-5 top-2"
            onClick={() => setEditAddress(true)}
          >
            Edit
          </button>
          <strong>{shippingAddress?.firstName} {shippingAddress?.lastName}</strong>
          <p>{[shippingAddress?.street, shippingAddress?.address_2].join(", ")}</p>
          <p>
            {[
              shippingAddress?.city,
              shippingAddress?.country,
              shippingAddress?.zipCode,
            ].join(", ")}
          </p>
          <p>{[shippingAddress?.phone, shippingAddress?.email].join(", ")}</p>
        </div>
      ) : (
        <Formik
          initialValues={shippingAddress !== "" ? shippingAddress : {}}
          validationSchema={shippingAddressValidationSchema}
          onSubmit={(values, actions) => {
            updateShippingAddress(values);
            setEditAddress(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="border p-2 flex flex-wrap items-center justify-start">
                <div className="w-1/2 p-4">
                  <label
                    for="firstName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="First Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstName}
                  />
                  {props.errors.firstName && props.touched.firstName && (
                    <p className="text-red-400">{props?.errors?.firstName}</p>
                  )}
                </div>

                <div className="w-1/2 p-4">
                  <label
                    for="lastName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Last Name"
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.errors.lastName && props.touched.lastName && (
                    <p className="text-red-400">{props?.errors?.lastName}</p>
                  )}
                </div>
                <div className="w-1/2 p-4">
                  <label
                    for="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="email"
                        id="email"
                        className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                        placeholder="Email"
                        name="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.errors.email && props.touched.email && (
                        <p className="text-red-400">{props?.errors?.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-4">
                  <label
                    for="phone-input-3"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number*{" "}
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="phone-input"
                        className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890"
                        name="phone"
                        value={props.values.phone}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.errors.phone && props.touched.phone && (
                        <p className="text-red-400">{props?.errors?.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full p-4">
                  <label
                    for="street-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address *
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <textarea
                        id="street-input"
                        className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                        placeholder="street"
                        name="street"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      >
                        {props.values.street}
                      </textarea>
                      {props.errors.street && props.touched.street && (
                        <p className="text-red-400">{props?.errors?.street}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <label
                      for="select-country-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Country*{" "}
                    </label>
                  </div>
                  <select
                    id="select-country-input-3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    name="country"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.country}
                  >
                    <option selected>Select</option>
                    <option value="US">United States</option>
                    <option value="AS">Australia</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                  {props.errors.country && props.touched.country && (
                    <p className="text-red-400">{props?.errors?.country}</p>
                  )}
                </div>

                <div className="w-1/2 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <label
                      for="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City*{" "}
                    </label>
                  </div>
                  <select
                    id="select-city-input-3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    name="city"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.city}
                  >
                    <option selected>San Francisco</option>
                    <option value="NY">New York</option>
                    <option value="LA">Los Angeles</option>
                    <option value="CH">Chicago</option>
                    <option value="HU">Houston</option>
                  </select>
                  {props.errors.city && props.touched.city && (
                    <p className="text-red-400">{props?.errors?.city}</p>
                  )}
                </div>

                <div className="w-1/2 p-4">
                  <label
                    for="zipCode-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Zipcode *
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="zipCode-input"
                        className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                        placeholder="zipCode"
                        name="zipCode"
                        value={props.values.zipCode}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.errors.zipCode && props.touched.zipCode && (
                        <p className="text-red-400">{props?.errors?.zipCode}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full mt-5">
                    <ButtonComponent type="submit">Save</ButtonComponent>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}
