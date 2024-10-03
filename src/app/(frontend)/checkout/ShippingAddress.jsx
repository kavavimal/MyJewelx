"use client";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";

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
          <strong>
            {shippingAddress?.firstName} {shippingAddress?.lastName}
          </strong>
          <p>
            {[shippingAddress?.street, shippingAddress?.address_2].join(", ")}
          </p>
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
              <div className="border p-5 grid grid-cols-2 items-start gap-5">
                <div>
                  <Input
                    label="First Name"
                    size="lg"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstName}
                  />
                  {props.errors.firstName && props.touched.firstName && (
                    <p className="text-red-400">{props?.errors?.firstName}</p>
                  )}
                </div>

                <div>
                  <Input
                    size="lg"
                    label="Last Name"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.errors.lastName && props.touched.lastName && (
                    <p className="text-red-400">{props?.errors?.lastName}</p>
                  )}
                </div>
                <div>
                  <Input
                    size="lg"
                    label="Email"
                    type="email"
                    id="email"
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
                <div>
                  <Input
                    size="lg"
                    label="Phone"
                    type="text"
                    id="phone-input"
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
                <div className="col-span-2">
                  <Textarea
                    label="Street"
                    id="street-input"
                    placeholder="street"
                    name="street"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.street}
                  />
                  {props.errors.street && props.touched.street && (
                    <p className="text-red-400">{props?.errors?.street}</p>
                  )}
                </div>
                <div>
                  <Select
                    size="lg"
                    label="Country"
                    id="select-country-input-3"
                    name="country"
                    onChange={(value) => props.setFieldValue("country", value)}
                    onBlur={props.handleBlur}
                    value={props.values.country ?? ""}
                  >
                    <Option value="US">United States</Option>
                    <Option value="AS">Australia</Option>
                    <Option value="FR">France</Option>
                    <Option value="ES">Spain</Option>
                    <Option value="UK">United Kingdom</Option>
                  </Select>
                  {props.errors.country && props.touched.country && (
                    <p className="text-red-400">{props?.errors?.country}</p>
                  )}
                </div>

                <div>
                  <Select
                    size="lg"
                    label="City"
                    id="select-city-input-3"
                    name="city"
                    onChange={(value) => props.setFieldValue("city", value)}
                    onBlur={props.handleBlur}
                    value={props.values.city ?? ""}
                  >
                    <Option selected>San Francisco</Option>
                    <Option value="NY">New York</Option>
                    <Option value="LA">Los Angeles</Option>
                    <Option value="CH">Chicago</Option>
                    <Option value="HU">Houston</Option>
                  </Select>
                  {props.errors.city && props.touched.city && (
                    <p className="text-red-400">{props?.errors?.city}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center">
                    <Input
                      label="Zip Code"
                      type="text"
                      id="zipCode-input"
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
                  <div className="w-full mt-5">
                    <Button variant="outlined" type="submit">
                      Save
                    </Button>
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
