"use client";

import ButtonComponent from "@/components/frontend/ButtonComponent";
import { useState } from "react";

export default function ShippingAddress({
  updateShippingAddress,
  shippingAddress,
}) {
  const [address, setAddress] = useState(shippingAddress);
  const [editAddress, setEditAddress] = useState(!shippingAddress);
  const saveAddress = () => {
    setEditAddress(false);
    updateShippingAddress(address);
  };

  const handleInputChange = (e) => {
    setAddress((val) => {
      return { ...val, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Shipping Information
      </h2>

      {!editAddress ? (
        <div className="border-2 rounded-lg p-4 m-2 relative">
          <button
            className="absolute right-5 top-2"
            onClick={() => setEditAddress(true)}
          >
            Edit
          </button>
          <strong>{address?.name}</strong>
          <p>{address.address}</p>
          <p>
            {address?.city}, {address?.country}, {address?.zipcode}
          </p>
          <p>
            {address?.phone}, {address?.email}
          </p>
        </div>
      ) : (
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
              required
              value={address.firstName}
              onChange={handleInputChange}
            />
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
              required
              value={address.lastName}
              onChange={handleInputChange}
            />
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
                  value={address.email}
                  onChange={handleInputChange}
                  required
                />
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
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-7890"
                  name="phone"
                  value={address.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <label
              for="address-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Address *
            </label>
            <div className="flex items-center">
              <div className="relative w-full">
                <textarea
                  id="address-input"
                  className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                  placeholder="address"
                  name="address"
                  onChange={handleInputChange}
                  required
                >
                  {address.address}
                </textarea>
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
              onChange={handleInputChange}
              value={address.country}
            >
              <option selected>Select</option>
              <option value="US">United States</option>
              <option value="AS">Australia</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="UK">United Kingdom</option>
            </select>
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
              onChange={handleInputChange}
              value={address.city}
            >
              <option selected>San Francisco</option>
              <option value="NY">New York</option>
              <option value="LA">Los Angeles</option>
              <option value="CH">Chicago</option>
              <option value="HU">Houston</option>
            </select>
          </div>

          <div className="w-1/2 p-4">
            <label
              for="zipcode-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Zipcode *
            </label>
            <div className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="zipcode-input"
                  className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                  placeholder="zipcode"
                  name="zipcode"
                  value={address.zipcode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <ButtonComponent onClick={() => saveAddress()}>
                Save
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
