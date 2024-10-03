"use client";
import { countryValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import DeleteCountry from "./DeleteCountry";
import Link from "next/link";
import moment from "moment";

const CountryForm = ({ countries }) => {
  const router = useRouter();
  const [country, setCountry] = useState(false);
  const [filterCountries, setFilterCountries] = useState(countries);

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Region",
      selector: (row) => row?.region,
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
            onClick={() => setCountry(row)}
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

          <DeleteCountry country_id={row?.country_id} />

          <Link href={`/admin/countries/${row?.country_id}/states`}>
            <IconButton variant="text" color="green" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                ></path>
              </svg>
            </IconButton>
          </Link>
        </>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: country ? country.name : "",
      region: country ? country.region : "",
    },
    enableReinitialize: true,
    validationSchema: countryValidationSchema,
    onSubmit: async (values) => {
      if (country) {
        try {
          const response = await update(
            `/api/country/${country.country_id}`,
            values
          );
          if (response.status === 201) {
            enqueueSnackbar("Country updated successfully", {
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
          setCountry(false);
          formik.setValues({ name: "", description: "" });
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
          const response = await post("/api/country", values);
          if (response.status === 201) {
            enqueueSnackbar("Country created successfully", {
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = countries.filter((country) => {
      const { name, region } = country;
      return (
        (name && name.toLowerCase().includes(value)) ||
        (region && region.toLowerCase().includes(value))
      );
    });
    setFilterCountries(filtered);
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
        <h2 className="text-2xl font-semibold">Countries</h2>
        <div className="flex gap-3 items-end">
          <Input
            placeholder="Search Countries"
            label="Search"
            type="text"
            style={{ fontSize: "15px" }}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Button
            onClick={() => setCountry(false)}
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
            Add Country
          </Button>{" "}
        </div>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 mb-5">
        {" "}
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
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
                  <Input
                    label="Region"
                    type="text"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.region || ""}
                    name="region"
                    onChange={formik.handleChange}
                    error={formik.touched.region && formik.errors.region}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-3 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                    loading={formik.isSubmitting}
                  >
                    {country ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Formik>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          data={filterCountries}
          columns={columns}
          highlightOnHover
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default CountryForm;
