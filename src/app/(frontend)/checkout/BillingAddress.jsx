"use client";

import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function BillingAddress({
  updateBillingAddress,
  billingAddress,
}) {
  const [address, setAddress] = useState(billingAddress);
  const [editAddress, setEditAddress] = useState(!billingAddress);
  const saveAddress = () => {
    // validate address
    let flag = true;

    setEditAddress(false);
    updateBillingAddress(address);
  };

  const handleInputChange = (e) => {
    setAddress((val) => {
      return { ...val, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Billing Address
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              for="your_name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name{" "}
            </label>
            <input
              type="text"
              id="your_name"
              name="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder="Bonnie Green"
              required
              value={address.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              for="your_email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Your email*{" "}
            </label>
            <input
              type="email"
              id="your_email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder="name@flowbite.com"
              name="email"
              value={address.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
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

          <div>
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

          <div>
            <label
              for="address-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Address *
            </label>
            <div className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="address-input"
                  className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                  placeholder="address"
                  name="address"
                  value={address.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div>
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
          </div>
          <div>
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

          <div className="sm:col-span-2">
            <Button onClick={() => saveAddress()}>Save Address</Button>
          </div>
        </div>
      )}
    </div>
  );
}
