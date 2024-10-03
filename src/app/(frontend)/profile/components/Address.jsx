"use client";
import React from "react";
import { AddressType } from "@prisma/client";
import { post } from "@/utils/api";
import { shippingAddressValidationSchema } from "@/schemas/ValidationSchema";
import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useChekcoutStore } from "@/contexts/checkoutStore";
import { useState, useEffect } from "react";
function Address({ user, addresses }) {
  const router = useRouter();

  const [shippingAddress, updateShippingAddress] = useState(addresses || {});

  const setShippingAddress = useChekcoutStore(
    (state) => state.setShippingAddress
  );
  const [editAddress, setEditAddress] = useState(!shippingAddress);

  useEffect(() => {
    setShippingAddress(shippingAddress);
  }, [shippingAddress]);

  const initialValues = {
    type: AddressType.SHIPPING,
    firstName: addresses?.firstName || "",
    lastName: addresses?.lastName || "",
    street: addresses?.street || "",
    city: addresses?.city || "",
    state: addresses?.state || "",
    zipCode: addresses?.zipCode || "",
    country: addresses?.country || "",
    phone: addresses?.phone || "",
    email: addresses?.email || "",
  };
  return (
    <div className="bg-white p-7 mt-5 shadow-3xl rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Shipping Information
        </h2>
        {editAddress ? (
          <IconButton
            className="rounded-full"
            size="sm"
            variant="text"
            color="red"
            ripple={false}
            onClick={() => {
              setEditAddress(false);
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.93947 7.99997L0.718971 1.78097C0.649239 1.71124 0.593925 1.62846 0.556186 1.53735C0.518447 1.44624 0.499023 1.34859 0.499023 1.24997C0.499023 1.15135 0.518447 1.0537 0.556186 0.962596C0.593925 0.871487 0.649239 0.788703 0.718971 0.718971C0.788703 0.649239 0.871487 0.593925 0.962596 0.556186C1.0537 0.518447 1.15135 0.499023 1.24997 0.499023C1.34859 0.499023 1.44624 0.518447 1.53735 0.556186C1.62846 0.593925 1.71124 0.649239 1.78097 0.718971L7.99997 6.93947L14.219 0.718971C14.3598 0.578141 14.5508 0.499023 14.75 0.499023C14.9491 0.499023 15.1401 0.578141 15.281 0.718971C15.4218 0.859801 15.5009 1.05081 15.5009 1.24997C15.5009 1.44913 15.4218 1.64014 15.281 1.78097L9.06047 7.99997L15.281 14.219C15.4218 14.3598 15.5009 14.5508 15.5009 14.75C15.5009 14.9491 15.4218 15.1401 15.281 15.281C15.1401 15.4218 14.9491 15.5009 14.75 15.5009C14.5508 15.5009 14.3598 15.4218 14.219 15.281L7.99997 9.06047L1.78097 15.281C1.64014 15.4218 1.44913 15.5009 1.24997 15.5009C1.05081 15.5009 0.859801 15.4218 0.718971 15.281C0.578141 15.1401 0.499023 14.9491 0.499023 14.75C0.499023 14.5508 0.578141 14.3598 0.718971 14.219L6.93947 7.99997Z"
                fill="currentColor"
              />
            </svg>
          </IconButton>
        ) : (
          <IconButton
            className="rounded-full"
            size="sm"
            variant="text"
            ripple={false}
            onClick={() => setEditAddress(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
              ></path>
            </svg>
          </IconButton>
        )}
      </div>
      {!editAddress ? (
        <div className="py-4 relative">
          {/* <button
            className="absolute right-5 top-2"
            onClick={() => setEditAddress(true)}
          >
            Edit
          </button> */}
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
          initialValues={initialValues}
          validationSchema={shippingAddressValidationSchema}
          enableReinitialize={true}
          onSubmit={async (values) => {
            if (user) {
              try {
                const response = await post("/api/addresses/add", values);
                if (response.status === 200) {
                  enqueueSnackbar("User updated successfully", {
                    variant: "success",
                    preventDuplicate: true,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                    autoHideDuration: 3000,
                    style: {
                      background: "white",
                      color: "black",
                      borderRadius: ".5rem",
                      boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      padding: "0 4px",
                    },
                  });
                  router.refresh();
                  updateShippingAddress(values);
                  setEditAddress(false);
                }
              } catch (error) {
                enqueueSnackbar(error.message, {
                  variant: "error",
                  preventDuplicate: true,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  autoHideDuration: 3000,
                  style: {
                    background: "white",
                    color: "black",
                    borderRadius: ".5rem",
                    boxShadow:
                      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    padding: "0 4px",
                  },
                });
              }
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="pt-5 grid grid-cols-2 items-start gap-5">
                <div>
                  <Input
                    label="First Name"
                    size="lg"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstName}
                    error={props.errors.firstName && props.touched.firstName}
                  />
                  {props.errors.firstName && props.touched.firstName && (
                    <p className="text-red-400">{props.errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Input
                    size="lg"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastName}
                    error={props.errors.lastName && props.touched.lastName}
                  />
                  {props.errors.lastName && props.touched.lastName && (
                    <p className="text-red-400">{props.errors.lastName}</p>
                  )}
                </div>

                <div>
                  <Input
                    size="lg"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    error={props.errors.email && props.touched.email}
                  />
                  {props.errors.email && props.touched.email && (
                    <p className="text-red-400">{props.errors.email}</p>
                  )}
                </div>

                <div>
                  <Input
                    size="lg"
                    label="Phone"
                    type="text"
                    placeholder="123-456-7890"
                    name="phone"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.phone}
                    error={props.errors.phone && props.touched.phone}
                  />
                  {props.errors.phone && props.touched.phone && (
                    <p className="text-red-400">{props.errors.phone}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <Textarea
                    label="Street"
                    name="street"
                    placeholder="Street"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.street}
                    error={props.errors.street && props.touched.street}
                  />
                  {props.errors.street && props.touched.street && (
                    <p className="text-red-400">{props.errors.street}</p>
                  )}
                </div>

                <div>
                  <Select
                    size="lg"
                    label="Country"
                    name="country"
                    onChange={(value) => props.setFieldValue("country", value)}
                    value={props.values.country}
                    onBlur={props.handleBlur}
                  >
                    <Option value="US">United States</Option>
                    <Option value="AS">Australia</Option>
                    <Option value="FR">France</Option>
                    <Option value="ES">Spain</Option>
                    <Option value="UK">United Kingdom</Option>
                  </Select>
                  {props.errors.country && props.touched.country && (
                    <p className="text-red-400">{props.errors.country}</p>
                  )}
                </div>

                <div>
                  <Select
                    size="lg"
                    label="City"
                    name="city"
                    onChange={(value) => props.setFieldValue("city", value)}
                    value={props.values.city}
                    onBlur={props.handleBlur}
                  >
                    <Option value="SF">San Francisco</Option>
                    <Option value="NY">New York</Option>
                    <Option value="LA">Los Angeles</Option>
                    <Option value="CH">Chicago</Option>
                    <Option value="HU">Houston</Option>
                  </Select>
                  {props.errors.city && props.touched.city && (
                    <p className="text-red-400">{props.errors.city}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="Zip Code"
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.zipCode}
                    error={props.errors.zipCode && props.touched.zipCode}
                  />
                  {props.errors.zipCode && props.touched.zipCode && (
                    <p className="text-red-400">{props.errors.zipCode}</p>
                  )}
                </div>
              </div>
              <div className="w-full mt-5">
                <Button variant="outlined" type="submit">
                  Save
                </Button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default Address;
