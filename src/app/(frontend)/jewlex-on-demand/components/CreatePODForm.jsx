"use client";
import * as Yup from "yup";

import { post } from "@/utils/api";
import {
  FILE_SIZE,
  Karats,
  MadeInCountries,
  productCategory,
  productMetals,
  SUPPORTED_FORMATS_IMAGES,
} from "@/utils/constants";
import { showToast } from "@/utils/helper";
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Typography
} from "@material-tailwind/react";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactSelect from "react-select";

const podFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  metal: Yup.string().required("Metal is Type"),
  karat: Yup.string().when("metal", {
    is: "Gold",
    then: (schema) => schema.required("Karat is Required"),
  }),
  weight_type: Yup.string().required("Select Weight Type"),
  contact: Yup.string().required(
    "Add your contact number so sellers can connect you"
  ),
  files: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileSize",
          "File should be less than 100MB",
          (value) => !value || (value && value.size <= FILE_SIZE)
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) =>
            !value || (value && SUPPORTED_FORMATS_IMAGES.includes(value.type))
        )
    )
    .min(5, "At least 5 image is required"),
});

const initialValue = {
  name: "",
  description: "",
  weight_type: "range",
  price_type: "range",
  made_in: [],
  files: [],
};

const CreatePODForm = () => {
  const router = useRouter();
  const [previewURLs, setPreviewURLs] = useState([]);
  const submitRequest = async (values, actions) => {
    const sendData = {
      ...values,
      made_in: values.made_in.join(","),
    };
    const createResponse = await post("/api/product/pod", sendData);
    if (createResponse && createResponse?.data?.status == 201) {
      showToast({
        message: createResponse?.data?.message
          ? createResponse?.data?.message
          : "Request Saved Successfully",
      });
      router.push("/product-on-demand");
    } else {
      showToast({
        message: createResponse?.data?.message
          ? createResponse?.data?.message
          : "Something wrong, please try again!",
        variant: "error",
      });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "100%",
      minHeight: "40px",
      borderRadius: "6px",
      borderColor: "#b0bec5",
    }),
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={podFormValidationSchema}
      onSubmit={submitRequest}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className="grid items-start gap-[12px]">
            <div className="grid gap-[7px]">
              <label htmlFor="select-name">Item Name</label>
              <ReactSelect
                placeholder={
                  <span style={{ color: "#4D4D4D" }}>
                    Select the jewelry item name
                  </span>
                }
                // placeholder="select the jewelry item name"
                id="select-name"
                name="name"
                options={productCategory.map((item) => {
                  return { value: item, label: item };
                })}
                styles={customStyles}
                value={
                  props.values.name
                    ? { value: props.values.name, label: props.values.name }
                    : null
                }
                onChange={(value) => props.setFieldValue("name", value.value)}
                onBlur={props.handleBlur}
                className="border-0 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                classNamePrefix="react-select"
              />
              {/* <Select
                size="lg"
                placeholder="select the jewelry item name"
                labelProps={{ className: "hidden" }}
                className="!border bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                id="select-name"
                name="name"
                onChange={(value) => props.setFieldValue("name", value)}
                onBlur={props.handleBlur}
                value={props.values.name ?? ""}
              >
                {productCategory.map((item) => {
                  return (
                    <Option key={`nameid${item}`} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select> */}
              {props.errors.name && props.touched.name && (
                <p className="text-red-400">{props?.errors?.name}</p>
              )}
            </div>

            <div className="grid gap-[7px]">
              <label
                className="text-[14px] text-blueGray-500"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                placeholder="Provide a detail description of product here..."
                id="description"
                className="!border !border-primary-200 bg-white text-gray-900  placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 placeholder:font-emirates placeholder:text-[16px] placeholder:text-[#4D4D4D]"
                // placeholder=""
                name="description"
                labelProps={{
                  className: "hidden",
                }}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
              />
              {props.errors.description && props.touched.description && (
                <p className="text-red-400">{props?.errors?.description}</p>
              )}
            </div>
            <div className="grid gap-[7px] ">
              <div>
                <div className="grid grid-cols-2 gap-5 items-start">
                  <div className="grid gap-[7px]">
                    <label
                      className="text-[18px] text-dark-50"
                      htmlFor="select-metal"
                    >
                      Metal Type
                    </label>
                    <ReactSelect
                      placeholder={
                        <span style={{ color: "#4D4D4D" }}>Select Metal</span>
                      }
                      // placeholder="Select Metal"
                      id="select-metal"
                      name="metal"
                      options={productMetals.map((item) => {
                        return { value: item, label: item };
                      })}
                      styles={customStyles}
                      value={
                        props.values.metal
                          ? {
                              value: props.values.metal,
                              label: props.values.metal,
                            }
                          : null
                      }
                      onChange={(value) =>
                        props.setFieldValue("metal", value.value)
                      }
                      onBlur={props.handleBlur}
                      className="border-0 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                      classNamePrefix="react-select"
                    />
                    {/* <Select
                      size="lg"
                      label="Metal"
                      id="select-metal"
                      name="metal"
                      onChange={(value) => props.setFieldValue("metal", value)}
                      onBlur={props.handleBlur}
                      value={props.values.metal ?? ""}
                    >
                      {productMetals.map((item) => {
                        return (
                          <Option key={`metalid${item}`} value={item}>
                            {item}
                          </Option>
                        );
                      })}
                    </Select> */}
                    {props.errors.metal && props.touched.metal && (
                      <p className="text-red-400">{props?.errors?.metal}</p>
                    )}
                  </div>
                  {props.values.metal === "Gold" ? (
                    <div className="grid gap-[7px]">
                      <label
                        className="text-[18px] text-dark-50"
                        htmlFor="select-karat"
                      >
                        Karat
                      </label>

                      <ReactSelect
                        placeholder={
                          <span style={{ color: "#4D4D4D" }}>Select Karat</span>
                        }
                        // placeholder="Select Karat"
                        id="select-karat"
                        name="karat"
                        options={Karats.map((item) => {
                          return { value: item, label: item };
                        })}
                        styles={customStyles}
                        value={
                          props.values.karat
                            ? {
                                value: props.values.karat,
                                label: props.values.karat,
                              }
                            : null
                        }
                        onChange={(value) =>
                          props.setFieldValue("karat", value.value)
                        }
                        onBlur={props.handleBlur}
                        className="border-0 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                        classNamePrefix="react-select"
                      />
                      {/* <Select
                        size="lg"
                        label="Karat"
                        id="select-karat"
                        name="karat"
                        onChange={(value) =>
                          props.setFieldValue("karat", value)
                        }
                        onBlur={props.handleBlur}
                        value={props.values.karat ?? ""}
                      >
                        {Karats.map((item) => {
                          return (
                            <Option key={`karatid${item}`} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                      </Select> */}
                      {props.errors.karat && (
                        <p className="text-red-400">{props?.errors?.karat}</p>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-5">
                <div className="grid gap-[7px]">
                  <label
                    htmlFor="select-weight-type"
                    className="text-[18px] text-dark-50"
                  >
                    Weight Type
                  </label>
                  <ReactSelect
                    id="select-weight-type"
                    instanceId="select-weight-type"
                    className="border-0 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    classNamePrefix="react-select"
                    placeholder={
                      props.values.weight_type ?? (
                        <span style={{ color: "#4D4D4D" }}>
                          Select Weight Type
                        </span>
                      )
                    }
                    value={
                      props.values.weight_type
                        ? {
                            value: props.values.weight_type,
                            label: props.values.weight_type,
                          }
                        : null
                    }
                    styles={customStyles}
                    onChange={(value) =>
                      props.setFieldValue("weight_type", value.value)
                    }
                    onBlur={props.handleBlur}
                    options={[
                      { value: "min", label: "Minimum" },
                      { value: "max", label: "Maximum" },
                      { value: "range", label: "Range" },
                    ]}
                  />
                  {/* <Select
                    size="lg"
                    id="select-weight-type"
                    labelProps={{
                      className: "hidden",
                    }}
                    placeholder={
                      props.values.weight_type ?? "Select Weight Type"
                    }
                    className="!borderbg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                    label={props.values.weight_type ?? "Select Weight Type"}
                    name="weight_type"
                    onChange={(value) =>
                      props.setFieldValue("weight_type", value)
                    }
                    onBlur={props.handleBlur}
                    value={props.values.weight_type ?? ""}
                  >
                    <Option index={0} value="min">
                      Minimum
                    </Option>

                    <Option index={1} value="max">
                      Maximum
                    </Option>
                    <Option index={2} value="range">
                      Range
                    </Option>
                  </Select> */}
                </div>
                <div className="flex gap-5">
                  {props.values.weight_type === "range" ||
                  props.values.weight_type === "min" ? (
                    <div className="w-full grid gap-[7px]">
                      <label
                        className="text-[18px] text-dark-50"
                        htmlFor="min_weight"
                      >
                        Minimum Height
                      </label>
                      <Input
                        size="lg"
                        label="Min Weight (grams)"
                        id="min_weight"
                        name="min_weight"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{
                          className: "!min-w-full",
                        }}
                        className={` w-full  !border bg-white text-gray-900 placeholder:font-emirates placeholder:text-[16px] placeholder:text-[#4D4D4D] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 `}
                        // className="focus:border-t-gray-900 max-w-full lg:max-w-[183px]"
                        placeholder="Enter Minimum Height"
                        onChange={(e) =>
                          props.setFieldValue("min_weight", e.target.value)
                        }
                        onBlur={props.handleBlur}
                        value={props.values.min_weight ?? ""}
                      />
                      {props.errors.min_weight && props.touched.min_weight && (
                        <p className="text-red-400">
                          {props?.errors?.min_weight}
                        </p>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {props.values.weight_type === "range" ||
                  props.values.weight_type === "max" ? (
                    <div className="w-full grid gap-[7px]">
                      <label
                        className="text-[18px] text-dark-50"
                        htmlFor="max_weight"
                      >
                        Maximum Height
                      </label>
                      <Input
                        size="lg"
                        color="gray"
                        label="Max Weight (grams)"
                        id="max_weight"
                        name="max_weight"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{
                          className: "!min-w-full",
                        }}
                        className={`w-full !border bg-white text-gray-900 placeholder:font-emirates placeholder:text-[16px] placeholder:text-[#4D4D4D] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 `}
                        placeholder="Enter Maximum Height"
                        onChange={(e) =>
                          props.setFieldValue("max_weight", e.target.value)
                        }
                        onBlur={props.handleBlur}
                        value={props.values.max_weight ?? ""}
                      />
                      {props.errors.max_weight && props.touched.max_weight && (
                        <p className="text-red-400">
                          {props?.errors?.max_weight}
                        </p>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {props.errors.weight_type && props.touched.weight_type && (
                <p className="text-red-400">{props?.errors?.weight_type}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="w-full grid gap-[7px]">
                <label
                  htmlFor="price_type"
                  className="text-[18px] text-dark-50"
                >
                  Price Type
                </label>
                <ReactSelect
                  id="price_type"
                  instanceId="price_type"
                  className="border-0  bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                  classNamePrefix="react-select"
                  placeholder={
                    props.values.weight_type ?? (
                      <span style={{ color: "#4D4D4D" }}>
                        Select Price Type
                      </span>
                    )
                  }
                  styles={customStyles}
                  value={
                    props.values.price_type
                      ? {
                          value: props.values.price_type,
                          label: props.values.price_type,
                        }
                      : null
                  }
                  onChange={(value) =>
                    props.setFieldValue("price_type", value.value)
                  }
                  onBlur={props.handleBlur}
                  options={[
                    { value: "max", label: "Maximum" },
                    { value: "range", label: "Range" },
                  ]}
                  size="lg"
                />
                {/* <Select
                  labelProps={{
                    className: "hidden",
                  }}
                  placeholder="Select Price Type"
                  className="!border bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 border-t-grey-200"
                  label={props.values.price_type ?? "Select Price Type"}
                  id="price_type"
                  name="price_type"
                  onChange={(value) => props.setFieldValue("price_type", value)}
                  onBlur={props.handleBlur}
                  value={props.values.price_type ?? ""}
                  size="lg"
                >
                  <Option index={3} value="max">
                    Maximum
                  </Option>

                  <Option index={4} value="range">
                    Range
                  </Option>
                </Select> */}
              </div>
              <div className="flex gap-5">
                {props.values.price_type === "range" ? (
                  <div className="w-full grid gap-[7px]">
                    <label
                      className="text-[18px] text-dark-50"
                      htmlFor="min_price"
                    >
                      Minimum Price
                    </label>
                    <Input
                      size="lg"
                      label="Min Price"
                      id="min_price"
                      name="min_price"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      onChange={(e) =>
                        props.setFieldValue("min_price", e.target.value)
                      }
                      labelProps={{
                        className: "hidden",
                      }}
                      className="!border w-full bg-white text-gray-900 placeholder:font-emirates placeholder:text-[16px] placeholder:text-[#4D4D4D] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      // className="focus:border-t-gray-900 max-w-full lg:max-w-[183px] "
                      placeholder="Enter Minimum Price"
                      onBlur={props.handleBlur}
                      value={props.values.min_price ?? ""}
                    />
                    {props.errors.min_price && props.touched.min_price && (
                      <p className="text-red-400">{props?.errors?.min_price}</p>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {props.values.price_type === "range" ||
                props.values.price_type === "max" ? (
                  <div className="w-full grid gap-[7px]">
                    <label
                      className="text-[18px] text-dark-50"
                      htmlFor="max_price"
                    >
                      Maximum Price
                    </label>
                    <Input
                      size="lg"
                      label="Max Price"
                      id="max_price"
                      name="max_price"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      className={`!border bg-white w-full text-gray-900 placeholder:font-emirates placeholder:text-[16px] placeholder:text-[#4D4D4D] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 `}
                      // className="focus:border-t-gray-900 "
                      placeholder="Enter Maximum Price"
                      onChange={(e) =>
                        props.setFieldValue("max_price", e.target.value)
                      }
                      onBlur={props.handleBlur}
                      value={props.values.max_price ?? ""}
                    />
                    {props.errors.max_price && props.touched.max_price && (
                      <p className="text-red-400">{props?.errors?.max_price}</p>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {props.errors.price_type && props.touched.price_type && (
                <p className="text-red-400">{props?.errors?.price_type}</p>
              )}
            </div>

            <div className="grid gap-[7px]">
              <div className="flex flex-col gap-1">
                <Typography className="text-[18px] font-emirates text-dark-50">
                  Made In
                </Typography>
                <ReactSelect
                  placeholder={
                    <span style={{ color: "#4D4D4D" }}>Select Country</span>
                  }
                  isMulti
                  name="made-in"
                  options={MadeInCountries.map((mi) => {
                    return { value: mi, label: mi };
                  })}
                  styles={customStyles}
                  value={props.values.made_in.map((mi) => {
                    return { value: mi, label: mi };
                  })}
                  onChange={(e) => {
                    props.setFieldValue("made_in", [...e.map((a) => a.value)]);
                  }}
                />
              </div>

              {props.errors.made_in && props.touched.made_in && (
                <p className="text-red-400">{props?.errors?.made_in}</p>
              )}
            </div>
            <div className="grid gap-[7px]">
              <label className="text-[18px] text-dark-50" htmlFor="contact">
                Contact Number
              </label>
              {/* <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div> */}
              <Input
                size="lg"
                label="Enter Your Contact Number"
                id="contact"
                name="contact"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                placeholder="Enter Your Contact Number"
                className="!border bg-white text-gray-900  placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 placeholder:font-emirates placeholder:text-[16px] placeholder:text-[#4D4D4D] "
                onChange={(e) => props.setFieldValue("contact", e.target.value)}
                onBlur={props.handleBlur}
                value={props.values.contact ?? ""}
              />
              {props.errors.contact && props.touched.contact && (
                <p className="text-red-400">{props?.errors?.contact}</p>
              )}
            </div>
            <div className="mb-5 grid gap-[7px]">
              <span className="text-[14px] text-blueGray-500">
                Upload Images
              </span>
              <label
                htmlFor={`pod-images`}
                className={`flex h-[150px] w-full flex-col items-center justify-center border-[3px] ${
                  props.errors.files && props.touched.files
                    ? "border-red-500"
                    : "border-blueGray-100"
                } border-dotted rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-blueGray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    width="40"
                    height="28"
                    viewBox="0 0 40 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.25 10.7327C31.6902 7.89554 30.1627 5.34078 27.9284 3.50476C25.6942 1.66874 22.8918 0.665362 20 0.666016C15.1833 0.666016 11 3.39935 8.91667 7.39935C6.46706 7.66407 4.20168 8.8247 2.55581 10.6582C0.909952 12.4917 -0.00028617 14.8688 6.74879e-08 17.3327C6.74879e-08 22.8493 4.48333 27.3327 10 27.3327H31.6667C36.2667 27.3327 40 23.5993 40 18.9993C40 14.5993 36.5833 11.0327 32.25 10.7327ZM23.3333 15.666V22.3327H16.6667V15.666H11.6667L20 7.33268L28.3333 15.666H23.3333Z"
                      fill="#1A1A1A"
                    />
                  </svg>
                  <span className="pt-2.5 pb-[5px] text-secondary-100 text-[14px]">
                    Drag and drop a file here or simply click to upload imgae
                  </span>
                  <span className="text-secondary-100 text-[14px]">
                    minumum 5 images required
                  </span>
                </div>
                <input
                  id={`pod-images`}
                  type="file"
                  name="files"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const files = [...props.values.files, ...e.target.files];
                    props.setFieldValue("files", files);
                    setPreviewURLs(
                      files.map((file) => URL.createObjectURL(file))
                    );
                  }}
                  multiple
                />
              </label>
              {props.errors.files && props.touched.files && (
                <p className="text-red-500">{props.errors.files}</p>
              )}
              {previewURLs.length > 0 && (
                <div className="">
                  <p>Images</p>
                  <div className="flex flex-wrap items-center gap-5">
                    {previewURLs.map((url, i) => (
                      <div key={i}>
                        <div className="relative">
                          <div className="absolute right-0 top-0">
                            <IconButton
                              type="button"
                              variant="text"
                              size="sm"
                              className="rounded-full h-7 w-7"
                              onClick={() => {
                                const files = [
                                  ...props.values.files.filter(
                                    (a, inid) => inid !== i
                                  ),
                                ];
                                props.setFieldValue("files", files);
                                setPreviewURLs(
                                  files.map((file) => URL.createObjectURL(file))
                                );
                              }}
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
                          key={i}
                          width={100}
                          height={100}
                          src={url}
                          alt={`Preview ${i}`}
                          className="w-36 h-36 transition-all duration-300 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full mt-5">
              <Button
                className="normal-case font-emirates text-[16px] pt-[12px] pb-[9px] px-[141px]"
                variant="contained"
                type="submit"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreatePODForm;
