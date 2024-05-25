"use client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Option,
  Select,
  Step,
  Stepper,
  Typography,
} from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import ProductsDetail from "./ProductsDetail";
import { post } from "@/utils/api";
import { Noto_Sans_Indic_Siyaq_Numbers } from "next/font/google";

const ProductForm = ({ product, categories, tags, productAttributes }) => {
  const [attributes, setAttributes] = useState([]);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [previewURLs, setPreviewURLs] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [prefix, setPrefix] = useState("");
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [tag, setTag] = useState([]);
  const [productAttribute, setProductAttribute] = useState([]);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedKarats, setSelectedKarats] = useState([]);
  const [productColor, setProductColor] = useState("");
  const [productKarats, setProductKarats] = useState("");
  const [productsDetails, setProductsDetails] = useState([]);

  const style = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderColor: "#9ca3af",
      backgroundColor: "#fff",
      padding: ".2rem",
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
      zIndex: 99,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "",
    }),
  };

  const attributesOptions = [
    {
      label: "Material",
      value: "material",
      isDisabled: attributes.includes("material"),
    },
    {
      label: "Color",
      value: "color",
      isDisabled: attributes.includes("color"),
    },
    {
      label: "Size",
      value: "size",
      isDisabled: attributes.includes("size"),
    },
  ];

  const colorOptions = [
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
  ];

  const karatOptions = [
    { label: "14 Karat", value: "14_karat" },
    { label: "18 Karat", value: "18_karat" },
    { label: "21 Karat", value: "21_karat" },
    { label: "22 Karat", value: "22_karat" },
    { label: "24 Karat", value: "24_karat" },
    { label: "9 Karat", value: "9_karat" },
  ];

  const patternOptions = [
    { label: "Geometric", value: "geometric" },
    { label: "Plaid", value: "plaid" },
    { label: "Plants", value: "plants" },
    { label: "Letter", value: "letter" },
    { label: "Plain", value: "plain" },
    { label: "Stripped", value: "stripped" },
  ];

  const categoryOptions = categories?.map((category) => ({
    value: category.category_id,
    label: category.name,
  }));

  const subcategoryOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

  const tagsOptions = tags?.map((tag, index) => ({
    value: tag?.tag_id,
    label: tag?.name,
  }));

  const materialOptions = [
    { value: "diamond", label: "Diamond" },
    { value: "gold", label: "Gold" },
    { value: "silver", label: "Silver" },
    { value: "platinum", label: "Platinum" },
    { value: "palladium", label: "Palladium" },
    { value: "watch", label: "Watch" },
    { value: "pearl", label: "Pearl" },
    { value: "gemstone", label: "Gemstone" },
  ];

  const productAttributesOptions = productAttributes?.map((item) => ({
    value: item?.attribute_id,
    label: item?.name,
  }));

  const handleNext = async () => {
    if (activeStep === 0) {
      // try {
      //   const response = await post("/api/product", {
      //     product_name: `${prefix} ${productName}`,
      //     description: description,
      //     files: files,
      //     category: category,
      //     sku: sku,
      //     attributes: productAttribute.join(","),
      //     tags: tag.join(","),
      //   });
      //   console.log(response);
      // } catch (error) {}
    } else {
    }
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
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
              <Step className="h-4 w-4" onClick={() => setActiveStep(3)} />
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
                <ReactSelect
                  options={categoryOptions}
                  styles={style}
                  placeholder="Category"
                  value={categoryOptions.find(
                    (options) => options.value === category
                  )}
                  onChange={({ value, label }) => {
                    setCategory(value);
                    setPrefix(label);
                  }}
                />
              </div>
              <div>
                <ReactSelect
                  options={subcategoryOptions}
                  styles={style}
                  placeholder="Subcategory"
                  value={subcategoryOptions.find(
                    (options) => options.value === subcategory
                  )}
                  onChange={({ value }) => {
                    setSubCategory(value);
                  }}
                />
              </div>
              <div className="flex col-span-2">
                <div className="w-auto">
                  <Input
                    className="rounded-r-none w-full bg-white"
                    label="Product Name"
                    // readOnly
                    value={prefix}
                    size="lg"
                    disabled
                  />
                </div>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Extend Product Name"
                  className="rounded-l-none !border !border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                  labelProps={{
                    className: "hidden font-emirates",
                  }}
                  size="lg"
                />
              </div>
              {/* <div className="col-span-2">
                <Input
                  label="SKU"
                  size="lg"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div> */}
              <div>
                <ReactSelect
                  isMulti
                  onChange={(options) =>
                    setTag(options.map((option) => option.value))
                  }
                  options={tagsOptions}
                  name="tags"
                  value={
                    tagsOptions.filter((option) =>
                      tag.includes(option.value)
                    ) ?? []
                  }
                  styles={style}
                  placeholder="Tags"
                />
              </div>

              <div>
                <ReactSelect
                  isMulti
                  onChange={(options) =>
                    setProductAttribute(options.map((option) => option.value))
                  }
                  options={productAttributesOptions}
                  name="productAttributes"
                  value={
                    productAttributesOptions.filter((option) =>
                      productAttribute.includes(option.value)
                    ) ?? []
                  }
                  styles={style}
                  placeholder="Attributes"
                />
              </div>

              {/* <div className="col-span-2">
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
                  value={description}
                  onEditorChange={(content) => {
                    setDescription(content);
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="dropzone-file"
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
              </div> */}
              {/* <div className="col-span-2 flex flex-wrap items-center gap-5">
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
              </div> */}
              <div className="col-span-2">
                <Checkbox label="Online Buyable" />
              </div>

              <div>
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
                    {
                      label: "Holiday Specials",
                      value: "holiday_specials",
                    },
                    { label: "Gift Ideas", value: "gift_ideas" },
                    {
                      label: "Signature Collection",
                      value: "signature_collection",
                    },
                    {
                      label: "Luxury Selections",
                      value: "luxury_selections",
                    },
                    {
                      label: "Timeless Classics",
                      value: "timeless_classics",
                    },
                    {
                      label: "Modern Minimalism",
                      value: "modern_minimalism",
                    },
                    { label: "Vintage Glamour", value: "vintage_glamour" },
                    {
                      label: "Ethically Sourced",
                      value: "ethically_sourced",
                    },
                    {
                      label: "Handcrafted Treasures",
                      value: "handcrafted_treasures",
                    },
                    {
                      label: "Custom Creations",
                      value: "custom_creations",
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

              <div>
                <ReactSelect
                  isMulti
                  options={patternOptions}
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
                  placeholder="Pattern"
                />
              </div>

              <div>
                <Select label="Made in Country" size="lg">
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

              <div>
                <Select label="State" size="lg">
                  <Option>India</Option>
                  <Option>Turkey</Option>
                  <Option>Singapore</Option>
                  <Option>Malaysia</Option>
                  <Option>Italy</Option>
                  <Option>U.A.E</Option>
                  <Option>Korea</Option>
                  <Option>China</Option>
                </Select>
              </div>

              <div className="col-span-2">
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
            </div>
          )}

          {activeStep === 1 && (
            <div className="p-7 shadow-3xl rounded-2xl bg-white">
              <h3 className="text-xl mb-6 font-medium tracking-wide">
                Add Attributes
              </h3>
              <div className="flex flex-col gap-1">
                <Typography>Add Existing</Typography>
                <ReactSelect
                  name="attributes"
                  options={attributesOptions}
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
                {attributes.includes("material") && (
                  <div>
                    <div className="flex justify-between items-center mb-px">
                      <Typography className="">Material</Typography>
                      <IconButton
                        variant="text"
                        className="p-0 text-red-500 rounded-full"
                        onClick={() => {
                          setAttributes(
                            attributes.filter((a) => a !== "material")
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
                    <div>
                      <ReactSelect
                        options={materialOptions}
                        styles={style}
                        placeholder="Material"
                        value={materialOptions.find(
                          (options) => options.value === material
                        )}
                        onChange={({ value }) => {
                          setMaterial(value);
                        }}
                      />
                    </div>
                    {material === "gold" && (
                      <div className="mt-5">
                        <ReactSelect
                          isMulti
                          options={karatOptions}
                          value={selectedKarats}
                          onChange={setSelectedKarats}
                          styles={style}
                          placeholder="Gold Karats"
                        />
                      </div>
                    )}
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
                          setAttributes(
                            attributes.filter((a) => a !== "color")
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
                      options={colorOptions}
                      name="color"
                      placeholder="Color"
                      value={selectedColors}
                      onChange={(selectedOption) => {
                        setSelectedColors(selectedOption);
                      }}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderWidth: "1px",
                          borderColor: "#9ca3af",
                          backgroundColor: "#fff",
                          padding: "0rem",
                          color: "#222",
                          boxShadow: state.isFocused
                            ? "0 0 0 calc(1px + #fff) rgb(255, 255, 255)"
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
                {attributes.includes("size") && (
                  <div>
                    <div className="flex justify-between items-center mb-px">
                      <Typography>Size</Typography>
                      <IconButton
                        variant="text"
                        className="p-0 text-red-500 rounded-full"
                        onClick={() => {
                          setAttributes(attributes.filter((a) => a !== "size"));
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
                    <div className="flex flex-col gap-5">
                      <Select
                        size="lg"
                        label="Size"
                        onChange={(value) => setSize(value)}
                        value={size}
                      >
                        <Option value="asian">Asian</Option>
                        <Option value="US">US</Option>
                      </Select>
                      {size === "US" && (
                        <Select label="US">
                          {["4", "4.5", "5", "5.5", "6", "6.5"].map(
                            (item, index) => (
                              <Option key={index}>{item}</Option>
                            )
                          )}
                        </Select>
                      )}

                      {size === "asian" && (
                        <Select label="Asian">
                          {[
                            "14.88",
                            "15.29",
                            "15.70",
                            "16.10",
                            "16.51",
                            "16.92",
                          ].map((item, index) => (
                            <Option key={index}>{item}</Option>
                          ))}
                        </Select>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="p-7 shadow-3xl rounded-2xl bg-white">
              <h3 className="text-xl mb-6 font-medium tracking-wide">
                Product Details
              </h3>
              <div className="w-full flex gap-5 items-center">
                <div className="flex-1 grid grid-cols-2 gap-5">
                  {selectedColors.length > 0 && (
                    <div>
                      <Select
                        label="Colors"
                        onChange={(value) => setProductColor(value)}
                      >
                        {selectedColors.map((color, index) => (
                          <Option key={index} value={color?.label}>
                            {color?.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  )}

                  {selectedKarats.length > 0 && (
                    <div>
                      <Select
                        label="Karat"
                        onChange={(value) => setProductKarats(value)}
                      >
                        {selectedKarats.map((karat, index) => (
                          <Option key={index} value={karat?.label}>
                            {karat?.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
                <div className="w-auto">
                  <Button
                    onClick={() =>
                      setProductsDetails([
                        ...productsDetails,
                        { color: productColor, karat: productKarats },
                      ])
                    }
                  >
                    Add
                  </Button>
                </div>
              </div>
              {productsDetails?.map((item, index) => (
                <ProductsDetail
                  key={index}
                  index={index}
                  productsDetails={productsDetails}
                  setProductsDetails={setProductsDetails}
                  item={item}
                  open={open}
                  handleOpen={handleOpen}
                />
              ))}
            </div>
          )}

          {activeStep === 3 && (
            <div className="p-7 shadow-3xl rounded-2xl bg-white">
              <h3 className="text-xl mb-6 font-medium tracking-wide">
                Add Attributes
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <Checkbox label="Online Buyable" />
                </div>

                <div>
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
                      {
                        label: "Holiday Specials",
                        value: "holiday_specials",
                      },
                      { label: "Gift Ideas", value: "gift_ideas" },
                      {
                        label: "Signature Collection",
                        value: "signature_collection",
                      },
                      {
                        label: "Luxury Selections",
                        value: "luxury_selections",
                      },
                      {
                        label: "Timeless Classics",
                        value: "timeless_classics",
                      },
                      {
                        label: "Modern Minimalism",
                        value: "modern_minimalism",
                      },
                      { label: "Vintage Glamour", value: "vintage_glamour" },
                      {
                        label: "Ethically Sourced",
                        value: "ethically_sourced",
                      },
                      {
                        label: "Handcrafted Treasures",
                        value: "handcrafted_treasures",
                      },
                      {
                        label: "Custom Creations",
                        value: "custom_creations",
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

                <div>
                  <ReactSelect
                    isMulti
                    options={patternOptions}
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
                    placeholder="Pattern"
                  />
                </div>

                <div>
                  <Select label="Made in Country" size="lg">
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

                <div>
                  <Select label="State" size="lg">
                    <Option>India</Option>
                    <Option>Turkey</Option>
                    <Option>Singapore</Option>
                    <Option>Malaysia</Option>
                    <Option>Italy</Option>
                    <Option>U.A.E</Option>
                    <Option>Korea</Option>
                    <Option>China</Option>
                  </Select>
                </div>

                <div className="col-span-2">
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
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={handlePrev}>Prev</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
