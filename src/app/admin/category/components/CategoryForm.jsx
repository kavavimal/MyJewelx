"use client";
import { userValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const CategoryForm = ({ category, categories }) => {
  const [categoryOptions, setCategoryOptions] = useState(categories);
  const [previewURL, setPreviewURL] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      parent_id: category?.parent_id ?? "",
    },
    // validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (category) {
        try {
          const response = await update(
            `/api/category/${category.category_id}`,
            values
          );
          router.push("/admin/category");
          router.refresh();
          if (response.status === 201) {
            enqueueSnackbar("Category updated successfully", {
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
          enqueueSnackbar("Category updated failed", {
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
          const response = await post("/api/category", values);
          router.push("/admin/category");
          router.refresh();
          enqueueSnackbar("Category created successfully", {
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
          enqueueSnackbar("Category created failed", {
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

  useEffect(() => {
    // if (!categories.some((cat) => cat.category_id === "")) {
    //   categories.unshift({
    //     name: "None",
    //     category_id: "",
    //     parent_id: "",
    //   });
    // }
  }, []);
  return (
    <div className="mt-10 rounded-2xl shadow-3xl bg-white">
      <Formik initialValues={formik.initialValues}>
        <Form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
          <div className="flex flex-col gap-5">
            <div>
              {console.log(categories)}
              <Select
                label="Parent Category"
                name="parent_id"
                value={formik.values?.parent_id ?? ""}
                onChange={(value) => formik.setFieldValue("parent_id", value)}
              >
                {categories.map((category) => (
                  <Option
                    key={category.category_id}
                    value={category.category_id ?? ""}
                  >
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="mb-2 w-1/2">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formik.values?.name ?? ""}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <Input
                    label="Description"
                    type="text"
                    value={formik.values?.description ?? ""}
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
                  {category ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CategoryForm;
