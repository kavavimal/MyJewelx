"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AcountType } from "@prisma/client";
import LoadingDots from "@/components/loading-dots";
import Image from "next/image";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { post } from "@/utils/api";
import { userValidationSchema } from "@/schemas/ValidationSchema";
export default function UserForm({ roles, user }) {
  const [loading, setLoading] = useState(false);
  console.log(user);
  // const userRoles = roles?.map((role) => {
  //   return { label: role.role_name, value: role.role_id };
  // });

  const userAcountType = Object.keys(AcountType)?.map((type) => {
    return { label: type, value: type };
  });
  const data = {
    username: "",
    email: "",
    password: "",
    role: "",
    account_type: "",
  };
  const [formData, setFormData] = useState(data);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dataValues = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      console.log("key", key, "value", value);
      dataValues.set(key, value);
    });
    dataValues.append("file", file);

    try {
      const response = await fetch("/api/user/", {
        method: "POST",
        body: dataValues,
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., server error)
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      } else {
        // Reset form and navigate on success
        setFormData({ name: "", description: "" });
        setError(null);
        router.push("/admin/users");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      username: user ? user?.username : "",
      email: user ? user?.email : "",
      password: user ? user?.password : "",
      role: user ? user?.role_id : "",
      account_type: user ? user?.account_type : "",
      file: file,
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (user) {
      } else {
        try {
          // const response = await post("/api/user/", values);
          console.log(values);
        } catch (error) {}
      }
    },
  });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      const URL = reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewURL(reader.result);
      };
      setPreviewURL(URL);
    }
    formik.setValues({ ...formik.values, file: file });
  }, [file]);

  useEffect(() => {
    if (user) {
      setPreviewURL(user?.image);
    }
  }, [user]);

  return (
    <div>
      {error && (
        <div className="mb-2 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      <Formik initialValues={formik.initialValues}>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-7 shadow-3xl rounded-2xl"
        >
          <div className="grid grid-cols-2 gap-5 items-center">
            <div className="w-full">
              <Input
                label="Username"
                type="text"
                id="username"
                name="username"
                value={formik.values?.username ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && formik.errors.username}
                size="lg"
              />
            </div>
            <div className="w-full">
              <Input
                label="email"
                type="email"
                id="email"
                name="email"
                value={formik.values?.email ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                size="lg"
              />
            </div>
            <div className="w-full">
              <Select
                label="Role"
                size="lg"
                name="role"
                onChange={(value) => formik.setFieldValue("role", value)}
                value={formik.values?.role ?? ""}
                onBlur={formik.handleBlur}
                error={formik.touched.role && formik.errors.role}
              >
                {roles.map((role) => (
                  <Option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <Select
                label="Account Type"
                size="lg"
                name="account_type"
                onChange={(value) =>
                  formik.setFieldValue("account_type", value)
                }
                value={formik.values?.account_type ?? ""}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.account_type && formik.errors.account_type
                }
              >
                {userAcountType.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <Input
                type="password"
                label="Password"
                name="password"
                value={formik.values?.password ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                x
                size="lg"
              />
            </div>
            <div className="w-full">
              <Input
                type="password"
                label="Confirm Password"
                id="confirm_password"
                name="confirm_password"
                value={formik.values?.confirm_password ?? ""}
                onChange={formik.handleChange}
                size="lg"
              />
            </div>
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex h-24 w-24 flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {previewURL ? (
                  <img
                    src={previewURL}
                    alt=""
                    className="w-full h-64 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      className="text-blueGray-200"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M12 9.273c-2.301 0-4.167 1.831-4.167 4.09c0 2.26 1.866 4.092 4.167 4.092c2.301 0 4.167-1.832 4.167-4.091c0-2.26-1.866-4.091-4.167-4.091m0 1.636c-1.38 0-2.5 1.099-2.5 2.455c0 1.355 1.12 2.454 2.5 2.454s2.5-1.099 2.5-2.454c0-1.356-1.12-2.455-2.5-2.455m4.722-.818c0-.452.373-.818.834-.818h1.11c.46 0 .834.366.834.818a.826.826 0 0 1-.833.818h-1.111a.826.826 0 0 1-.834-.818"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={(e) => {
                    // formik.setFieldValue("file", e.target.files[0]);
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Button type="submit" loading={formik.isSubmitting}>
              Save
            </Button>
          </div>
        </form>
      </Formik>
    </div>
  );
}
