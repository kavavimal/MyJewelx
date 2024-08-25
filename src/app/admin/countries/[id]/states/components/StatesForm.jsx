"use client";
import { post, update } from "@/utils/api";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import DeleteState from "./DeleteState";
import moment from "moment";
const StatesForm = ({ states, id }) => {
  const router = useRouter();
  const [filteredStates, setFilteredStates] = useState(states);
  const [state, setState] = useState(false);

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
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
            onClick={() => setState(row)}
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

          <DeleteState state_id={row.state_id} />
        </>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: state ? state.name : "",
      country_id: id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (state) {
        try {
          const response = await update(`/api/state/${state.state_id}`, values);
          if (response?.status === 201) {
            enqueueSnackbar("State Updated", {
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
          setState(false);
          router.refresh();
          formik.resetForm();
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error?.response?.data?.error, {
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
          const response = await post("/api/state", values);
          router.refresh();
          formik.resetForm();
          if (response?.status === 201) {
            enqueueSnackbar("State Created", {
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
    const filtered = states.filter((state) => {
      const { name } = state;
      return name && name.toLowerCase().includes(value);
    });
    setFilteredStates(filtered);
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
        <h2 className="text-2xl font-semibold">States / City</h2>
        <div className="flex gap-3 items-end">
          <Input
            placeholder="Search States"
            label="Search"
            style={{ fontSize: "15px" }}
            type="text"
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
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
            Add State / City
          </Button>{" "}
        </div>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 mb-5">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 items-center">
                <div className="w-full">
                  <Input
                    className="w-full"
                    label="Name"
                    type="text"
                    style={{ fontSize: "15px" }}
                    name="name"
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
                    {state ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Formik>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          data={filteredStates}
          columns={columns}
          customStyles={customStyles}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </>
  );
};

export default StatesForm;
