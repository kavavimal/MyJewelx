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
import React, { useState, useEffect } from "react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import DeleteCharacteristic from "./DeleteCharacteristic";
import moment from "moment";

const CharacteristicsForm = ({ characteristics, charTypes }) => {
  const router = useRouter();
  const [characteristic, setCharacteristic] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacteristics, setFilteredCharacteristics] =
    useState(characteristics);

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.chars_type,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
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

  // Function to handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = characteristics.filter(
      (char) =>
        char.name.toLowerCase().includes(value) ||
        char.chars_type.toLowerCase().includes(value)
    );
    setFilteredCharacteristics(filtered);
  };
  const customStyles = {
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };
  return (
    <>
      <div className="flex items-center justify-between mb-5 intro-y">
        <h2 className="text-2xl font-semibold">Characteristics</h2>
        <div className="flex gap-3 items-end">
          <Input
            label="Search"
            type="text"
            placeholder="Search Characteristics"
            value={searchTerm}
            style={{ fontSize: "15px" }}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
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
          </Button>{" "}
        </div>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 mb-5">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className="rounded p-7">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-5">
                <div className="w-full">
                  <Input
                    label="Name"
                    type="text"
                    style={{ fontSize: "15px" }}
                    name="name"
                    value={formik.values?.name || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="w-full">
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

                <div className="flex items-center gap-5">
                  <Button
                    type="submit"
                    className="flex w-[150px] h-[39px] items-center gap-2 px-4 py-1 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                  >
                    {characteristic ? "Update" : "Add"} Characteristic
                  </Button>
                </div>
              </div>{" "}
            </div>
          </form>
        </Formik>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          columns={columns}
          data={filteredCharacteristics}
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default CharacteristicsForm;
