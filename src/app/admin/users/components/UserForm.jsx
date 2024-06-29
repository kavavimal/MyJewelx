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
      setPreviewURL(user?.image);
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
            {/* <div className="w-full">
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
            </div> */}
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
                    setFile(e.target.files[0]);
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
