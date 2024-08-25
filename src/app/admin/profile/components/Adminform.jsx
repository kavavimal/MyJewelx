"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import Image from "next/image";
import { post, update } from "@/utils/api";

const AdminForm = ({ user }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const userValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    role: Yup.number().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: user?.password || "",
      confirm_password: user?.password || "",
      role: user?.role_id || "",
      file: file,
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = user
          ? await update(`/api/user/${user.id}`, values)
          : await post("/api/user/", values);

        if (response.status === 200) {
          enqueueSnackbar(`User ${user ? "updated" : "created"} successfully`, {
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
          router.push("/admin/users");
          router.refresh();
        }
      } catch (error) {
        enqueueSnackbar(error.response?.data?.error || "An error occurred", {
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
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
    <>
      <div>
        <div className="flex items-center mb-5">
          <h2 className="text-2xl font-semibold">
            {user ? "Edit" : "Save"} Admin
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-7 shadow-3xl rounded-2xl"
        >
          <div className="grid grid-cols-2 gap-5 items-center">
            <div className="w-full">
              <Input
                label="FirstName"
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName}
                size="lg"
              />
            </div>
            <div className="w-full">
              <Input
                label="LastName"
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
                size="lg"
              />
            </div>
            <div className="w-full">
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                readOnly={!!user}
                size="lg"
              />
            </div>
            <div className="w-full">
              <Select
                label="Role"
                size="lg"
                name="role"
                onChange={(value) => formik.setFieldValue("role", value)}
                value={formik.values.role}
                onBlur={formik.handleBlur}
                error={formik.touched.role && formik.errors.role}
              >
                <Option key={user.role.role_name} value={user.role_id}>
                  {user.role.role_name}
                </Option>
              </Select>
            </div>
            <div className="w-full">
              <Input
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                readOnly={!!user}
                size="lg"
              />
            </div>
            <div className="w-full">
              <Input
                type="text"
                label="Confirm Password"
                id="confirm_password"
                name="confirm_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
                error={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
                readOnly={!!user}
                size="lg"
              />
            </div>
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex h-24 w-24 flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 rounded-lg"
                  />
                ) : user?.image ? (
                  <Image
                    src={user.image.path}
                    alt="User Image"
                    width={60}
                    height={60}
                    className="w-full h-64 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image
                      src="/assets/images/avatar.jpg"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Button type="submit" loading={formik.isSubmitting}>
              {user ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminForm;
