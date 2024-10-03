"use client";
import { genderValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import DeleteGender from "./DeleteGender";
import moment from "moment";
const GenderForm = ({ genders }) => {
  const router = useRouter();
  const [gender, setGender] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredGenders, setFilteredGenders] = useState(genders);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = genders.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredGenders(filtered);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortFunction: (rowA, rowB) => {
        const dateA = new Date(rowA.createdAt);
        const dateB = new Date(rowB.createdAt);
        return dateB - dateA;
      },
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <IconButton
            variant="text"
            className="rounded-full"
            onClick={() => setGender(row)}
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
          <DeleteGender gender_id={row?.gender_id} />
        </>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: gender ? gender.name : "",
    },
    enableReinitialize: true,
    validationSchema: genderValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = gender
          ? await update(`/api/gender/${gender.gender_id}`, values)
          : await post("/api/gender", values);

        if (response?.status === 201) {
          enqueueSnackbar(gender ? "Gender Updated" : "Gender Created", {
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
        setGender(false);
        formik.resetForm();
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.response?.data?.error || error?.message, {
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: { vertical: "top", horizontal: "right" },
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
    },
  });

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
        <h2 className="text-2xl font-semibold">Genders</h2>
        <div className="flex gap-3 items-end">
          <Input
            type="text"
            label="Search"
            placeholder="Search Genders"
            value={search}
            style={{ fontSize: "15px" }}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Button
            size="md"
            className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
            onClick={() => setGender(false)}
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
            Add Gender
          </Button>{" "}
        </div>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 mb-5">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className="rounded p-7">
            <div className="flex items-center gap-5">
              <div className="w-full">
                <Input
                  className="w-full"
                  label="Name"
                  type="text"
                  name="name"
                  style={{ fontSize: "15px" }}
                  value={formik.values?.name || ""}
                  onChange={formik.handleChange}
                  error={formik.touched.name && formik.errors.name}
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  size="lg"
                  className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                  loading={formik.isSubmitting}
                >
                  {gender ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </Formik>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          data={filteredGenders}
          columns={columns}
          highlightOnHover
          customStyles={customStyles}
          pagination
        />
      </div>
    </>
  );
};

export default GenderForm;
