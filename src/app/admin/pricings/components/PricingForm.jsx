"use client";
import { patternValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const PricingForm = ({ attributes, pricings }) => {
  const router = useRouter();
  const [pricing, setPricing] = useState(false);

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Price",
      selector: (row) => row?.price,
    },
    {
      name: "Quantity",
      selector: (row) => row?.base_q,
    },
    {
      name: "Unit",
      selector: (row) => row?.unit,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <IconButton
            variant="text"
            className="rounded-full"
            onClick={() => setPricing(row)}
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
        </>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: pricing ? pricing.name : "",
      attributeValue_id: pricing ? pricing.attributeValue_id : "",
      price: pricing ? pricing.price : "",
      base_q: pricing ? pricing.base_q : "",
      unit: pricing ? pricing.unit : "",
      purity: pricing ? pricing.purity : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      attributeValue_id: Yup.string().required("Attribute is required"),
      price: Yup.string().required("Price is required"),
      base_q: Yup.string().required("Quantity is required"),
      unit: Yup.string().required("Unit is required"),
      purity: Yup.string().required("Purity is required"),
    }),
    onSubmit: async (values) => {
      if (pricing) {
        try {
          const response = await update(
            `/api/attribute_value_pricing/${pricing.pricing_id}`,
            values
          );
          router.refresh();
          enqueueSnackbar("Pricing Updated Successfully", {
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
          setPricing(false);
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error?.message, {
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
      } else {
        try {
          const response = await post("/api/attribute_value_pricing", values);
          router.refresh();
          formik.resetForm();
          enqueueSnackbar("Pricing Created Successfully", {
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
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error?.response?.data?.message, {
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
    },
  });
  return (
    <>
      <div className="flex items-center justify-between mb-10 intro-y">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <Button
          size="md"
          className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
          onClick={() => setPricing(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
            ></path>
          </svg>
          Add Price
        </Button>
      </div>

      <div className="mt-10 rounded-2xl shadow-3xl bg-white">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
            <div className="flex flex-col gap-5">
              <div className="grid items-start grid-cols-2 gap-5">
                <div>
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formik.values?.name || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div>
                  {attributes && attributes?.length > 0 && (
                    <Select
                      label="Attribute"
                      name="attributeValue_id"
                      value={formik.values?.attributeValue_id ?? ""}
                      onChange={(value) =>
                        formik.setFieldValue("attributeValue_id", value)
                      }
                      error={
                        formik.touched.attributeValue_id &&
                        formik.errors.attributeValue_id
                      }
                    >
                      {attributes?.map((attribute) => (
                        <Option value={attribute?.id}>{attribute?.name}</Option>
                      ))}
                    </Select>
                  )}
                </div>
                <div>
                  <Input
                    label="Price"
                    type="number"
                    name="price"
                    value={formik.values?.price || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.price && formik.errors.price}
                  />
                </div>

                <div>
                  <Input
                    label="Quantity"
                    type="number"
                    name="base_q"
                    value={formik.values?.base_q || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.base_q && formik.errors.base_q}
                  />
                </div>

                <div>
                  <Input
                    label="Unit"
                    type="text"
                    name="unit"
                    value={formik.values?.unit || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.unit && formik.errors.unit}
                  />
                </div>

                <div>
                  <Input
                    label="Purity"
                    type="text"
                    name="purity"
                    value={formik.values?.purity || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.purity && formik.errors.purity}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  size="lg"
                  className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                  loading={formik.isSubmitting}
                >
                  {pricing ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </Formik>
      </div>

      <DataTable data={pricings} columns={columns} highlightOnHover />
    </>
  );
};

export default PricingForm;
