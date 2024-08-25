"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AcountType } from "@prisma/client";
import LoadingDots from "@/components/loading-dots";
import Image from "next/image";
import { Alert, Button, Input, Option, Select } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { post, update } from "@/utils/api";
import { userValidationSchema } from "@/schemas/ValidationSchema";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import SessionLoader from "@/components/SessionLoader";
export default function UserForm({ roles, user }) {
  const { data: session, status } = useSession();

  const userAcountType = Object.keys(AcountType)?.map((type) => {
    return { label: type, value: type };
  });

  const router = useRouter();
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: user ? user?.firstName : "",
      lastName: user ? user?.lastName : "",
      email: user ? user?.email : "",
      password: user ? user?.password : "",
      confirm_password: user ? user?.password : "",
      role: user ? user?.role_id : "",
      // account_type: user ? user?.account_type : "",
      file: file,
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (user) {
        try {
          const response = await update(`/api/user/${user.id}`, values);
          router.push("/admin/users");
          router.refresh();
          if (response.status === 200) {
            enqueueSnackbar("User updated successfully", {
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
        } catch (error) {}
      } else {
        try {
          const response = await post("/api/user/", values);
          router.push("/admin/users");
          router.refresh();
          if (response.status === 200) {
            enqueueSnackbar("User created successfully", {
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
        } catch (e) {
          enqueueSnackbar(e.response?.data?.error, {
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
      }
    },
  });

  console.log(user);

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
    if (
      user &&
      user?.image !== null &&
      user?.image !== "" &&
      user?.image !== undefined
    ) {
      setPreviewURL(user?.image?.path);
    }
  }, [user]);

  if (status === "loading") {
    return <SessionLoader />;
  } else if (user && !session.user.permissions.includes("customer_update")) {
    router.push("/");
  } else if (!session.user.permissions.includes("customer_create")) {
    router.push("/");
  }

  return (
    <div>
      <div className="flex items-center mb-10">
        <h2 className="text-2xl font-semibold">
          {user ? "Edit" : "Save"} User
        </h2>
      </div>
      <Formik initialValues={formik.initialValues}>
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
                value={formik.values?.firstName ?? ""}
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
                value={formik.values?.lastName ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
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
                readOnly={user ? true : false}
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
              <Input
                type="password"
                label="Password"
                name="password"
                value={formik.values?.password ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                readOnly={user ? true : false}
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
                value={formik.values?.confirm_password ?? ""}
                error={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
                readOnly={user ? true : false}
                size="lg"
              />
            </div>
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex h-24 w-24 flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {previewURL !== null ? (
                  <img
                    src={previewURL}
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
                  <div className="relative cursor-pointer inline-flex items-center justify-center w-full h-full select-none overflow-hidden hover:opacity-80 bg-primary-200/25 rounded-full dark:bg-gray-600">
                    <span className="text-[22px] text-black uppercase">{`${user?.firstName[0]}${user?.lastName[0]}`}</span>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setPreviewURL(URL.createObjectURL(e.target.files[0]));
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
      </Formik>
    </div>
  );
}
