"use client";
import { productValueValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import DeleteValue from "./DeleteValue";
import { attributeIDs } from "@/utils/constants";

const ValueForm = ({ attribute_values, attribute_id }) => {
  console.log('attribute_values', attribute_values);
  const router = useRouter();
  const [value, setValue] = useState(false);
  let columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
  ];
  if (attribute_id === attributeIDs.COLOR) {
    columns.push({
      name: 'Color Code',
      selector: (row) => (<>
       <span className="flex items-center "><span className="inline-block p-4 rounded-full mr-3" style={{backgroundColor: row?.colorCode}}></span>{row?.colorCode}</span>
      </>)
  });
  }
  columns.push({
      name: "Action",
      selector: (row) => (
        <>
          <IconButton
            variant="text"
            className="rounded-full"
            onClick={() => setValue(row)}
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

          <DeleteValue value_id={row?.id} />
        </>
      ),
    },
  );
  const formik = useFormik({
    initialValues: {
      name: value ? value.name : "",
      attribute_id: attribute_id,
      colorCode: value && value.colorCode ? value.colorCode : ''
    },
    enableReinitialize: true,
    validationSchema: productValueValidationSchema,
    onSubmit: async (values) => {
      if (value) {
        try {
          const response = await update(
            `/api/attribute_value/${value.id}`,
            values
          );
          router.refresh();
          enqueueSnackbar("Attribute Value Updated", {
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
          setValue(false);
          formik.resetForm();
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
          const response = await post("/api/attribute_value", values);
          router.refresh();
          formik.resetForm();
          enqueueSnackbar("Attribute Value Added", {
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
        <h2 className="text-2xl font-semibold">Values</h2>
        <Button
          size="md"
          className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
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
          Add Value
        </Button>
      </div>

      <div className="mt-5 rounded-2xl shadow-3xl bg-white">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 items-center">
                <div className="w-full">
                  <Input
                    className="w-full"
                    label="Name"
                    type="text"
                    name="name"
                    value={formik.values?.name || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                {attribute_id === attributeIDs.COLOR ? 
                  <div className="">
                    <input
                      className="w-20 p-0"
                      label="Color Code"
                      type="color"
                      name="colorCode"
                      value={formik.values?.colorCode || ""}
                      onChange={formik.handleChange}
                      error={formik.touched.colorCode && formik.errors.colorCode}
                    />
                  </div>
                :''}
                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                    loading={formik.isSubmitting}
                  >
                    {value ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Formik>
      </div>

      <DataTable data={attribute_values} columns={columns} highlightOnHover />
    </>
  );
};

export default ValueForm;
