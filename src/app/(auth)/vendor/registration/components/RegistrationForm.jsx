"use client";
import { post } from "@/utils/api";
import { VENDOR_ID } from "@/utils/constants";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import * as Yup from "yup";
import OTP from "./OTP";

const RegistrationForm = () => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    store_name: Yup.string().required("Store Name is required"),
    store_url: Yup.string()
      .url("Invalid URL")
      .required("Store URL is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Store Email is required"),
    phone_number: Yup.string().required("Mobile Number is required"),
    password: Yup.string()
      .min(8, "Password must have 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  if (isOtpSent) {
    return <OTP />;
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      store_name: "",
      store_url: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      role_id: VENDOR_ID,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/auth/otp/resend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values?.email,
            mode: "registration",
          }),
        });
        console.log(response);
        if (response.status === 201) {
          enqueueSnackbar("Otp Is Send To Your Mail", {
            variant: "success",
            preventDuplicates: true,
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
          setIsOtpSent(true);
        } else {
          enqueueSnackbar(response.message, {
            variant: "error",
            preventDuplicates: true,
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
    },
  });
  return (
    <div className="py-20 bg-[#FFFCF5] w-full overflow-auto">
      <div className="h-full flex items-center justify-center">
        <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-bold trekking-wide font-emirates mb-14">
              Create Vendor Account
            </h4>
          </div>
          <Formik initialValues={formik.initialValues}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 items-center gap-6">
                <div>
                  <Input
                    label="First Name"
                    type="text"
                    size="lg"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.firstName && formik.touched.firstName}
                  />
                </div>
                <div>
                  <Input
                    label="Last Name"
                    type="text"
                    size="lg"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.lastName && formik.touched.lastName}
                  />
                </div>
                <div>
                  <Input
                    label="Store Name"
                    type="text"
                    size="lg"
                    name="store_name"
                    value={formik.values.store_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.store_name && formik.touched.store_name
                    }
                  />
                </div>
                <div>
                  <Input
                    label="Store URL"
                    size="lg"
                    name="store_url"
                    type="url"
                    value={formik.values.store_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.store_url && formik.touched.store_url}
                  />
                </div>
                <div>
                  <Input
                    label="Store Email"
                    type="email"
                    size="lg"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email && formik.touched.email}
                  />
                </div>
                <div>
                  <Input
                    label="Mobile Number"
                    type="text"
                    size="lg"
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.phone_number && formik.touched.phone_number
                    }
                  />
                </div>
                <div>
                  <Input
                    label="Password"
                    type={isShowPassword ? "text" : "password"}
                    size="lg"
                    icon={
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        {isShowPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="size-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        )}
                      </span>
                    }
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password && formik.touched.password}
                  />
                </div>
                <div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    size="lg"
                    // icon={
                    //   <span className="cursor-pointer">
                    //     <svg
                    //       xmlns="http://www.w3.org/2000/svg"
                    //       fill="none"
                    //       viewBox="0 0 24 24"
                    //       strokeWidth="1.5"
                    //       stroke="currentColor"
                    //       className="size-5"
                    //     >
                    //       <path
                    //         strokeLinecap="round"
                    //         strokeLinejoin="round"
                    //         d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    //       />
                    //     </svg>
                    //   </span>
                    // }
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.confirm_password &&
                      formik.touched.confirm_password
                    }
                  />
                </div>
                <div>
                  <Button
                    fullWidth
                    size="lg"
                    type="submit"
                    className="flex justify-center items-center"
                    loading={formik.isSubmitting}
                  >
                    Registration
                  </Button>
                  <Typography className="text-sm text-secondary-100 mt-1.5 font-emirates">
                    By proceeding next, you are agree with the my jewlex{" "}
                    <Link href="/" className="text-primary-200">
                      Term of use
                    </Link>{" "}
                    and{" "}
                    <Link href="/" className="text-primary-200">
                      Privacy Policy
                    </Link>
                  </Typography>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
