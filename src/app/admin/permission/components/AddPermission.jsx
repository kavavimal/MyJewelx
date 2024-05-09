"use client";
import LoadingDots from "@/components/loading-dots";
import { permissionValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await validationSchema
        .validate(formData, { abortEarly: false })
        .then(async (values) => {
          const dataValues = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            dataValues.set(key, value);
          });

          if (edit !== false) {
            // update permission
            const response = await fetch(
              `/api/permission/${edit.permission_id}`,
              {
                method: "PUT",
                body: dataValues,
              }
            );

            if (!response.ok) {
              // Handle non-successful response (e.g., server error)
              const errorData = await response.json();
              setError(errorData.error || "An error occurred");
            } else {
              // Reset form and navigate on success
              setFormData({ permission_name: "", description: "" });
              setError(null);
              router.refresh();
            }
          } else {
            // add new permission
            const response = await fetch("/api/permission", {
              method: "POST",
              body: dataValues,
            });

            if (!response.ok) {
              // Handle non-successful response (e.g., server error)
              const errorData = await response.json();
              setError(errorData.error || "An error occurred");
            } else {
              // Reset form and navigate on success
              setFormData({ permission_name: "", description: "" });
              setError(null);
              router.refresh();
            }
          }
        })
        .catch((err) => {
          err.errors.forEach((error) => {
            setError(error);
          });
        });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

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
      } else {
        const response = await post("/api/permission", values);
        router.refresh();
        formik.resetForm();
      }
    },
  });

  return (
    <div className="mt-10 rounded-2xl shadow-3xl bg-white">
      {error && (
        <div className="mb-2 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      <Formik initialValues={formik.initialValues}>
        <form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
          {/* <h5 className="mb-2">Add Role</h5> */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="mb-2 w-1/2">
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
              <div className="mb-2 w-1/2">
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
            </div>

            <div className="flex items-center justify-between">
              <Button
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {edit !== false ? "Update" : "Add"}
              </Button>
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
