"use client";
import { post, update } from "@/utils/api";
import {
  Button,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import DeleteCharacteristic from "./DeleteCharacteristic";

const CharacteristicsForm = ({ characteristics, charTypes }) => {
  const router = useRouter();
  const [characteristic, setCharacteristic] = useState(false);
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Type",
      selector: (row) => row?.chars_type,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <IconButton
            variant="text"
            className="rounded-full"
            onClick={() => setCharacteristic(row)}
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
          <DeleteCharacteristic id={row?.chars_id} />
        </>
      ),
    },
  ];
  const formik = useFormik({
    initialValues: {
      name: characteristic ? characteristic.name : "",
      chars_type: characteristic ? characteristic.chars_type : "",
    },
    enableReinitialize: true,
    // validationSchema: patternValidationSchema,
    onSubmit: async (values) => {
      if (characteristic) {
        try {
          const response = await update(
            `/api/characteristic/${characteristic.chars_id}`,
            values
          );
          router.refresh();
          if (response.status === 201) {
            enqueueSnackbar("Characteristics Updated Successfully", {
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
          }
          setCharacteristic(false);
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
          const response = await post("/api/characteristic", values);
          if (response.status === 201) {
            enqueueSnackbar("Characteristics Added Successfully", {
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
          }
          router.refresh();
          formik.resetForm();
          enqueueSnackbar("Characteristics Added Successfully", {
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
        <h2 className="text-2xl font-semibold">Characteristics</h2>
        <Button
          size="md"
          className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
          onClick={() => setCharacteristic(false)}
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
          Add Characteristic
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
                  <Select
                    label="Type"
                    name="chars_type"
                    onChange={(value) =>
                      formik.setFieldValue("chars_type", value)
                    }
                    value={formik.values?.chars_type ?? ""}
                  >
                    {Object.keys(charTypes).map((key) => (
                      <Option key={key} value={key}>
                        {charTypes[key]}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <Button
                  type="submit"
                  size="lg"
                  className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                  loading={formik.isSubmitting}
                >
                  {characteristic ? "Update" : "Add"}
                </Button>

                {characteristic && (
                  <Button
                    className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded font-emirates"
                    color="red"
                    size="lg"
                    onClick={() => setCharacteristic(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Formik>
      </div>

      <DataTable
        data={characteristics}
        columns={columns}
        highlightOnHover
        pagination
      />
    </>
  );
};

export default CharacteristicsForm;
