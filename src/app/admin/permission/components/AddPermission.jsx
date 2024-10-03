"use client";
import LoadingDots from "@/app/components/LoadingDots";
import { permissionValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AddPermission({ edit = false }) {
  const [formData, setFormData] = useState({
    permission_name: edit !== false ? edit.permission_name : "",
    description: edit !== false ? edit.description : "",
  });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit !== false) {
      setFormData({
        permission_name: edit.permission_name,
        description: edit.description,
      });
    }
  }, [edit]);

  const formik = useFormik({
    initialValues: {
      permission_name: edit !== false ? edit.permission_name : "",
      description: edit !== false ? edit.description : "",
    },
    enableReinitialize: true,
    validationSchema: permissionValidationSchema,
    onSubmit: async (values) => {
      if (edit !== false) {
        const response = await update(
          `/api/permission/${edit.permission_id}`,
          values
        );
        router.refresh();
        formik.resetForm();
        enqueueSnackbar("Permission updated successfully", {
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
      } else {
        const response = await post("/api/permission", values);
        router.refresh();
        formik.resetForm();
        enqueueSnackbar("Permission created successfully", {
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
    },
  });

  return (
    <div className="rounded-lg shadow border bg-white border-dark-200 mb-5">
      {error && (
        <div className="mb-2 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      <Formik initialValues={formik.initialValues}>
        <form onSubmit={formik.handleSubmit} className=" rounded p-7">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-full">
                <Input
                  label="Name"
                  type="text"
                  id="permission_name"
                  name="permission_name"
                  value={formik.values?.permission_name || ""}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.permission_name &&
                    formik.errors.permission_name
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  label="Description"
                  type="text"
                  id="description"
                  value={formik.values?.description || ""}
                  name="description"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit">{edit ? "Update" : "Add"}</Button>
              </div>{" "}
            </div>
          </div>
        </form>
      </Formik>
      {loading && (
        <div className="fixed h-full w-full flex item-center justify-center bg-gray-400/[.5]  top-0 left-0 z-40">
          <LoadingDots color="#808080" size="15px" />
        </div>
      )}
    </div>
  );
}
