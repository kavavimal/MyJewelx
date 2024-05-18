"use client";
import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  Input,
  Option,
  Select,
  Step,
  Stepper,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

const ProductForm = ({ product }) => {
  const [checked, setChecked] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [material, setMaterial] = useState("");
  const data = [
    {
      label: "General",
      value: "general",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            d="M865.3 244.7c-.3-.3-61.1 59.8-182.1 180.6l-84.9-84.9l180.9-180.9c-95.2-57.3-217.5-42.6-296.8 36.7A244.42 244.42 0 0 0 419 432l1.8 6.7l-283.5 283.4c-6.2 6.2-6.2 16.4 0 22.6l141.4 141.4c6.2 6.2 16.4 6.2 22.6 0l283.3-283.3l6.7 1.8c83.7 22.3 173.6-.9 236-63.3c79.4-79.3 94.1-201.6 38-296.6"
          ></path>
        </svg>
      ),
      content: (
        <>
          <div>
            <div className="grid grid-cols-2 gap-5 items-center">
              <div>
                <Input type="number" label="Regular Price" />
              </div>
              <div>
                <Input type="number" label="Sale Price" />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Inventory",
      value: "inventory",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4zM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5zm-9-5q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
          ></path>
        </svg>
      ),
      content: (
        <>
          <div className="flex flex-col gap-5">
            <div>
              <Input label="SKU" name="sku" />
            </div>
            <div>
              <div className="mb-1.5">
                <Checkbox
                  label="Stock management"
                  onChange={(e) => setChecked(e.target.checked)}
                  checked={checked}
                />
              </div>
              {checked && <Input type="number" label="Quantity" />}
            </div>
            <div>
              <h4 className="mb-2">Stock Status</h4>
              <ul class="flex gap-5 items-center">
                <li>
                  <input
                    type="radio"
                    id="in-stock"
                    name="hosting"
                    value="hosting-small"
                    class="hidden peer"
                    required
                  />
                  <label
                    htmlFor="in-stock"
                    class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="block">
                      <div class="w-full text-base font-medium">In Stock</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="out-of-stock"
                    name="hosting"
                    value="hosting-big"
                    class="hidden peer"
                  />
                  <label
                    htmlFor="out-of-stock"
                    class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-200 peer-checked:border-primary-200 peer-checked:text-primary-200 hover:text-blueGray-200 hover:bg-blueGray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="block">
                      <div class="w-full text-base font-medium">
                        Out Of Stock
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Shipping",
      value: "shipping",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 20q-1.25 0-2.125-.875T3 17H1V6q0-.825.588-1.412T3 4h14v4h3l3 4v5h-2q0 1.25-.875 2.125T18 20t-2.125-.875T15 17H9q0 1.25-.875 2.125T6 20m0-2q.425 0 .713-.288T7 17t-.288-.712T6 16t-.712.288T5 17t.288.713T6 18m12 0q.425 0 .713-.288T19 17t-.288-.712T18 16t-.712.288T17 17t.288.713T18 18m-1-5h4.25L19 10h-2z"
          ></path>
        </svg>
      ),
      content: (
        <>
          <div className="flex flex-col gap-5">
            <div>
              <Input label="Weight" type="text" name="weight" />
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                weight in (g)
              </Typography>
            </div>
            <div>
              <div className="flex gap-5 items-center">
                <Input label="Length" type="number" name="length" />
                <Input label="Height" type="number" name="height" />
                <Input label="Width" type="number" name="width" />
              </div>
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                L x W x H in (cm)
              </Typography>
            </div>
            <div>
              <Select label="Size">
                <Option>Asian</Option>
                <Option>US</Option>
              </Select>
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Attributes",
      value: "attributes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            d="M865.3 244.7c-.3-.3-61.1 59.8-182.1 180.6l-84.9-84.9l180.9-180.9c-95.2-57.3-217.5-42.6-296.8 36.7A244.42 244.42 0 0 0 419 432l1.8 6.7l-283.5 283.4c-6.2 6.2-6.2 16.4 0 22.6l141.4 141.4c6.2 6.2 16.4 6.2 22.6 0l283.3-283.3l6.7 1.8c83.7 22.3 173.6-.9 236-63.3c79.4-79.3 94.1-201.6 38-296.6"
          ></path>
        </svg>
      ),
      content: (
        <>
          <div className="flex flex-col gap-1">
            <Typography>Add Existing</Typography>
            <ReactSelect
              name="attributes"
              options={[
                {
                  label: "Color",
                  value: "color",
                  isDisabled: attributes.includes("color"),
                },
                {
                  label: "Feature Collection",
                  value: "feature_collection",
                  isDisabled: attributes.includes("feature_collection"),
                },
                {
                  label: "Material",
                  value: "material",
                  isDisabled: attributes.includes("material"),
                },
                {
                  label: "Gender",
                  value: "gender",
                  isDisabled: attributes.includes("gender"),
                },
                {
                  label: "Country",
                  value: "country",
                  isDisabled: attributes.includes("country"),
                },
                {
                  label: "Pattern",
                  value: "pattern",
                  isDisabled: attributes.includes("pattern"),
                },
                {
                  label: "Gemstone",
                  value: "gemstone",
                  isDisabled: attributes.includes("gemstone"),
                },
              ]}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderWidth: "1px",
                  borderColor: "#9ca3af",
                  backgroundColor: "#fff",
                  padding: "0rem",
                  color: "#222",
                  boxShadow: state.isFocused
                    ? "0 0 0 calc(1px + #fff) rgb(255 255 255)"
                    : "",
                  ":hover": {
                    borderColor: "#9ca3af",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#000"
                    : state.isDisabled
                    ? "rgba(145, 158, 171, 0.16)"
                    : "white",
                  color: state.isSelected ? "white" : "#1E293B",
                  borderRadius: ".5rem",
                  ":hover": {
                    backgroundColor: state.isSelected
                      ? "#222"
                      : "rgba(145, 158, 171, 0.16)",
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  padding: ".7rem",
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? "#fff" : "",
                }),
              }}
              onChange={({ value }) => {
                setAttributes((prev) => [...prev, value]);
              }}
            />
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {attributes.includes("feature_collection") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Featured Collections</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(
                        attributes.filter((a) => a !== "feature_collection")
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <ReactSelect
                  isMulti
                  options={[
                    { label: "New Arrivals", value: "new_arrivals" },
                    { label: "Best Sellers", value: "best_sellers" },
                    { label: "Limited Edition", value: "limited_edition" },
                    { label: "Seasonal Picks", value: "seasonal_picks" },
                    { label: "Trending Now", value: "trending_now" },
                    { label: "Staff Picks", value: "staff_picks" },
                    {
                      label: "Designer Spotlight",
                      value: "designer_spotlight",
                    },
                    { label: "Clearance", value: "clearance" },
                    { label: "Holiday Specials", value: "holiday_specials" },
                    { label: "Gift Ideas", value: "gift_ideas" },
                    {
                      label: "Signature Collection",
                      value: "signature_collection",
                    },
                    { label: "Luxury Selections", value: "luxury_selections" },
                    { label: "Timeless Classics", value: "timeless_classics" },
                    { label: "Modern Minimalism", value: "modern_minimalism" },
                    { label: "Vintage Glamour", value: "vintage_glamour" },
                    { label: "Ethically Sourced", value: "ethically_sourced" },
                    {
                      label: "Handcrafted Treasures",
                      value: "handcrafted_treasures",
                    },
                    { label: "Custom Creations", value: "custom_creations" },
                  ]}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderWidth: "1px",
                      borderColor: "#9ca3af",
                      backgroundColor: "#fff",
                      padding: "0rem",
                      color: "#222",
                      boxShadow: state.isFocused
                        ? "0 0 0 calc(1px + #fff) rgb(255 255 255)"
                        : "",
                      ":hover": {
                        borderColor: "#9ca3af",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#000" : "white",
                      color: state.isSelected ? "white" : "#1E293B",
                      borderRadius: ".5rem",
                      ":hover": {
                        backgroundColor: state.isSelected
                          ? "#222"
                          : "rgba(145, 158, 171, 0.16)",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      padding: ".7rem",
                    }),
                    singleValue: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "#fff" : "",
                    }),
                  }}
                  placeholder="Featured Collections"
                />
              </div>
            )}
            {attributes.includes("material") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Material</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(attributes.filter((a) => a !== "material"));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <div>
                  <Select
                    label="Material"
                    value={material}
                    onChange={(value) => setMaterial(value)}
                  >
                    <Option value="diamond">Diamond</Option>
                    <Option value="gold">Gold</Option>
                    <Option value="silver">Silver</Option>
                    <Option value="platinum">Platinum</Option>
                    <Option value="palladium">Palladium</Option>
                    <Option value="watch">Watch</Option>
                    <Option value="pearl">Pearl</Option>
                    <Option value="gemstone">Gemstone</Option>
                  </Select>
                </div>
                {material === "gold" && (
                  <div className="mt-5">
                    <Select label="Karats">
                      {[
                        "14 Karat",
                        "18 Karat",
                        "21 Karat",
                        "22 Karat",
                        "24 Karat",
                        "9 Karat",
                      ].map((item) => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
              </div>
            )}
            {attributes.includes("pattern") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Pattern</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(attributes.filter((a) => a !== "pattern"));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <div>
                  <Select label="Pattern">
                    <Option>Geometric</Option>
                    <Option>Plaid</Option>
                    <Option>Plants</Option>
                    <Option>Letter</Option>
                    <Option>Plain</Option>
                    <Option>Stripped</Option>
                  </Select>
                </div>
              </div>
            )}
            {attributes.includes("color") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Color</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(attributes.filter((a) => a !== "color"));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <ReactSelect
                  isMulti
                  options={[
                    { label: "Gold", value: "gold" },
                    { label: "Silver", value: "silver" },
                    { label: "Rose Gold", value: "rose_gold" },
                    { label: "White Gold", value: "white_gold" },
                    { label: "Yellow Gold", value: "yellow_gold" },
                    { label: "Black", value: "black" },
                    { label: "Blue", value: "blue" },
                    { label: "Red", value: "red" },
                    { label: "Green", value: "green" },
                    { label: "Purple", value: "purple" },
                  ]}
                  name="color"
                  placeholder="Color"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderWidth: "1px",
                      borderColor: "#9ca3af",
                      backgroundColor: "#fff",
                      padding: "0rem",
                      color: "#222",
                      boxShadow: state.isFocused
                        ? "0 0 0 calc(1px + #fff) rgb(255 255 255)"
                        : "",
                      ":hover": {
                        borderColor: "#9ca3af",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#000" : "white",
                      color: state.isSelected ? "white" : "#1E293B",
                      borderRadius: ".5rem",
                      ":hover": {
                        backgroundColor: state.isSelected
                          ? "#222"
                          : "rgba(145, 158, 171, 0.16)",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      padding: ".7rem",
                    }),
                    singleValue: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "#fff" : "",
                    }),
                  }}
                  className="col-span-3"
                />
              </div>
            )}
            {attributes.includes("country") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Country</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(attributes.filter((a) => a !== "country"));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <div>
                  <Select label="Made in Country">
                    <Option>India</Option>
                    <Option>Turkey</Option>
                    <Option>Female</Option>
                    <Option>Singapore</Option>
                    <Option>Malaysia</Option>
                    <Option>Italy</Option>
                    <Option>U.A.E</Option>
                    <Option>Korea</Option>
                    <Option>China</Option>
                  </Select>
                </div>
              </div>
            )}
            {attributes.includes("gender") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Gender</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(attributes.filter((a) => a !== "gender"));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <ReactSelect
                  placeholder="Gender"
                  isMulti
                  options={[
                    { label: "Unisex", value: "unisex" },
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Teens", value: "teens" },
                    { label: "Baby Boy", value: "baby_boy" },
                    { label: "Baby Girl", value: "baby_girl" },
                  ]}
                  name="gender"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderWidth: "1px",
                      borderColor: "#9ca3af",
                      backgroundColor: "#fff",
                      padding: "0rem",
                      color: "#222",
                      boxShadow: state.isFocused
                        ? "0 0 0 calc(1px + #fff) rgb(255 255 255)"
                        : "",
                      ":hover": {
                        borderColor: "#9ca3af",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#000" : "white",
                      color: state.isSelected ? "white" : "#1E293B",
                      borderRadius: ".5rem",
                      ":hover": {
                        backgroundColor: state.isSelected
                          ? "#222"
                          : "rgba(145, 158, 171, 0.16)",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      padding: ".7rem",
                    }),
                    singleValue: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "#fff" : "",
                    }),
                  }}
                  className="col-span-3"
                />
              </div>
            )}
            {attributes.includes("gemstone") && (
              <div>
                <div className="flex justify-between items-center mb-px">
                  <Typography className="">Gemstone</Typography>
                  <IconButton
                    variant="text"
                    className="p-0 text-red-500 rounded-full"
                    onClick={() => {
                      setAttributes(attributes.filter((a) => a !== "gemstone"));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zm2.5 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-.75-.75"
                      ></path>
                    </svg>
                  </IconButton>
                </div>
                <div>
                  <Select label="Gemstone">
                    {[
                      "Ruby",
                      "Sapphire",
                      "Emerald",
                      "Amethyst",
                      "Topaz",
                      "Opal",
                      "Turquoise",
                      "Garnet",
                      "Aquamarine",
                      "Peridot",
                    ].map((item, index) => (
                      <Option key={index}>{item}</Option>
                    ))}
                  </Select>
                </div>
              </div>
            )}
          </div>
          <div className="mt-1 grid grid-cols-2 gap-5">
            {/* <Select label="Featured Collections">
              <Option value="">New Arrivals</Option>
              <Option>Best Sellers</Option>
              <Option>Limited Edition</Option>
              <Option>Seasonal Picks</Option>
              <Option>Trending Now</Option>
              <Option>Staff Picks</Option>
              <Option>Designer Spotlight</Option>
              <Option>Clearance</Option>
              <Option>Holiday Specials</Option>
              <Option>Gift Ideas</Option>
              <Option>Signature Collection</Option>
              <Option>Luxury Selections</Option>
              <Option>Timeless Classics</Option>
              <Option>Modern Minimalism</Option>
              <Option>Vintage Glamour</Option>
              <Option>Ethically Sourced</Option>
              <Option>Handcrafted Treasures</Option>
              <Option>Custom Creations</Option>
            </Select> */}

            {/* <Select label="Gender">
              <Option>Unisex</Option>
              <Option>Male</Option>
              <Option>Female</Option>
              <Option>Teens</Option>
              <Option>Baby Boy</Option>
              <Option>Baby Girl</Option>
            </Select> */}

            {/* <Select label="Color">
              <Option>Gold</Option>
              <Option>Silver</Option>
              <Option>Rose Gold</Option>
              <Option>White Gold</Option>
              <Option>Yellow Gold</Option>
              <Option>Black</Option>
              <Option>Blue</Option>
              <Option>Red</Option>
              <Option>Green</Option>
              <Option>Purple</Option>
            </Select> */}
          </div>
        </>
      ),
    },
    {
      label: "Tags",
      value: "tags",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5.5 9A1.5 1.5 0 0 0 7 7.5A1.5 1.5 0 0 0 5.5 6A1.5 1.5 0 0 0 4 7.5A1.5 1.5 0 0 0 5.5 9m11.91 2.58c.36.36.59.86.59 1.42c0 .55-.22 1.05-.59 1.41l-5 5a1.996 1.996 0 0 1-2.83 0l-6.99-6.99C2.22 12.05 2 11.55 2 11V6c0-1.11.89-2 2-2h5c.55 0 1.05.22 1.41.58zm-3.87-5.87l1-1l6.87 6.87c.37.36.59.87.59 1.42s-.22 1.05-.58 1.41l-5.38 5.38l-1-1L20.75 13z"
          ></path>
        </svg>
      ),
      content: (
        <>
          <div className="flex gap-5 items-center">
            <Input
              label="+ Tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Button
              onClick={() => {
                if (tag.trim() !== "") {
                  setTags([...tags, tag]);
                  setTag("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap items-center mt-4">
            {tags.map((tag, index) => (
              <Chip
                size="sm"
                value={tag}
                key={index}
                variant="filled"
                onClose={() => {
                  setTags(tags.filter((_, i) => i !== index));
                }}
                className="normal-case"
              />
            ))}
          </div>
        </>
      ),
    },
    {
      label: "Advanced",
      value: "advanced",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8c-21.1 21.2-32.8 49.2-32.8 79.1s11.7 57.9 32.8 79.1c21.2 21.1 49.2 32.8 79.1 32.8s57.9-11.7 79.1-32.8c21.1-21.2 32.8-49.2 32.8-79.1s-11.7-57.9-32.8-79.1a110.96 110.96 0 0 0-79.1-32.8m412.3 235.5l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a442.5 442.5 0 0 0-79.6-137.7l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52-9.4-106.8-9.4-158.8 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.3a353.4 353.4 0 0 0-98.9 57.3l-81.8-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a445.9 445.9 0 0 0-79.6 137.7l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57c0 19.2 1.5 38.4 4.6 57l-66 56.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3a32.05 32.05 0 0 0 25.8 25.7l2.7.5a448.3 448.3 0 0 0 158.8 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c4.3-12.4.6-26.3-9.5-35m-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8s175.8 78.7 175.8 175.8s-78.7 175.8-175.8 175.8"
          ></path>
        </svg>
      ),
      content: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [productName, setProductName] = useState("");
  const [previewURLs, setPreviewURLs] = useState([]);
  const [files, setFiles] = useState([]);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
    Array.from(e.target.files).map((file) => {
      setPreviewURLs((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  const removeImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviewURLs(previewURLs.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-5">
      <div className="flex items-center intro-y">
        <h2 className="text-2xl font-semibold mb-10">
          {product ? "Edit" : "Save"} Product
        </h2>
      </div>
      <form>
        <div className="flex flex-col gap-5">
          <div>
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
            </Stepper>
          </div>

          {activeStep === 0 && (
            <div className="grid items-center grid-cols-2 gap-5 p-7 shadow-3xl rounded-2xl bg-white">
              <div className="col-span-2">
                <h3 className="text-xl font-medium tracking-wide">
                  Product Information
                </h3>
              </div>
              <div>
                <Select
                  label="Category"
                  onChange={(e) => setProductName(e)}
                  size="lg"
                >
                  <Option value="Ring">Ring</Option>
                  <Option value="Bracelet">Bracelet</Option>
                  <Option value="Earrings">Earrings</Option>
                  <Option value="Chain">Chain</Option>
                  <Option value="Necklace">Necklace</Option>
                </Select>
              </div>
              <div>
                <Select label="Subcategory" size="lg">
                  <Option>Option 1</Option>
                  <Option>Option 2</Option>
                  <Option>Option 3</Option>
                  <Option>Option 4</Option>
                  <Option>Option 5</Option>
                </Select>
              </div>
              {/* <Select label="Product Name">
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
                <Option>Option 4</Option>
                <Option>Option 5</Option>
              </Select> */}
              <div className="flex col-span-2">
                <div className="w-auto">
                  <Input
                    className="rounded-r-none w-full bg-white"
                    label="Product Name"
                    // readOnly
                    value={productName}
                    size="lg"
                    disabled
                  />
                </div>
                <Input
                  placeholder="Extend Product Name"
                  className="rounded-l-none !border !border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  size="lg"
                />
              </div>
              <div className="col-span-2">
                <Editor
                  apiKey="exrtc5unpz0rnnqzlce7w4eh4pww5sj8woyuvnwgy1e9w2l5"
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "table",
                      "image",
                      "bbcode",
                      "link",
                      "image paste",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help | \
                      table | image media | link",
                  }}
                  onEditorChange={(content, editor) => {
                    console.log("Content was updated:", content);
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlhtmlFor="dropzone-file"
                  className="flex h-80 w-full flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      className="text-blueGray-200"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M12 9.273c-2.301 0-4.167 1.831-4.167 4.09c0 2.26 1.866 4.092 4.167 4.092c2.301 0 4.167-1.832 4.167-4.091c0-2.26-1.866-4.091-4.167-4.091m0 1.636c-1.38 0-2.5 1.099-2.5 2.455c0 1.355 1.12 2.454 2.5 2.454s2.5-1.099 2.5-2.454c0-1.356-1.12-2.455-2.5-2.455m4.722-.818c0-.452.373-.818.834-.818h1.11c.46 0 .834.366.834.818a.826.826 0 0 1-.833.818h-1.111a.826.826 0 0 1-.834-.818"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="category_image"
                    className="hidden"
                    onChange={handleFileChange}
                    // accept="image/png, image/gif, image/jpeg"
                    multiple
                  />
                </label>
              </div>
              <div className="col-span-2 flex flex-wrap items-center gap-5">
                {previewURLs.length > 0 &&
                  previewURLs.map((url, index) => (
                    <div key={index}>
                      <div className="relative">
                        <div className="absolute right-0 top-0">
                          <IconButton
                            variant="text"
                            size="sm"
                            className="rounded-full h-7 w-7"
                            onClick={() => removeImage(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                              ></path>
                            </svg>
                          </IconButton>
                        </div>
                      </div>
                      <Image
                        key={index}
                        width={100}
                        height={100}
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 transition-all duration-300 rounded-lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="p-7 shadow-3xl rounded-2xl bg-white">
              <h3 className="text-xl mb-6 font-medium tracking-wide">
                Product Details
              </h3>
              <div className="flex flex-col gap-5">
                <div>
                  <Tabs
                    value="general"
                    orientation="vertical"
                    className="items-start overflow-visible"
                  >
                    <TabsHeader className="w-40">
                      {data.map(({ label, value, icon }) => (
                        <Tab
                          key={value}
                          value={value}
                          className="items-start justify-start py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            {icon}
                            {label}
                          </div>
                        </Tab>
                      ))}
                    </TabsHeader>
                    <TabsBody className="overflow-visible">
                      {data.map((item) => (
                        <TabPanel
                          key={item.value}
                          value={item.value}
                          className="py-0"
                        >
                          {item.content}
                        </TabPanel>
                      ))}
                    </TabsBody>
                  </Tabs>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
