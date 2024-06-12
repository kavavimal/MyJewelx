"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Input,
  Select,
  Option,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { Form, Formik, useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { post, update } from "@/utils/api";
import { useRouter } from "next/navigation";
import DeleteVariation from "./DeleteVariation";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";

const Variation = ({
  index,
  open,
  handleOpen,
  variation,
  productAttributeValues,
  variations,
  setVariations,
}) => {
  const router = useRouter();
  const isVariation = Boolean(variation?.variation_id);
  const [isGemstone, setIsGemstone] = useState(false);
  const [gemstone, setGemstone] = useState("");
  const [gemstoneAmount, setGemstoneAmount] = useState("");
  const [gemstoneCharges, setGemstoneCharges] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [isAddtionalCharges, setIsAdditionalCharges] = useState(false);
  const [additionalChargesType, setAdditionalChargesType] = useState("");
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [additionalCharge, setAdditionalCharge] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [makingCharge, setMakingCharge] = useState("Per Gram On Net Weight");
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [chargeValue, setChargeValue] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

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

  useEffect(() => {
    formik.setFieldValue("files", files);
  }, [files]);

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  const FILE_SIZE = 5 * 1024 * 1024; // 5M

  const variatonValidationSchema = Yup.object().shape({
    regular_price: Yup.number().required("Regular price is required"),
    description: Yup.string()
      .required("Description is required")
      .min(1)
      .max(200),
    length: Yup.number().required("Length is required"),
    width: Yup.number().required("Width is required"),
    height: Yup.number().required("Height is required"),
    thickness: Yup.number().required("Thickness is required"),
    sku: Yup.string().required("SKU is required").min(1).max(20),
    stock_management: Yup.boolean().notRequired(),
    stock_status: Yup.string()
      .required("Stock status is required")
      .oneOf(["in_stock", "out_of_stock"]),
    weight_unit: Yup.string()
      .required("Weight unit is required")
      .min(1)
      .max(20),
    net_weight: Yup.number().required("Net weight is required"),
    gross_weight: Yup.number().required("Gross weight is required"),
    isPriceFixed: Yup.boolean().required("Is price fixed is required"),
    ...(!isVariation && {
      files: Yup.array()
        .of(
          Yup.mixed()
            .test(
              "fileSize",
              "File too large",
              (value) => !value || (value && value.size <= FILE_SIZE)
            )
            .test(
              "fileFormat",
              "Unsupported Format",
              (value) =>
                !value || (value && SUPPORTED_FORMATS.includes(value.type))
            )
        )
        .min(1, "At least one image is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      regular_price: isVariation ? variation.regular_price : "",
      selling_price: isVariation ? variation.selling_price : "",
      description: isVariation ? variation.description : "",
      length: isVariation ? variation.length : "",
      width: isVariation ? variation.width : "",
      height: isVariation ? variation.height : "",
      thickness: isVariation ? variation.thickness : "",
      sku: isVariation ? variation.sku : "",
      stock_management: isVariation ? variation.stock_management : false,
      stock_status: isVariation
        ? variation.stock_status
          ? "in_stock"
          : "out_of_stock"
        : "",
      quantity: isVariation ? variation.quantity : "",
      weight_unit: isVariation ? variation.weight_unit : "",
      net_weight: isVariation ? variation.net_weight : "",
      gross_weight: isVariation ? variation.gross_weight : "",
      isPriceFixed: isVariation ? variation.isPriceFixed : false,
      metal_amount: "",
      files: [],
    },
    validationSchema: variatonValidationSchema,
    onSubmit: async (values) => {
      const otherCharges = [];

      if (isGemstone && gemstoneCharges.length > 0) {
        gemstoneCharges.forEach((item) => {
          otherCharges.push({
            charge_type: "gemstone",
            name: item.gemstone,
            value: item.amount,
          });
        });
      }

      if (isAddtionalCharges && additionalCharges.length > 0) {
        additionalCharges.forEach((item) => {
          otherCharges.push({
            charge_type: "additional",
            name: item.additionalChargesType,
            value: item.additionalCharge,
          });
        });
      }

      if (isDiscount && discountType && discountValue) {
        otherCharges.push({
          charge_type: "discount",
          name: discountType,
          value: discountValue,
        });
      }

      if (Boolean(taxValue)) {
        otherCharges.push({
          charge_type: "vat/tax",
          name: "vattaxes",
          value: taxValue,
        });
      }

      let makingCharges = {};

      if (values?.isPriceFixed) {
        makingCharges = {
          metalPrice: values?.metal_amount,
          charge_type: makingCharge,
          value: chargeValue,
        };
      }

      if (isVariation) {
        try {
          const response = await update(
            `/api/variation/${variation?.variation_id}`,
            {
              ...values,
              making_charges: JSON.stringify(makingCharges),
              other_charges: JSON.stringify(otherCharges),
              product_id: localStorage.getItem("product_id"),
              stock_status: values.stock_status === "in_stock" ? true : false,
              old_img_change: uploadedImages.join(","),
              selling_price: 10000,
            }
          );
          router.refresh();
          if (response.status === 201) {
            enqueueSnackbar("Variation updated successfully", {
              variant: "success",
              preventDuplicates: true,
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
        } catch (error) {
          enqueueSnackbar(error?.response?.data?.error, {
            variant: "error",
            preventDuplicates: true,
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
      } else {
        try {
          const response = await post("/api/variation", {
            ...values,
            making_charges: JSON.stringify(makingCharges),
            other_charges: JSON.stringify(otherCharges),
            product_id: localStorage.getItem("product_id"),
            productAttributeValue_id: productAttributeValues
              ?.map((item) => item.productAttributeValue_id)
              .join(","),
            stock_status: values.stock_status === "in_stock" ? true : false,
            selling_price: 10000,
          });

          if (response.status === 201) {
            enqueueSnackbar("Variation created successfully", {
              variant: "success",
              preventDuplicates: true,
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
            setVariations((prev) => {
              let existingVariations = [...prev];
              existingVariations[index] = response?.data?.result;
              return existingVariations;
            });
          } else {
            enqueueSnackbar("Something went wrong", {
              variant: "error",
              preventDuplicates: true,
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
        } catch (error) {
          enqueueSnackbar(error?.response?.data?.error, {
            variant: "error",
            preventDuplicates: true,
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
    },
  });

  console.log(productAttributeValues, "productAttributeValues");

  useEffect(() => {
    if (isVariation) {
      try {
        const charges = JSON.parse(variation.making_charges);
        const otherCharges = JSON.parse(variation.other_charges);

        if (charges) {
          setMakingCharge((prev) =>
            prev !== charges.charge_type ? charges.charge_type : prev
          );
          setChargeValue((prev) =>
            prev !== charges.value ? charges.value : prev
          );
          formik.setFieldValue("metal_amount", charges.metalPrice);
        }

        if (otherCharges) {
          const newGemstoneCharges = [];
          const newAdditionalCharges = [];
          let hasGemstone = false;
          let hasAdditionalCharges = false;
          let discountType = null;
          let discountValue = null;
          let taxValue = null;

          otherCharges.forEach((item) => {
            if (item.charge_type === "gemstone") {
              hasGemstone = true;
              newGemstoneCharges.push({
                gemstone: item.name,
                amount: item.value,
              });
            }

            if (item.charge_type === "additional") {
              hasAdditionalCharges = true;
              newAdditionalCharges.push({
                additionalChargesType: item.name,
                additionalCharge: item.value,
              });
            }

            if (item.charge_type === "discount") {
              discountType = item.name;
              discountValue = item.value;
            }

            if (item.charge_type === "vat/tax") {
              taxValue = item.value;
            }
          });

          setIsGemstone((prev) => (prev !== hasGemstone ? hasGemstone : prev));
          setGemstoneCharges((prev) =>
            JSON.stringify(prev) !== JSON.stringify(newGemstoneCharges)
              ? newGemstoneCharges
              : prev
          );
          setIsAdditionalCharges((prev) =>
            prev !== hasAdditionalCharges ? hasAdditionalCharges : prev
          );
          setAdditionalCharges((prev) =>
            JSON.stringify(prev) !== JSON.stringify(newAdditionalCharges)
              ? newAdditionalCharges
              : prev
          );
          setIsDiscount((prev) =>
            prev !== Boolean(discountType) ? Boolean(discountType) : prev
          );
          setDiscountType((prev) =>
            prev !== discountType ? discountType : prev
          );
          setDiscountValue((prev) =>
            prev !== discountValue ? discountValue : prev
          );
          // setIsTax((prev) =>
          //   prev !== Boolean(taxValue) ? Boolean(taxValue) : prev
          // );
          setTaxValue((prev) => (prev !== taxValue ? taxValue : prev));
        }

        setUploadedImages(variation.images.map((image) => image));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div>
      <Accordion
        className="overflow-visible"
        key={index}
        open={open === index + 1}
        icon={
          <span className="text-blueGray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`${
                open === index + 1 ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        }
      >
        <AccordionHeader onClick={() => handleOpen(index + 1)}>
          {isVariation ? index + 1 : variation?.name}
        </AccordionHeader>
        <AccordionBody>
          <Formik initialValues={formik.initialValues}>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                  <div className="flex flex-col gap-5 border-b border-gray-300 pb-8">
                    <div>
                      <Input
                        label="SKU"
                        name="sku"
                        size="lg"
                        value={formik.values?.sku ?? ""}
                        onChange={formik.handleChange}
                        error={formik.errors.sku && formik.touched.sku}
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="flex flex-col gap-5">
                          <div className="flex gap-5 items-center">
                            <Input
                              label="Length"
                              type="number"
                              name="length"
                              value={formik.values?.length ?? ""}
                              onChange={formik.handleChange}
                              error={
                                formik.errors.length && formik.touched.length
                              }
                            />
                            <Input
                              label="Height"
                              type="number"
                              name="height"
                              value={formik.values?.height ?? ""}
                              onChange={formik.handleChange}
                              error={
                                formik.errors.height && formik.touched.height
                              }
                            />
                          </div>
                          <div className="flex gap-5 items-center">
                            <Input
                              label="Width"
                              type="number"
                              name="width"
                              value={formik.values?.width ?? ""}
                              onChange={formik.handleChange}
                              error={
                                formik.errors.width && formik.touched.width
                              }
                            />
                            <Input
                              label="Thickness"
                              type="number"
                              name="thickness"
                              value={formik.values?.thickness ?? ""}
                              onChange={formik.handleChange}
                              error={
                                formik.errors.thickness &&
                                formik.touched.thickness
                              }
                            />
                          </div>
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
                    </div>

                    <div>
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
                        value={formik.values?.description ?? ""}
                        onEditorChange={(content) => {
                          formik.setFieldValue("description", content);
                        }}
                      />

                      {formik.errors.description &&
                        formik.touched.description && (
                          <p className="text-red-500">
                            {formik.errors.description}
                          </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="mb-1.5">
                          <Checkbox
                            label="Stock management"
                            name="stock_management"
                            onChange={formik.handleChange}
                            checked={formik.values?.stock_management ?? false}
                          />
                        </div>
                        {formik.values?.stock_management && (
                          <Input
                            type="number"
                            label="Quantity"
                            size="lg"
                            name="quantity"
                            error={formik.errors.quantity}
                            value={formik.values?.quantity ?? ""}
                            onChange={formik.handleChange}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="mb-2">Stock Status</h4>
                        <ul className="flex gap-5 items-center">
                          <li>
                            <input
                              type="radio"
                              id={`in-stock-${index}`}
                              name="stock_status"
                              value="in_stock"
                              className="hidden peer"
                              checked={
                                formik.values?.stock_status === "in_stock"
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              htmlFor={`in-stock-${index}`}
                              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:text-primary-200 peer-checked:border-primary-200 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              <div className="block">
                                <div className="w-full text-base font-medium">
                                  In Stock
                                </div>
                              </div>
                            </label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              id={`out-of-stock-${index}`}
                              name="stock_status"
                              value="out_of_stock"
                              className="hidden peer"
                              checked={
                                formik.values?.stock_status === "out_of_stock"
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              htmlFor={`out-of-stock-${index}`}
                              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:text-primary-200 peer-checked:border-primary-200 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              <div className="block">
                                <div className="w-full text-base font-medium">
                                  Out Of Stock
                                </div>
                              </div>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <Select
                        label="Weight"
                        size="lg"
                        name="weight_unit"
                        error={
                          formik.errors.weight_unit &&
                          formik.touched.weight_unit
                        }
                        value={formik.values?.weight_unit ?? ""}
                        onChange={(value) =>
                          formik.setFieldValue("weight_unit", value)
                        }
                      >
                        <Option value="Ounces">Ounces</Option>
                        <Option value="Grams">Grams</Option>
                      </Select>

                      {formik.values?.weight_unit === "Grams" && (
                        <div className="flex gap-5 items-center">
                          <Input
                            type="number"
                            label="Net Weight (grams)"
                            size="lg"
                            name="net_weight"
                            value={formik.values?.net_weight ?? ""}
                            error={formik.errors.net_weight}
                            onChange={formik.handleChange}
                          />
                          <Input
                            type="number"
                            label="Gross Weight (grams)"
                            size="lg"
                            name="gross_weight"
                            value={formik.values?.gross_weight ?? ""}
                            error={formik.errors.gross_weight}
                            onChange={formik.handleChange}
                          />
                        </div>
                      )}

                      {formik.values?.weight_unit === "Ounces" && (
                        <div className="flex gap-5 items-center">
                          <Input
                            type="number"
                            label="Net Weight (ounces)"
                            size="lg"
                            name="net_weight"
                            value={formik.values?.net_weight ?? ""}
                            onChange={formik.handleChange}
                          />
                          <Input
                            type="number"
                            label="Gross Weight (ounces)"
                            size="lg"
                            name="gross_weight"
                            value={formik.values?.gross_weight ?? ""}
                            onChange={formik.handleChange}
                          />
                        </div>
                      )}

                      <Checkbox
                        label="Fixed price"
                        onChange={formik.handleChange}
                        name="isPriceFixed"
                        checked={formik.values?.isPriceFixed ?? false}
                      />
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Regular Price"
                        size="lg"
                        name="regular_price"
                        onChange={formik.handleChange}
                        value={formik.values?.regular_price}
                        error={
                          formik.errors.regular_price &&
                          formik.touched.regular_price
                        }
                      />
                    </div>

                    {formik.values?.isPriceFixed && (
                      <>
                        <div>
                          <Input
                            type="number"
                            label="Metal Amount"
                            name="metal_amount"
                            size="lg"
                            value={formik.values?.metal_amount ?? ""}
                            error={formik.errors.metal_amount}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="w-full flex gap-5 items-center">
                          <div className="w-1/2">
                            <Select
                              label="Making Charges"
                              size="lg"
                              onChange={(value) => setMakingCharge(value)}
                              value={makingCharge}
                            >
                              <Option value="Per Gram On Net Weight">
                                Per Gram On Net Weight
                              </Option>
                              <Option value="Per Piece / Flat">
                                Per Piece / Flat
                              </Option>
                              <Option value="Per(%) On Metal Rate On Karat">
                                Per(%) On Metal Rate On Karat
                              </Option>
                            </Select>
                          </div>
                          <div className="w-1/2">
                            <Input
                              size="lg"
                              name="making_charge"
                              label={makingCharge}
                              value={chargeValue}
                              onChange={(e) => setChargeValue(e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="pt-3">
                    <Typography>Other Charges</Typography>
                    <Checkbox
                      label="Gemstone"
                      checked={isGemstone}
                      onChange={(e) => setIsGemstone(e.target.checked)}
                    />
                    {isGemstone && (
                      <div>
                        <div className="flex gap-5 items-center">
                          <div className="flex-1 grid grid-cols-2 items-center gap-5">
                            <Select
                              label="Gemstone"
                              size="lg"
                              value={gemstone}
                              onChange={(value) => setGemstone(value)}
                            >
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
                                <Option key={index} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>

                            <Input
                              label="Amount"
                              size="lg"
                              type="number"
                              value={gemstoneAmount}
                              onChange={(e) =>
                                setGemstoneAmount(e.target.value)
                              }
                            />
                          </div>

                          <Button
                            type="button"
                            className="w-auto"
                            onClick={() => {
                              if (
                                gemstone.trim() !== "" &&
                                gemstoneAmount.trim() !== ""
                              ) {
                                setGemstoneCharges([
                                  ...gemstoneCharges,
                                  {
                                    gemstone: gemstone,
                                    amount: gemstoneAmount,
                                  },
                                ]);
                                setGemstone("");
                                setGemstoneAmount("");
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="flex">
                          <List>
                            {gemstoneCharges.length > 0 &&
                              gemstoneCharges.map((item, index) => (
                                <ListItem
                                  key={index}
                                  ripple={false}
                                  className="py-1 pr-1 pl-4"
                                >
                                  {item.gemstone} - ₹{item.amount}
                                  <ListItemSuffix>
                                    <IconButton
                                      type="button"
                                      variant="text"
                                      onClick={() => {
                                        setGemstoneCharges(
                                          gemstoneCharges.filter(
                                            (_, i) => i !== index
                                          )
                                        );
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
                                        ></path>
                                      </svg>
                                    </IconButton>
                                  </ListItemSuffix>
                                </ListItem>
                              ))}
                          </List>
                        </div>
                      </div>
                    )}

                    <div>
                      <Checkbox
                        label="Additional Charges"
                        onChange={(e) =>
                          setIsAdditionalCharges(e.target.checked)
                        }
                        checked={isAddtionalCharges}
                      />
                    </div>

                    {isAddtionalCharges && (
                      <div>
                        <div className="flex gap-5 items-center">
                          <div className="flex-1 grid grid-cols-2 items-center gap-5">
                            <Input
                              label="Additional Charges Type"
                              size="lg"
                              value={additionalChargesType}
                              onChange={(e) =>
                                setAdditionalChargesType(e.target.value)
                              }
                            />
                            <Input
                              label={additionalChargesType}
                              size="lg"
                              type="number"
                              value={additionalCharge}
                              onChange={(e) =>
                                setAdditionalCharge(e.target.value)
                              }
                            />
                          </div>
                          <Button
                            className="w-auto"
                            type="button"
                            onClick={() => {
                              if (
                                additionalChargesType.trim() !== "" &&
                                additionalCharge.trim() !== ""
                              ) {
                                setAdditionalCharges([
                                  ...additionalCharges,
                                  {
                                    additionalChargesType:
                                      additionalChargesType,
                                    additionalCharge: additionalCharge,
                                  },
                                ]);
                                setAdditionalChargesType("");
                                setAdditionalCharge("");
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>

                        <div className="flex">
                          <List>
                            {additionalCharges.length > 0 &&
                              additionalCharges.map((item, index) => (
                                <ListItem
                                  key={index}
                                  ripple={false}
                                  className="py-1 pr-1 pl-4"
                                >
                                  {item.additionalChargesType} -₹
                                  {item.additionalCharge}
                                  <ListItemSuffix>
                                    <IconButton
                                      type="button"
                                      variant="text"
                                      onClick={() => {
                                        setAdditionalCharges(
                                          additionalCharges.filter(
                                            (_, i) => i !== index
                                          )
                                        );
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
                                        ></path>
                                      </svg>
                                    </IconButton>
                                  </ListItemSuffix>
                                </ListItem>
                              ))}
                          </List>
                        </div>
                      </div>
                    )}

                    <div>
                      <Checkbox
                        label="Discount"
                        checked={isDiscount}
                        onChange={(e) => setIsDiscount(e.target.checked)}
                      />
                    </div>

                    {isDiscount && (
                      <div className="w-full flex gap-5 items-center">
                        <div className="w-1/2">
                          <Select
                            label="Discount Type"
                            size="lg"
                            onChange={(value) => setDiscountType(value)}
                            value={discountType}
                          >
                            <Option value="Per Gram On Net Weight">
                              Per Gram On Net Weight
                            </Option>
                            <Option value="Per Piece / Flat">
                              Per Piece / Flat
                            </Option>
                            <Option value="Per(%) On Metal Rate On Karat">
                              Per(%) On Metal Rate On Karat
                            </Option>
                          </Select>
                        </div>
                        <div className="w-1/2">
                          <Input
                            label={discountType}
                            size="lg"
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <div className="mt-5">
                      <Input
                        label="VAT/Taxes (%)"
                        size="lg"
                        type="number"
                        value={taxValue}
                        onChange={(e) => setTaxValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex gap-5">
                      <Button type="submit" loading={formik.isSubmitting}>
                        {isVariation ? "Update" : "Save"}
                      </Button>

                      {isVariation && (
                        <DeleteVariation
                          variation_id={variation?.variation_id}
                          variations={variations}
                          setVariations={setVariations}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-5">
                    <label
                      htmlFor={`product-images-${index}`}
                      className={`flex h-36 w-full flex-col items-center justify-center border-2 ${
                        formik.errors.files && formik.touched.files
                          ? "border-red-500"
                          : "border-blueGray-100"
                      } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={40}
                          height={40}
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
                        id={`product-images-${index}`}
                        type="file"
                        name="files"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                        multiple
                      />
                    </label>
                    {formik.errors.files && formik.touched.files && (
                      <p className="text-red-500">{formik.errors.files}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-5">
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
                                    onClick={() => removeImage(i)}
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
                                className="w-20 h-20 transition-all duration-300 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {uploadedImages.length > 0 && (
                      <div>
                        <p>Uploaded Images</p>
                        <div className="flex flex-wrap items-center gap-5">
                          {uploadedImages.map((url, i) => (
                            <div key={i}>
                              <div className="relative">
                                <div className="absolute right-0 top-0">
                                  <IconButton
                                    type="button"
                                    variant="text"
                                    size="sm"
                                    className="rounded-full h-7 w-7"
                                    onClick={() =>
                                      setUploadedImages(
                                        uploadedImages.filter(
                                          (_, index) => index !== i
                                        )
                                      )
                                    }
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
                                className="w-20 h-20 transition-all duration-300 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Formik>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default Variation;
