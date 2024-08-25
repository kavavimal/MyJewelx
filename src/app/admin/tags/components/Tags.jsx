"use client";
import { tagsValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import DeleteTag from "./DeleteTag";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import moment from "moment";
const Tags = ({ tags }) => {
  const router = useRouter();
  const [tag, setTag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);

  // Columns definition
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
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
            onClick={() => setTag(row)}
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

          <DeleteTag tag_id={row?.tag_id} />
        </>
      ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = tags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(value) ||
        (tag.description && tag.description.toLowerCase().includes(value))
    );
    setFilteredTags(filtered);
  };

  const formik = useFormik({
    initialValues: {
      name: tag ? tag.name : "",
      description: tag ? tag.description : "",
    },
    enableReinitialize: true,
    validationSchema: tagsValidationSchema,
    onSubmit: async (values) => {
      if (tag) {
        try {
          const response = await update(`/api/tag/${tag.tag_id}`, values);
          router.refresh();
          if (response?.status === 200) {
            enqueueSnackbar("Tag updated successfully", {
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
          setTag(false);
          formik.setValues({ name: "", description: "" });
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
          const response = await post("/api/tag", values);

          if (response?.status === 200) {
            enqueueSnackbar("Tag created successfully", {
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
        <h2 className="text-2xl font-semibold">Tags</h2>
        <div className="flex gap-3 items-end">
          <Input
            label="Search"
            type="text"
            placeholder="Search Tags"
            value={searchTerm}
            style={{ fontSize: "15px" }}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Button
            variant="gradient"
            size="md"
            className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90"
            onClick={() => setTag(false)}
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
            Add Tag
          </Button>{" "}
        </div>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 mb-5">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="mb-2 w-1/2">
                  <Input
                    label="Name"
                    type="text"
                    id="name"
                    name="name"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.name || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <Input
                    label="Description"
                    type="text"
                    id="description"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.description || ""}
                    name="description"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button type="submit" loading={formik.isSubmitting}>
                  {tag ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </Formik>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          data={filteredTags}
          columns={columns}
          highlightOnHover
          pagination
          pointerOnHover
          customStyles={customStyles}
          striped
        />
      </div>
    </>
  );
};

export default Tags;
